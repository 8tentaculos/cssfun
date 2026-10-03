import type { Properties } from 'csstype';

/** A CSS property value. */
export type CSSValue = string | number | null | undefined;

/** csstype's value union for property `K`, with `string & {}` for arbitrary strings. */
type PropValue<K extends keyof Properties<(string & {}) | number, string & {}>> =
    Properties<(string & {}) | number, string & {}>[K];

/**
 * CSS properties with full value autocomplete. Uses csstype's original value
 * unions (which include `string & {}` for arbitrary strings) plus `null`
 * (filtered at runtime). Numbers accepted for length properties. An array value
 * emits one declaration per element, providing CSS fallback values.
 */
export type CSSProperties = {
    [K in keyof Properties<(string & {}) | number, string & {}>]?:
        PropValue<K> | null | PropValue<K>[];
};

/**
 * A style rule object. Keys can be CSS properties (camelCase) or selectors
 * for nesting (`&:hover`), at-rules (`@media ...`), global styles (`@global`),
 * and class references (`$className`).
 */
export interface StyleRule extends CSSProperties {
    [selector: string]: StyleRule | CSSValue | CSSValue[];
}

/**
 * Top-level styles object mapping class names and selectors to style rules.
 * An at-rule key may also hold a statement prelude, rendered as
 * `@rule prelude;` (e.g. `'@layer' : 'base, utilities'`). An array of preludes
 * emits one statement per element, so a name can repeat (e.g. several
 * `'@import'` rules).
 */
export type Styles = Record<string, StyleRule | string | string[]>;

/** A renderer function: receives the current value and returns the next, called with the StyleSheet as `this`. */
export type RendererFn = (this: StyleSheet<any>, styles: any) => any;

/**
 * A value provided directly, or as a function returning it. Used on the instance, where
 * TypeScript infers `this` from the assignment target — so a function assigned in a
 * subclass sees the subclass.
 */
export type Resolvable<T> = T | (() => T);

/**
 * A `Resolvable` on the options side, where the function form is called with the StyleSheet
 * as `this`. It carries `this` explicitly because an option has no assignment target for
 * TypeScript to infer it from.
 */
export type ResolvableOption<T> = T | ((this: StyleSheet<any>) => T);

/**
 * Characters that can't appear in a class key. At runtime only keys matching
 * `/^\w+$/` produce a class name.
 */
type InvalidClassChar =
    | '-' | ' ' | '.' | ',' | ':' | '&' | '>' | '+' | '~'
    | '*' | '[' | ']' | '(' | ')' | '#' | '@' | '$' | '%' | '"' | "'" | '=' | '|' | '^';

/** At-rules whose block nests style rules, and may therefore declare class names. */
type AtBlockPrefix = '@media' | '@supports' | '@layer' | '@container' | '@scope' | '@starting-style';

/**
 * Values that hold no nested rules: a declaration value, or an array of them
 * (fallback declarations and repeated at-rule statements). A key holding one of
 * these declares no class name and is not descended into.
 */
type FlatValue = CSSValue | readonly CSSValue[];

/** Own keys that produce a class name: plain identifiers whose value is a rule object. */
type OwnClassKeys<S> = keyof {
    [K in keyof S as K extends `${string}${InvalidClassChar}${string}` ? never
        : S[K] extends FlatValue ? never
        : K & string]: unknown;
};

/**
 * Every key that produces a class name: an object's own class keys, plus the class
 * keys declared inside at-rule blocks that nest style rules (`@media`, `@layer`, …),
 * gathered recursively through those blocks.
 *
 * The descent is unrolled into fixed levels (`ClassKeys` → `ClassKeys1` → `ClassKeys2`
 * → `ClassKeys3`) rather than written as a single self-referential type. A
 * self-referential version destabilizes the TypeScript language server; the bounded
 * depth (four levels of at-rule nesting, which covers `@layer > @media > @supports >
 * @container`) keeps type-checking cheap and stops the compiler's recursion budget
 * from blowing up on large stylesheets.
 */
