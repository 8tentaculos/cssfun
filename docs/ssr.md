# Server-side rendering

On the server, `css()` and `createTheme()` register each StyleSheet without touching the DOM. 
`StyleSheet.toString()` renders every registered StyleSheet as a `<style>` tag, ready to embed 
in the `<head>` of the page.

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

## Hydration

Class names are hashed from the content of the styles, so the browser generates the same ones as 
the server. When `css()` runs in the browser, it finds the server-rendered `<style data-fun-uid="…">` 
tag of its StyleSheet and doesn't insert it again. A StyleSheet whose tag isn't in the page is 
attached as a new `<style>` tag at the end of the `<head>`.

## What `StyleSheet.toString()` renders

A StyleSheet is registered when its `css()` call runs, the first time its module is imported, and 
stays registered for the life of the process. `StyleSheet.toString()` renders every StyleSheet 
registered so far, not only the ones the current page uses. When every module is imported before 
the first request, that is the same set for every page.

## Code splitting

A module loaded on demand with `import()` (a page behind a route, a dialog loaded the first time 
it opens) runs its `css()` calls when it is first imported:

- **In the browser**, its StyleSheets are attached when the module loads, as new `<style>` tags at 
  the end of the `<head>`, unless the server already rendered them. They stay in the page after the 
  UI that used them is gone.
- **On the server**, they are registered the first time any request imports the module, and from 
  then on `StyleSheet.toString()` renders them for every page. What a page includes depends on the 
  modules earlier requests loaded (in a pre-render, on the pages rendered before it). Scoped class 
  names keep that harmless: a rule for a class the page doesn't use matches nothing.

### Rendering the same styles for every page

To make the output deterministic, import every module the app loads on demand before the server 
handles its first request. Keep their loaders in one module, so the router and the server share 
the list:

```javascript
// lazy.js
export const loadAbout = () => import('./pages/About.js');
export const loadSettings = () => import('./dialogs/Settings.js');
```

```javascript
// server.js
import * as loaders from './lazy.js';

// Registers the StyleSheets of every module loaded on demand
await Promise.all(Object.values(loaders).map((load) => load()));

app.listen(3000);
```

