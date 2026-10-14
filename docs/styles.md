# Writing styles

Styles are plain objects. `css()` turns them into CSS and maps each class name selector to a generated class name.

## Class name generation

`css(styles)` returns a [`StyleSheet`](./api.md#stylesheet) instance. Its `classes` property maps class name selectors to their generated unique class name:

```javascript
const sheet = css({
    button : { color : 'red' },
    link : { color : 'blue' }
});

sheet.classes;        // { button: "fun-9qkk9s-button", link: "fun-9qkk9s-link" }
sheet.classes.button; // "fun-9qkk9s-button"
```

Destructure `classes` to use the generated names as `className`:

```javascript
const { classes } = css({ button : { color : 'red' } });

const Button = () => <button className={classes.button}>Click me</button>;
```

Generation happens once, when the instance is created — never during rendering — so there is no per-render overhead.

### Which selectors get a class

Keys matching `/^\w+$/` (letters, digits, underscore) at the top level and inside [at-rule blocks](#at-rules) get a generated class. The same name used in several places shares a single class.

### Stable across environments

Each class name embeds a `uid` hashed from the styles' content, so identical styles always produce identical class names — across server and client, hot reloads, and repeated calls. This is what makes [SSR hydration](./ssr.md) seamless.

### Name format

The format depends on the build:

| Build | Format | Example |
| --- | --- | --- |
| Development | `{prefix}-{uid}-{name}` | `fun-9qkk9s-button` |
| Production | `{prefix[0]}-{uid}-{index}` | `f-9qkk9s-1` |

In production, the original name is replaced by a 1-based index to keep the output small. The default `prefix` is `fun`, held as a static on the class: set `StyleSheet.prefix` to change it globally, declare it on a subclass to scope it, or pass [`options.prefix`](./api.md#new-stylesheetstyles-options) for a single stylesheet.

> **Note**: Examples in this documentation use the development format for readability.
> You can override generation via [`options.generateClassName`](./api.md#new-stylesheetstyles-options) or by [extending `StyleSheet`](./api.md#stylesheet__generateclassname).

## Style syntax

The built-in [renderers](./extending.md#renderers) turn the style object into CSS with these transformations:

### Camelized keys will be transformed to dashed keys

```javascript
css({
    root : {
        backgroundColor : 'black',
        fontSize : '16px',
        paddingTop : '10px'
    }
}).toString();
```

##### Renders to:

```html
<style data-fun-uid="uwitok">
    .fun-uwitok-root {
        background-color: black;
        font-size: 16px;
        padding-top: 10px;
    }
</style>
```

### Nested selectors will be expanded

- **Use `&` to reference the selector of the parent rule**

    ```javascript
    css({
        button : {
            backgroundColor : 'white',
            '&:hover' : {
                backgroundColor : 'black'
            },
            '& span' : {
                color : 'blue'
            }
        }
    }).toString();
    ```

    ##### Renders to:
    ```html
    <style data-fun-uid="1pxyvx7">
        .fun-1pxyvx7-button {
            background-color: white;
        }
        .fun-1pxyvx7-button:hover {
            background-color: black;
        }
        .fun-1pxyvx7-button span {
            color: blue;
        }
    </style>
    ```

- **Deep nesting**

    ```javascript
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
    }).toString();
    ```

    ##### Renders to:
    ```html
    <style data-fun-uid="169vukw">
        .fun-169vukw-button {
            background-color: white;
        }
        .fun-169vukw-button:active {
            background-color: black;
        }
        .fun-169vukw-button:active:hover {
            background-color: blue;
        }
    </style>
    ```

### Class references will be replaced by the generated class name

 - **Use `$` to reference a local class within the same `StyleSheet` instance**

    ```javascript
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
    }).toString();
    ```

    ##### Renders to:
    ```html
    <style data-fun-uid="2xfpy0">
        .fun-2xfpy0-button {
            background-color: white;
        }
        .fun-2xfpy0-button:hover {
            background-color: black;
        }
        .fun-2xfpy0-button span {
            color: blue;
        }
    </style>
    ```
 
### Global selectors will be rendered as global styles

- **Global block**

    ```javascript
    css({
        '@global' : {
            body : {
                backgroundColor : 'black'
            }
        }
    }).toString();
    ```

    ##### Renders to:

    ```html
    <style data-fun-uid="ml03n3">
        body {
            background-color: black;
        }
    </style>
    ```

- **Nested global block**

    ```javascript
    css({
        root : {
            '@global' : {
                a : {
                    color : 'black'
                }
            }
        }
    }).toString();
    ```

    ##### Renders to:
    ```html
    <style data-fun-uid="1eia2eq">
        .fun-1eia2eq-root a {
            color: black;
        }
    </style>
    ```

- **Global prefix**

    ```javascript
    css({
        '@global body' : {
            backgroundColor : 'black'
        }
    }).toString();
    ```

    ##### Renders to:
    ```html
    <style data-fun-uid="1p1av20">
        body {
            background-color: black;
        }
    </style>
    ```

- **Nested global prefix**

    ```javascript
    css({
        root : {
            '@global a' : {
                color : 'black'
            }
        }
    }).toString();
    ```

    ##### Renders to:
    ```html
    <style data-fun-uid="xvd6jj">
        .fun-xvd6jj-root a {
            color: black;
        }
    </style>
    ```

### At-rules

- **Blocks** can declare classes directly — same rule as the top level, so a `@layer` needs no empty top-level
  declaration. The same name used in several blocks shares one class:

    ```javascript
    const { classes } = css({
        '@layer base' : {
            button : {
                color : 'black',
                '&:hover' : {
                    color : 'blue'
                }
            }
        },
        '@layer theme' : {
            button : {
                color : 'red'
            }
        }
    });

    classes.button; // "fun-11ez4g7-button" — the same class in both layers
    ```

    ##### Renders to:
    ```html
    <style data-fun-uid="11ez4g7">
        @layer base {
            .fun-11ez4g7-button {
                color: black;
            }
            .fun-11ez4g7-button:hover {
                color: blue;
            }
        }
        @layer theme {
            .fun-11ez4g7-button {
                color: red;
            }
        }
    </style>
    ```

- **Statements** (at-rules without a block) are written as the at-rule name with its prelude as the value. The prelude is
  emitted as it is written:

    ```javascript
    css({
        '@import' : 'url("reset.css") layer(base)',
        '@layer'  : 'base, components, utilities',
        button    : {
            color : 'red'
        }
    }).toString();
    ```

    ##### Renders to:
    ```html
    <style data-fun-uid="l17gmc">
        @import url("reset.css") layer(base);
        @layer base, components, utilities;
        .fun-l17gmc-button {
            color: red;
        }
    </style>
    ```

    Object keys are unique, but an array value emits one statement per element, so a name can repeat — for example, several `@import` rules:

    ```javascript
    css({
        '@import' : ['url("reset.css")', 'url("theme.css") layer(base)']
    }).toString();
    ```

    ##### Renders to:
    ```html
    <style data-fun-uid="l17gmc">
        @import url("reset.css");
        @import url("theme.css") layer(base);
    </style>
    ```

    The same array form applies to properties, providing CSS fallback values (`color : ['#eee', 'var(--bg)']` renders
    `color: #eee;` followed by `color: var(--bg);`).
