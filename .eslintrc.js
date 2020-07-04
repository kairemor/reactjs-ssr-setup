import paths from './config/paths';
require('@babel/register')({
    envName: 'tooling',
    // We can't add `extentions` directly to the Babel config because it's no known property for
    // env specific configs and results in an "Unknown option" error.
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

module.exports = {
    extends: [
        '@werkzeugkiste',
        '@werkzeugkiste/eslint-config/react',
        '@werkzeugkiste/eslint-config/typescript',
        '@werkzeugkiste/eslint-config/node',
    ],
    globals: {
        __BROWSER__: true,
        __SERVER__: true,
    },
    settings: {
        'import/resolver': {
            node: {
                paths: paths.resolveModules,
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
        'react': {
            version: 'detect',
        },
    },
    rules: {
        'import/no-unassigned-import': 0,
        'import/no-named-as-default-member': 0,
        'prettier/prettier': 'error',
    },
    // overrides: [
    //     {
    //         files: ['*.ts', '*.tsx'],
    //         rules: {
    //             // TODO: add to eslint-config-wiremore
    //             'import/named': 0,
    //             'react/prop-types': 0,
    //         },
    //     },
    // ],
};
