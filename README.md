<p align="center">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.3.0/docs/logo-dark.svg">
        <img alt="CSSFUN" src="https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.3.0/docs/logo.svg">
    </picture>
</p>

<p align="center">
    <b>Near-zero runtime <a href="https://en.wikipedia.org/wiki/CSS-in-JS" target="_blank">CSS-in-JS</a> library</b>
</p>

Write modular **CSS** within your **JavaScript** code with built-in **themes** and **SSR** support.

[![CI](https://github.com/8tentaculos/cssfun/actions/workflows/ci.yml/badge.svg)](https://github.com/8tentaculos/cssfun/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/cssfun.svg)](https://www.npmjs.com/package/cssfun)
[![npm package minimized gzipped size](https://img.shields.io/bundlejs/size/cssfun)](https://unpkg.com/cssfun/dist/cssfun.esm.min.js)
[![npm downloads](https://img.shields.io/npm/dm/cssfun.svg)](https://www.npmjs.com/package/cssfun)
[![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hm/cssfun)](https://www.jsdelivr.com/package/npm/cssfun)
[![license](https://img.shields.io/npm/l/cssfun.svg)](https://github.com/8tentaculos/cssfun/blob/master/LICENSE)

## Key Features

- **Near-zero runtime**  
  Styles are generated once, when the module is initialized, rather than during component rendering.
  Components only read class names, which are plain strings, so rendering carries no styling cost.

- **Component-scoped styles**  
  Styles live in the same file as the component that uses them. Each class gets a unique generated
  name, so styles never leak between components.

- **Stable class names**  
  Class names are hashed from the content of the styles, not from a counter or load order. Identical
  styles produce identical names on the server and in the browser, across hot reloads and repeated
  calls, so server-rendered markup always matches the client.

- **Server-side rendering (SSR) support**  
  [`StyleSheet.toString()`](/docs/ssr.md) renders every stylesheet as `<style>` tags for
  the server response. In the browser, stylesheets already in the page are not injected again.

- **Built-in theme management**  
  [`createTheme`](/docs/themes.md) turns light and dark values into [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
  that follow the user's color scheme, or a fixed one set with `data-color-scheme`. Switching schemes
  needs no re-render.

- **Framework-agnostic, no build tools**  
  `classes` maps your style keys to plain class name strings, usable with any UI library or with the
  DOM directly. Styles are plain JavaScript objects processed at runtime: no compiler, no bundler
  plugin, no CSS extraction step.

- **TypeScript support**  
  Ships with type definitions. The `classes` object is typed from your styles, so you get autocomplete
  for class names and a type error on typos. CSS properties autocomplete via [csstype](https://github.com/frenic/csstype).

## Getting Started

### Installing via npm

```bash
$ npm install cssfun
```

```javascript
import { css } from 'cssfun';
```

### Using native ES modules

No bundler needed: an import map points `cssfun` to the ES module build, so imports read the same as with npm.

```html
<script type="importmap">
    {
        "imports": {
            "cssfun": "https://cdn.jsdelivr.net/npm/cssfun/dist/cssfun.esm.min.js"
        }
    }
</script>

<script type="module">
    import { css } from 'cssfun';
</script>
```

The import map can also point to a copy of the file served from your own site, or to `https://esm.run/cssfun`. During development, use `cssfun.esm.js` for readable class names.

### Using the UMD build

For a classic `<script>` tag, the UMD build exposes the `CSSFUN` global object. It also loads as an AMD module, with RequireJS for example.

```html
<script src="https://cdn.jsdelivr.net/npm/cssfun/dist/cssfun.umd.min.js"></script>
```

```javascript
const { css } = CSSFUN;
```

The development build is `cssfun.umd.js`.

### Create your styles

`css()` injects the styles and returns a `StyleSheet` instance. Its `classes` property maps class name selectors to their generated unique class name:

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

See [Class name generation](/docs/styles.md#class-name-generation) for how the names are built.

## Documentation

- [Writing styles](/docs/styles.md) — class name generation and the style syntax: nesting, class references, global styles and at-rules.
- [Themes](/docs/themes.md) — creating a theme, color schemes and using its CSS variables.
- [Server-side rendering](/docs/ssr.md) — rendering styles on the server, and Content Security Policy nonces.
- [Extending](/docs/extending.md) — custom renderers, subclassing `StyleSheet` and separate registries.
- [TypeScript](/docs/typescript.md) — class name inference, CSS property autocomplete and exported types.
- [API documentation](/docs/api.md) — every function, class, method and option.
- [Agent skill](/skills/cssfun/SKILL.md) — the API, style syntax, themes and best practices for coding agents. Install it with `npx skills add 8tentaculos/cssfun`, or copy `node_modules/cssfun/skills/cssfun` into your agent's skills folder.

## TypeScript

**CSSFUN** ships with TypeScript declarations out of the box. The types are bundled in the package and resolved automatically. How `classes` is inferred from your styles is in the [TypeScript guide](/docs/typescript.md).

## Examples

The `example` folder contains various sample projects demonstrating how to use **CSSFUN** in 
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
