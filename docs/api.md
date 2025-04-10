## Classes

<dl>
<dt><a href="#stylesheet">StyleSheet</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#createtheme">createTheme(themes, options)</a> ⇒ <code><a href="#StyleSheet">StyleSheet</a></code></dt>
<dd><p>The <code>createTheme</code> function creates a theme StyleSheet instance.
It supports light, dark, system, and normal color schemes.</p>
</dd>
<dt><a href="#css">css(styles)</a> ⇒ <code><a href="#StyleSheet">StyleSheet</a></code></dt>
<dd><p>Creates a new StyleSheet instance and attaches it to the DOM.</p>
</dd>
</dl>

<a name="stylesheet" id="stylesheet" class="anchor"></a>
## StyleSheet
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| classes | <code>Object</code> | The classes object. An object with keys as your original class names and values as the generated unique class names. It will be generated by the  instance. Use it to get the class name to use in your components. |
| styles | <code>Object</code> | The styles object. The original styles object. See `styles`. |
| uid | <code>String</code> | The unique identifier for the stylesheet. It will be generated by `this.generateUid`. |
| attributes | <code>Object</code> | See `options.attributes`. |
| renderers | <code>Array</code> | See `options.renderers`. |
| el | <code>HTMLElement</code> | The style element. A reference to the style element in the DOM.  It will be created when the instance is attached. |


