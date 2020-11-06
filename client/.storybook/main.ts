const path = require('path')

module.exports = {
  stories: ['../components/**/*.stories.@(ts|tsx|js|jsx|mdx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    'storybook-addon-styled-component-theme/dist/register',
  ],
  presets: [path.resolve(__dirname, './next-preset.ts')],
}
