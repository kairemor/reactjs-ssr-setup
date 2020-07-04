import {
    client as loaders
} from './loaders';
import {
    client as plugins
} from './plugins';

require('@babel/register')({
    envName: 'tooling',
    // We can't add `extentions` directly to the Babel config because it's no known property for
    // env specific configs and results in an "Unknown option" error.
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

module.exports = (storybookBaseConfig) => {
    storybookBaseConfig.plugins = [...storybookBaseConfig.plugins, ...plugins];
    storybookBaseConfig.module.rules = [...storybookBaseConfig.module.rules, ...loaders];

    storybookBaseConfig.resolve.extensions = storybookBaseConfig.resolve.extensions.concat([
        '.ts',
        '.tsx',
    ]);

    storybookBaseConfig.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [{
            loader: 'babel-loader'
        }],
        exclude: /node_modules/,
    });

    return storybookBaseConfig;
};
