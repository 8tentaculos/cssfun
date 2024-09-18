import path from 'path';
import webpack from 'webpack';

const config = {
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    ...(process.env.NODE_ENV === 'production' ? {
        entry: './client/index.js',
        mode: 'production',
        devtool: false,
        optimization: {
            minimize: true
        }
    } : {
        entry: ['./client/index.js', 'webpack-hot-middleware/client?reload=true'],
        mode: 'development',
        devtool: 'inline-source-map',
        plugins: [new webpack.HotModuleReplacementPlugin()]
    }),

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
};

export default config;