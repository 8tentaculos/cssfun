import terser from '@rollup/plugin-terser';
import glob from 'glob';

const inputFiles = glob.sync('src/**/*.js');

const config = inputFiles.map(inputFile => ({
    input: inputFile,
    output: [
        {
            dir: 'lib',
            format: 'cjs',
            preserveModules: true,
            exports: 'auto',
            entryFileNames: '[name].cjs'
        },
        {
            dir: 'es',
            format: 'esm',
            preserveModules: true,
            entryFileNames: '[name].js'
        }
    ],
    plugins: []
})).concat([
    {
        input: 'src/index.js',
        output: {
            file: 'dist/cssfun.js',
            format: 'umd',
            name: 'CSSFUN'
        },
        plugins: []
    },
    {
        input: 'src/index.js',
        output: {
            file: 'dist/cssfun.min.js',
            format: 'umd',
            name: 'CSSFUN'
        },
        plugins: [
            terser()
        ]
    }
]);

export default config;