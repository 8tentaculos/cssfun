import StyleSheet from './StyleSheet.js';

/**
 * Creates and attaches a new StyleSheet instance to the DOM.
 * 
 * @module
 * @function
 * @param {Object} styles - An object containing CSS rules. Keys represent selectors, and values represent style objects.
 * An at-rule key may also hold a statement prelude string, rendered as `@rule prelude;`; an array value emits one
 * statement per element, so a name can repeat (e.g. several `@import` rules) and properties can carry fallback values.
 * @param {Object} [options] - Optional configuration for the StyleSheet instance. Includes options like `prefix`, `renderers`, and more.
 * @returns {StyleSheet} The created and attached StyleSheet instance. Its `classes` property maps
 * class name selectors to their generated unique class name.
 * 
 * @example
 * // Create styles for a link component.
 * const { classes } = css({
 *     link : {
 *         color : 'blue',
 *         '&:hover' : {
 *             textDecoration : 'underline'
 *         }
 *     }
 * });
 * 
 * // Use the generated `link` class in a component.
 * const Link = ({ label, href }) => <a className={classes.link} href={href}>{label}</a>;
 * 
 * @example
 * // Declare the layer order and define the classes inside layer blocks.
 * const { classes } = css({
 *     '@layer' : 'base, theme',
 *     '@layer base' : {
 *         button : {
 *             color : 'black'
 *         }
 *     },
 *     '@layer theme' : {
 *         button : {
 *             color : 'blue'
 *         }
 *     }
 * });
 * 
 * // Both blocks share the same generated `button` class.
 * const Button = ({ label }) => <button className={classes.button}>{label}</button>;
 */
const css = (styles, options) => new StyleSheet(styles, options).attach();

export default css;
