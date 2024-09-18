<picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/logo-dark.png">
    <img alt="CSSFUN" src="docs/logo.png">
</picture>

**CSSFUN** is a next-generation [CSS-in-JS](https://en.wikipedia.org/wiki/CSS-in-JS) library.  
It allows you to write CSS directly within your JavaScript code, providing a seamless and dynamic 
way to style your applications. It leverages the power of JavaScript to create highly maintainable 
and scalable styles.  
  
One of the key features of **CSSFUN** is that the styles are scoped to the component. This means that the styles 
you define will not leak out and affect other parts of your application, ensuring that your components remain 
modular and maintainable. Additionally, the styles are defined in the same file as your component, making it 
easier to manage and understand the styling of your application.  
  
**CSSFUN** is framework-agnostic and has a small footprint of only 4KB. It can be used directly in the browser without 
any build tools or complex setup.  
It also supports server-side rendering without duplicating styles.
  
**CSSFUN** is available under the [MIT License](LICENSE).  
You can discuss features or report bugs on our [GitHub Issues page](https://github.com/8tentaculos/cssfun/issues).

## Getting Started

### Using npm

```bash
$ npm install cssfun
```

```javascript
import { css } from 'cssfun';
```

### Using ES modules

```javascript
import { css } from 'https://esm.run/cssfun';
```

### Using `<script>` tag

```html
<script src="https://cdn.jsdelivr.net/npm/cssfun/dist/cssfun.min.js"></script>
```

```javascript
const { css } = CSSFUN;
```

### Create your styles
```javascript
const { classes } = css({
    button : {
        backgroundColor : 'blue',
        color : 'white',
        padding : '10px',
        borderRadius : '5px'
    }
});
```

### Apply the styles to your components:
```javascript
const Button = () => <button className={classes.button}>Click me</button>;
```

## Parsers
Parsers are functions that transform style objects into CSS strings.  
When composed, the first parser receives the styles object, and the final one outputs the resulting CSS string.  
By default, StyleSheets are rendered using `renderStyles` and `parseStyles`.  

These are the default parser transformations:

#### Camelized keys will be transformed to dashed keys
```javascript
css({
    root : {
        backgroundColor : 'black'
    }
}).toString();
```

##### Renders to:
```css
<style id="fun-1">
    .fun-1-root {
        background-color: black;
    }
</style>
```

#### Nested selectors will be expanded
```javascript
css({
     root : {
        '&:hover' : {
            backgroundColor : 'black'
        }
    }
}).toString();
```

##### Renders to:
```css
<style id="fun-1">
    .fun-1-root:hover {
        background-color: black;
    }
</style>
```
 
#### Global selectors will be rendered as global styles
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
```css
<style id="fun-1">
    body {
        background-color : black;
    }
</style>
```
 
#### Class references will be replaced by the generated class name
```javascript
css({
    root : {
        color : 'black'
    },
    '$root:hover' : {
        color : 'white'
    }
}).toString();
```

#### Renders to:
```css
<style id="fun-1">
    .fun-1-root {
        color: black;
    }
    .fun-1-root:hover {
        color:white;
    }
</style>
```

### Custom parsers
Parsers can be set at the `parsers` array on the StyleSheet instance. If passed 
at `options.parsers` it will be added to the StyleSheet instance.  
Parsers array elements may be functions or strings that are StyleSheet instance methods.
They will be bound to the instance.

## API Documentation
Complete API documentation can be found [here](/docs/api.md).

## Example
Check out the [examples directory](./examples) for sample projects.

## License
This project is licensed under the [MIT License](LICENSE).

