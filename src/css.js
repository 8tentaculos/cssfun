import StyleSheet from './StyleSheet.js';

/**
 * Function used to create a new StyleSheet instance 
 * and attach it to the DOM.
 * @module
 * @function
 * @param {Object} rules The CSS rules.
 * @returns {StyleSheet} The StyleSheet instance.
 * @example
 * // Create some styles for a link component.
 * const { classes } = css({
 *     link : {
 *         color : 'blue',
 *         '&:hover' : {
 *            textDecoration : 'underline',
 *         }, 
 *     },
 * });
 * // Create a link component. Add the `link` class to it.
 * const Link = ({ label, href }) => <a className={classes.link} href={href}>{label}</a>;
 */
const css = (...args) => new StyleSheet(...args).attach();

export default css;
