# CSSFUN API Reference for AI Agents

This document provides a comprehensive reference for AI agents working with the CSSFUN library. It covers the core API patterns, style syntax, theme management, and best practices.

For detailed API documentation, see: [API Documentation](https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.0.13/docs/api.md)

## 🔧 Core API

### Creating Styles

The `css()` function creates and attaches a new StyleSheet instance to the DOM. It returns a StyleSheet instance with a `classes` object mapping original class names to generated unique class names.

```js
import { css } from 'cssfun';

// ✅ Basic usage - returns StyleSheet instance with classes property
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
- `css()` automatically attaches styles to the DOM
- Returns a StyleSheet instance with `classes` property
- Class names are automatically scoped and unique
- Styles are generated at module initialization (near-zero runtime)
- Classes are created immediately when `css()` is called, not during rendering

**Class Name Generation:**
- **When**: Generated at StyleSheet instance creation (when `css()` is called)
- **Which**: Only top-level selectors matching valid class name patterns (alphanumeric, no special chars)
- **Format (Development)**: `{prefix}-{uid}-{className}` → `.fun-9qkk9s-button`
- **Format (Production)**: `{prefix[0]}-{uid}-{index}` → `.f-9qkk9s-1` (optimized for smaller bundle)
- **Access**: Via `classes` object: `classes.button` returns the generated class name

**Related API:**
- [`css(styles, [options])`](https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.0.13/docs/api.md#css) - Creates and attaches a StyleSheet

### Style Object Structure

Style objects use camelCase keys that are automatically converted to dashed-case CSS properties. Keys represent CSS selectors, and values are style objects.

```js
// ✅ CamelCase properties are converted to dashed-case
css({
    button : {
        backgroundColor : 'blue',  // → background-color
        fontSize : '16px',          // → font-size
        paddingTop : '10px'         // → padding-top
    }
});

