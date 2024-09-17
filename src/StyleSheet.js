const escape = (() => {
    const escapeRegex = /([[\].#*$><+~=|^:(),"'`\s])/g;
    const nativeEscape = typeof CSS !== 'undefined' && CSS.escape;
    return str => (nativeEscape ? nativeEscape(str) : str.replace(escapeRegex, '\\$1'));
})();

const camelizedToDashed = str => str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

/**
 * StyleSheet class.  
 * Receives a styles object and options object and generate a css StyleSheet.  
 * The StyleSheet can be attached to the DOM, destroyed or rendered as string for server-side rendering.  
 * @module
 * @param {Object} styles - The styles object.
 * @param {Object} options - The options object.
 * @param {Function} options.generateClassName - The function to generate class names.
 * @param {Function} options.generateId - The function to generate ids.
 * @param {Object} options.attributes - The attributes object.
 * @param {Array} options.parsers - The array of parsers.
 * @example
 * const instance = new StyleSheet({
 *     root : {
 *         color : 'black',
 *     }
 * });
 * 
 * instance.attach();
 * 
 * const { classes } = instance;
 * @property {Object} styles - The styles object.
 * @property {Object} classes - The original class names object.
 * @property {Number} uid - The unique identifier counter for class names.
 * @property {String} id - The unique identifier for the stylesheet.
 * @property {Function} generateClassName - The function to generate class names.
 * @property {Function} generateId - The function to generate ids.
 * @property {Object} attributes - The attributes object.
 * @property {Array} parsers - The array of parsers.
 * @property {HTMLElement} el - The style element.
 * @static {String} classPrefix - The class prefix.
 * @static {RegExp} classRegex - The class regex.
 * @static {RegExp} classGlobalRegex - The global class regex.
 * @static {RegExp} classReferenceRegex - The class reference regex.
 * @static {RegExp} classNestedRegex - The nested class regex.
 * @static {String} indent - The indent string.
 * @static {Array} registry - The registry array.
 * @static {Number} uid - The unique identifier counter.
 * @static {Boolean} debug - The debug flag. 
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
     * Generate a unique identifier.
     * @returns {String} The unique identifier.
     */
    generateId() {
        return `${StyleSheet.classPrefix}-${++StyleSheet.uid}`;
    }
    /**
     * Generate a unique class name.
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

    renderStyles(styles) {
        let level = 1;
        return Object.keys(styles).reduce((acc, key) => {
            const value = styles[key];
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                const str = StyleSheet.debug ?
                    `${escape(key)} {\n${this.renderStyles(value)}}\n` :
                    `${escape(key)}{${this.renderStyles(value)}}`;

                acc.push(str);
                level++;
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
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
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
     * Render the instance as a string.
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
     * Attach the instance to the DOM.
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
     * Destroy the instance and remove it from the DOM.
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
     * Attach all instances in the registry to the DOM.
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
     * Destroy all instances in the registry and remove them from the DOM.
     * @static
     */
    static destroy() {
        StyleSheet.registry.forEach(instance => instance.destroy());
    }
}

StyleSheet.classPrefix = 'fun';
StyleSheet.classRegex = /^\w+$/;
StyleSheet.classGlobalRegex = /^@global$/;
StyleSheet.classReferenceRegex = /\$(\w+)/g;
StyleSheet.classNestedRegex = /&/g;
StyleSheet.indent = '    ';

StyleSheet.registry = [];
StyleSheet.uid = 0;

StyleSheet.debug = false;

export default StyleSheet;
