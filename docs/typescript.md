# TypeScript

**CSSFUN** ships with TypeScript declarations out of the box. The types are bundled in the package and resolved automatically.

> Requires **TypeScript 4.1+** (the `classes` inference relies on key remapping and template literal types).

## Class name inference

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

The type mirrors the runtime: keys matching `/^\w+$/` at the top level and inside [at-rule blocks](./styles.md#at-rules).

```ts
const sheet = css({
    '@layer base' : { button : { color : 'red' } },
    '@layer theme' : { button : { color : 'blue' } },
    '@layer' : 'base, theme'
});

sheet.classes.button; // string — one class shared by both layers
```

> **Note**: inside a block, a class named after a CSS property (`content`, `page`, `grid`, `flex`, …) doesn't type-check,
> since the block's value type declares those keys as CSS properties. Declare that class at the top level and reference
> it from the block with `$name`.

## CSS property autocomplete

Style rules use [`csstype`](https://github.com/frenic/csstype) under the hood, so you get autocomplete on standard CSS properties, with `null`/`undefined` accepted (and filtered at runtime). Note that values are intentionally permissive (any `string` is accepted) so that `var(...)`, custom values and arbitrary nested selectors keep working — so this is autocomplete, not strict validation:

```ts
css({
    card : {
        color : 'red',
        backgroundColor : null, // ok — filtered at runtime
        margin : undefined,     // ok
        padding : 10,           // numbers accepted for length props
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

## Exported types

The following types are exported from the package root for use in your own code:

```ts
import type {
    CSSValue,
    CSSProperties,
    StyleRule,
    Styles,
    StyleSheetOptions,
    RendererFn,
    Resolvable,
    ResolvableOption,
    ThemeDefinition,
    ThemeVars,
    CreateThemeOptions
} from 'cssfun';
```
