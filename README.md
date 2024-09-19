<picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/logo-dark.png">
    <img alt="CSSFUN" src="docs/logo.png">
</picture>

# A Next-Generation CSS-in-JS Library

**CSSFUN** is a [CSS-in-JS](https://en.wikipedia.org/wiki/CSS-in-JS) library. It enables you to write CSS 
directly within your JavaScript code. This provides a dynamic, seamless way to style your applications while 
keeping everything modular and maintainable.

## Key Features

- **Component-Scoped Styles**  
  CSSFUN ensures that styles are scoped to the specific component they are defined in, preventing unwanted style leakage across your application. This promotes modularity and simplifies the management of styles, as both the component logic and its styling exist in the same file.

- **Framework-Agnostic**  
  Whether you're using React, Vue, or vanilla JavaScript, CSSFUN works with any framework. Its small footprint—only **4KB**—allows you to include it in your projects with minimal overhead.

- **No Build Tools Required**  
  CSSFUN can be used directly in the browser, eliminating the need for complex build tools or configurations. It's designed to be simple to set up and get started with.

- **Server-Side Rendering (SSR) Support**  
  CSSFUN supports server-side rendering out of the box, optimizing initial load times without duplicating styles. This results in faster performance and improved SEO for your web applications.

- **Built-in Theme Management**  
  With built-in support for theme management, CSSFUN leverages CSS variables to easily handle light, dark, and system color schemes. Themes update automatically based on user preferences, without requiring component re-renders.

## Getting Started

### Using npm

```bash
$ npm install cssfun
```

```javascript
import { css } from 'cssfun';
```

### Using ES modules

```javascript
import { css } from 'https://esm.run/cssfun';
```

### Using `<script>` tag

```html
<script src="https://cdn.jsdelivr.net/npm/cssfun/dist/cssfun.min.js"></script>
```

```javascript
const { css } = CSSFUN;
```

### Create your styles
```javascript
const { classes } = css({
    button : {
        backgroundColor : 'blue',
        color : 'white',
        padding : '10px',
        borderRadius : '5px'
    }
});
```

### Apply the styles to your components:
```javascript
const Button = () => <button className={classes.button}>Click me</button>;
```

## Renderers
Renderers are functions that transform style objects into CSS strings.  
When composed, the first parser receives the styles object, and the final one outputs the 
resulting CSS string.  
By default, StyleSheets are rendered using `parseStyles` and `renderStyles`.  

These are the default parser transformations:

#### Camelized keys will be transformed to dashed keys
```javascript
css({
    root : {
        backgroundColor : 'black'
    }
}).toString();
```

##### Renders to:
```css
<style id="fun-1">
    .fun-1-root {
        background-color: black;
    }
</style>
```

#### Nested selectors will be expanded
```javascript
css({
     root : {
        '&:hover' : {
            backgroundColor : 'black'
        }
    }
}).toString();
```

##### Renders to:
```css
<style id="fun-1">
    .fun-1-root:hover {
        background-color: black;
    }
</style>
```
 
#### Global selectors will be rendered as global styles
```javascript
css({
    '@global' : {
        body : {
            backgroundColor : 'black'
        }
    }
}).toString();
 ```

##### Renders to:
```css
<style id="fun-1">
    body {
        background-color : black;
    }
</style>
```
 
#### Class references will be replaced by the generated class name
```javascript
css({
    root : {
        color : 'black'
    },
    '$root:hover' : {
        color : 'white'
    }
}).toString();
```

#### Renders to:
```css
<style id="fun-1">
    .fun-1-root {
        color: black;
    }
    .fun-1-root:hover {
        color:white;
    }
</style>
```

### Custom renderers
Renderers can be configured through the `renderers` array on the StyleSheet instance. 
If provided via `options.renderers`, they will be added to the instance. The elements in 
the `renderers` array can either be functions or strings referencing methods of the StyleSheet 
instance. These methods will be bound to the instance automatically.

## Themes
A theme is a StyleSheet that provides access to CSS variables for consistent styling across 
your application. It supports light, dark, and system color schemes, allowing your components 
to automatically adapt to changes in the user's system preferences.

The higher-order function `createTheme` accepts a default theme configuration object and returns 
a `createTheme` function with those defaults applied. This function is used to generate 
theme-specific StyleSheets.

### Creating a Theme
Create a `createTheme` function with default themes and create a theme StyleSheet.

```javascript
// Create theme
const theme = createTheme({
    light: {
        color: 'black',
        backgroundColor: 'white',
    },
    dark: {
        color: 'white',
        backgroundColor: 'black',
    },
})();
```

#### Applying the Theme Class
The generated theme object contains a `root` class, which represents the theme StyleSheet. 
You can apply this class to the `body` element to style the entire application, or to any 
specific component's root element to style just a part of your UI.

```javascript
// Add theme class to the body
document.body.classList.add(theme.classes.root);
```

#### Using Theme Variables in Styles
Your theme object is automatically converted into CSS variables. For instance:

```javascript
{ backgroundLevel1: 'black' }
```

This will be converted into the CSS variable `--fun-background-level1`.  

Similarly, more complex theme structures like:  

```javascript
{
    palette: {
        common: { 
            black: '#000'
        }
    }
}
```

will be converted into `--fun-palette-common-black`.  

Use these variables in your component styles, even before the theme is applied. 
Your components will automatically update when the theme or system color scheme changes.

```javascript
const { classes } = css({
    button: {
        color: 'var(--fun-color)',
        backgroundColor: 'var(--fun-backgroundColor)',
    },
});

const Button = ({ label }) => <button className={classes.button}>{label}</button>;
```

## API Documentation
Complete API documentation can be found [here](/docs/api.md).

## Examples
The `examples` folder contains various sample projects demonstrating how to use **CSSFUN** in 
different environments and frameworks. Each example is a standalone project that you can run locally 
to see **CSSFUN** in action.

### Available Examples
- **[React Example](https://github.com/8tentaculos/cssfun/tree/master/example/react)**: A basic React application demonstrating the use of **CSSFUN** for styling React components.
- **[Rasti Example](https://github.com/8tentaculos/cssfun/tree/master/example/rasti)**: A simple Rasti application illustrating how to apply **CSSFUN** to style Rasti components.
- **[Vanilla JS Example](https://github.com/8tentaculos/cssfun/tree/master/example/vanilla)**: A straightforward JavaScript example showing how to use **CSSFUN** for styling HTML elements.
- **[Rasti with Server-Side Rendering (SSR) Example](https://github.com/8tentaculos/cssfun/tree/master/example/ssr)**: A Rasti application with server-side rendering using Express, highlighting how to use **CSSFUN** for styling in an SSR environment.

## License
CSSFUN is open-source and available under the [MIT License](LICENSE).

## Contributing
Contributions are welcome! Share feature ideas or report bugs on our [GitHub Issues page](https://github.com/8tentaculos/cssfun/issues).
