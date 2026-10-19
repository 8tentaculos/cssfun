---
name: cssfun
description: Styles web apps with CSSFUN, the near-zero runtime CSS-in-JS library — css() style sheets with scoped class names, nested selectors, class references, global styles, at-rules, themes with light and dark CSS variables, and server-side rendering. Use when writing, reviewing or debugging code that imports `cssfun`, or when the user asks about CSSFUN styles or themes.
license: MIT
metadata:
  version: "0.3.0"
---

# CSSFUN

Compact reference for styling with CSSFUN: core API, style syntax, themes and best practices. Full API: [api.md](https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.3.0/docs/api.md).

Read these when the task needs them:

- [references/ssr.md](references/ssr.md) — rendering styles on the server.
- [references/advanced.md](references/advanced.md) — using `StyleSheet` directly, options such as `prefix` and `attributes`, and custom renderers.
- [references/typescript.md](references/typescript.md) — inferred `classes`, CSS property autocomplete and exported types.

## Core API

### Creating Styles

`css(styles)` creates a StyleSheet instance and attaches it to the DOM. The instance's `classes` object maps each class name in `styles` to its generated, unique class name.

```js
import { css } from 'cssfun';

// ✅ Called at module level: CSS and class names are generated once, when the module loads
const { classes } = css({
    button : {
        backgroundColor : 'blue',
        color : 'white',
        padding : '10px',
        borderRadius : '5px'
    }
});

// Use the generated class name
const Button = () => <button className={classes.button}>Click me</button>;
```

**Key Points:**
- Generation happens once, when `css()` is called — never during rendering. Call it at module level
- No manual style injection: `css()` attaches the styles itself
- Each `css()` call creates a separate StyleSheet with its own scoped class names

**Class Name Generation:**
- **Which keys**: keys matching `/^\w+$/`, at the top level and inside at-rule blocks. The same name used in several places shares one class
- **Development format**: `{prefix}-{uid}-{name}` → `fun-9qkk9s-button`
- **Production format**: `{prefix[0]}-{uid}-{index}` → `f-9qkk9s-1` (shorter CSS output)
- **Stable**: `uid` is hashed from the styles' content, so the same styles produce the same class names on server and client

The examples below show the development format.

