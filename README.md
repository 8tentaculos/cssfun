<p align="center">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.1.0-alpha.2/docs/logo-dark.svg">
        <img alt="CSSFUN" src="https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.1.0-alpha.2/docs/logo.svg">
    </picture>
</p>

<p align="center">
    <b>Near-zero runtime <a href="https://en.wikipedia.org/wiki/CSS-in-JS" target="_blank">CSS-in-JS</a> library</b>
</p>

Write modular **CSS** within your **JavaScript** code with built-in **themes** and **SSR** support.

[![CI](https://github.com/8tentaculos/cssfun/actions/workflows/ci.yml/badge.svg)](https://github.com/8tentaculos/cssfun/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/cssfun.svg)](https://www.npmjs.com/package/cssfun)
[![npm package minimized gzipped size](https://img.shields.io/bundlejs/size/cssfun)](https://unpkg.com/cssfun/dist/cssfun.min.js)
[![npm downloads](https://img.shields.io/npm/dm/cssfun.svg)](https://www.npmjs.com/package/cssfun)
[![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hm/cssfun)](https://www.jsdelivr.com/package/npm/cssfun)
[![license](https://img.shields.io/npm/l/cssfun.svg)](https://github.com/8tentaculos/cssfun/blob/master/LICENSE)

## Key Features

- **Near-Zero Runtime** ⚡  
  Styles are generated when the module is initialized, rather than during component rendering. This eliminates runtime 
  style generation, improving performance and reducing complexity.

- **Component-Scoped Styles** ✨  
  **CSSFUN** scopes styles to the component, preventing style leakage and promoting modularity. It keeps both logic 
  and styling in the same file for easier management.

- **Framework-Agnostic and Lightweight** 🌐  
  **CSSFUN** is compatible with any environment. At just **1.8KB**, it adds minimal overhead to your projects.

- **No Build Tools Required** 🛠️  
  **CSSFUN** can be used directly in the browser, eliminating the need for complex build tools or configurations.

- **Server-Side Rendering (SSR) Support** 🚀  
  **CSSFUN** supports [server-side rendering](#server-side-rendering-ssr) out of the box, optimizing initial load 
  times without duplicating styles.

- **Built-in Theme Management** 🎨  
  With built-in [theme support](#themes), **CSSFUN** uses [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) 
  to manage light and dark color schemes. Themes update automatically based on user preferences, with no re-renders needed.

- **TypeScript Support** 🔷  
  Ships with type definitions. The `classes` object is fully typed based on your styles, so you get autocomplete
  for class names and a type error on typos. CSS properties autocomplete via [csstype](https://github.com/frenic/csstype).

## Getting Started

### Installing via npm

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

`css()` injects the styles and returns a `StyleSheet` instance. Its `classes` property holds the generated class names, one per top-level selector:

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

See [Class Name Generation](#class-name-generation) for how the names are built.

## Class Name Generation

`css(styles)` returns a [`StyleSheet`](/docs/api.md#stylesheet) instance. Its `classes` property is an object that maps each top-level selector in your styles to a unique, scoped class name:

```javascript
const sheet = css({
    button: { color: 'red' },
    link: { color: 'blue' }
});

sheet.classes;        // { button: "fun-9qkk9s-button", link: "fun-9qkk9s-link" }
sheet.classes.button; // "fun-9qkk9s-button"
```

Destructure `classes` to use the generated names as `className`:

```javascript
const { classes } = css({ button: { color: 'red' } });

const Button = () => <button className={classes.button}>Click me</button>;
```

Generation happens once, when the instance is created — never during rendering — so there is no per-render overhead.

### Which selectors get a class

Only top-level keys that are plain identifiers (matching `/^\w+$/` — letters, digits and underscores) get a generated class. At-rules (`@global`, `@media …`, `@keyframes …`), `$` references and keys with dashes, spaces or commas are left untouched and don't appear in `classes`.

### Stable across environments

Each class name embeds a `uid` hashed from the styles' content, so identical styles always produce identical class names — across server and client, hot reloads, and repeated calls. This is what makes [SSR hydration](#server-side-rendering-ssr) seamless.

### Name format

The format depends on the build:

| Build | Format | Example |
| --- | --- | --- |
| Development | `{prefix}-{uid}-{name}` | `fun-9qkk9s-button` |
| Production | `{prefix[0]}-{uid}-{index}` | `f-9qkk9s-1` |

In production, the original name is replaced by a 1-based index to keep the output small. The default `prefix` is `fun`.

> **Note**: Examples in this documentation use the development format for readability.
> You can override generation via [`options.generateClassName`](/docs/api.md#new-stylesheetstyles-options) or by [extending `StyleSheet`](/docs/api.md#stylesheet__generateclassname).

## Renderers

Renderers are functions that transform style objects into CSS strings. They are applied in sequence, with each renderer receiving the output of the previous one.

**CSSFUN** uses two built-in renderers by default:
1. **`parseStyles`**: Transforms the style object (expands nested selectors, replaces class references, converts camelCase to dashed-case, handles global styles)
2. **`renderStyles`**: Converts the processed object into a CSS string

The final renderer in the chain outputs the CSS string that gets injected into the DOM.

These are the built-in renderer transformations:

#### Camelized keys will be transformed to dashed keys

```javascript
css({
    root : {
        backgroundColor : 'black',
        fontSize : '16px',
        paddingTop : '10px'
    }
}).toString();
```

##### Renders to:

```html
<style data-fun-uid="uwitok">
    .fun-uwitok-root {
        background-color: black;
        font-size: 16px;
        padding-top: 10px;
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
    <style data-fun-uid="1pxyvx7">
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
    <style data-fun-uid="169vukw">
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
    <style data-fun-uid="2xfpy0">
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
    <style data-fun-uid="ml03n3">
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
    <style data-fun-uid="1eia2eq">
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
    <style data-fun-uid="1p1av20">
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
    <style data-fun-uid="xvd6jj">
        .fun-xvd6jj-root a {
            color: black;
        }
    </style>
    ```

**Example flow:**
```
Input styles object
    ↓
[parseStyles] → Transforms object (expands nested, replaces references, converts camelCase)
    ↓
[renderStyles] → Converts object to CSS string
    ↓
Output CSS string
```

### Custom Renderers

You can customize the renderers via [`options.renderers`](/docs/api.md#new-stylesheetstyles-options) (or by setting `renderers` on a [`StyleSheet`](/docs/api.md#stylesheet) subclass).

Elements in the `renderers` array can be either functions or strings that reference methods of the [`StyleSheet`](/docs/api.md#stylesheet) instance. Method-name strings are resolved to methods when the instance is created, and every renderer is called with the instance as `this`.

Renderers are applied in array order, each receiving the previous one's output. By default, [`StyleSheet`](/docs/api.md#stylesheet) instances use `[this.parseStyles, this.renderStyles]`: `parseStyles` runs first (transforms the object), then `renderStyles` (converts it to the CSS string).

`renderers` may also be given as a function that returns the array, resolved when the instance is created.

## Subclassing & dynamic values

The `prefix`, `attributes` and `renderers` options also accept a **function** that returns the value, so you can compute it at runtime instead of passing a static value. The timing differs: `prefix` and `renderers` are resolved once, when the instance is created, while `attributes` is resolved lazily every time the styles are rendered — handy for per-request values such as a [CSP nonce](#content-security-policy-csp).

For subclasses, the `preinitialize` method runs at the very start of the constructor — before the options are applied and before the class names are generated. Override it to run setup logic or define `prefix`, `attributes` or `renderers` (matching options still take precedence).

See [Content Security Policy (CSP)](#content-security-policy-csp) for a real-world example that combines `preinitialize` with a function-valued `attributes`.

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
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StyleSheet, createTheme } from 'cssfun';
import App from './App.js';

// Create a theme with light and dark modes
const theme = createTheme({
    light : {
        bg : '#fff',
        color : '#000'
    },
    dark : {
        bg : '#000',
        color : '#fff'
    }
});

const app = express();

app.get('*', (req, res) => {
    // Render the app
    const html = renderToString(<App />);

    // Get generated styles as string
    const styles = StyleSheet.toString();
    
    // Get theme root class
    const cls = theme.classes.root;

    const template = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>SSR App</title>
                ${styles}
            </head>
            <body class="${cls}">
                <div id="root">${html}</div>
                <script src="/bundle.js"></script>
            </body>
        </html>
    `;

    res.send(template);
});
```

When the app is hydrated on the client, the styles are preserved and will not be recreated.

## Content Security Policy (CSP)

If your site uses a strict [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) with a per-request nonce (`style-src 'nonce-…'`), add that nonce to the generated `<style>` tags through the [`attributes`](/docs/api.md#new-stylesheetstyles-options) option/property. `StyleSheet.toString()` then emits `<style nonce="…" data-fun-uid="…">`.

### Set it on the prototype per request

Instances fall back to `StyleSheet.prototype.attributes`, which is read fresh on every render, so set the nonce there before rendering:

```javascript
app.get('*', (req, res) => {
    StyleSheet.prototype.attributes = { nonce : res.locals.cspNonce };

    const html = renderToString(<App />);
    const styles = StyleSheet.toString(); // <style nonce="…" data-fun-uid="…">…</style>
    // …embed `styles` in the <head> as in the SSR example above.
});
```

Simple and effective for synchronous SSR: the styles are rendered on the server and reused on the client during hydration without being recreated, so the client needs no nonce handling. (For streaming/async SSR, resolve the nonce per request from context — e.g. [`AsyncLocalStorage`](https://nodejs.org/api/async_context.html) — via the function form, since the prototype is shared across concurrent requests.)

### Scoped alternative: a subclass with `preinitialize`

To avoid mutating the global prototype, scope it to your own subclass and `css` helper. `preinitialize` runs once per instance, so use the function form to read the nonce lazily at render time:

```javascript
import { StyleSheet } from 'cssfun';

class CSPStyleSheet extends StyleSheet {
    preinitialize() {
        this.attributes = () => ({ nonce : getRequestNonce() });
    }
}

const css = (styles, options) => new CSPStyleSheet(styles, options).attach();
```

Pass `CSPStyleSheet` to [`createTheme`](#themes) via [`options.createStyleSheet`](/docs/api.md#createtheme) so theme styles carry the nonce too.

## TypeScript

**CSSFUN** ships with TypeScript declarations out of the box — no `@types/cssfun` needed. The types are bundled in the package and resolved automatically via the `types` field in `package.json`.

> Requires **TypeScript 4.1+** (the `classes` inference relies on key remapping and template literal types).

### Class name inference

The `css()` function and `StyleSheet` constructor are generic over the styles object. The generated `classes` map is inferred from the keys you pass in, so typos and missing keys are caught at compile time:

```ts
import { css } from 'cssfun';

const sheet = css({
    link : { color : 'blue' },
    button : { padding : 10 }
});

sheet.classes.link;   // string
sheet.classes.button; // string
sheet.classes.typo;   // ❌ Property 'typo' does not exist
```

At-rule keys (`@global`, `@keyframes …`, `@media …`, `@supports …`) and class reference keys (`$name`) are filtered out of `classes` automatically — they don't produce class names at runtime, so they don't appear in the type either.

Only top-level keys that are valid class-name identifiers (letters, digits and underscores — i.e. matching `/^\w+$/`) get a generated class at runtime. The type can't fully express that pattern, so keys with dashes, spaces or commas (e.g. `'my-card'`) appear in `classes` as `string` but resolve to `undefined` at runtime. Stick to simple identifiers for top-level class keys.

### CSS property autocomplete

Style rules use [`csstype`](https://github.com/frenic/csstype) under the hood, so you get autocomplete on standard CSS properties, with `null`/`undefined` accepted (and filtered at runtime). Note that values are intentionally permissive (any `string` is accepted) so that `var(...)`, custom values and arbitrary nested selectors keep working — so this is autocomplete, not strict validation:

```ts
css({
    card : {
        color : 'red',
        backgroundColor : null,    // ok — filtered at runtime
        margin : undefined,        // ok
        padding : 10,              // numbers accepted for length props
    },
    root : {
        color : 'black',
        '&:hover' : { color : 'blue' },
        '& span' : { fontSize : 14 },
    },
    '@global' : { body : { margin : 0 } },
    '@keyframes wave' : {
        '0%, 100%' : { transform : 'rotate(10deg)' },
        '50%'      : { transform : 'rotate(-10deg)' },
    },
});
```

### Exported types

The following types are exported from the package root for use in your own code:

```ts
import type {
    CSSValue,
    CSSProperties,
    StyleRule,
    Styles,
    StyleSheetOptions,
    ThemeDefinition,
    ThemeVars,
    CreateThemeOptions
} from 'cssfun';
```

## API Documentation

Complete API documentation can be found [here](/docs/api.md).

## Working with LLMs

For those working with LLMs, there is an [AI Agents reference guide](/docs/AGENTS.md) that provides API patterns, style syntax, theme management, and best practices, optimized for LLM context. You can share this guide with AI assistants to help them understand **CSSFUN**'s architecture and styling APIs.

## Examples

The `examples` folder contains various sample projects demonstrating how to use **CSSFUN** in 
different environments and frameworks. Each example is a standalone project that you can run locally 
to see **CSSFUN** in action.

### Available Examples

- **[React Example](https://github.com/8tentaculos/cssfun/tree/master/example/react)**: A basic React application demonstrating the use of **CSSFUN** for styling React components. [Try it](https://plnkr.co/plunk/hLIWLlAHGsE2ojO1).
- **[Rasti Example](https://github.com/8tentaculos/cssfun/tree/master/example/rasti)**: A simple Rasti application illustrating how to apply **CSSFUN** to style Rasti components. [Try it](https://plnkr.co/plunk/ivxPfUB5szwcuncf).
- **[Vanilla JS Example](https://github.com/8tentaculos/cssfun/tree/master/example/vanilla)**: A straightforward JavaScript example showing how to use **CSSFUN** for styling HTML components. [Try it](https://plnkr.co/plunk/4ypn83Ru5Z6uwZew).

## License

**CSSFUN** is open-source and available under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Share feature ideas or report bugs on our [GitHub Issues page](https://github.com/8tentaculos/cssfun/issues).
