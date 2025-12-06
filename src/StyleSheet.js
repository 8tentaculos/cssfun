import __DEV__ from './dev.js';

const camelizedToDashed = str => str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

const styleSheetOptions = ['prefix', 'generateUid', 'generateClassName', 'shouldAttachToDOM', 'attributes', 'renderers'];

/**
 * The StyleSheet class is responsible for creating and managing a CSS stylesheet.
 * It takes a styles object and an optional options object as input, processes the styles, 
 * and generates a CSS stylesheet that can be attached to the DOM, destroyed, or 
 * rendered as a string for server-side rendering.
 * 
 * @module
 * @class
 * @param {Object} styles - The styles object. This is an object where keys represent 
 * CSS selectors and values are style objects. The styles object is processed through 
 * the renderers to generate the final CSS string. It is stored in the instance as `this.styles`.
 * @param {Object} [options={}] - Optional configuration options for the StyleSheet instance.
 * @param {String} [options.prefix='fun'] - A prefix used for generating unique identifiers 
 * and data attributes.
 * @param {Function} [options.generateUid] - A custom function to generate the unique 
 * identifier for the StyleSheet instance.
 * @param {Function} [options.generateClassName] - A custom function to generate unique 
 * class names for scoped styles.
 * @param {Object} [options.attributes] - An object containing attributes to be added 
 * to the `<style>` element in the DOM.
 * @param {Array} [options.renderers=['parseStyles', 'renderStyles']] - An array of 
 * renderer functions or method names. The renderers are composed in sequence, where 
 * the first receives the styles object, and the last outputs the final CSS string. 
 * Strings or functions will be automatically bound to `this`.
 * @param {Function} [options.shouldAttachToDOM] - A custom function to determine whether 
 * the StyleSheet should be added to the DOM.
 * 
 * @example
 * // Create a new StyleSheet instance with a styles object.
 * const instance = new StyleSheet({
 *     root: {
 *         color: 'black'
 *     }
 * });
 * 
 * // Attach the StyleSheet instance to the DOM.
 * instance.attach();
 * 
 * // Retrieve the generated classes object from the instance.
 * const { classes } = instance;
 * 
 * // Use the generated class name in your component.
 * function Header() {
 *     return <h1 className={classes.root}>Hello World</h1>;
 * }
 * 
 * @property {Object} classes - An object mapping the original class names to the 
 * generated unique class names. Use this to reference the generated class names 
 * in your components.
 * @property {Object} styles - The original styles object provided to the instance.
 * @property {String} uid - A unique identifier for the StyleSheet instance, generated 
 * using `this.generateUid`.
 * @property {Object} attributes - The attributes object, derived from `options.attributes`, 
 * to be added to the `<style>` element.
 * @property {Array} renderers - The array of renderer functions or method names used 
 * to process the styles object.
 * @property {HTMLElement} el - A reference to the `<style>` element in the DOM. This 
 * is created when the instance is attached to the DOM.
 */
class StyleSheet {
    constructor(styles, options = {}) {
        // Styles object.
        this.styles = styles;
        // Original class names object.
        this.classes = {};
        // Set options on the instance.
        styleSheetOptions.forEach(key => {
            if (key in options) this[key] = options[key];
        });
        // Set default renderers.
        if (!this.renderers) this.renderers = [this.renderStyles, this.parseStyles];
        // Set default prefix.
        if (!this.prefix) this.prefix = StyleSheet.prefix;
        // Generate the `StyleSheet` unique identifier.
        this.uid = this.generateUid();
        // Generate class names. Only generate class names for top-level selectors.
        Object.keys(styles).forEach(selector => {
            if (selector.match(StyleSheet.classRegex)) {
                this.classes[selector] = this.generateClassName(selector);
            }
        });
    }

    /**
     * Generate a stable unique identifier.
     * May be overridden by `options.generateUid`.
     * @returns {String} The unique identifier.
     */
    generateUid() {
        const styles = JSON.stringify(this.styles);
        // FNV-1a 32-bit offset basis.
        let hash = 2166136261;
        for (let i = 0; i < styles.length; i++) {
            // XOR with the byte value.
            hash ^= styles.charCodeAt(i);
            // Multiply by FNV prime and ensure 32-bit unsigned integer.
            hash = (hash * 16777619) >>> 0;
        }
        // Convert the hash to a shorter base-36 string.
        return `${this.prefix}-${hash.toString(36)}`;
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
        return `${this.uid}-${className}`;
    }

    /**
     * Apply the renderers to the styles object.
     * It will return a string ready to be added to the style element.
     * @returns {String} The styles object as a string.
     */
    render() {
        return compose(
            ...this.renderers.map(
                renderer => (typeof renderer === 'string' ? this[renderer] : renderer).bind(this)
            )
        )(this.styles);
    }

