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

/** Options for the StyleSheet constructor. Accepts custom keys for subclasses and custom renderers. */
export interface StyleSheetOptions {
    /** Prefix for generating unique identifiers and data attributes. Default: `'fun'`. */
    prefix?: string;
    /** Custom function to generate the unique identifier. */
    generateUid?: (this: StyleSheet<any>) => string;
    /** Custom function to generate unique class names. */
    generateClassName?: (this: StyleSheet<any>, className: string, index: number) => string;
    /** Custom function to determine whether the StyleSheet should be added to the DOM. */
    shouldAttachToDOM?: (this: StyleSheet<any>) => boolean;
    /** Attributes to be added to the `<style>` element. */
    attributes?: Record<string, string>;
    /** Array of renderer functions or method names. Default: `['parseStyles', 'renderStyles']`. */
    renderers?: Array<string | ((this: StyleSheet<any>, styles: any) => any)>;
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

    /** Object mapping original class names to generated unique class names. */
    readonly classes: { readonly [K in keyof S]: string };
    /** The original styles object provided to the instance. */
    styles: S;
    /** Unique identifier for the StyleSheet instance. */
    uid: string;
    /** Prefix for generating unique identifiers. */
    prefix: string;
    /** Attributes to be added to the `<style>` element. */
    attributes: Record<string, string>;
    /** Array of renderer functions or method names used to process the styles object. */
    renderers: Array<string | ((this: StyleSheet<any>, styles: any) => any)>;
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
