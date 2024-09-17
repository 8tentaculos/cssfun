import StyleSheet from './StyleSheet.js';

const merge = (target, ...sources) => {
    // Iterate over all source objects
    for (let source of sources) {
        // Iterate over all keys in the current source object
        for (let key in source) {
            // Check if the key is not from the prototype chain
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                // If the value is an object, merge it with the existing object
                // Otherwise, just assign the value
                target[key] = target[key] && target[key].constructor === Object ? merge(target[key], source[key]) : source[key];
            }
        }
    }
    return target;
};

const makeCssVars = (theme, prefix = `--${StyleSheet.classPrefix}`) => {
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
 * Higher order function that receives an optional default themes object and returns a `createTheme` function.  
 * @module
 * @function
 * @param {Object} defaultThemes - Object with keys `light` and `dark` that contains the default themes.
 */

/**
 * The `createTheme` function receives an options object and returns a theme StyleSheet instance.  
 * It supports light, dark and system color schemes.
 * @function
 * @param {Object} options - The options object.
 * @param {Object} options.themes - The themes object. Themes object `{ light, dark }` will be merged 
 * with the default themes object (if any). Themes object will be converted to css variables that will be 
 * available under the `root` class of the theme StyleSheet instance.  
 * For example: `{ backgroundLevel1 : 'black' }` will be converted to `--fun-background-level1 : black;`.  
 * You can add `root` class to the root element of your component, for theming a single component. 
 * Or you can add it to the `body` element, for theming the whole page.
 * @param {String} options.cssVarsPrefix - The css variables prefix. Default is `fun`.
 * @param {String} options.colorScheme - The color scheme. Possible values are `light`, `dark` and `system`. 
 * Default is `system`.  
 * If `light` or `dark` is set, the theme will be fixed to that color scheme. Only necessary css variables 
 * will be generated.
 * If `system` is set, the theme will be generated for both light and dark color schemes. 
 * And by default it will follow the system color scheme.
 * If you want to override the system color scheme, you can set the `data-color-scheme` attribute to `light` 
 * or `dark` on a parent element.
 * @returns {StyleSheet} The theme StyleSheet instance. Use `classes.root` to get the theme class name. 
 * Apply it to the element you want to theme. Css variables will be available for all its descendants.
 * @example
 * // Create a default theme and apply it to the whole page.
 * //
 * // Create a `createTheme` function with default themes.
 * // Then create a theme StyleSheet instance with no options.
 * const theme = createTheme({
 *     light : {
 *         color : 'black',
 *         backgroundColor : 'white',
 *     },
 *     dark : {
 *         color : 'white',
 *         backgroundColor : 'black',
 *     },
 * })();
 * // Add the `root` class (the theme class) to the body element.
 * // So the theme will be applied to the whole page.
 * document.body.classList.add(theme.classes.root);
 * // Add some styles using the theme css variables.
 * const { classes } = css({
 *     button : {
 *         color : '--fun-color',
 *         backgroundColor : '--fun-backgroundColor',
 *     },
 * });
 * // Add the `button` class to a button component.
 * // You may use the vars at your styles even before the theme is applied, or created.
 * // Your component will update when the theme is applied.
 * // If system color changes, the button will update automatically.
 * const Button = ({ label }) => <button className={classes.button}>{label}</button>;
 *  @example
 * // Create a default theme and apply it to the whole page.
 * // Create a secondary theme and apply it to a specific component.
 * //
 * // Create a `createTheme` function with default themes.
 * const ct = createTheme({
 *     light : {
 *         color : 'black',
 *         backgroundColor : 'white',
 *     },
 *     dark : {
 *         color : 'white',
 *         backgroundColor : 'black',
 *     },
 * })();
 * // Create a main theme for the app.
 * // Use default themes and no options.
 * const mainTheme = ct();
 * // Add the `root` class (the theme class) to the body element.
 * // So the theme will be applied to the whole page.
 * document.body.classList.add(mainTheme.classes.root);
 * // Create a secondary theme for a specific component.
 * // Extend the main theme with some custom styles.
 * const secondaryTheme = ct({
 *     themes : {
 *         light : {
 *             color : 'blue',
 *         },
 *         dark : {
 *             backgroundColor : 'blue',
 *         },
 *     },
 * });
 * // Add some styles using the theme css variables.
 * const { classes } = css({
 *     button : {
 *         color : '--fun-color',
 *         backgroundColor : '--fun-backgroundColor',
 *     },
 * });
 * // Add the `button` class to a button component. It will use the main theme.
 * const Button = ({ label }) => <button className={classes.button}>{label}</button>;
 * // Add the `button` class and the secondary theme class to a button component. 
 * // To use the secondary theme on it.
 * const ThemedButton = ({ label }) => (
 *     <button className={`${classes.button} ${secondaryTheme.classes.root}`}>{label}</button>;
 * );
 */
const createTheme = (defaultThemes = {}) => (options = {}) => {
    const themes = {
        light : merge({}, defaultThemes.light, options.themes && options.themes.light),
        dark : merge({}, defaultThemes.dark, options.themes && options.themes.dark)
    };

    const cssVars = {
        light : makeCssVars(themes.light, options.cssVarsPrefix),
        dark : makeCssVars(themes.dark, options.cssVarsPrefix),
    };

    const colorScheme = options.colorScheme || 'system';

    let rules;
    /* eslint-disable */
    switch (colorScheme) {
        case 'light' : rules = {
            root : {
                ':where(&)' : {
                    colorScheme : 'light',
                    ...cssVars.light,
                },
            },
        }; break;
        case 'dark' : rules = {
            root : {
                ':where(&)' : {
                    colorScheme : 'dark',
                    ...cssVars.dark,
                },
            },
        }; break;
        default : {
            const diff = getDiff(cssVars.light, cssVars.dark);

            rules = {
                root : {},
                ':where($root)' : {
                    colorScheme : 'light',
                    ...cssVars.light,
                },
                ':where([data-color-scheme="dark"] $root)' : {
                    colorScheme : 'dark',
                    ...diff.right
                },
                '@media (prefers-color-scheme: dark)' : {
                    ':where($root)' : {
                        colorScheme : 'dark',
                        ...diff.right,
                    },
                    ':where([data-color-scheme="light"] $root)' : {
                        colorScheme : 'light',
                        ...diff.left
                    },
                },
            };
        }
    }
    /* eslint-enable */
    return new StyleSheet(rules).attach();
};

export default createTheme;