type ClassKeys<S> = OwnClassKeys<S> | {
    [K in keyof S]: K extends `${AtBlockPrefix}${string}`
        ? (S[K] extends FlatValue ? never : ClassKeys1<S[K]>) : never;
}[keyof S];
type ClassKeys1<S> = OwnClassKeys<S> | {
    [K in keyof S]: K extends `${AtBlockPrefix}${string}`
        ? (S[K] extends FlatValue ? never : ClassKeys2<S[K]>) : never;
}[keyof S];
type ClassKeys2<S> = OwnClassKeys<S> | {
    [K in keyof S]: K extends `${AtBlockPrefix}${string}`
        ? (S[K] extends FlatValue ? never : ClassKeys3<S[K]>) : never;
}[keyof S];
type ClassKeys3<S> = OwnClassKeys<S> | {
    [K in keyof S]: K extends `${AtBlockPrefix}${string}`
        ? (S[K] extends FlatValue ? never : OwnClassKeys<S[K]>) : never;
}[keyof S];

/** The `this` of the static registry methods: the class whose registry they read. */
type RegistryOwner = { registry: StyleSheet<any>[] };

/** Options for the StyleSheet constructor. Accepts custom keys for subclasses and custom renderers. */
export interface StyleSheetOptions {
    /**
     * Prefix for generating unique identifiers and data attributes. Overrides, for this
     * instance, the static `prefix` of the class it is created from. Default: `'fun'`.
     */
    prefix?: string;
    /** Custom function to generate the unique identifier. */
    generateUid?: (this: StyleSheet<any>) => string;
    /** Custom function to generate unique class names. */
    generateClassName?: (this: StyleSheet<any>, className: string, index: number) => string;
    /** Custom function to determine whether the StyleSheet should be added to the DOM. */
    shouldAttachToDOM?: (this: StyleSheet<any>) => boolean;
    /**
     * Attributes to be added to the `<style>` element.
     * May be a function returning the attributes object, resolved by `getDecoratedAttributes`
     * every time the attributes are read.
     */
    attributes?: ResolvableOption<Record<string, string>>;
    /**
     * Renderer functions or method names, or a function returning such an array.
     * Default: `['parseStyles', 'renderStyles']`. Resolved by `render` on every call and
     * applied in order, each renderer receiving the previous one's output.
     */
    renderers?: ResolvableOption<Array<string | RendererFn>>;
    /** Any additional custom options, e.g. for subclasses or custom renderers. */
    [key: string]: unknown;
}

/**
 * The StyleSheet class is responsible for creating and managing a CSS stylesheet.
 * It takes a styles object and an optional options object as input, processes the styles,
 * and generates a CSS stylesheet that can be attached to the DOM, destroyed, or
 * rendered as a string for server-side rendering.
 *
 * @template S - The styles object type. Used to infer the keys of the `classes` property.
 */
declare class StyleSheet<S extends Styles = Styles> {
    constructor(styles: S, options?: StyleSheetOptions);

    /**
     * Hook run at the very start of the constructor, before `styles`/`options` are applied
     * and before `prefix`, `uid` and `classes` are computed. Does nothing by default.
     * Override it in a subclass to define instance properties, which is the only place
     * `options` can be read before the class names are generated. Values set here are still
     * overridden by the matching `options`.
     */
    preinitialize(styles: S, options?: StyleSheetOptions): void;

    /** Map of class name selectors to their generated unique class name. */
    readonly classes: {
        readonly [K in Extract<ClassKeys<S>, string>]: string;
    };
    /** The original styles object provided to the instance. */
    styles: S;
    /** Unique identifier for the StyleSheet instance. */
    uid: string;
    /** Reference to the `<style>` element in the DOM. Set after `attach()`, `null` after `destroy()`. */
    el: HTMLStyleElement | null | undefined;

