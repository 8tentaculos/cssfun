const camelizedToDashed = str => str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

/**
 * The StyleSheet class receives at the constructor a styles object and an options
 * object and generate a css StyleSheet.  
 * The StyleSheet can be attached to the DOM, destroyed or rendered as string for 
 *  server-side rendering.  
 * @module
 * @class
 * @param {Object} styles - The styles object. An object with keys as selectors and values as 
 * style objects. This object will pass trough the parsers and generate the css string.
 * @param {Object} options - The options object.
 * @param {Function} options.generateClassName - The function to generate class names. 
 * This class name will be used to generate the unique class names for styles.
 * `options.generateClassName` will be added to the instance.
 * @param {Function} options.generateId - The function to generate ids. This id will be used 
 * as the style element id.`options.generateId` will be added to the instance.
 * @param {Object} options.attributes - The attributes object. This attributes will be added 
 * to the style element. `options.attributes` will be added to the instance.
 * @param {Array} options.parsers - The array of parsers. Parsers are functions that are composed and called
 * to generate the css string. The first parser will receive the styles object and the last will return the css string.
 * By default StyleSheets are rendered using `['renderStyles', 'parseStyles']`.
 * They can be functions or strings that are methods of the instance. They will be bound to the instance.
 * `options.parsers` will be added to the instance.
 * @example
 * // Create a new StyleSheet instance with a styles object.
 * const instance = new StyleSheet({
 *     root : {
 *         color : 'black',
 *     }
 * });
 * // Attach the StyleSheet instance to the DOM.
 * instance.attach();
 * // Get classes object from the instance.
 * const { classes } = instance;
 * // Use the classes object to get the class name and use it in your component.
 * function Header = () => <h1 className={classes.root}>Hello World</h1>;
 * @example
 * // Default parsers transforms:
 * // Camelized keys will be transformed to dashed keys.
 * css({ root : { backgroundColor : 'black' } }).toString();
 * // <style id="fun-1">.fun-1-root{background-color:black;}</style>
 * 
 * // Nested selectors will be expanded.
 * css({
 *     root : {
 *         '&:hover' : {
 *             backgroundColor : 'black'
 *         }
 *     }
 * }).toString();
 * // <style id="fun-1">
 * //     .fun-1-root:hover {
 * //         background-color: black;
 * //     }
 * // </style>
 * 
 * // Global selectors will be rendered as global styles.
 * css({
 *     '@global' : {
 *         body : {
 *             backgroundColor : 'black'
 *         }
 *     }
 * }).toString();
 * // <style id="fun-1">
 * //     body {
 * //         background-color: black;
 * //     }
 * // </style>
 * 
 * // Class references will be replaced by the generated class name.
 * css({
 *     root : {
 *         color : 'black'
 *     },
 *     '$root:hover' : {
 *         color : 'white'
 *     }
 * }).toString();
 * // <style id="fun-1">
 * //     .fun-1-root {
 * //         color:black;
 * //     }
 * //     .fun-1-root:hover {
 * //         color:white;
 * //     }
 * // </style>
 * 
 * @property {Object} styles - The styles object.
 * @property {Object} classes - The original class names object. Use this object to apply 
 * class names to your components.
 * @property {Number} uid - The unique identifier generating class names. 
 * It will be incremented on each generated class name.
 * @property {String} id - The unique identifier for the stylesheet. It will be used as the 
 * style element id. It will be generated by `this.generateId` or can be set on `options.attributes.id`.
 * @property {Object} attributes - The attributes object. It can be set on 
 * `options.attributes`.
 * @property {Array} parsers - The array of parsers. It can be set on 
 * `options.parsers`.
 * @property {HTMLElement} el - The style element. A reference to the style element in the DOM. 
 * It will be created when the instance is attached.
 */
class StyleSheet {
    constructor(styles, options = {}) {
        // Styles object.
        this.styles = styles;
        // Original class names object.
        this.classes = {};
        // Unique identifier counter for class names.
        this.uid = 0;
        // Set options on the instance.
        ['generateClassName', 'generateId', 'attributes', 'parsers'].forEach(key => {
            if (key in options) this[key] = options[key];
        });
        // Ensure the stylesheet has an id.
        if (!this.id) this.id = this.attributes && this.attributes.id || this.generateId();
        // Generate class names. Only generate class names for top-level selectors.
        Object.keys(styles).forEach(selector => {
            if (selector.match(StyleSheet.classRegex)) {
                this.classes[selector] = this.generateClassName(selector);
            }
        });
    }
    /**
     * Generate a unique identifier. Used for the style element id.
     * May be overridden by `options.generateId`.
     * @returns {String} The unique identifier.
     */
    generateId() {
        return `${StyleSheet.classPrefix}-${++StyleSheet.uid}`;
    }
    /**
     * Generate a unique class name.
     * Transform local selectors that are classes to unique class names
     * to be used as class names in the styles object.
     * May be overridden by `options.generateClassName`.
     * @param {String} className - The class name.
     * @returns {String} The unique class name.
     */
    generateClassName(className) {
        return `${this.id}-${className}-${++this.uid}`;
    }

    isBrowser() {
        return typeof document !== 'undefined';
    }

    render() {
        return compose(
            ...(this.parsers || ['renderStyles', 'parseStyles'])
                .map(parser => (typeof parser === 'string' ? this[parser] : parser).bind(this))
        )(this.styles);
    }

