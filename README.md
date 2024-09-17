# CSSFUN
CSSFUN is a next generation [css-in-js](https://en.wikipedia.org/wiki/CSS-in-JS) library.  
It allows you to write CSS directly within your JavaScript code, providing a seamless and dynamic 
way to style your applications. It leverages the power of JavaScript to create highly maintainable 
and scalable styles.  
  
One of the key features of CSSFUN is that the styles are scoped to the component. This means that the styles 
you define will not leak out and affect other parts of your application, ensuring that your components remain 
modular and maintainable. Additionally, the styles are defined in the same file as your component, making it 
easier to manage and understand the styling of your application.  
  
CSSFUN is framework agnostic and has a small footprint of only 4KB. It can be used directly in the browser without 
any build tools or complex setup.  
It also supports server-side rendering without duplicating styles.
  
CSSFUN is available under the [MIT License](LICENSE).  
You can discuss features or report bugs on our [GitHub Issues page](https://github.com/your-repo/cssfun/issues).

## Getting started

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
    buttons : {
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

## API Documentation
Complete API documentation can be found [here](/docs/api.md).

## Example
Check out the [examples directory](./examples) for sample projects.

## License
This project is licensed under the [MIT License](LICENSE).
