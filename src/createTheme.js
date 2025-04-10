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
 * The `createTheme` function creates a theme StyleSheet instance.
 * It supports light, dark, system, and normal color schemes.
 * @module
 * @function
 * @param {Object} themes - An object containing `light`, `dark`, and optionally `normal` themes: `{ light, dark }`. 
 * Each theme object will be converted to CSS variables available under the `root` class 
 * of the theme StyleSheet instance.  
 * For example: `{ backgroundLevel1 : 'black' }` will be converted to `--fun-backgroundLevel1`.  
 * You can add the `root` class to the root element of your component to theme a single component, 
 * or to the `body` element to theme the entire page.
 * @param {Object} options - An options object.
 * @param {String} options.colorScheme - The color scheme. Possible values are `light`, `dark`, `system`, and `normal`. 
 * If `light` or `dark` is set, the theme will be fixed to that color scheme, and only the necessary CSS variables 
 * will be generated. The CSS color-scheme property will be set to that value.
 * If `system` is set, the theme will be generated for both light and dark color schemes, 
 * and by default, it will follow the system color scheme.
 * The CSS color-scheme property will be set to `light` or `dark` accordingly.
 * To override the system color scheme, set the `data-color-scheme` attribute to `light` 
 * or `dark` on a parent element.
 * If `normal` is set, the `normal` theme will be used, and the CSS color-scheme property 
 * will be set to `normal`.
 * @param {String} options.cssVarsPrefix - The CSS variables prefix. Default is `fun`.
 * @param {Function} options.createStyleSheet - A function used to create a new StyleSheet instance. By default, it uses the `css` function.
 * @param {Object} options.styleSheetOptions - The options object to be used when creating the StyleSheet instance. Default is `system`.  
 * @returns {StyleSheet} The theme StyleSheet instance. Use `classes.root` to get the theme class name. 
 * Apply it to the element you want to theme. CSS variables will be available for all its descendants.
 * @example
 * // Create a default theme and apply it to the entire page.
 * const theme = createTheme({
 *     light : {
 *         color : 'black',
 *         backgroundColor : 'white'
 *     },
 *     dark : {
 *         color : 'white',
 *         backgroundColor : 'black'
 *     }
 * });
 * // Add the `root` class (the theme class) to the body element.
 * // This will apply the theme to the entire page.
 * document.body.classList.add(theme.classes.root);
 * // Add some styles using the theme CSS variables.
 * const { classes } = css({
 *     button : {
 *         color : 'var(--fun-color)',
 *         backgroundColor : 'var(--fun-backgroundColor)'
 *     }
 * });
 * // Add the `button` class to a button component.
 * // You can use the variables in your styles even before the theme is applied or created.
 * // Your component will update when the theme is applied.
 * // If the system color scheme changes, the button will update automatically.
 * const Button = ({ label }) => <button className={classes.button}>{label}</button>;
 *
 */
const createTheme = (themes = {}, options = {}) => {
    const colorScheme = options.colorScheme || 'system';
    const prefix = `--${options.cssVarsPrefix ||  StyleSheet.prefix}`;

    let styles;

    if (colorScheme === 'system') {
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
