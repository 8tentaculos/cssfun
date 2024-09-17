# cssfun
Next generation css-in-js library

## Getting started
1. **Install the library**:
    ```bash
    npm install cssfun
    ```

2. **Import the library** in your project:
    ```javascript
    import { css } from 'cssfun';
    ```

3. **Create your styles**:
    ```javascript
    const { classes } = css({
        buttons : {
            backgroundColor : 'blue',
            color : 'white',
            padding : '10px',
            borderRadius : '5px'
        }
    }).attach();
    ```

4. **Apply the styles** to your components:
    ```javascript
    function Button() {
        return <button className={classes.button}>Click me</button>;
    }
    ```

## API Documentation
Complete API documentation can be found [here](/docs/api.md).

## Example
Check out the [examples directory](./examples) for sample projects.

## License
This project is licensed under the [MIT License](LICENSE).
