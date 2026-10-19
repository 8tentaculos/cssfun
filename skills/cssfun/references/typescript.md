# CSSFUN and TypeScript

Full guide: [typescript.md](https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.3.0/docs/typescript.md).

CSSFUN ships its own TypeScript declarations; there is no `@types/cssfun` package. Requires **TypeScript 4.1+**, since `classes` inference relies on key remapping and template literal types.

## Inferred `classes`

`css()` and the `StyleSheet` constructor are generic over the styles object, so `classes` is typed from the keys passed in. Typos and missing keys are compile-time errors.

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

- `classes` includes the same keys as at runtime: keys matching `/^\w+$/` at the top level and inside the [at-rule blocks that nest style rules](../SKILL.md#at-rules)
- Inside a block, a class named after a CSS property (`content`, `page`, `grid`, `flex`, …) doesn't type-check, because the block types that key as a property. Declare the class at the top level and reference it with `$name`

## CSS Property Autocomplete

Style rules are typed with [`csstype`](https://github.com/frenic/csstype), which gives autocomplete for standard properties and their values. Typing is deliberately loose so `var(...)`, custom values and nested selectors keep working:

- Any `string` is accepted as a value, and numbers are accepted for length properties
- `null` and `undefined` are accepted and dropped from the output
- Unknown property names are not errors, because any key may be a nested selector or at-rule

## Exported Types

| Type | Describes |
| --- | --- |
| `Styles` | The styles object passed to `css()` / `StyleSheet` |
| `StyleRule` | A rule: CSS properties plus nested selectors and at-rules |
| `CSSProperties` | CSS properties with csstype autocomplete |
| `CSSValue` | A property value: `string`, `number`, `null` or `undefined` |
| `StyleSheetOptions` | Options for `css()` / `StyleSheet` |
| `RendererFn` | A renderer function, called with the StyleSheet as `this` |
| `Resolvable<T>`, `ResolvableOption<T>` | A value or a function returning it (`attributes`, `renderers`) |
| `ThemeDefinition` | The themes object passed to `createTheme()` (`light`, `dark`, `normal`) |
| `ThemeVars` | Nested theme variables |
| `CreateThemeOptions` | Options for `createTheme()` |

```ts
import type { Styles, StyleSheetOptions, ThemeDefinition } from 'cssfun';
```

## Typing Options and Subclasses

```ts
import { StyleSheet } from 'cssfun';
import type { StyleSheetOptions } from 'cssfun';

// ✅ Option callbacks are called with the StyleSheet as `this`
const options : StyleSheetOptions = {
    prefix : 'app',
    generateClassName(className, index) {
        return `${this.prefix}-${className}-${index}`;
    }
};

// ✅ In a subclass, declare `attributes` and `renderers` as getters
class ScopedStyleSheet extends StyleSheet {
    get attributes() {
        return { 'data-scope' : 'app' };
    }
}
```

A method named `attributes()` or `renderers()` works in JavaScript, but TypeScript rejects a method that overrides a property, so TypeScript subclasses use a getter.
