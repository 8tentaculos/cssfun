## Classes

<dl>
<dt><a href="#stylesheet">StyleSheet</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#createtheme">createTheme(themes, [options])</a> ⇒ <code><a href="#StyleSheet">StyleSheet</a></code></dt>
<dd><p>The <code>createTheme</code> function generates a theme StyleSheet instance with CSS variables 
based on the provided themes and options. It supports multiple color schemes, 
including <code>light</code>, <code>dark</code>, <code>light dark</code>, and <code>normal</code>. </p>
<p>The <code>themes</code> object defines the styles for these color schemes. Each key in the object 
corresponds to a color scheme (<code>light</code>, <code>dark</code>, <code>normal</code>), and its value is an object 
containing key-value pairs that will be converted into CSS variables. Nested keys are 
concatenated with <code>-</code> to form the variable name. For example, <code>{ light : { colors : { primary : &#39;blue&#39; } } }</code> 
generates <code>--fun-colors-primary : blue</code>.</p>
</dd>
<dt><a href="#css">css(styles, [options])</a> ⇒ <code><a href="#StyleSheet">StyleSheet</a></code></dt>
<dd><p>Creates and attaches a new StyleSheet instance to the DOM.</p>
</dd>
</dl>

<a name="stylesheet" id="stylesheet" class="anchor"></a>
## StyleSheet
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| classes | <code>Object</code> | Object mapping each top-level selector key (those matching `/^\w+$/`) to its generated unique class name string. |
| styles | <code>Object</code> | The original styles object provided to the instance. |
| uid | <code>string</code> | Unique identifier for the StyleSheet instance, generated using `this.generateUid`. |
| prefix | <code>string</code> | Prefix for generating unique identifiers. Resolved to a string when the instance is created (may be supplied as a function via options or a subclass). |
| [attributes] | <code>Object</code> \| <code>function</code> | Optional attributes to be added to the `<style>` element. May be `undefined`, an object, or a function returning the attributes object (evaluated lazily by `getAttributes`). |
| renderers | <code>Array</code> | Array of renderer functions used to process the styles object. Method-name strings passed via options are resolved to methods when the instance is created. |
| el | <code>HTMLElement</code> | Reference to the `<style>` element in the DOM. Created when the instance is attached to the DOM. |


* [StyleSheet](#stylesheet)
    * [new StyleSheet(styles, [options])](#new_stylesheet_new)
    * _instance_
        * [.preinitialize(styles, [options])](#stylesheet__preinitialize) ⇒ <code>void</code>
        * [.generateUid()](#stylesheet__generateuid) ⇒ <code>string</code>
        * [.generateClassName(className, index)](#stylesheet__generateclassname) ⇒ <code>string</code>
        * [.render()](#stylesheet__render) ⇒ <code>string</code>
        * [.toString()](#stylesheet__tostring) ⇒ <code>string</code>
        * [.shouldAttachToDOM()](#stylesheet__shouldattachtodom) ⇒ <code>boolean</code>
        * [.attach()](#stylesheet__attach) ⇒ [<code>StyleSheet</code>](#StyleSheet)
        * [.destroy()](#stylesheet__destroy) ⇒ [<code>StyleSheet</code>](#StyleSheet)
    * _static_
        * [.prefix](#stylesheet_prefix)
        * [.indent](#stylesheet_indent)
        * [.registry](#stylesheet_registry)
        * [.debug](#stylesheet_debug)
        * [.toString()](#stylesheet_tostring) ⇒ <code>string</code>
        * [.toCSS()](#stylesheet_tocss) ⇒ <code>string</code>
        * [.destroy()](#stylesheet_destroy)

<a name="new_stylesheet_new" id="new_stylesheet_new" class="anchor"></a>
### new StyleSheet(styles, [options])
The StyleSheet class is responsible for creating and managing a CSS stylesheet.
It takes a styles object and an optional options object as input, processes the styles, 
and generates a CSS stylesheet that can be attached to the DOM, destroyed, or 
rendered as a string for server-side rendering.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| styles | <code>Object</code> |  | The styles object. This is an object where keys represent  CSS selectors and values are style objects. The styles object is processed through  the renderers to generate the final CSS string. It is stored in the instance as `this.styles`. |
| [options] | <code>Object</code> | <code>{}</code> | Configuration options. The following options are assigned to the instance (`this`): `prefix`, `generateUid`, `generateClassName`, `shouldAttachToDOM`, `attributes`, `renderers`. |
| [options.prefix] | <code>string</code> \| <code>function</code> | <code>&quot;&#x27;fun&#x27;&quot;</code> | Prefix for generating unique identifiers and data attributes. May be a function returning the prefix, evaluated when the instance is created. |
| [options.generateUid] | <code>function</code> |  | Custom function to generate the unique identifier. |
| [options.generateClassName] | <code>function</code> |  | Custom function to generate unique class names. |
| [options.attributes] | <code>Object</code> \| <code>function</code> |  | Attributes to be added to the `<style>` element. May be a function returning the attributes object, evaluated lazily by `getAttributes`. |
| [options.renderers] | <code>Array</code> \| <code>function</code> | <code>[&#x27;parseStyles&#x27;, &#x27;renderStyles&#x27;]</code> | Array of renderer functions or method names (or a function returning such an array). Resolved when the instance is created and applied in order by `render`, each renderer receiving the previous one's output. Renderers are called with the instance as `this`. |
| [options.shouldAttachToDOM] | <code>function</code> |  | Custom function to determine whether the StyleSheet should be added to the DOM. |

**Example**  
```js
// Create a new StyleSheet instance with a styles object.
const instance = new StyleSheet({
    root: {
        color: 'black'
    }
});

// Attach the StyleSheet instance to the DOM.
instance.attach();

// Retrieve the generated classes object from the instance.
const { classes } = instance;

// Use the generated class name in your component.
function Header() {
    return <h1 className={classes.root}>Hello World</h1>;
}
```
<a name="stylesheet__preinitialize" id="stylesheet__preinitialize" class="anchor"></a>
### styleSheet.preinitialize(styles, [options]) ⇒ <code>void</code>
Hook run at the very start of the constructor, before `styles` and `options`
are applied and before `renderers`, `prefix`, `uid` and `classes` are computed.
Does nothing by default. Override it in a subclass to run setup logic or define
instance properties such as `prefix`, `attributes` or `renderers`. Values set
here are still overridden by the matching `options`.

**Kind**: instance method of [<code>StyleSheet</code>](#StyleSheet)  

| Param | Type | Description |
| --- | --- | --- |
| styles | <code>Object</code> | The styles object passed to the constructor. |
| [options] | <code>Object</code> | The options object passed to the constructor (may be `undefined`). |

<a name="stylesheet__generateuid" id="stylesheet__generateuid" class="anchor"></a>
### styleSheet.generateUid() ⇒ <code>string</code>
Generate a stable unique identifier.
May be overridden by `options.generateUid`.

**Kind**: instance method of [<code>StyleSheet</code>](#StyleSheet)  
**Returns**: <code>string</code> - The unique identifier.  
<a name="stylesheet__generateclassname" id="stylesheet__generateclassname" class="anchor"></a>
### styleSheet.generateClassName(className, index) ⇒ <code>string</code>
Generate a unique class name.
Transform local selectors that are classes to unique class names
to be used as class names in the styles object.
May be overridden by `options.generateClassName` or by extending the class.

**Kind**: instance method of [<code>StyleSheet</code>](#StyleSheet)  
**Returns**: <code>string</code> - The unique class name.  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>string</code> | The class name. |
| index | <code>number</code> | The index of the class name. |

<a name="stylesheet__render" id="stylesheet__render" class="anchor"></a>
### styleSheet.render() ⇒ <code>string</code>
Apply the renderers to the styles object.
Renderers are applied in order, starting from `this.styles`, with each renderer
receiving the previous one's output and called with the instance as `this`.
It will return a string ready to be added to the style element.

**Kind**: instance method of [<code>StyleSheet</code>](#StyleSheet)  
**Returns**: <code>string</code> - The styles object as a string.  
<a name="stylesheet__tostring" id="stylesheet__tostring" class="anchor"></a>
### styleSheet.toString() ⇒ <code>string</code>
Render the StyleSheet as a style element string.
Used for server-side rendering.

**Kind**: instance method of [<code>StyleSheet</code>](#StyleSheet)  
**Returns**: <code>string</code> - The instance as a string.  
<a name="stylesheet__shouldattachtodom" id="stylesheet__shouldattachtodom" class="anchor"></a>
### styleSheet.shouldAttachToDOM() ⇒ <code>boolean</code>
Check if the StyleSheet should be added to the DOM.
By default, it returns true if running in a browser environment and no style element
with the same `data-fun-uid` attribute exists in the DOM.
This prevents duplicate style elements and ensures proper behavior for server-side rendering.
May be overridden by `options.shouldAttachToDOM`.

**Kind**: instance method of [<code>StyleSheet</code>](#StyleSheet)  
**Returns**: <code>boolean</code> - True if the StyleSheet should be added to the DOM, false otherwise.  
<a name="stylesheet__attach" id="stylesheet__attach" class="anchor"></a>
### styleSheet.attach() ⇒ [<code>StyleSheet</code>](#StyleSheet)
Add the instance to the registry and if we are in the browser, 
attach it to the DOM.

**Kind**: instance method of [<code>StyleSheet</code>](#StyleSheet)  
**Returns**: [<code>StyleSheet</code>](#StyleSheet) - The instance.  
<a name="stylesheet__destroy" id="stylesheet__destroy" class="anchor"></a>
### styleSheet.destroy() ⇒ [<code>StyleSheet</code>](#StyleSheet)
Destroy the instance and remove it from the registry and 
from the DOM, if it's present.

**Kind**: instance method of [<code>StyleSheet</code>](#StyleSheet)  
**Returns**: [<code>StyleSheet</code>](#StyleSheet) - The instance.  
<a name="stylesheet_prefix" id="stylesheet_prefix" class="anchor"></a>
### StyleSheet.prefix
**Kind**: static property of [<code>StyleSheet</code>](#StyleSheet)  
**Default**: <code>fun</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| prefix | <code>string</code> | The class prefix. Used to generate unique class names. |

<a name="stylesheet_indent" id="stylesheet_indent" class="anchor"></a>
### StyleSheet.indent
**Kind**: static property of [<code>StyleSheet</code>](#StyleSheet)  
**Default**: <code>&#x27;    &#x27;</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| indent | <code>string</code> | The indent string. Used to format text when debug is enabled. |

<a name="stylesheet_registry" id="stylesheet_registry" class="anchor"></a>
### StyleSheet.registry
**Kind**: static property of [<code>StyleSheet</code>](#StyleSheet)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| registry | <code>Array</code> | The registry array. StyleSheet instances  will be added to this array. |

<a name="stylesheet_debug" id="stylesheet_debug" class="anchor"></a>
### StyleSheet.debug
**Kind**: static property of [<code>StyleSheet</code>](#StyleSheet)  
**Default**: <code>__DEV__</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| debug | <code>boolean</code> | The debug flag. If true, the styles will be formatted with indentation and new lines. |

<a name="stylesheet_tostring" id="stylesheet_tostring" class="anchor"></a>
### StyleSheet.toString() ⇒ <code>string</code>
Render all instances in the registry as a string, including the style tags.
Can be used to insert style tags in an HTML template for server-side rendering.

**Kind**: static method of [<code>StyleSheet</code>](#StyleSheet)  
**Returns**: <code>string</code> - All instances in the registry as a string.  
<a name="stylesheet_tocss" id="stylesheet_tocss" class="anchor"></a>
### StyleSheet.toCSS() ⇒ <code>string</code>
Render all instances in the registry as CSS string.
Can be used to generate an external CSS file.

**Kind**: static method of [<code>StyleSheet</code>](#StyleSheet)  
**Returns**: <code>string</code> - All instances in the registry rendered as CSS string.  
<a name="stylesheet_destroy" id="stylesheet_destroy" class="anchor"></a>
### StyleSheet.destroy()
Destroy all instances in the registry and remove them from 
it and from the DOM.

**Kind**: static method of [<code>StyleSheet</code>](#StyleSheet)  
<a name="createtheme" id="createtheme" class="anchor"></a>
## createTheme(themes, [options]) ⇒ [<code>StyleSheet</code>](#StyleSheet)
The `createTheme` function generates a theme StyleSheet instance with CSS variables 
based on the provided themes and options. It supports multiple color schemes, 
including `light`, `dark`, `light dark`, and `normal`. 

The `themes` object defines the styles for these color schemes. Each key in the object 
corresponds to a color scheme (`light`, `dark`, `normal`), and its value is an object 
containing key-value pairs that will be converted into CSS variables. Nested keys are 
concatenated with `-` to form the variable name. For example, `{ light : { colors : { primary : 'blue' } } }` 
generates `--fun-colors-primary : blue`.

**Kind**: global function  
**Returns**: [<code>StyleSheet</code>](#StyleSheet) - The theme StyleSheet instance. Use `classes.root` to get the theme class name. 
Apply this class to the element you want to theme. The CSS variables will be available for all 
its descendants.  

| Param | Type | Description |
| --- | --- | --- |
| themes | <code>Object</code> | An object defining styles for color schemes (`light`, `dark`, `normal`).  Each key corresponds to a color scheme, and its value is an object of key-value pairs converted  to CSS variables. Nested keys are concatenated with `-` to form variable names. |
| [options] | <code>Object</code> | An optional object to customize the theme generation. It includes options  for selecting color schemes, customizing CSS variable prefixes, and controlling StyleSheet creation. |
| [options.colorScheme] | <code>String</code> | Specifies the color scheme(s) to use. Possible values are:  `light` (uses the `light` theme only), `dark` (uses the `dark` theme only), `light dark` (default,  supports both `light` and `dark` themes, adapting to system preferences; can override system  preference with `data-color-scheme` set to `light` or `dark`), and `normal` (uses the `normal` theme only). |
| [options.cssVarsPrefix] | <code>String</code> \| <code>null</code> | Prefix for the generated CSS variables. Defaults to `StyleSheet.prefix`. Pass `null` or `''` to generate variables without a prefix (e.g. `--color` instead of `--fun-color`). |
| [options.createStyleSheet] | <code>function</code> | A function used to create a new StyleSheet instance.  By default, it uses the `css` function. |
| [options.styleSheetOptions] | <code>Object</code> | Options to pass when creating the StyleSheet instance.  Default is `system`. |

**Example**  
```js
// Create a theme with light and dark color schemes and apply it to the entire page.
const theme = createTheme({
    light : {
        colorPrimary : 'black',
        backgroundLevel1 : 'white'
    },
    dark : {
        colorPrimary : 'white',
        backgroundLevel1 : 'black'
    }
});

// Add the `root` class (the theme class) to the body element.
// This will apply the theme to the entire page.
document.body.classList.add(theme.classes.root);

// Add some styles using the theme CSS variables.
const { classes } = css({
    button : {
        color : 'var(--fun-colorPrimary)', // Use the CSS variable generated from the theme.
        backgroundColor : 'var(--fun-backgroundLevel1)'
    }
});

// Add the `button` class to a button component.
// The button will use the CSS variables defined in the theme for its styles.
// Once the theme is applied, the button will automatically update its styles.
// If the system color scheme changes (e.g., from light to dark), the button will 
// dynamically update to reflect the new theme without requiring additional code.
const Button = ({ label }) => <button className={classes.button}>{label}</button>;
```
<a name="css" id="css" class="anchor"></a>
## css(styles, [options]) ⇒ [<code>StyleSheet</code>](#StyleSheet)
Creates and attaches a new StyleSheet instance to the DOM.

**Kind**: global function  
**Returns**: [<code>StyleSheet</code>](#StyleSheet) - The created and attached StyleSheet instance. Its `classes` property maps
each top-level selector to its generated class name.  

| Param | Type | Description |
| --- | --- | --- |
| styles | <code>Object</code> | An object containing CSS rules. Keys represent selectors, and values represent style objects. |
| [options] | <code>Object</code> | Optional configuration for the StyleSheet instance. Includes options like `prefix`, `renderers`, and more. |

**Example**  
```js
// Create styles for a link component.
const { classes } = css({
    link : {
        color : 'blue',
        '&:hover' : {
            textDecoration : 'underline'
        }
    }
});

// Use the generated `link` class in a component.
const Link = ({ label, href }) => <a className={classes.link} href={href}>{label}</a>;
```
