# CSSFUN advanced usage

Full guide, including subclassing and separate registries: [extending.md](https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.3.0/docs/extending.md).

## Using the StyleSheet Class Directly

`css(styles, options)` is shorthand for `new StyleSheet(styles, options).attach()`. Use the class directly to decide when, or whether, to attach.

```js
import { StyleSheet } from 'cssfun';

// ✅ Created, not attached yet
const sheet = new StyleSheet({
    button : { backgroundColor : 'blue' }
});

sheet.classes.button; // class names are available right away

// Renders this instance as a <style> tag string
const styles = sheet.toString();

// Registers the instance and injects it into the DOM (in the browser)
sheet.attach();
```

`attach()` also adds the instance to the registry that the static `StyleSheet.toString()` and `StyleSheet.toCSS()` render, so an instance that is never attached is left out of them.

## Options

`css()` and `new StyleSheet()` accept the same options.

```js
import { css } from 'cssfun';

// ✅ Custom prefix
const button = css({
    button : { color : 'red' }
}, {
    prefix : 'myapp'  // → myapp-9qkk9s-button (dev), m-9qkk9s-1 (prod)
});

// ✅ Attributes for the <style> element
const link = css({
    link : { color : 'blue' }
}, {
    attributes : { 'data-module' : 'link-styles' }
});

// ✅ Registered for StyleSheet.toString() / toCSS(), never injected into the DOM
const card = css({
    card : { padding : '16px' }
}, {
    shouldAttachToDOM : () => false
});
```

- `attributes` may also be a function returning the object. It is called each time the styles are rendered, so it can return per-request values such as a CSP nonce
- `generateClassName(className, index)` and `generateUid()` replace the built-in class name and uid generation
- To change the prefix for every StyleSheet, set `StyleSheet.prefix` instead of passing the option each time

## Custom Renderers

`renderers` is the pipeline that turns the styles object into CSS. Each renderer receives the previous one's output and is called with the StyleSheet instance as `this`. Items are functions or names of instance methods. The default is `['parseStyles', 'renderStyles']`:

1. `parseStyles` — expands nesting, `$` references and `@global`, and converts camelCase properties to dashed-case
2. `renderStyles` — converts the parsed object into a CSS string

Add a function before `parseStyles` to transform the styles object, or after `renderStyles` to transform the CSS string.

```js
// ✅ Post-process the CSS string
const { classes } = css({
    button : { color : 'red' }
}, {
    renderers : [
        'parseStyles',
        'renderStyles',
        function (cssText) {
            return `/* ${this.uid} */\n${cssText}`;
        }
    ]
});
```

**Related API:**
- [`StyleSheet`](https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.3.0/docs/api.md#stylesheet) - StyleSheet class documentation
