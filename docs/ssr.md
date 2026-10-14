# Server-side rendering

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

If your site uses a strict [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) with a per-request nonce (`style-src 'nonce-…'`), add that nonce to the generated `<style>` tags through the [`attributes`](./api.md#new-stylesheetstyles-options) option/property. `StyleSheet.toString()` then emits `<style nonce="…" data-fun-uid="…">`.

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

### Scoped alternative: a subclass

To avoid mutating the global prototype, scope it to your own subclass and `css` helper. Declare `attributes` as a getter, so the nonce is read at render time rather than when the instance is created:

```javascript
import { StyleSheet } from 'cssfun';

class CSPStyleSheet extends StyleSheet {
    get attributes() {
        return { nonce : getRequestNonce() };
    }
}

const css = (styles, options) => new CSPStyleSheet(styles, options).attach();
```

Pass `CSPStyleSheet` to [`createTheme`](./themes.md) via [`options.createStyleSheet`](./api.md#createtheme) so theme styles carry the nonce too.
