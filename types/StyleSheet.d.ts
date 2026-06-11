import type { Properties } from 'csstype';

/** A CSS property value. */
export type CSSValue = string | number | null | undefined;

/**
 * CSS properties with full value autocomplete. Uses csstype's original value
 * unions (which include `string & {}` for arbitrary strings) plus `null`
 * (filtered at runtime). Numbers accepted for length properties.
 */
export type CSSProperties = {
    [K in keyof Properties<(string & {}) | number, string & {}>]?:
        Properties<(string & {}) | number, string & {}>[K] | null;
};

/**
 * A style rule object. Keys can be CSS properties (camelCase) or selectors
 * for nesting (`&:hover`), at-rules (`@media ...`), global styles (`@global`),
 * and class references (`$className`).
 */
export interface StyleRule extends CSSProperties {
    [selector: string]: StyleRule | CSSValue;
}

/** Top-level styles object mapping class names and selectors to style rules. */
export type Styles = Record<string, StyleRule>;

/** A renderer function: receives the current value and returns the next, called with the StyleSheet as `this`. */
type RendererFn = (this: StyleSheet<any>, styles: any) => any;

/** A value provided directly or as a function returning it (called with the StyleSheet as `this`). */
type Resolvable<T> = T | ((this: StyleSheet<any>) => T);

/** Options for the StyleSheet constructor. Accepts custom keys for subclasses and custom renderers. */
export interface StyleSheetOptions {
    /**
     * Prefix for generating unique identifiers and data attributes. Default: `'fun'`.
     * May be a function returning the prefix, evaluated when the instance is created.
     */
    prefix?: Resolvable<string>;
    /** Custom function to generate the unique identifier. */
    generateUid?: (this: StyleSheet<any>) => string;
    /** Custom function to generate unique class names. */
    generateClassName?: (this: StyleSheet<any>, className: string, index: number) => string;
    /** Custom function to determine whether the StyleSheet should be added to the DOM. */
    shouldAttachToDOM?: (this: StyleSheet<any>) => boolean;
    /**
     * Attributes to be added to the `<style>` element.
     * May be a function returning the attributes object, evaluated lazily by `getAttributes`.
     */
    attributes?: Resolvable<Record<string, string>>;
    /**
     * Renderer functions or method names (or a function returning such an array).
     * Default: `['parseStyles', 'renderStyles']`. Resolved when the instance is created
     * and applied in order, each renderer receiving the previous one's output.
     */
    renderers?: Resolvable<Array<string | RendererFn>>;
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
     * Hook run at the very start of the constructor, before `styles`/`options` are
     * applied and before `renderers`, `prefix`, `uid` and `classes` are computed.
     * Does nothing by default. Override it in a subclass to run setup logic or define
     * instance properties such as `prefix`, `attributes` or `renderers`. Values set
     * here are still overridden by the matching `options`.
     */
    preinitialize(styles: S, options?: StyleSheetOptions): void;

    /**
     * Object mapping each top-level selector key (those matching `/^\w+$/`) to its
     * generated unique class name string.
     * At-rule keys (`@global`, `@keyframes …`, `@media …`, `@supports …`)
     * and class reference keys (`$name`) are excluded — they don't produce
     * class names at runtime.
     */
    readonly classes: {
        readonly [K in keyof S as K extends `@${string}` | `$${string}` ? never : K]: string;
    };
    /** The original styles object provided to the instance. */
    styles: S;
    /** Unique identifier for the StyleSheet instance. */
    uid: string;
    /** Prefix for generating unique identifiers. Resolved to a string when the instance is created. */
    prefix: string;
    /**
     * Attributes to be added to the `<style>` element. Optional — may be `undefined`
     * (only set when passed as an option or assigned manually), an object, or a function
     * returning the attributes object (resolved lazily by `getAttributes`).
     */
    attributes?: Resolvable<Record<string, string>>;
    /**
     * Renderer functions used to process the styles object. Method-name strings passed
     * via options are resolved to methods when the instance is created.
     */
    renderers: RendererFn[];
    /** Reference to the `<style>` element in the DOM. Set after `attach()`, `null` after `destroy()`. */
    el: HTMLStyleElement | null | undefined;

    /** Generate a stable unique identifier. May be overridden by `options.generateUid`. */
    generateUid(): string;
    /** Generate a unique class name. May be overridden by `options.generateClassName`. */
    generateClassName(className: string, index: number): string;
    /**
     * Apply the renderers to the styles object.
     * Returns a string ready to be added to the style element.
     */
    render(): string;
    /**
     * Default renderer. Render a (parsed) styles object as a CSS string.
     * Exposed for subclasses and custom renderers.
     */
    renderStyles(styles: any, level?: number): string;
    /**
     * Default renderer. Parse and transform the styles object (expand nested styles,
     * resolve `$` references, convert camelCase keys, etc.) into an object ready for
     * `renderStyles`. Exposed for subclasses and custom renderers.
     */
    parseStyles(styles: any, parent?: any, parentSelector?: string, isGlobal?: boolean): any;
    /** Build the attributes object applied to the `<style>` element (includes `data-<prefix>-uid`). */
    getAttributes(): Record<string, string>;
    /** Render the StyleSheet as a `<style>` element string. Used for server-side rendering. */
    toString(): string;
    /**
     * Check if the StyleSheet should be added to the DOM.
     * May be overridden by `options.shouldAttachToDOM`.
     */
    shouldAttachToDOM(): boolean;
    /** Add the instance to the registry and attach it to the DOM if in a browser. */
    attach(): this;
    /** Destroy the instance and remove it from the registry and from the DOM. */
    destroy(): this;

    /** The class prefix. Used to generate unique class names. Default: `'fun'`. */
    static prefix: string;
    /** The indent string. Used to format text when debug is enabled. Default: `'    '`. */
    static indent: string;
    /** The registry array. StyleSheet instances will be added to this array. */
    static registry: StyleSheet<any>[];
    /** If true, the styles will be formatted with indentation and new lines. */
    static debug: boolean;

    /** Regular expression to match class names. */
    static classRegex: RegExp;
    /** Regular expression to match global styles. */
    static globalRegex: RegExp;
    /** Regular expression to match global styles with a prefix. */
    static globalPrefixRegex: RegExp;
    /** Regular expression to match references to other class names. */
    static referenceRegex: RegExp;
    /** Regular expression to match nested styles. */
    static nestedRegex: RegExp;

    /** Render all instances in the registry as a string, including the style tags. */
    static toString(): string;
    /** Render all instances in the registry as CSS string. */
    static toCSS(): string;
    /** Destroy all instances in the registry and remove them from the DOM. */
    static destroy(): void;
}

export default StyleSheet;
