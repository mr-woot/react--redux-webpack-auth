const debug = process.env.NODE_ENV !== "production";
const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// lessToJs does not support @icon-url: "some-string", so we are manually adding it to the produced themeVariables js object here
// themeVariables["@icon-url"] = "'http://localhost:8080/fonts/iconfont'";
const lessToJs = require("less-vars-to-js");
const themeVariables = lessToJs(
  fs.readFileSync(path.join(__dirname, "./src/themes/demo-theme.less"), "utf8")
);

const srcPath = path.join(__dirname, "..", "./public/");
const includePaths = [srcPath];

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./index.js",
  output: {
    path: __dirname + "/public/",
    filename: "app.min.[hash].js",
    publicPath: "/"
  },
  devServer: {
    disableHostCheck: true,
    historyApiFallback: {
      index: "/"
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: "images/[hash]-[name].[ext]"
            }
          }
        ]
      },
      {
        loader: "babel-loader",
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        options: {
          presets: [
            [
              "env",
              { modules: false, targets: { browsers: ["last 2 versions"] } }
            ],
            "react"
          ],
          cacheDirectory: true,
          plugins: [
            ["import", { libraryName: "antd", style: true }],
            "transform-strict-mode",
            "transform-object-rest-spread",
            "transform-class-properties",
            "transform-decorators-legacy",
            "react-html-attrs"
          ]
        }
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              modifyVars: themeVariables,
              root: path.resolve(__dirname, "./")
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html",
      inject: "body",
      filename: "index.html"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        BASE_API: JSON.stringify("http://localhost:3000"),
        API_VERSION: JSON.stringify("api/v1"),
        PERSIST_KEY: JSON.stringify("here is my persist key, you dumbass")
        // PUSHER_API_KEY: JSON.stringify("2a4a15f02e52c1e38034"),
        // PUSHER_APP_CLUSTER: JSON.stringify("ap2")
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
