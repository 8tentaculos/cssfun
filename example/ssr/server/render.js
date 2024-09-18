import { View } from 'rasti';
import { StyleSheet, createTheme } from 'cssfun';
import App from '../client/App.js';

// Themes
const themes = {
    light : {
        bg1 : '#f0f8ff',
        fg1 : '#333',
        fg2 : '#444',
        fg3 : '#555',
        catWrapperBg : '#fff',
        labelBg : '#fff',
        labelBorderColor : '#ddd',
        labelHoverBg : '#f0f0f0',
        labelHoverBorderColor : '#ccc'
    },
    dark : {
        bg1 : '#1e1e1e',
        fg1 : '#d4d4d4',
        fg2 : '#c0c0c0',
        fg3 : '#a8a8a8',
        catWrapperBg : '#2d2d2d',
        labelBg : '#2d2d2d',
        labelBorderColor : '#3c3c3c',
        labelHoverBg : '#3c3c3c',
        labelHoverBorderColor : '#4b4b4b'
    },
};
// Creating the theme
const theme = createTheme()({ themes });


export default (req, res) => {
    const app = App.mount();
    const html = app.toString();
    const css = StyleSheet.toString();

    View.uid = 0;

    const template = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Waving Cat</title>
                ${css}
            </head>
            <body class="${theme.classes.root}">
                <div id="root">${html}</div>
                <script src="/bundle.js"></script>
            </body>
        </html>
    `;

    res.send(template);
}



