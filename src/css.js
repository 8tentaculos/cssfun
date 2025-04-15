import StyleSheet from './StyleSheet.js';

/**
 * Creates and attaches a new StyleSheet instance to the DOM.
 * 
 * @module
 * @function
 * @param {Object} styles - An object containing CSS rules. Keys represent selectors, and values represent style objects.
 * @param {Object} [options] - Optional configuration for the StyleSheet instance. Includes options like `prefix`, `renderers`, and more.
 * @returns {StyleSheet} The created StyleSheet instance. Use the `classes` property to access the generated class names.
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
 */
const css = (styles, options) => new StyleSheet(styles, options).attach();

export default css;
