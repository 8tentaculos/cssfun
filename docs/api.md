<a name="module_createtheme" id="module_createtheme"></a>
## createTheme ⇒ <code>StyleSheet</code>
Higher order function that receives the default themes `{ light, dark }` 
and returns a `createTheme` function.  
The `createTheme` function receives an options object and returns a theme StyleSheet instance.  
It supports light, dark and system color schemes.

**Returns**: <code>StyleSheet</code> - The theme StyleSheet instance.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The options object. |
| options.themes | <code>Object</code> | The themes object. |
| options.cssVarsPrefix | <code>String</code> | The css variables prefix. |
| options.colorScheme | <code>String</code> | The color scheme. |

**Example**  
```js
const theme = createTheme({
   light : {
      color : 'black',
      backgroundColor : 'white',
  },
 dark : {
     color : 'white',
     backgroundColor : 'black',
},
})().attach();

document.body.classList.add(theme.classes.root);
```
<a name="module_css" id="module_css"></a>
## css ⇒ <code>StyleSheet</code>
Function to create a new StyleSheet instance.

**Returns**: <code>StyleSheet</code> - The StyleSheet instance.  

| Param | Type | Description |
| --- | --- | --- |
| rules | <code>Object</code> | The CSS rules. |

**Example**  
```js
const { classes } = css({
    root : {
        color : 'red',
        '&:hover' : {
           color : 'blue',
        }, 
    },
}).attach();
```
<a name="module_stylesheet" id="module_stylesheet"></a>
## StyleSheet
StyleSheet class.  
Receives a styles object and options object and generate a css StyleSheet.  
The StyleSheet can be attached to the DOM, destroyed or rendered as string for server-side rendering.


| Param | Type | Description |
| --- | --- | --- |
| styles | <code>Object</code> | The styles object. |
| options | <code>Object</code> | The options object. |
| options.generateClassName | <code>function</code> | The function to generate class names. |
| options.generateId | <code>function</code> | The function to generate ids. |
| options.attributes | <code>Object</code> | The attributes object. |
| options.parsers | <code>Array</code> | The array of parsers. |

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| styles | <code>Object</code> | The styles object. |
| classes | <code>Object</code> | The original class names object. |
| uid | <code>Number</code> | The unique identifier counter for class names. |
| id | <code>String</code> | The unique identifier for the stylesheet. |
| generateClassName | <code>function</code> | The function to generate class names. |
| generateId | <code>function</code> | The function to generate ids. |
| attributes | <code>Object</code> | The attributes object. |
| parsers | <code>Array</code> | The array of parsers. |
| el | <code>HTMLElement</code> | The style element. |

**Example**  
```js
const instance = new StyleSheet({
    root : {
        color : 'black',
    }
});

instance.attach();

const { classes } = instance;
```
