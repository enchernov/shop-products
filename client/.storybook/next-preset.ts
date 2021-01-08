const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
    webpackFinal: async (baseConfig, options) => {
        const { module = {} } = baseConfig;

        const newConfig = {
            ...baseConfig,
            module: {
                ...module,
                rules: [...(module.rules || [])]
            }
        };

        // TypeScript
        newConfig.module.rules.push({
            test: /\.(ts|tsx)$/,
            include: [
                path.resolve(__dirname, '../components')
            ],
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['next/babel', require.resolve('babel-preset-react-app')],
                        plugins: ['react-docgen-typescript'],
                    },
                },
            ],
        });
        newConfig.resolve.extensions.push('.ts', '.tsx');

        // SCSS/CSS/SASS
        newConfig.module.rules.push({
            test: /\.((s*)css)|(sass)$/,
            loaders: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ],
            include: path.resolve(__dirname, '../public/styles/global.sass'),
        });
        newConfig.resolve.plugins = newConfig.resolve.plugins.concat([new TsconfigPathsPlugin()])

        return newConfig;
    },
};
