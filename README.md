<picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/logo-dark.png">
    <img alt="CSSFUN" src="docs/logo.png">
</picture>

<p align="center">
    <b>Near-zero runtime <a href="https://en.wikipedia.org/wiki/CSS-in-JS" target="_blank">CSS-in-JS</a> library</b>
</p>

Write modular **CSS** within your **JavaScript** code with built-in **themes** and **SSR** support.

[![npm version](https://img.shields.io/npm/v/cssfun.svg?style=flat-square)](https://www.npmjs.com/package/cssfun)
[![npm package minimized gzipped size](https://img.shields.io/bundlejs/size/cssfun?style=flat-square)](https://unpkg.com/cssfun/dist/cssfun.min.js)
[![npm downloads](https://img.shields.io/npm/dm/cssfun.svg?style=flat-square)](https://www.npmjs.com/package/cssfun)
[![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hm/cssfun?style=flat-square)](https://www.jsdelivr.com/package/npm/cssfun)

## Key Features

- **Near-Zero Runtime** ⚡  
  Styles are generated when the module is initialized, rather than during component rendering. This eliminates runtime 
  style generation, improving performance and reducing complexity.

- **Component-Scoped Styles** ✨  
  **CSSFUN** scopes styles to the component, preventing style leakage and promoting modularity. It keeps both logic 
  and styling in the same file for easier management.

- **Framework-Agnostic and Lightweight** 🌐  
  **CSSFUN** is compatible with any environment. At just **1.7KB**, it adds minimal overhead to your projects.

- **No Build Tools Required** 🛠️  
  **CSSFUN** can be used directly in the browser, eliminating the need for complex build tools or configurations.

- **Server-Side Rendering (SSR) Support** 🚀  
  **CSSFUN** supports [server-side rendering](#server-side-rendering-ssr) out of the box, optimizing initial load 
  times without duplicating styles.

- **Built-in Theme Management** 🎨  
  With built-in [theme support](#themes), **CSSFUN** uses [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) 
  to manage light and dark color schemes. Themes update automatically based on user preferences, no re-renders needed.

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
<script src="https://cdn.jsdelivr.net/npm/cssfun"></script>
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
These are the built-in renderers transformations:

#### Camelized keys will be transformed to dashed keys

```javascript
css({
    root : {
        backgroundColor : 'black'
    }
}).toString();
```

##### Renders to:

```html
<style data-fun-uid="fun-uwitok">
    .fun-uwitok-root {
        background-color: black;
    }
</style>
```

#### Nested selectors will be expanded

- **Use `&` to reference the selector of the parent rule**

    ```javascript
    css({
        button : {
            backgroundColor : 'white',
            '&:hover' : {
                backgroundColor : 'black'
            },
            '& span' : {
                color : 'blue'
            }
        }
    }).toString();
    ```

    ##### Renders to:
    ```html
    <style data-fun-uid="fun-1pxyvx7">
        .fun-1pxyvx7-button {
            background-color: white;
        }
        .fun-1pxyvx7-button:hover {
            background-color: black;
        }
        .fun-1pxyvx7-button span {
            color: blue;
        }
    </style>
    ```

- **Deep nesting**

    ```javascript
    css({
        button : {
            backgroundColor : 'white',
            '&:active' : {
                backgroundColor : 'black',
                '&:hover' : {
                    backgroundColor : 'blue'
                }
            }
        }
    }).toString();
    ```

    ##### Renders to:
    ```html
    <style data-fun-uid="fun-169vukw">
        .fun-169vukw-button {
            background-color: white;
        }
        .fun-169vukw-button:active {
            background-color: black;
        }
        .fun-169vukw-button:active:hover {
            background-color: blue;
        }
    </style>
    ```

#### Class references will be replaced by the generated class name

 - **Use `$` to reference a local class within the same `StyleSheet` instance**

    ```javascript
    css({
        button : {
            backgroundColor : 'white'
        },
        '$button:hover' : {
                backgroundColor : 'black'
            },
        '$button span' : {
            color : 'blue'
        }
    }).toString();
    ```

    ##### Renders to:
    ```html
    <style data-fun-uid="fun-2xfpy0">
        .fun-2xfpy0-button {
            background-color: white;
        }
        .fun-2xfpy0-button:hover {
            background-color: black;
        }
        .fun-2xfpy0-button span {
            color: blue;
        }
    </style>
    ```
 
#### Global selectors will be rendered as global styles

- **Global block**

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

    ```html
    <style data-fun-uid="fun-ml03n3">
        body {
            background-color: black;
        }
    </style>
    ```

- **Nested global block**

    ```javascript
    css({
        root : {
            '@global' : {
                a : {
                    color : 'black'
                }
            }
        }
    }).toString();
    ```

    ##### Renders to:
    ```html
    <style data-fun-uid="fun-1eia2eq">
        .fun-1eia2eq-root a {
            color: black;
        }
    </style>
    ```

- **Global prefix**

    ```javascript
    css({
        '@global body' : {
            backgroundColor : 'black'
        }
    }).toString();
    ```

    ##### Renders to:
    ```html
    <style data-fun-uid="fun-1p1av20">
        body {
            background-color: black;
        }
    </style>
    ```

- **Nested global prefix**

    ```javascript
    css({
        root : {
            '@global a' : {
                color : 'black'
            }
        }
    }).toString();
    ```

    ##### Renders to:
    ```html
    <style data-fun-uid="fun-xvd6jj">
        .fun-xvd6jj-root a {
            color: black;
        }
    </style>
    ```

When composed, the first renderer receives the styles object, and the final one outputs the 
resulting CSS string.  

### Custom Renderers

You can customize the renderers by setting the `renderers` array on the [`StyleSheet`](/docs/api.md#stylesheet) instance. 
If passed via [`options.renderers`](/docs/api.md#new-stylesheetstyles-options), they will be automatically added to the instance.  

Elements in the `renderers` array can be either functions or strings that reference methods of the [`StyleSheet`](/docs/api.md#stylesheet) instance. These 
methods will be bound to the instance before they are invoked.

By default, [`StyleSheet`](/docs/api.md#stylesheet) are rendered using the built-in renderers: `[this.renderStyles, this.parseStyles]`.

## Themes

A theme is a [`StyleSheet`](/docs/api.md#stylesheet) that provides access to CSS variables 
for consistent styling across your application. It supports multiple color schemes, 
including `light`, `dark`, `light dark` (default, adapts to system preferences), and `normal`. 
Themes allow your components to automatically adapt to changes in the user's system preferences 
or use a fixed color scheme.

The [`createTheme`](/docs/api.md#createtheme) function generates a theme StyleSheet instance. 
It accepts a `themes` object, which defines variables for the specified color schemes, and an 
`options` object to customize the theme generation.  
Each key in the `themes` object corresponds to a color scheme (`light`, `dark`, `normal`), 
and its value is an object of key-value pairs that will be converted into CSS variables.

### Creating a Theme

Define styles for `light` and `dark` color schemes using the `createTheme` function.

```javascript
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
```

### Customizing the Theme

#### Color Scheme

The `options.colorScheme` parameter specifies which color scheme(s) to use. Possible values are:

- `light`: Uses the `light` theme only.
- `dark`: Uses the `dark` theme only.
- `light dark` (default): Supports both `light` and `dark` themes, adapting to system preferences. You can override the system preference by setting the `data-color-scheme` attribute to `light` or `dark` on a parent element.
- `normal`: Uses the `normal` theme only.

#### CSS Variables Prefix

The `options.cssVarsPrefix` parameter allows you to customize the prefix for the generated CSS variables. 
By default, the prefix is `fun`. For example, a key `colorPrimary` in the theme will generate a CSS variable 
like `--fun-colorPrimary`.

### Applying the Theme Class

The generated theme includes a `root` class, which exposes all the theme's CSS variables to any element 
that uses this class and its descendants. You can apply this class to the `body` element to style the 
entire application, or to the root element of a specific component to apply the theme to just part of your UI.

```javascript
// Add theme class to the body
document.body.classList.add(theme.classes.root);
```

### Using Theme Variables in Styles

The `themes` object is automatically converted into CSS variables. For example:

```javascript
{ backgroundLevel1 : 'black' }
```

is converted into the CSS variable `--fun-backgroundLevel1`.  

Nested structures like:

```javascript
{
    palette : {
        common : { 
            black : '#000'
        }
    }
}
```

are converted into `--fun-palette-common-black`.  

You can use these variables in your component styles, even before the theme is applied. 
Your components will automatically update when the theme or system color scheme changes.

```javascript
const { classes } = css({
    button : {
        color : 'var(--fun-colorPrimary)',
        backgroundColor : 'var(--fun-backgroundLevel1)'
    },
});

const Button = ({ label }) => <button className={classes.button}>{label}</button>;
```

## Server-Side Rendering (SSR)

Easily add your styles to the server-rendered HTML by embedding the StyleSheets as a 
string within the `<head>` of your page.

```javascript
// Creating a theme
const theme = createTheme(themes);

// Express route that renders the app and returns HTML to the browser
app.get('*', (req, res) => {
    // Render the app as an HTML string
    const html = renderToString(<App />);
    
    // Get all StyleSheets styles as a string of <style> elements
    const styles = StyleSheet.toString();
    
    // Get the root class name from the theme
    const cls = theme.classes.root;
    
    // Create the full HTML page template
    const template = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Waving Cat</title>
                ${styles}
            </head>
            <body class="${cls}">
                <div id="root">${html}</div>
                <script src="/bundle.js"></script>
            </body>
        </html>
    `;
    
    // Send the complete HTML response
    res.send(template);
});
```

When the app is hydrated on the client side, the styles are preserved and won’t be recreated.

## API Documentation

Complete API documentation can be found [here](/docs/api.md).

## Examples

The `examples` folder contains various sample projects demonstrating how to use **CSSFUN** in 
different environments and frameworks. Each example is a standalone project that you can run locally 
to see **CSSFUN** in action.

### Available Examples

- **[React Example](https://github.com/8tentaculos/cssfun/tree/master/example/react)**: A basic React application demonstrating the use of **CSSFUN** for styling React components. [Try it](https://plnkr.co/plunk/hLIWLlAHGsE2ojO1).
- **[Rasti Example](https://github.com/8tentaculos/cssfun/tree/master/example/rasti)**: A simple Rasti application illustrating how to apply **CSSFUN** to style Rasti components. [Try it](https://plnkr.co/plunk/ivxPfUB5szwcuncf).
- **[Vanilla JS Example](https://github.com/8tentaculos/cssfun/tree/master/example/vanilla)**: A straightforward JavaScript example showing how to use **CSSFUN** for styling HTML components. [Try it](https://plnkr.co/plunk/4ypn83Ru5Z6uwZew).
- **[Rasti with Server-Side Rendering (SSR) Example](https://github.com/8tentaculos/cssfun/tree/master/example/ssr)**: A Rasti application with server-side rendering using Express, highlighting how to use **CSSFUN** for styling in an SSR environment.

## License

**CSSFUN** is open-source and available under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Share feature ideas or report bugs on our [GitHub Issues page](https://github.com/8tentaculos/cssfun/issues).
