export default {
  extraBabelPlugins: [
    // ["import", { libraryName: "antd", libraryDirectory: "es", style: "css" }],
    ["import", { libraryName: "antd-mobile", style: "css" }], // `style: true` 会加载 less 文件
  ],
  proxy: {
    "/zy": {
      secure: false,
      target: "http://zywechat.tongtongcf.com", // 桌面云测试环境
      // target: 'https://weixin.bocim.com', // 灰度地址
      changeOrigin: true,
      pathRewrite: {
        "^/zy/wechat": "/wechat", // 桌面云测试地址配置
      },
    },
  },
  // extraBabelPlugins: ["transform-runtime"],
  // env: {
  //   development: {
  //     extraBabelPlugins: ["dva-hmr"],
  //   },
  // },
  define: {
    "process.env.NODE_ENV": process.env.NODE_ENV,
    "process.env.APP_ENV": process.env.APP_ENV,
  },
};