**Related API:**
- [`css(styles, [options])`](https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.3.0/docs/api.md#css) - Creates and attaches a StyleSheet

### Style Object Structure

Top-level keys are class names (or selectors and at-rules, covered below). Each value is a style object holding CSS properties and nested rules. Property keys are written in camelCase and rendered in dashed-case.

```js
// ✅ Several classes in one StyleSheet; camelCase properties become dashed-case
const { classes } = css({
    container : {
        display : 'flex',
        gap : '10px'
    },
    button : {
        backgroundColor : 'blue',  // → background-color
        fontSize : '16px'          // → font-size
    }
});

// ✅ An array value emits the property once per element (CSS fallback values)
css({
    root : {
        color : ['#eee', 'var(--bg)']  // → color: #eee; color: var(--bg);
    }
});
```

## Selectors and Nesting

### Nested Selectors with `&`

Inside a rule, `&` stands for the parent selector. Use it for pseudo-classes, pseudo-elements and descendant selectors.

```js
// ✅ Pseudo-classes
css({
    button : {
        backgroundColor : 'white',
        '&:hover' : {
            backgroundColor : 'black'
        },
        '&:disabled' : {
            opacity : 0.5,
            cursor : 'not-allowed'
        }
    }
});

// ✅ Descendant selectors
css({
    card : {
        padding : '20px',
        '& h2' : {
            marginTop : 0
        }
    }
});

// ✅ Deep nesting
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
});
```

**Deep nesting renders to:**
```css
.fun-9qkk9s-button { background-color: white; }
.fun-9qkk9s-button:active { background-color: black; }
.fun-9qkk9s-button:active:hover { background-color: blue; }
```

### Class References with `$`

`$name` is replaced by the generated class name of `name` from the same StyleSheet. Use it in top-level selectors that target another class.

```js
// ✅ Reference other classes
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
});
```

**Renders to:**
```css
.fun-9qkk9s-button { background-color: white; }
.fun-9qkk9s-button:hover { background-color: black; }
.fun-9qkk9s-button span { color: blue; }
```

**When to use `&` vs `$`:**
- Use `&` when nesting within the same class definition
- Use `$` when creating separate top-level rules that reference other classes

### Global Selectors

`@global` renders selectors as written, without generating classes. At the top level the rules are global; nested inside a class, they are scoped to descendants of that class.

```js
// ✅ Global block
css({
    '@global' : {
        body : {
            margin : 0,
            fontFamily : 'Arial, sans-serif'
        },
        '*' : {
            boxSizing : 'border-box'
        }
    }
});

// ✅ Global prefix
css({
    '@global body' : {
        backgroundColor : 'black'
    }
});

// ✅ Nested global block
css({
    card : {
        '@global' : {
            a : {
                color : 'blue'
            }
        }
    }
});
// → .fun-9qkk9s-card a { color: blue; }

// ✅ Nested global prefix
css({
    card : {
        '@global a' : {
            color : 'blue'
        }
    }
});
// → .fun-9qkk9s-card a { color: blue; }
```

### At-rules

- **Blocks that hold style rules** — `@media`, `@supports`, `@layer`, `@container`, `@scope` and `@starting-style` — declare classes directly, with the same rule as the top level.
- **Blocks that hold steps or descriptors** — `@keyframes`, `@property`, `@font-face`, `@page`, … — never generate classes.
- **Statements** (at-rules without a block) use the at-rule name as the key and its prelude as the value. The prelude is emitted as written.

```js
// ✅ Classes inside layer blocks — no empty top-level declaration needed
const { classes } = css({
    '@layer' : 'base, theme',       // → @layer base, theme;
    '@layer base' : {
        button : {
            color : 'black',
            '&:hover' : { color : 'blue' }
        }
    },
    '@layer theme' : {
        button : { color : 'red' }  // same generated class
    }
});

// ✅ Overriding a class in a media query
css({
    button : { color : 'black' },
    '@media (min-width: 768px)' : {
        button : { color : 'blue' }   // same class; `$button` also works
    }
});

// ✅ Statements
css({
    '@import' : 'url("reset.css") layer(base)',  // → @import url("reset.css") layer(base);
    '@charset' : '"utf-8"'                        // → @charset "utf-8";
});

// ✅ An array value emits one statement per element, so the same at-rule can repeat
css({
    '@import' : ['url("reset.css")', 'url("theme.css") layer(base)']
});
// → @import url("reset.css");
//   @import url("theme.css") layer(base);
```

**Key Points:**
- Rules are rendered in the order their keys are written, so put `@import` first

## Themes

A theme is a StyleSheet that defines CSS variables for each color scheme. With the default `light dark` color scheme it follows the system preference, which a `data-color-scheme="light"` or `"dark"` attribute on an ancestor element overrides.

### Creating Themes

Each key of the themes object (`light`, `dark` or `normal`) is a color scheme; its values become CSS variables.

```js
import { createTheme } from 'cssfun';

// ✅ Light and dark color schemes
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

**Variable names:** `--{cssVarsPrefix}-{key}`, with nested keys joined by `-`. Keys are kept as written, not converted to dashed-case:

| Theme value | CSS variable |
| --- | --- |
| `{ colorPrimary : 'black' }` | `--fun-colorPrimary` |
| `{ colors : { primary : 'blue' } }` | `--fun-colors-primary` |

### Applying Themes

The theme's `root` class defines the variables on its element and makes them available to all its descendants.

```js
// ✅ Apply the theme to the entire page
document.body.classList.add(theme.classes.root);

// ✅ Or to part of the UI
const App = () => (
    <div className={theme.classes.root}>
        <Header />
        <Main />
    </div>
);
```

### Using Theme Variables

Reference the variables with `var()` in any StyleSheet. Elements update automatically when the theme or the system color scheme changes.

```js
// ✅ Use theme variables in styles
const { classes } = css({
    button : {
        color : 'var(--fun-colorPrimary)',
        backgroundColor : 'var(--fun-backgroundLevel1)'
    }
});
```

### Theme Options

```js
// ✅ Fixed color scheme
const lightTheme = createTheme({
    light : { color : 'black' }
}, {
    colorScheme : 'light'  // 'light', 'dark', 'light dark' (default) or 'normal'
});

// ✅ Custom CSS variable prefix
const appTheme = createTheme({
    light : { color : 'black' },
    dark : { color : 'white' }
}, {
    cssVarsPrefix : 'myapp'  // → --myapp-color instead of --fun-color
});
```

**Related API:**
- [`createTheme(themes, [options])`](https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.3.0/docs/api.md#createtheme) - Creates a theme StyleSheet

## Best Practices

### Style Organization

- ✅ Create one StyleSheet per component or feature, at module level
- ✅ Name classes after the parts of the component they style
- ✅ Use theme variables for colors, spacing and other design tokens
- ✅ For values that change at runtime, update a CSS variable or an inline style — don't create new style sheets

### Selector Usage

- ✅ Use `&` for pseudo-classes and nested selectors within the same class
- ✅ Use `$` for referencing other classes in separate rules
- ✅ Use `@global` sparingly — prefer scoped styles
- ✅ Avoid nesting more than 3 levels deep

### Theme Management

- ✅ Define themes at the application level
- ✅ Apply the theme's `root` class to `body` or the app's root element
- ✅ Group related variables in nested objects (`colors`, `spacing`, …)
- ✅ Define both `light` and `dark` when possible

### Common Mistakes to Avoid

- ❌ Calling `css()` inside render functions — call it at module level
- ❌ Forgetting to apply the theme's `root` class — the variables stay undefined
- ❌ Writing theme variables in dashed-case (`--fun-color-primary` for `colorPrimary`) — keys are kept as written

### Example: Complete Component

```js
import { css, createTheme } from 'cssfun';

// ✅ Theme defined at module level
const theme = createTheme({
    light : {
        colors : { primary : 'blue', text : 'black' },
        spacing : { small : '8px', medium : '16px' }
    },
    dark : {
        colors : { primary : 'lightblue', text : 'white' },
        spacing : { small : '8px', medium : '16px' }
    }
});

document.body.classList.add(theme.classes.root);

// ✅ Styles defined at module level
const { classes } = css({
    button : {
        color : 'var(--fun-colors-text)',
        backgroundColor : 'var(--fun-colors-primary)',
        padding : 'var(--fun-spacing-medium)',
        borderRadius : '4px',
        border : 'none',
        cursor : 'pointer',
        '&:hover' : {
            opacity : 0.9
        },
        '&:disabled' : {
            opacity : 0.5,
            cursor : 'not-allowed'
        }
    }
});

// ✅ Component uses classes
const Button = ({ children, disabled, onClick }) => (
    <button
        className={classes.button}
        disabled={disabled}
        onClick={onClick}
    >
        {children}
    </button>
);
```

## Additional Resources

- **Full API Documentation**: [api.md](https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.3.0/docs/api.md)
- **Writing styles**: [styles.md](https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.3.0/docs/styles.md) — class name generation and the full style syntax
- **Themes**: [themes.md](https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.3.0/docs/themes.md) — color schemes and CSS variables
- **GitHub Repository**: [8tentaculos/cssfun](https://github.com/8tentaculos/cssfun)
- **Examples**: [example/](https://github.com/8tentaculos/cssfun/tree/master/example) — vanilla, React and Rasti
