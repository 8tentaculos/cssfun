# CSSFUN server-side rendering

Full guide, including Content Security Policy nonces: [ssr.md](https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.3.0/docs/ssr.md).

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

**Hydration:** class names are hashed from the styles' content, so the client generates the same ones. On the client, `css()` finds the server-rendered `<style data-fun-uid="…">` tag and doesn't insert it again.

## Rendering Registered Styles

```js
// ✅ <style> tags, to embed in HTML
const styles = StyleSheet.toString();
// → <style data-fun-uid="…">…</style>

// ✅ Plain CSS, e.g. to write an external stylesheet
const cssText = StyleSheet.toCSS();
```

**Related API:**
- [`StyleSheet.toString()`](https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.3.0/docs/api.md#stylesheet_tostring) - Renders all registered instances as `<style>` tags
- [`StyleSheet.toCSS()`](https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.3.0/docs/api.md#stylesheet_tocss) - Renders all registered instances as CSS