    /**
     * Render the styles object as a string.
     * Its one of the default renderers.
     * It will return a string ready to be added to the `style` element.
     * @param {Object} styles - The styles object.
     * @param {Number} level - The level of indentation. Used for debugging.
     * @returns {String} The styles object as a string.
     * @private
     */
    renderStyles(styles, level = 1) {
        return Object.keys(styles).reduce((acc, key) => {
            const value = styles[key];
            let indent = '', nl = '', whitespace = '';
            // Format the CSS string.
            if (__DEV__ && StyleSheet.debug) {
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

    /**
     * Parse the styles object and transform it.  
     * Expand nested styles, parse global styles, generate selectors, replace selector references 
     * and convert camelized keys to dashed-case.
     * Its one of the default renderers.
     * It will return an object ready to be rendered as string by `renderStyles`.
     * @param {Object} styles - The styles object.
     * @param {Object} parent - The parent object. Used for nested styles.
     * @param {String} parentSelector - The parent selector. Used for nested styles.
     * @param {Boolean} isGlobal - If true, the styles are global styles.
     * @returns {Object} The styles object.
     * @private
     */
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
     * Get the attributes object.
     * The attributes object will be used to set the attributes on the style element.
     * The attributes object will be merged with the `this.attributes` object.
     * The `data-fun-uid` attribute will be added to the attributes object.
     * @returns {Object} The attributes object.
     * @private
     */
    getAttributes() {
        const attributes = Object.assign({}, this.attributes);
        attributes[`data-${this.prefix}-uid`] = this.uid;
        return attributes;
    }

    /**
     * Render the StyleSheet as a style element string.
     * Used for server-side rendering.
     * @returns {String} The instance as a string.
     */
    toString() {
        const attributes = this.getAttributes();
        const attributesHtml = Object.keys(attributes).map(key => ` ${key}="${attributes[key]}"`).join('');
        const nl = (__DEV__ && StyleSheet.debug) ? '\n' : '';
        return `<style${attributesHtml}>${nl}${this.render()}</style>${nl}`;
    }

    /**
     * Check if the StyleSheet should be added to the DOM.
     * By default, it returns true if running in a browser environment and no style element
     * with the same `data-fun-uid` attribute exists in the DOM.
     * This prevents duplicate style elements and ensures proper behavior for server-side rendering.
     * May be overridden by `options.shouldAttachToDOM`.
     * @returns {Boolean} True if the StyleSheet should be added to the DOM, false otherwise.
     */
    shouldAttachToDOM() {
        return typeof document !== 'undefined' && !document.querySelector(`style[data-${this.prefix}-uid="${this.uid}"]`);
    }

    /**
     * Add the instance to the registry and if we are in the browser, 
     * attach it to the DOM.
     * @returns {StyleSheet} The instance.
     */
    attach() {
        // Add the instance to the registry if it's not already there.
        if (!StyleSheet.registry.some(({ uid }) => uid === this.uid)) {
            StyleSheet.registry.push(this);
        }
        // If we're in the browser and the style element doesn't exist, create it.
        if (this.shouldAttachToDOM()) {
            // Create the style element.
            this.el = document.createElement('style');

            const attributes = this.getAttributes();
            // Set the attributes on the style element.
            Object.keys(attributes).forEach(key => {
                this.el.setAttribute(key, attributes[key]);
            });
            // Render the styles and set the text content of the style element.
            this.el.textContent = this.render();
            // Append the style element to the head.
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

        if (this.el) {
            // Remove the style element from the DOM.
            if (this.el.parentNode) {
                this.el.parentNode.removeChild(this.el);
            }
            // Remove the reference to the style element.
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
     * Destroy all instances in the registry and remove them from 
     * it and from the DOM.
     * @static
     */
    static destroy() {
        StyleSheet.registry.slice().forEach(instance => instance.destroy());
    }
}

/**
 * Regular expressions to match class names.
 * @static
 * @private
 */
StyleSheet.classRegex = /^\w+$/;

/**
 * Regular expression to match global styles.
 * @static
 * @private
 */
StyleSheet.globalRegex = /^@global$/;

/**
 * Regular expression to match global styles with a prefix.
 * @static
 * @private
 */
StyleSheet.globalPrefixRegex = /^@global\s+/;

/**
 * Regular expression to match references to other class names.
 * @static
 * @private
 */
StyleSheet.referenceRegex = /\$(\w+)/g;

/**
 * Regular expression to match nested styles.
 * @static
 * @private
 */
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
 * @default '    '
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
 * @property {Boolean} debug - The debug flag. If true, the styles will be formatted with
 * indentation and new lines.
 * @default __DEV__
 */
StyleSheet.debug = __DEV__;

export default StyleSheet;
