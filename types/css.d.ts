import StyleSheet from './StyleSheet.js';
import type { Styles, StyleSheetOptions } from './StyleSheet.js';

/**
 * Creates and attaches a new StyleSheet instance to the DOM.
 *
 * @template S - The styles object type. Used to infer the keys of the `classes` property.
 * @param styles - An object containing CSS rules. Keys represent selectors, values represent style objects.
 *   An at-rule key may also hold a statement prelude string, rendered as `@rule prelude;`.
 * @param options - Optional configuration for the StyleSheet instance.
 * @returns The created and attached StyleSheet instance. Its `classes` property maps
 *   class name selectors to their generated unique class name.
 */
declare function css<S extends Styles>(styles: S, options?: StyleSheetOptions): StyleSheet<S>;

export default css;
