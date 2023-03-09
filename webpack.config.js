const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin,
  path = require("path"),
  webpack = require("webpack");
const WebpackAssetsManifest = require("webpack-assets-manifest");
module.export = {
  optimization: {
    splitChunks: {
      chunks: "all", // 共有3个值"initial"，"async"和"all"。配置后，代码分割优化仅选择初始块，按需块或所有块
      minSize: 30, // （默认值：30000）块的最小大小
      name: true,
      cacheGroups: {
        // 以上条件都满足后会走入cacheGroups进一步进行优化的判断
        rxjs: {
          test: /rxjs/, // 判断引入库是否是node_modules里的
          priority: -10, // 数字越大优先级越高 （-10大于-20）
          filename: "rxjs.js", // 设置代码分割后的文件名
        },
        angular: {
          name: "angular",
          test: /[\\/]node_modules[\\/]@angular[\\/]/,
          priority: -9,
        },
      },
    },
  },

  plugins: [new BundleAnalyzerPlugin(), new WebpackAssetsManifest()],
};
