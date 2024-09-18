import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config.js';

import render from './render.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
    const compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, {
        publicPath : config.output.publicPath
    }));

    app.use(webpackHotMiddleware(compiler));

    app.get('*', render);
} else {
    app.use(express.static(path.join(__dirname, '../dist')));

    app.get('*', render);
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});