    /** Generate a stable unique identifier. May be overridden by `options.generateUid`. */
    generateUid(): string;
    /** Generate a unique class name. May be overridden by `options.generateClassName`. */
    generateClassName(className: string, index: number): string;
    /**
     * Apply the renderers to the styles object. `renderers` is resolved on every call, so the
     * function form is evaluated and method-name strings are looked up at render time.
     * Returns a string ready to be added to the style element.
     */
    render(): string;
    /**
     * Default renderer. Render a parsed styles object as a CSS string. Reached by reference
     * rather than called directly: listed in `renderers`, overridden by a subclass, or
     * delegated to from a custom renderer.
     */
    renderStyles(styles: any, level?: number): string;
    /**
     * Default renderer. Parse and transform the styles object (expand nested styles, resolve
     * `$` references, convert camelCase keys, etc.) into an object ready for `renderStyles`.
     * Reached the same way as `renderStyles`.
     */
    parseStyles(styles: any, parent?: any, parentSelector?: string, isGlobal?: boolean): any;
    /**
     * Build the attributes object applied to the `<style>` element: resolves `attributes` and
     * adds the `data-<prefix>-uid` entry. Internal — read or override `attributes` instead.
     */
    private getDecoratedAttributes;
    /** Render the StyleSheet as a `<style>` element string. Used for server-side rendering. */
    toString(): string;
    /**
     * Check if the StyleSheet should be added to the DOM.
     * May be overridden by `options.shouldAttachToDOM`.
     */
    shouldAttachToDOM(): boolean;
    /** Add the instance to the registry of its class and attach it to the DOM if in a browser. */
    attach(): this;
    /** Destroy the instance and remove it from the registry of its class and from the DOM. */
    destroy(): this;

    /**
     * The class prefix. Used to generate unique class names and data attributes. An instance
     * falls back to the static of its own class, so a subclass may declare its own; the
     * `prefix` option overrides it per instance. Default: `'fun'`.
     */
    static prefix: string;
    /** The indent string. Used to format text when debug is enabled. Default: `'    '`. */
    static indent: string;
    /**
     * The registry array. `attach` adds an instance to the registry of its own class, and the
     * static `toString`, `toCSS` and `destroy` read the registry of the class they are called
     * on. A subclass shares this array unless it declares its own.
     */
    static registry: StyleSheet<any>[];
    /** If true, the styles will be formatted with indentation and new lines. */
    static debug: boolean;

    /** Regular expression to match class names. */
    static classRegex: RegExp;
    /** Regular expression to match at-rules. */
    static atRuleRegex: RegExp;
    /** Regular expression to match at-rules whose block may declare class names. */
    static atBlockRegex: RegExp;
    /** Regular expression to match global styles. */
    static globalRegex: RegExp;
    /** Regular expression to match global styles with a prefix. */
    static globalPrefixRegex: RegExp;
    /** Regular expression to match references to other class names. */
    static referenceRegex: RegExp;
    /** Regular expression to match nested styles. */
    static nestedRegex: RegExp;

    /**
     * Render all instances in the registry as a string, including the style tags.
     * Reads the registry of the class it is called on, so it must not be detached from it.
     */
    static toString(this: RegistryOwner): string;
    /**
     * Render all instances in the registry as CSS string.
     * Reads the registry of the class it is called on, so it must not be detached from it.
     */
    static toCSS(this: RegistryOwner): string;
    /**
     * Destroy all instances in the registry and remove them from the DOM.
     * Reads the registry of the class it is called on, so it must not be detached from it.
     */
    static destroy(this: RegistryOwner): void;
}

/**
 * Members declared apart from the class body so a subclass can provide them as a getter.
 * TypeScript rejects an accessor or a method that overrides a property declared in a base
 * class body; a method still works in plain JavaScript, where a function-valued member is
 * called when the value is resolved.
 */
interface StyleSheet<S extends Styles = Styles> {
    /**
     * Prefix for generating unique identifiers and data attributes. The constructor reads it
     * to generate `uid` and `classes`, so a class field assigned in a subclass arrives too
     * late: declare the static `prefix`, a getter, or set it in `preinitialize`. A matching
     * option is defined as an own property and shadows a getter.
     */
    prefix: string;

    /**
     * Attributes to be added to the `<style>` element. Optional — only set when passed as an
     * option or declared by a subclass. In a subclass, declare a getter: it is read every time
     * the attributes are used, so a per-request value such as a CSP nonce stays fresh. An
     * object, or a function returning one, is also accepted as an option or on the prototype.
     */
    attributes?: Resolvable<Record<string, string>>;

    /**
     * Renderer functions or method names used to process the styles object, or a function
     * returning them. Resolved by `render` on every call, so the member keeps the form it was
     * given. Default: `[parseStyles, renderStyles]`. In a subclass, declare a getter.
     */
    renderers: Resolvable<Array<string | RendererFn>>;
}

export default StyleSheet;
