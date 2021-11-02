const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-knobs",
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader?modules&importLoaders", "sass-loader"],
      include: path.resolve(__dirname, "../"),
    });

    if (isProduction) {
      config.output.publicPath = "/storybook/";
    }

    return config;
  },
  managerWebpack: async (config) => {
    if (isProduction) {
      config.output.publicPath = "/storybook/";
    }

    return config;
  },
};
