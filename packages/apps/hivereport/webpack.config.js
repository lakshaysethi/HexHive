const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const { ModuleFederationPlugin } = require('webpack').container;
const webpack = require('webpack')

module.exports = (webpackConfigEnv, argv) => {
  // webpackConfigEnv.standalone = true;

  const defaultConfig = singleSpaDefaults({
    orgName: "HexHive",
    projectName: "HiveReport",
    webpackConfigEnv,
    argv,
  });

  defaultConfig.externals = [];

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object,
    entry: './src/HexHive-HiveReport.tsx',
    externals: [],
    devServer: {
      hot: false
    },
    output: {
      publicPath: process.env.PUBLIC_PATH || 'http://localhost:8500/'
    },
    module: {
      rules: [
        {
          test: /\.m?js/,
          resolve: {
              fullySpecified: false,
          },
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new webpack.EnvironmentPlugin({
        ...process.env,
        PUBLIC_URL: '/dashboard/report'
      }),  
        new ModuleFederationPlugin({
        name: 'hexhive_hivereport',
        library: {type: 'var', name: 'hexhive_hivereport'},
        filename: './remoteEntry.js',
        shared: {
          'react': {version: '17.0.2', singleton: true}, 
          'react-dom': {version: '17.0.2'}, 
          'styled-components': {version: '5.0.3', singleton: true},
          "grommet": {version: '2.17.4'},

          'single-spa-react': {eager: true}
        },
        remotes: {
          'hexhive_root': 'hexhive_root'
        },
        exposes: {
          '.': './src/HexHive-HiveReport'
        },
      })
    ]
  });
};
