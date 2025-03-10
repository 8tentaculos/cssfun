const camelizedToDashed = str => str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

/**
 * The StyleSheet class receives at the constructor a styles object and an options
 * object and generate a css StyleSheet.  
 * The StyleSheet can be attached to the DOM, destroyed or rendered as string for 
 * server-side rendering.  
 * @module
 * @class
 * @param {Object} styles - The styles object. An object with keys as selectors and values as 
 * style objects. This object will pass trough the renderers and generate the css string. It will
 * be added to the instance as `this.styles`.
 * @param {Object} options - The options object.  
 * `options.idPrefix`, `options.generateClassName`, `options.generateId`, 
 * `options.attributes` and `options.renderers` will be added to the instance.
 * @param {String} options.idPrefix - The generated id prefix. By default, it's `StyleSheet.prefix`.
 * @param {Function} options.generateId - The function to generate ids. This id will be used 
 * as the `<style>` element id.  
 * @param {Function} options.generateClassName - The function to generate class names. 
 * This class name will be used to generate the unique class names for scoped styles.  
 * @param {Object} options.attributes - The attributes object. This attributes will be added 
 * to the `<style>` element.  
 * @param {Array} options.renderers - The array of renderers. 
 * Renderers are functions that transform style objects into CSS strings.    
 * When composed, the first renderer receives the styles object, and the final one outputs the 
 * resulting CSS string.  
 * Elements in the `renderers` array can be either functions or strings that reference methods of the 
 * StyleSheet instance. These methods will be bound to the instance before they are invoked.
 * By default, `StyleSheet` are rendered using the built-in renderers: 
 * `['parseStyles', 'renderStyles']`.
 * @example
 * // Create a new StyleSheet instance with a styles object.
 * const instance = new StyleSheet({
 *     root : {
 *         color : 'black'
 *     }
 * });
 * // Attach the StyleSheet instance to the DOM.
 * instance.attach();
 * // Get classes object from the instance.
 * const { classes } = instance;
 * // Use the classes object to get the class name and use it in your component.
 * function Header = () => <h1 className={classes.root}>Hello World</h1>;
 * @property {Object} classes - The classes object. An object with keys as your original
 * class names and values as the generated unique class names. It will be generated by the 
 * instance. Use it to get the class name to use in your components.
 * @property {Object} styles - The styles object. The original styles object. See `styles`.
 * @property {Number} uid - The unique identifier used to generate class names. 
 * It will be incremented on each generated class name.
 * @property {String} id - The unique identifier for the stylesheet. It will be used as the 
 * style element id. It will be generated by `this.generateId` or can be set on `options.attributes.id`.
 * @property {Object} attributes - See `options.attributes`.
 * @property {Array} renderers - See `options.renderers`.
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
        ['idPrefix', 'generateId', 'generateClassName', 'attributes', 'renderers'].forEach(key => {
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
        return `${this.idPrefix || StyleSheet.prefix}-${++StyleSheet.uid}`;
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
    // Apply the renderers to the styles object.
    // It will return a string ready to be added to the style
    // element.
    render() {
        return compose(
            ...(this.renderers || ['renderStyles', 'parseStyles'])
                .map(parser => (typeof parser === 'string' ? this[parser] : parser).bind(this))
        )(this.styles);
    }
    // Render the styles object as a string.
    // Its one of the default renderers.
    // It will return a string ready to be added to the `style` element.
    renderStyles(styles, level = 1) {
        return Object.keys(styles).reduce((acc, key) => {
            const value = styles[key];
            let indent = '', nl = '', whitespace = '';
            // Format the CSS string.
            if (StyleSheet.debug) {
                indent = StyleSheet.indent.repeat(level);
                nl = '\n';
                whitespace = ' ';
            }
            // Add the styles to the accumulator recursively.
            if (value.constructor === Object) {
                if (Object.keys(value).length > 0) {
                    const renderedStyles = this.renderStyles(value, level + 1);
                    // Add rules to the accumulator.
                    acc.push(`${indent}${key}${whitespace}{${nl}${renderedStyles}${indent}}${nl}`);
                }
            } else {
                // Add the style to the accumulator.
                acc.push(`${indent}${key}:${whitespace}${value};${nl}`);
            }

            return acc;
        }, []).join('');
    }
    // Parse the styles object and transform it.  
    // Expand nested styles, parse global styles, generate selectors, replace selector references 
    // and convert camelized keys to dashed-case.
    // Its one of the default renderers.
    // It will return an object ready to be rendered as string by `renderStyles`.
    parseStyles(styles, parent, parentSelector, isGlobal) {
        const fromClasses = selector => selector in this.classes ? `.${this.classes[selector]}` : selector;
        // Parse the key and generate a selector.
        const generateKey = key => {
            if (isGlobal && parentSelector) {
                // Nested global selectors.
                return `${parentSelector} ${key}`;
            }
            if (key.match(StyleSheet.globalPrefixRegex)) {
                // Global prefix and nested global prefix.
                return `${parentSelector ? `${parentSelector} ` : ''}${key.replace(StyleSheet.globalPrefixRegex, '')}`;
            }
            // Nested, references and replace class names with created ones.
            return fromClasses(key)
                .replace(StyleSheet.referenceRegex, (match, ref) => fromClasses(ref))
                .replace(StyleSheet.nestedRegex, parentSelector);
        };

        const result = Object.keys(styles).reduce((acc, key) => {
            const value = styles[key];
            // Parse styles recursively.
            if (value.constructor === Object) {
                if (key.match(StyleSheet.globalRegex)) {
                    // Global and nested global styles.
                    Object.assign(parent || acc, this.parseStyles(value, acc, parentSelector, true));
                } else if ((key.match(StyleSheet.nestedRegex) || key.match(StyleSheet.globalPrefixRegex)) && parent) {
                    const selector = generateKey(key);
                    parent[selector] = {};
                    // Nested global prefix and nested styles with reference.
                    Object.assign(parent[selector], this.parseStyles(value, parent, selector));
                } else {
                    const selector = generateKey(key);
                    acc[selector] = {};
                    // Regular styles.
                    Object.assign(acc[selector], this.parseStyles(value, acc, selector));
                }
            } else {
                // Add style rules.
                // Convert camelCase to dashed-case.
                // Only convert if the key doesn't already contain a dash.
                // Allows css vars to contain camelCase parts between dashes.
                acc[key.includes('-') ? key : camelizedToDashed(key)] = value;
            }

            return acc;
        }, {});

        return result;
    }

    /**
     * Render the StyleSheet as a style element string.
     * Used for server-side rendering.
     * @returns {String} The instance as a string.
     */
    toString() {
        const attrs = Object.assign({}, this.attributes, { id : this.id });
        const parts = Object.keys(attrs).map(key => ` ${key}="${attrs[key]}"`);
        const nl = StyleSheet.debug ? '\n' : '';

        return `<style${parts.join('')}>${nl}${this.render()}</style>${nl}`;
    }

    /**
     * Add the instance to the registry and if we are in the browser, 
     * attach it to the DOM.
     * @returns {StyleSheet} The instance.
     */
    attach() {
        // Add the instance to the registry if it's not already there.
        if (StyleSheet.registry.indexOf(this) === -1) {
            StyleSheet.registry.push(this);
        }
        // If we're in the browser and the style element doesn't exist, create it.
        if (this.isBrowser() && !document.getElementById(this.id)) {
            const fragment = document.createElement('template');
            fragment.innerHTML = this.toString();
            this.el = fragment.content.firstElementChild;
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
            if (this.el.parentNode) this.el.parentNode.removeChild(this.el);
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

// Regular expressions.
StyleSheet.classRegex = /^\w+$/;
StyleSheet.globalRegex = /^@global$/;
StyleSheet.globalPrefixRegex = /^@global\s+/;
StyleSheet.referenceRegex = /\$(\w+)/g;
StyleSheet.nestedRegex = /&/g;

/**
 * @static
 * @property {String} prefix - The class prefix. Used to generate unique class names.
 * @default fun
 */
StyleSheet.prefix = 'fun';

/**
 * @static
 * @property {String} indent - The indent string. Used to format text when debug is enabled. 
 * @default 4 spaces
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
 * @property {Boolean} debug - The debug flag.
 * @default false
 * If true, the CSS will be formatted with new lines and indents.
 */
StyleSheet.debug = false;

export default StyleSheet;