// ✅ Multiple classes in one StyleSheet
const { classes } = css({
    container : {
        display : 'flex',
        gap : '10px'
    },
    button : {
        backgroundColor : 'blue'
    },
    link : {
        color : 'blue',
        textDecoration : 'none'
    }
});
```

## 🎯 Selectors and Nesting

### Nested Selectors with `&`

Use `&` to reference the parent selector in nested styles. This allows you to create pseudo-classes, pseudo-elements, and descendant selectors.

```js
// ✅ Pseudo-classes
css({
    button : {
        backgroundColor : 'white',
        '&:hover' : {
            backgroundColor : 'black'
        },
        '&:active' : {
            backgroundColor : 'blue'
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
        },
        '& p' : {
            lineHeight : 1.6
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

**Renders to (development mode):**
```css
.fun-9qkk9s-button { background-color: white; }
.fun-9qkk9s-button:active { background-color: black; }
.fun-9qkk9s-button:active:hover { background-color: blue; }
```

**Note:** In production, class names are optimized: `.f-9qkk9s-1`, `.f-9qkk9s-2`, etc.

### Class References with `$`

Use `$` to reference other classes within the same StyleSheet instance. This is useful for creating selectors that reference other classes.

```js
// ✅ Reference other classes
css({
    button: {
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

**Renders to (development mode):**
```css
.fun-9qkk9s-button { background-color: white; }
.fun-9qkk9s-button:hover { background-color: black; }
.fun-9qkk9s-button span { color: blue; }
```

**Note:** In production, class names are optimized: `.f-9qkk9s-1`, `.f-9qkk9s-2`, etc.

**When to use `&` vs `$`:**
- Use `&` when nesting within the same class definition
- Use `$` when creating separate top-level rules that reference other classes

### Global Selectors

Use `@global` to create global styles that are not scoped to a component.

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
    },
    '@global a' : {
        color : 'blue'
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
// Renders to (dev): .fun-9qkk9s-card a { color: blue; }
// Renders to (prod): .f-9qkk9s-1 a { color: blue; }

// ✅ Nested global prefix
css({
    card : {
        '@global a' : {
            color : 'blue'
        }
    }
});
// Renders to (dev): .fun-9qkk9s-card a { color: blue; }
// Renders to (prod): .f-9qkk9s-1 a { color: blue; }
```

## 🎨 Themes

Themes provide CSS variables for consistent styling across your application. They support multiple color schemes (`light`, `dark`, `light dark`, `normal`) and automatically adapt to system preferences.

### Creating Themes

```js
import { createTheme } from 'cssfun';

// ✅ Basic theme with light and dark modes
const theme = createTheme({
    light : {
        colorPrimary : 'black',
        backgroundLevel1 : 'white',
        backgroundLevel2 : '#f5f5f5'
    },
    dark : {
        colorPrimary : 'white',
        backgroundLevel1 : 'black',
        backgroundLevel2 : '#1a1a1a'
    }
});

// ✅ Nested theme structure
const theme = createTheme({
    light : {
        colors : {
            primary : 'blue',
            secondary : 'green'
        },
        spacing : {
            small : '8px',
            medium : '16px'
        }
    },
    dark : {
        colors : {
            primary : 'lightblue',
            secondary : 'lightgreen'
        },
        spacing : {
            small : '8px',
            medium : '16px'
        }
    }
});
// Generates: --fun-colors-primary, --fun-spacing-small, etc.
```

### Applying Themes

Themes generate a `root` class that exposes CSS variables to its element and descendants.

```js
// ✅ Apply theme to entire page
const theme = createTheme({
    light : { colorPrimary : 'black', backgroundLevel1 : 'white' },
    dark : { colorPrimary : 'white', backgroundLevel1 : 'black' }
});

document.body.classList.add(theme.classes.root);

// ✅ Apply theme to specific component
const App = () => (
    <div className={theme.classes.root}>
        <Header />
        <Main />
    </div>
);
```

### Using Theme Variables

Theme variables are automatically available as CSS custom properties. Use them in your component styles with `var()`.

```js
// ✅ Use theme variables in styles
const theme = createTheme({
    light: { colorPrimary : 'black', backgroundLevel1 : 'white' },
    dark: { colorPrimary : 'white', backgroundLevel1 : 'black' }
});

const { classes } = css({
    button : {
        color : 'var(--fun-colorPrimary)',
        backgroundColor : 'var(--fun-backgroundLevel1)'
    }
});

// ✅ Nested theme variables
const theme = createTheme({
    light : {
        colors : { primary : 'blue' },
        spacing : { small : '8px' }
    },
    dark : {
        colors : { primary : 'lightblue' },
        spacing : { small : '8px' }
    }
});

const { classes } = css({
    button : {
        color : 'var(--fun-colors-primary)',
        padding : 'var(--fun-spacing-small)'
    }
});
```

### Theme Options

```js
// ✅ Custom color scheme
const theme = createTheme({
    light : { color : 'black' },
    dark : { color : 'white' }
}, {
    colorScheme : 'light'  // Use only light theme
    // Options: 'light', 'dark', 'light dark' (default), 'normal'
});

// ✅ Custom CSS variable prefix
const theme = createTheme({
    light : { color : 'black' }
}, {
    cssVarsPrefix : 'myapp'  // Generates --myapp-color instead of --fun-color
});
```

**Related API:**
- [`createTheme(themes, [options])`](https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.0.13/docs/api.md#createtheme) - Creates a theme StyleSheet

## 🚀 Server-Side Rendering (SSR)

CSSFUN supports server-side rendering by rendering all StyleSheet instances as strings that can be embedded in HTML.

### Basic SSR Pattern

```js
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StyleSheet, createTheme } from 'cssfun';
import App from './App.js';

const theme = createTheme({
    light : { bg : '#fff', color : '#000' },
    dark : { bg : '#000', color : '#fff' }
});

const app = express();

app.get('*', (req, res) => {
    // Render the app (this creates StyleSheet instances)
    const html = renderToString(<App />);
    
    // Get all generated styles as string
    const styles = StyleSheet.toString();
    
    // Get theme root class
    const themeClass = theme.classes.root;
    
    const template = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>SSR App</title>
                ${styles}
            </head>
            <body class="${themeClass}">
                <div id="root">${html}</div>
                <script src="/bundle.js"></script>
            </body>
        </html>
    `;
    
    res.send(template);
});
```

### SSR Best Practices

```js
// ✅ Use StyleSheet.toString() for full HTML style tags
const styles = StyleSheet.toString();
// Returns: <style data-fun-uid="...">...</style>

// ✅ Use StyleSheet.toCSS() for external CSS files
const css = StyleSheet.toCSS();
// Returns: CSS string without style tags
```

**Related API:**
- [`StyleSheet.toString()`](https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.0.13/docs/api.md#stylesheet_tostring) - Static method to render all instances as HTML
- [`StyleSheet.toCSS()`](https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.0.13/docs/api.md#stylesheet_tocss) - Static method to render all instances as CSS

## 🛠️ Advanced Usage

### StyleSheet Class Direct Usage

You can use the StyleSheet class directly for more control, but `css()` is recommended for most cases.

```js
import { StyleSheet } from 'cssfun';

// ✅ Create without auto-attaching
const sheet = new StyleSheet({
    button : { backgroundColor : 'blue' }
});

// Manually attach
sheet.attach();

// Or render as string for SSR
const styles = sheet.toString();
```

### Custom Options

```js
// ✅ Custom prefix
const { classes } = css({
    button : { color : 'red' }
}, {
    prefix : 'myapp'  // Generates .myapp-9qkk9s-button (dev) or .m-9qkk9s-1 (prod) instead of .fun-9qkk9s-button
});

// ✅ Custom attributes for style element
const { classes } = css({
    button: { color: 'red' }
}, {
    attributes: {
        'data-module' : 'button-styles'
    }
});

// ✅ Custom shouldAttachToDOM function
const sheet = new StyleSheet({
    button : { color : 'red' }
}, {
    shouldAttachToDOM : () => false
});
```

### Custom Renderers

You can customize how styles are processed by providing custom renderers.

```js
// ✅ Custom renderers
const { classes } = css({
    button: { color: 'red' }
}, {
    renderers: [
        'parseStyles',  // Built-in parser
        'renderStyles', // Built-in renderer
        function(styles) {
            // Custom processing
            return styles;
        }
    ]
});
```

**Related API:**
- [`StyleSheet`](https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.0.13/docs/api.md#stylesheet) - StyleSheet class documentation

## ⚠️ CSSFUN Best Practices

### Style Organization

- ✅ Create one StyleSheet per component or feature
- ✅ Use descriptive class names that match component structure
- ✅ Group related styles together
- ✅ Use theme variables for colors, spacing, and other design tokens
- ✅ Avoid inline styles when using CSSFUN

### Selector Usage

- ✅ Use `&` for pseudo-classes and nested selectors within the same class
- ✅ Use `$` for referencing other classes in separate rules
- ✅ Use `@global` sparingly - prefer scoped styles
- ✅ Avoid deep nesting (more than 3 levels)

### Theme Management

- ✅ Define themes at the application level
- ✅ Apply theme root class to body or root element
- ✅ Use theme variables consistently across components
- ✅ Support both light and dark modes when possible
- ✅ Use nested theme structure for better organization

### Performance

- ✅ Styles are generated at module initialization (near-zero runtime)
- ✅ Multiple `css()` calls create separate StyleSheet instances
- ✅ Class names are automatically scoped and unique
- ✅ No need to manually manage style injection

### Common Mistakes to Avoid

- ❌ Don't use `css()` inside render functions - call it at module level
- ❌ Don't forget to apply theme root class when using themes
- ❌ Don't use `var()` without creating a theme first
- ❌ Don't mix `&` and `$` unnecessarily - use `&` for nesting, `$` for references
- ❌ Don't create global styles unless necessary

### Example: Complete Component

```js
import { css, createTheme } from 'cssfun';

// ✅ Theme defined at module level
const theme = createTheme({
    light : {
        colors : { primary : 'blue', text : 'black' },
        spacing : { small : '8px', medium : '16px' }
    },
    dark: {
        colors: { primary : 'lightblue', text : 'white' },
        spacing: { small : '8px', medium : '16px' }
    }
});

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

- **Full API Documentation**: [api.md](https://cdn.jsdelivr.net/gh/8tentaculos/cssfun@v0.0.13/docs/api.md)
- **GitHub Repository**: [8tentaculos/cssfun](https://github.com/8tentaculos/cssfun)
- **Examples**: Check the `example/` folder in the repository
