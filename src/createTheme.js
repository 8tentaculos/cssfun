import css from './css.js';
import StyleSheet from './StyleSheet.js';

const makeCssVars = (theme = {}, prefix = '--') => {
    return Object.keys(theme).reduce((acc, key) => {
        if (theme[key].constructor === Object) {
            Object.assign(acc, makeCssVars(theme[key], `${prefix}-${key}`));
        } else {
            acc[`${prefix}-${key}`] = theme[key];
        }
        return acc;
    }, {});
};

const getDiff = (left, right) => {
    return Object.keys(left).reduce((acc, key) => {
        if (left[key] !== right[key]) {
            acc.left[key] = left[key];
            acc.right[key] = right[key];
        }
        return acc;
    }, { left : {}, right : {} });
};

/**
 * The `createTheme` function generates a theme StyleSheet instance with CSS variables 
 * based on the provided themes and options. It supports multiple color schemes, 
 * including `light`, `dark`, `light dark`, and `normal`. 
 * 
 * The `themes` object defines the styles for these color schemes. Each key in the object 
 * corresponds to a color scheme (`light`, `dark`, `normal`), and its value is an object 
 * containing key-value pairs that will be converted into CSS variables. Nested keys are 
 * concatenated with `-` to form the variable name. For example, `{ light : { colors : { primary : 'blue' } } }` 
 * generates `--fun-colors-primary : blue`.
 * 
 * @module
 * @function
 * @param {Object} themes - An object defining styles for color schemes (`light`, `dark`, `normal`). 
 * Each key corresponds to a color scheme, and its value is an object of key-value pairs converted 
 * to CSS variables. Nested keys are concatenated with `-` to form variable names.
 * 
 * @param {Object} [options] - An optional object to customize the theme generation. It includes options 
 * for selecting color schemes, customizing CSS variable prefixes, and controlling StyleSheet creation.
 * 
 * @param {String} [options.colorScheme] - Specifies the color scheme(s) to use. Possible values are: 
 * `light` (uses the `light` theme only), `dark` (uses the `dark` theme only), `light dark` (default, 
 * supports both `light` and `dark` themes, adapting to system preferences; can override system 
 * preference with `data-color-scheme` set to `light` or `dark`), and `normal` (uses the `normal` theme only).
 * 
 * @param {String} [options.cssVarsPrefix] - The prefix for the generated CSS variables. Default is `fun`. 
 * For example, a key `color` in the theme will generate a CSS variable like `--fun-color`.
 * 
 * @param {Function} [options.createStyleSheet] - A function used to create a new StyleSheet instance. 
 * By default, it uses the `css` function.
 * 
 * @param {Object} [options.styleSheetOptions] - Options to pass when creating the StyleSheet instance. 
 * Default is `system`.
 * 
 * @returns {StyleSheet} The theme StyleSheet instance. Use `classes.root` to get the theme class name. 
 * Apply this class to the element you want to theme. The CSS variables will be available for all 
 * its descendants.
 * 
 * @example
 * // Create a theme with light and dark color schemes and apply it to the entire page.
 * const theme = createTheme({
 *     light : {
 *         colorPrimary : 'black',
 *         backgroundLevel1 : 'white'
 *     },
 *     dark : {
 *         colorPrimary : 'white',
 *         backgroundLevel1 : 'black'
 *     }
 * });
 * 
 * // Add the `root` class (the theme class) to the body element.
 * // This will apply the theme to the entire page.
 * document.body.classList.add(theme.classes.root);
 * 
 * // Add some styles using the theme CSS variables.
 * const { classes } = css({
 *     button : {
 *         color : 'var(--fun-colorPrimary)', // Use the CSS variable generated from the theme.
 *         backgroundColor : 'var(--fun-backgroundLevel1)'
 *     }
 * });
 * 
 * // Add the `button` class to a button component.
 * // The button will use the CSS variables defined in the theme for its styles.
 * // Once the theme is applied, the button will automatically update its styles.
 * // If the system color scheme changes (e.g., from light to dark), the button will 
 * // dynamically update to reflect the new theme without requiring additional code.
 * const Button = ({ label }) => <button className={classes.button}>{label}</button>;
 */
const createTheme = (themes = {}, options = {}) => {
    const colorScheme = options.colorScheme || 'light dark';
    const prefix = `--${options.cssVarsPrefix ||  StyleSheet.prefix}`;

    let styles;

    if (colorScheme === 'light dark') {
        const cssVars = {
            light : makeCssVars(themes.light, prefix),
            dark : makeCssVars(themes.dark, prefix)
        };

        const diff = getDiff(cssVars.light, cssVars.dark);

        styles = {
            root : {
                ':where(&)' : Object.assign({ colorScheme : 'light' }, cssVars.light),
                ':where([data-color-scheme="dark"] &)' : Object.assign({ colorScheme : 'dark' }, diff.right),
            },
            '@media (prefers-color-scheme: dark)' : {
                ':where($root)' : Object.assign({ colorScheme : 'dark' }, diff.right),
                ':where([data-color-scheme="light"] $root)' : Object.assign({ colorScheme : 'light' }, diff.left)
            }
        };
    } else {
        styles = {
            root : {
                ':where(&)' : Object.assign({ colorScheme }, makeCssVars(themes[colorScheme], prefix))
            }
        };
    }

    return (options.createStyleSheet || css)(styles, options.styleSheetOptions);
};

export default createTheme;