* [StyleSheet](#stylesheet)
    * [new StyleSheet(styles, options)](#new_stylesheet_new)
    * _instance_
        * [.generateUid()](#stylesheet__generateuid) ⇒ <code>String</code>
        * [.generateClassName(className)](#stylesheet__generateclassname) ⇒ <code>String</code>
        * [.render()](#stylesheet__render) ⇒ <code>String</code>
        * [.toString()](#stylesheet__tostring) ⇒ <code>String</code>
        * [.attach()](#stylesheet__attach) ⇒ [<code>StyleSheet</code>](#StyleSheet)
        * [.destroy()](#stylesheet__destroy) ⇒ [<code>StyleSheet</code>](#StyleSheet)
    * _static_
        * [.prefix](#stylesheet_prefix)
        * [.indent](#stylesheet_indent)
        * [.registry](#stylesheet_registry)
        * [.debug](#stylesheet_debug)
        * [.toString()](#stylesheet_tostring) ⇒ <code>string</code>
        * [.destroy()](#stylesheet_destroy)

<a name="new_stylesheet_new" id="new_stylesheet_new" class="anchor"></a>
### new StyleSheet(styles, options)
The StyleSheet class receives at the constructor a styles object and an options
object and generate a css StyleSheet.  
The StyleSheet can be attached to the DOM, destroyed or rendered as string for 
server-side rendering.


| Param | Type | Description |
| --- | --- | --- |
| styles | <code>Object</code> | The styles object. An object with keys as selectors and values as  style objects. This object will pass trough the renderers and generate the css string. It will be added to the instance as `this.styles`. |
| options | <code>Object</code> | The options object.   `options.uidPrefix`, `options.generateClassName`, `options.generateId`,  `options.attributes` and `options.renderers` will be added to the instance. |
| options.prefix | <code>String</code> | The prefix for `uid` and data attribute. |
| options.generateUid | <code>function</code> | The function to generate the `StyleSheet` unique identifier. |
| options.generateClassName | <code>function</code> | The function to generate class names.  This class name will be used to generate the unique class names for scoped styles. |
| options.attributes | <code>Object</code> | The attributes object. This attributes will be added  to the `<style>` element. |
| options.renderers | <code>Array</code> | The array of renderers.  Renderers are functions that transform style objects into CSS strings.     When composed, the first renderer receives the styles object, and the final one outputs the  resulting CSS string.   Elements in the `renderers` array can be either functions or strings that reference methods of the  StyleSheet instance. These methods will be bound to the instance before they are invoked. By default, `StyleSheet` are rendered using the built-in renderers:  `['parseStyles', 'renderStyles']`. |

**Example**  
```js
// Create a new StyleSheet instance with a styles object.
const instance = new StyleSheet({
    root : {
        color : 'black'
    }
});
// Attach the StyleSheet instance to the DOM.
instance.attach();
// Get classes object from the instance.
const { classes } = instance;
// Use the classes object to get the class name and use it in your component.
function Header = () => <h1 className={classes.root}>Hello World</h1>;
```
<a name="stylesheet__generateuid" id="stylesheet__generateuid" class="anchor"></a>
### styleSheet.generateUid() ⇒ <code>String</code>
Generate a stable unique identifier.
May be overridden by `options.generateUid`.

**Kind**: instance method of [<code>StyleSheet</code>](#StyleSheet)  
**Returns**: <code>String</code> - The unique identifier.  
<a name="stylesheet__generateclassname" id="stylesheet__generateclassname" class="anchor"></a>
### styleSheet.generateClassName(className) ⇒ <code>String</code>
Generate a unique class name.
Transform local selectors that are classes to unique class names
to be used as class names in the styles object.
May be overridden by `options.generateClassName`.

**Kind**: instance method of [<code>StyleSheet</code>](#StyleSheet)  
**Returns**: <code>String</code> - The unique class name.  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>String</code> | The class name. |

<a name="stylesheet__render" id="stylesheet__render" class="anchor"></a>
### styleSheet.render() ⇒ <code>String</code>
Apply the renderers to the styles object.
It will return a string ready to be added to the style element.

**Kind**: instance method of [<code>StyleSheet</code>](#StyleSheet)  
**Returns**: <code>String</code> - The styles object as a string.  
<a name="stylesheet__tostring" id="stylesheet__tostring" class="anchor"></a>
### styleSheet.toString() ⇒ <code>String</code>
Render the StyleSheet as a style element string.
Used for server-side rendering.

**Kind**: instance method of [<code>StyleSheet</code>](#StyleSheet)  
**Returns**: <code>String</code> - The instance as a string.  
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
| prefix | <code>String</code> | The class prefix. Used to generate unique class names. |

<a name="stylesheet_indent" id="stylesheet_indent" class="anchor"></a>
### StyleSheet.indent
**Kind**: static property of [<code>StyleSheet</code>](#StyleSheet)  
**Default**: <code>&#x27;    &#x27;</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| indent | <code>String</code> | The indent string. Used to format text when debug is enabled. |

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
**Default**: <code>false</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| debug | <code>Boolean</code> | The debug flag. If true, the styles will be formatted with indentation and new lines. |

<a name="stylesheet_tostring" id="stylesheet_tostring" class="anchor"></a>
### StyleSheet.toString() ⇒ <code>string</code>
Render all instances in the registry as a string.

**Kind**: static method of [<code>StyleSheet</code>](#StyleSheet)  
**Returns**: <code>string</code> - All instances in the registry as a string.  
<a name="stylesheet_destroy" id="stylesheet_destroy" class="anchor"></a>
### StyleSheet.destroy()
Destroy all instances in the registry and remove them from 
it and from the DOM.

**Kind**: static method of [<code>StyleSheet</code>](#StyleSheet)  
<a name="createtheme" id="createtheme" class="anchor"></a>
## createTheme(themes, options) ⇒ [<code>StyleSheet</code>](#StyleSheet)
The `createTheme` function creates a theme StyleSheet instance.
It supports light, dark, system, and normal color schemes.

**Kind**: global function  
**Returns**: [<code>StyleSheet</code>](#StyleSheet) - The theme StyleSheet instance. Use `classes.root` to get the theme class name. 
Apply it to the element you want to theme. CSS variables will be available for all its descendants.  

| Param | Type | Description |
| --- | --- | --- |
| themes | <code>Object</code> | An object containing `light`, `dark`, and optionally `normal` themes: `{ light, dark }`.  Each theme object will be converted to CSS variables available under the `root` class  of the theme StyleSheet instance.   For example: `{ backgroundLevel1 : 'black' }` will be converted to `--fun-backgroundLevel1`.   You can add the `root` class to the root element of your component to theme a single component,  or to the `body` element to theme the entire page. |
| options | <code>Object</code> | An options object. |
| options.colorScheme | <code>String</code> | The color scheme. Possible values are `light`, `dark`, `system`, and `normal`.  If `light` or `dark` is set, the theme will be fixed to that color scheme, and only the necessary CSS variables  will be generated. The CSS color-scheme property will be set to that value. If `system` is set, the theme will be generated for both light and dark color schemes,  and by default, it will follow the system color scheme. The CSS color-scheme property will be set to `light` or `dark` accordingly. To override the system color scheme, set the `data-color-scheme` attribute to `light`  or `dark` on a parent element. If `normal` is set, the `normal` theme will be used, and the CSS color-scheme property  will be set to `normal`. |
| options.cssVarsPrefix | <code>String</code> | The CSS variables prefix. Default is `fun`. |
| options.createStyleSheet | <code>function</code> | A function used to create a new StyleSheet instance. By default, it uses the `css` function. |
| options.styleSheetOptions | <code>Object</code> | The options object to be used when creating the StyleSheet instance. Default is `system`. |

**Example**  
```js
// Create a default theme and apply it to the entire page.
const theme = createTheme({
    light : {
        color : 'black',
        backgroundColor : 'white'
    },
    dark : {
        color : 'white',
        backgroundColor : 'black'
    }
});
// Add the `root` class (the theme class) to the body element.
// This will apply the theme to the entire page.
document.body.classList.add(theme.classes.root);
// Add some styles using the theme CSS variables.
const { classes } = css({
    button : {
        color : 'var(--fun-color)',
        backgroundColor : 'var(--fun-backgroundColor)'
    }
});
// Add the `button` class to a button component.
// You can use the variables in your styles even before the theme is applied or created.
// Your component will update when the theme is applied.
// If the system color scheme changes, the button will update automatically.
const Button = ({ label }) => <button className={classes.button}>{label}</button>;
```
<a name="css" id="css" class="anchor"></a>
## css(styles) ⇒ [<code>StyleSheet</code>](#StyleSheet)
Creates a new StyleSheet instance and attaches it to the DOM.

**Kind**: global function  
**Returns**: [<code>StyleSheet</code>](#StyleSheet) - The StyleSheet instance.  

| Param | Type | Description |
| --- | --- | --- |
| styles | <code>Object</code> | The CSS rules. |

**Example**  
```js
// Create some styles for a link component.
const { classes } = css({
    link : {
        color : 'blue',
        '&:hover' : {
           textDecoration : 'underline'
        }
    }
});
// Create a link component. Add the `link` class to it.
const Link = ({ label, href }) => <a className={classes.link} href={href}>{label}</a>;
```
