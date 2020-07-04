require('@babel/register')({
    envName: 'tooling',
    // We can't add `extentions` directly to the Babel config because it's no known property for
    // env specific configs and results in an "Unknown option" error.
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

module.exports = (env = 'production') => {
    // TODO: evaluate if using dynamic imports would be viable here
    if (env === 'development' || env === 'dev') {
        process.env.NODE_ENV = 'development';
        return [require('./client.dev').default, require('./server.dev').default];
    }
    process.env.NODE_ENV = 'production';
    return [require('./client.prod').default, require('./server.prod').default];
};
