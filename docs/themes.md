# Themes

A theme is a [`StyleSheet`](./api.md#stylesheet) that provides access to CSS variables 
for consistent styling across your application. It supports multiple color schemes, 
including `light`, `dark`, `light dark` (default, adapts to system preferences), and `normal`. 
Themes allow your components to automatically adapt to changes in the user's system preferences 
or use a fixed color scheme.

The [`createTheme`](./api.md#createtheme) function generates a theme StyleSheet instance. 
It accepts a `themes` object, which defines variables for the specified color schemes, and an 
`options` object to customize the theme generation.  
Each key in the `themes` object corresponds to a color scheme (`light`, `dark`, `normal`), 
and its value is an object of key-value pairs that will be converted into CSS variables.

## Creating a theme

Define styles for `light` and `dark` color schemes using the `createTheme` function.

```javascript
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

## Customizing the theme

### Color scheme

The `options.colorScheme` parameter specifies which color scheme(s) to use. Possible values are:

- `light`: Uses the `light` theme only.
- `dark`: Uses the `dark` theme only.
- `light dark` (default): Supports both `light` and `dark` themes, adapting to system preferences. You can override the system preference by setting the `data-color-scheme` attribute to `light` or `dark` on a parent element.
- `normal`: Uses the `normal` theme only.

### CSS variables prefix

The `options.cssVarsPrefix` parameter allows you to customize the prefix for the generated CSS variables. 
By default, the prefix is `fun`. For example, a key `colorPrimary` in the theme will generate a CSS variable 
like `--fun-colorPrimary`.

## Applying the theme class

The generated theme includes a `root` class, which exposes all the theme's CSS variables to any element 
that uses this class and its descendants. You can apply this class to the `body` element to style the 
entire application, or to the root element of a specific component to apply the theme to just part of your UI.

```javascript
// Add theme class to the body
document.body.classList.add(theme.classes.root);
```

## Using theme variables in styles

The `themes` object is automatically converted into CSS variables. For example:

```javascript
{ backgroundLevel1 : 'black' }
```

is converted into the CSS variable `--fun-backgroundLevel1`.  

Nested structures like:

```javascript
{
    palette : {
        common : { 
            black : '#000'
        }
    }
}
```

are converted into `--fun-palette-common-black`.  

You can use these variables in your component styles, even before the theme is applied. 
Your components will automatically update when the theme or system color scheme changes.

```javascript
const { classes } = css({
    button : {
        color : 'var(--fun-colorPrimary)',
        backgroundColor : 'var(--fun-backgroundLevel1)'
    },
});

const Button = ({ label }) => <button className={classes.button}>{label}</button>;
```