    renderStyles(styles, level = 1) {
        return Object.keys(styles).reduce((acc, key) => {
            const value = styles[key];
            if (value.constructor === Object) {
                if (Object.keys(value).length > 0) {
                    const str = StyleSheet.debug ?
                        `${key} {\n${this.renderStyles(value, level + 1)}}\n` :
                        `${key}{${this.renderStyles(value, level + 1)}}`;

                    acc.push(str);
                }
            } else {
                const str = StyleSheet.debug ?
                    `${'    '.repeat(level)}${camelizedToDashed(key)}: ${value};\n` :
                    `${camelizedToDashed(key)}:${value};`;

                acc.push(str);
            }
            return acc;
        }, []).join('');
    }

    parseStyles(styles, parent, parentSelector, isGlobal) {
        const fromClasses = selector => selector in this.classes ? `.${this.classes[selector]}` : selector;
        const replaceClassReferences = selector => selector.replace(StyleSheet.classReferenceRegex, (match, ref) => fromClasses(ref));
        const replaceClassNested = selector => selector.replace(StyleSheet.classNestedRegex, fromClasses(parentSelector));

        const generateKey = key => {
            if (isGlobal && parentSelector) {
                return `${fromClasses(parentSelector)} ${key}`;
            }
            return replaceClassNested(replaceClassReferences(fromClasses(key)));
        };

        const { result, extra } = Object.keys(styles).reduce((acc, key) => {
            const value = styles[key];
            if (value.constructor === Object) {
                if (key.match(StyleSheet.classGlobalRegex)) {
                    Object.assign(parent || acc.extra, this.parseStyles(value, acc.extra, parentSelector, true));
                } else if (key.match(StyleSheet.classNestedRegex)) {
                    parent[generateKey(key)] = this.parseStyles(value, acc.extra, key);
                } else {
                    acc.result[generateKey(key)] = this.parseStyles(value, acc.extra, key);
                }
            } else {
                acc.result[key] = value;
            }
            return acc;
        }, { result: {}, extra: {} });

        return { ...result, ...extra };
    }
    /**
     * Render the StyleSheet as a style element string.
     * Used for server-side rendering.
     * @returns {String} The instance as a string.
     */
    toString() {
        let attributes = [];

        if (this.attributes) {
            Object.keys(this.attributes).forEach(key => {
                if (key === 'id') return;
                attributes.push(` ${key}="${this.attributes[key]}"`);
            });
        }

        return `<style id="${this.id}"${attributes.join('')}>${this.render()}</style>`;
    }
    /**
     * Add the instance to the registry and if we are in the browser, 
     * attach it to the DOM.
     * @returns {StyleSheet} The instance.
     */
    attach() {
        // Add the instance to the registry if it's not already there.
        if (StyleSheet.registry.indexOf(this) == -1) {
            StyleSheet.registry.push(this);
        }
        // If we're in the browser and the style element doesn't exist, create it.
        if (this.isBrowser() && !document.getElementById(this.id)) {
            this.el = document.createElement('style');

            if (this.attributes) {
                Object.keys(this.attributes).forEach(key => {
                    if (key === 'id') return;
                    this.el.setAttribute(key, this.attributes[key]);
                });
            }

            this.el.id = this.id;
            this.el.innerHTML = this.render();

            document.head.appendChild(this.el);
        }

        return this;
    }
    /**
     * Destroy the instance and remove it from the registry and 
     * from the DOM, if it's present.
     * @returns {StyleSheet} The instance.
     */
    destroy() {
        const index = StyleSheet.registry.indexOf(this);
        // Remove the instance from the registry.
        if (index > -1) {
            StyleSheet.registry.splice(index, 1);
        }
        // Remove the style element from the DOM.
        if (this.isBrowser() && this.el) {
            this.el.parentNode && this.el.parentNode.removeChild(this.el);
            this.el = null;
        }

        return this;
    }
    /**
     * Render all instances in the registry as a string.
     * @returns {string} All instances in the registry as a string.
     * @static
     */
    static toString() {
        return StyleSheet.registry.join('');
    }
    /**
     * Attach all instances in the registry to the DOM.
     * @static
     */
    static attach() {
        StyleSheet.registry.forEach(instance => instance.attach());
    }
    /**
     * Destroy all instances in the registry and remove them from 
     * it and from the DOM.
     * @static
     */
    static destroy() {
        StyleSheet.registry.forEach(instance => instance.destroy());
    }
}

/**
 * @static
 * @property {String} classPrefix - The class prefix. Used to generate unique class names.
 */
StyleSheet.classPrefix = 'fun';
StyleSheet.classRegex = /^\w+$/;
StyleSheet.classGlobalRegex = /^@global$/;
StyleSheet.classReferenceRegex = /\$(\w+)/g;
StyleSheet.classNestedRegex = /&/g;
/**
 * @static
 * @property {String} indent - The indent string. Used to format text when debug is enabled. 
 * The default is 4 spaces.
 */
StyleSheet.indent = '    ';

/**
 * @static
 * @property {Array} registry - The registry array. StyleSheet instances 
 * will be added to this array.
 */
StyleSheet.registry = [];
/**
 * @static
 * @property {Number} uid - The unique identifier counter. 
 * It will be incremented for each generated id.
 */
StyleSheet.uid = 0;
/**
 * @static
 * @property {Boolean} debug - The debug flag. Default is `false`.
 */
StyleSheet.debug = false;

export default StyleSheet;