Every page then embeds the styles of the whole app, as it would without code splitting, while the 
browser still loads the JavaScript of each module on demand. With [Vite](https://vite.dev), 
`import.meta.glob('./pages/*.js', { eager : true })` in the server entry imports a whole folder.

Since the browser then finds every StyleSheet in the page, it creates no `<style>` tags of its own, 
which also lets [a CSP nonce stay on the server](#nonce-on-the-server-only).

### Order between StyleSheets

Rules of the same specificity are resolved by the order of their `<style>` tags. That order follows 
the import graph: a module's StyleSheets come after those of the modules it imports, on the server 
and in the browser. A component can therefore override the classes of a component it imports, for 
example through a class name passed as a prop:

```javascript
// Header.js imports Button, so its rules come after Button's
import Button from './Button.js';

const { classes } = css({
    compactButton : {
        padding : '0 16px'
    }
});

const Header = () => <Button className={classes.compactButton}>Menu</Button>;
```

Between modules that don't import each other, the order is the order in which they loaded, which 
code splitting makes vary between pages and between visits. Don't let rules of the same specificity 
from such modules compete for the same element: raise the specificity of the rule that should win, 
or use [cascade layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer), whose order is 
set by their declaration instead of by the order of the tags:

```javascript
// layers.js, imported first by the entry
css({
    '@layer' : 'base, components, pages'
});

// Button.js
const { classes } = css({
    '@layer components' : {
        button : {
            padding : '0 32px'
        }
    }
});

// pages/Checkout.js, loaded on demand: its layer wins over `components` whatever the load order
const { classes } = css({
    '@layer pages' : {
        payButton : {
            padding : '0 48px'
        }
    }
});
```

A layer takes its place in the order where its name first appears, so declare the order in a 
StyleSheet that comes before any other using the layers. Rules outside any layer win over layered 
ones, so once you use layers, put the rules of every StyleSheet in one.

### Global styles and themes

Keep `@global` rules and themes in modules the entry imports. The global rules of a module loaded on 
demand apply to every page once it has loaded, for the rest of the visit in the browser and for 
every later request on the server, not only to the UI that module renders.

## Content Security Policy (CSP)

With a strict [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) that 
allows styles by nonce (`style-src 'nonce-…'`), every `<style>` tag needs the nonce of the response: 
the ones `StyleSheet.toString()` renders on the server and the ones `attach()` creates in the browser. 
The browser creates a tag for each StyleSheet that isn't already in the page:

- all of them, in an app rendered only in the browser;
- with server-side rendering, the StyleSheets of modules loaded after the page, unless the server 
  [renders them all](#rendering-the-same-styles-for-every-page);
- in development, a StyleSheet whose styles changed in a hot update, since new styles get a new `uid`.

A tag without the nonce is blocked: its rules don't apply, and the browser reports the violation in 
the console.

Add the nonce through the [`attributes`](./api.md#new-stylesheetstyles-options) option or member. 
Instances without their own fall back to `StyleSheet.prototype.attributes`, which is read every time 
a `<style>` tag is rendered or created, so set it there once for every StyleSheet. 
`StyleSheet.toString()` then emits `<style nonce="…" data-fun-uid="…">`.

The examples below generate a nonce for each response and send it in the policy:

```javascript
import crypto from 'node:crypto';

app.use((req, res, next) => {
    res.locals.cspNonce = crypto.randomBytes(16).toString('base64');
    // Add your other directives to the policy
    res.setHeader('Content-Security-Policy', `style-src 'nonce-${res.locals.cspNonce}'`);
    next();
});
```

### On the server

`StyleSheet.prototype` is shared by every request the process handles, and an async render lets other 
requests run while it waits. Set the nonce right before `StyleSheet.toString()`, with no `await` in 
between, so no other request can replace it:

```javascript
app.get('*', async (req, res) => {
    // Other requests may run while the page renders
    const html = await render(req.url);

    StyleSheet.prototype.attributes = { nonce : res.locals.cspNonce };
    const styles = StyleSheet.toString();

    // …embed `styles` in the <head> as in the SSR example above
});
```

When you don't call `StyleSheet.toString()` yourself, or it isn't next to the code that knows the 
nonce, read the nonce from the request context instead. The function form is called every time a 
tag is rendered, so it can read it from an 
[`AsyncLocalStorage`](https://nodejs.org/api/async_context.html#class-asynclocalstorage):

```javascript
import { AsyncLocalStorage } from 'node:async_hooks';
import { StyleSheet } from 'cssfun';

const requestContext = new AsyncLocalStorage();

// Outside a request the nonce is undefined, and attributes without a value are left out
StyleSheet.prototype.attributes = () => ({ nonce : requestContext.getStore()?.nonce });

app.use((req, res, next) => requestContext.run({ nonce : res.locals.cspNonce }, next));
```

### In the browser

Pass the nonce to the page in a `<meta>` tag in the `<head>`. [Vite](https://vite.dev/config/shared-options#html-cspnonce) 
emits this tag for its `html.cspNonce` option.

```html
<meta property="csp-nonce" nonce="${res.locals.cspNonce}">
```

Read it from the `nonce` property. When the policy comes in a header, browsers hide the attribute 
from scripts, and `getAttribute('nonce')` returns an empty string.

```javascript
// csp-nonce.js
import { StyleSheet } from 'cssfun';

const meta = document.querySelector('meta[property="csp-nonce"]');
StyleSheet.prototype.attributes = { nonce : meta?.nonce };
```

Import it in the client entry before any module that calls `css()` or `createTheme()`. Modules run 
in the order they are imported, and those calls attach their StyleSheets as their module runs.

```javascript
// entry-client.js
import './csp-nonce.js';
import App from './App.js';
```

### Pre-rendered pages

A nonce must be new for every response, so pages rendered at build time can't hold the final one. 
Render a placeholder instead, in the `<style>` tags and in the `<meta>` tag, and have the host replace 
it with a fresh value in the HTML and in the policy header of every response, for example from an 
edge function:

```javascript
// Build script, before rendering the pages
StyleSheet.prototype.attributes = { nonce : 'CSP_NONCE' };
```

### Nonce on the server only

When the server [renders every StyleSheet](#rendering-the-same-styles-for-every-page), the browser 
finds all of them in the page and creates no tags, so the nonce on the server is enough. That holds 
only while:

- every module that calls `css()` and is loaded with `import()` is imported on the server, not only 
  the pages behind routes;
- no module calls `css()` only in the browser, for example one imported only by the client entry;
- each StyleSheet has the same styles on the server and in the browser, so its `uid` matches.

When one of these breaks, the browser creates a tag without the nonce and its styles are blocked. 
Setting the nonce in the browser too keeps the page working. To find the break during development, 
report every StyleSheet the browser has to create, from a module imported first like `csp-nonce.js`:

```javascript
// Development only: every StyleSheet should be in the server-rendered page
const shouldAttachToDOM = StyleSheet.prototype.shouldAttachToDOM;

StyleSheet.prototype.shouldAttachToDOM = function () {
    const attach = shouldAttachToDOM.call(this);
    if (attach) {
        console.warn(`StyleSheet not rendered by the server: ${Object.values(this.classes).join(', ')}`);
    }
    return attach;
};
```

A hot update of a module's styles is reported too, since its new StyleSheet isn't in the page.

### Scoped alternative: a subclass

To keep the nonce off the shared prototype, for example in a library that ships its own styles 
alongside the app's, declare it on a subclass and create your StyleSheets through it. Declare 
`attributes` as a getter, so the nonce is read every time a tag is rendered or created:

```javascript
import { StyleSheet } from 'cssfun';

class CSPStyleSheet extends StyleSheet {
    get attributes() {
        return { nonce : getNonce() };
    }
}

export const css = (styles, options) => new CSPStyleSheet(styles, options).attach();
```

`getNonce` reads the nonce of each environment: the request context on the server, the `<meta>` tag 
in the browser. Import `css` from this module instead of from `cssfun`, and pass it to 
[`createTheme`](./themes.md) as [`options.createStyleSheet`](./api.md#createtheme), so the theme 
carries the nonce too:

```javascript
const theme = createTheme(themes, { createStyleSheet : css });
```

The subclass shares `StyleSheet.registry`, so `StyleSheet.toString()` still renders its instances.

## Rendering registered styles

`StyleSheet.toString()` renders the registered StyleSheets as `<style>` tags to embed in HTML, and 
`StyleSheet.toCSS()` renders them as plain CSS, for example to write an external stylesheet. Both 
render what is registered when they are called: to write a stylesheet for the whole app, first 
import every module that calls `css()`, including the ones loaded on demand.

```javascript
// <style> tags, to embed in HTML
const styles = StyleSheet.toString();

// Plain CSS
const cssText = StyleSheet.toCSS();
```
