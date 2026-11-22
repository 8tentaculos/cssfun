# CSSFUN server-side rendering

Full guide, including code splitting and Content Security Policy nonces: [ssr.md](https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.4.0-alpha.1/docs/ssr.md).

On the server, `css()` and `createTheme()` register each StyleSheet without touching the DOM. `StyleSheet.toString()` renders all of them as `<style>` tags to embed in the page's `<head>`.

## Basic SSR Pattern

```js
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StyleSheet, createTheme } from 'cssfun';
// Importing the app runs its module-level css() calls
import App from './App.js';

const theme = createTheme({
    light : { bg : '#fff', color : '#000' },
    dark : { bg : '#000', color : '#fff' }
});

const app = express();

app.get('*', (req, res) => {
    const html = renderToString(<App />);

    // <style> tags for every registered StyleSheet, theme included
    const styles = StyleSheet.toString();

    const template = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>SSR App</title>
                ${styles}
            </head>
            <body class="${theme.classes.root}">
                <div id="root">${html}</div>
                <script src="/bundle.js"></script>
            </body>
        </html>
    `;

    res.send(template);
});
```

**Hydration:** class names are hashed from the styles' content, so the client generates the same ones. On the client, `css()` finds the server-rendered `<style data-fun-uid="…">` tag and doesn't insert it again. A StyleSheet whose tag isn't in the page gets a new `<style>` tag at the end of the `<head>`.

**Registry:** a StyleSheet is registered when its module is first imported and stays registered for the life of the process. `StyleSheet.toString()` renders everything registered so far, not only what the current page uses.

## Code Splitting

A module loaded with `import()` registers its StyleSheets when it is first imported:

- In the browser, they are attached when the module loads (unless the server rendered them) and stay in the page afterwards
- On the server, `StyleSheet.toString()` renders them for every page once any request has imported the module, so a page's styles depend on earlier requests
- For the same styles on every page, import every module loaded on demand before the server handles its first request

```js
// ✅ lazy.js: one list of loaders, shared by the router and the server
export const loadAbout = () => import('./pages/About.js');

// ✅ server.js: register their StyleSheets before listening
import * as loaders from './lazy.js';
await Promise.all(Object.values(loaders).map((load) => load()));
app.listen(3000);
```

**Order:** `<style>` tags follow the import graph, so a module's rules come after those of the modules it imports, and a component can override the classes of a component it imports. Between modules that don't import each other the order depends on which loaded first: raise the specificity of the rule that should win, or declare the `@layer` order in a StyleSheet the entry imports first.

```js
// ✅ layers.js, imported first by the entry
css({ '@layer' : 'base, components, pages' });

// ✅ A module loaded on demand wins over `components` whatever the load order
css({ '@layer pages' : { payButton : { padding : '0 48px' } } });
```

- ❌ `@global` rules or themes in a module loaded on demand: once loaded, they apply to every page
- ❌ Layered and unlayered rules competing: rules outside any layer win over layered ones

## Content Security Policy

With `style-src 'nonce-…'`, every `<style>` tag needs the response's nonce: those `StyleSheet.toString()` renders and those `attach()` creates in the browser (all of them without SSR; with SSR, the StyleSheets of modules loaded after the page and of hot updates). A tag without it is blocked. Set the nonce on `StyleSheet.prototype.attributes`, which every instance without its own falls back to and which is read each time a tag is rendered or created.

```js
// ✅ Server: set it right before toString(), with no await in between
const html = await render(req.url);
StyleSheet.prototype.attributes = { nonce : res.locals.cspNonce };
const styles = StyleSheet.toString();

// ✅ Server, from the request context (an AsyncLocalStorage); undefined outside a request
StyleSheet.prototype.attributes = () => ({ nonce : requestContext.getStore()?.nonce });

// ✅ Browser: csp-nonce.js, imported by the client entry before any module that calls css()
const meta = document.querySelector('meta[property="csp-nonce"]');
StyleSheet.prototype.attributes = { nonce : meta?.nonce };
```

The page carries `<meta property="csp-nonce" nonce="…">` in its `<head>` (Vite emits it for `html.cspNonce`). Pages pre-rendered at build time carry a placeholder nonce instead, which the host replaces with a fresh value in the HTML and the policy header of every response.

- ❌ Setting a plain value before an `await`: a concurrent request replaces it before `toString()`
- ❌ `getAttribute('nonce')`: browsers hide the attribute when the policy comes in a header, so read the `nonce` property
- ❌ A nonce on the server only, unless the server renders every StyleSheet the browser can attach (every module loaded on demand imported on the server, no browser-only `css()` calls)
- ❌ Passing a StyleSheet subclass as `createTheme`'s `createStyleSheet`: it is called without `new`, so pass a function such as `(styles, options) => new CSPStyleSheet(styles, options).attach()`

## Rendering Registered Styles

```js
// ✅ <style> tags, to embed in HTML
const styles = StyleSheet.toString();
// → <style data-fun-uid="…">…</style>

// ✅ Plain CSS, e.g. to write an external stylesheet
const cssText = StyleSheet.toCSS();
```

Both render what is registered when they are called: import every module that calls `css()` first, including the ones loaded on demand.

**Related API:**
- [`StyleSheet.toString()`](https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.4.0-alpha.1/docs/api.md#stylesheet_tostring) - Renders all registered instances as `<style>` tags
- [`StyleSheet.toCSS()`](https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.4.0-alpha.1/docs/api.md#stylesheet_tocss) - Renders all registered instances as CSS
