import StyleSheet from './StyleSheet';
import type { Styles, StyleSheetOptions } from './StyleSheet';

/**
 * Creates and attaches a new StyleSheet instance to the DOM.
 *
 * @template S - The styles object type. Used to infer the keys of the `classes` property.
 * @param styles - An object containing CSS rules. Keys represent selectors, values represent style objects.
 * @param options - Optional configuration for the StyleSheet instance.
 * @returns The created StyleSheet instance. Use the `classes` property to access the generated class names.
 */
declare function css<S extends Styles>(styles: S, options?: StyleSheetOptions): StyleSheet<S>;

export default css;
