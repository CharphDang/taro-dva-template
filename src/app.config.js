export default {
  pages: [
    "pages/index/index",
    "pages/me/index",
    "pages/center/index",
    "pages/home/index",
    "pages/other/index",
  ],
  tabBar: {
    custom: true,
    color: "#B8BAC0",
    selectedColor: "#000000",
    backgroundColor: "#FFFFFF",
    borderStyle: "white",
    position: "bottom",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
      },
      {
        pagePath: "pages/me/index",
        text: "我的",
      },
      {
        pagePath: "pages/home/index",
        text: "home",
      },
      {
        pagePath: "pages/other/index",
        text: "其他",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
};
