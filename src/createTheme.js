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
 * Higher order function that receives the default themes `{ light, dark }` 
 * and returns a `createTheme` function.  
 * The `createTheme` function receives an options object and returns a theme StyleSheet instance.  
 * It supports light, dark and system color schemes.  
 * @module
 * @param {Object} options - The options object.
 * @param {Object} options.themes - The themes object.
 * @param {String} options.cssVarsPrefix - The css variables prefix.
 * @param {String} options.colorScheme - The color scheme.
 * @returns {StyleSheet} The theme StyleSheet instance.
 * @example
 * const theme = createTheme({
 *    light : {
 *       color : 'black',
 *       backgroundColor : 'white',
 *   },
 *  dark : {
 *      color : 'white',
 *      backgroundColor : 'black',
 * },
 * })().attach();
 * 
 * document.body.classList.add(theme.classes.root);
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
