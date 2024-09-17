import StyleSheet from './StyleSheet.js';

/**
 * Function to create a new StyleSheet instance.
 * @module
 * @param {Object} rules The CSS rules.
 * @returns {StyleSheet} The StyleSheet instance.
 * @example
 * const { classes } = css({
 *     root : {
 *         color : 'red',
 *         '&:hover' : {
 *            color : 'blue',
 *         }, 
 *     },
 * }).attach();
 */
const css = (...args) => new StyleSheet(...args);

export default css;
