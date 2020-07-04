import paths from './config/paths';
require('@babel/register')({
    envName: 'tooling',
    // We can't add `extentions` directly to the Babel config because it's no known property for
    // env specific configs and results in an "Unknown option" error.
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

module.exports = {
    plugins: [
        require('postcss-import')({
            path: [paths.srcShared, `${__dirname}/node_modules`],
        }),
        require('postcss-nested')(),
        require('postcss-flexbugs-fixes')(),
        require('autoprefixer')(),
        require('postcss-custom-properties')(),
        require('postcss-assets')({
            basePath: './assets',
        }),
        // This is broken.
        // require('postcss-normalize')(),
    ],
    sourceMap: true,
};
