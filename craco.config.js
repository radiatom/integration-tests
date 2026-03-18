const path = require('path')

if (!process.env.PUBLIC_URL) {
  process.env.PUBLIC_URL =
    process.env.REACT_APP_PUBLIC_URL || process.env.REACT_APP_HOMEPAGE_PATH || ''
}

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      webpackConfig.ignoreWarnings = [
        {
          module: /node_modules\/react-facebook-pixel/,
          message: /Failed to parse source map/,
        },
        {
          module: /node_modules\/react-image/,
          message: /Failed to parse source map/,
        },
      ]

      webpackConfig.output.publicPath = process.env.REACT_APP_HOMEPAGE_PATH || '/'

      return webpackConfig
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
      },
    },
  },
}
