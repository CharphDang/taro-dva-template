import { useState } from "react";

import { AtTabBar } from "taro-ui";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

function CustomTabBar() {
  const [menu] = useState([
    {
      title: "待办事项",
      iconType: "bullet-list",
      text: "new",
      pagePath: "pages/index/index",
    },
    { title: "拍照", iconType: "camera", pagePath: "pages/me/index" },
    {
      title: "文件夹",
      iconType: "folder",
      text: "100",
      max: 99,
      pagePath: "pages/center/index",
    },
    {
      title: "home",
      iconType: "folder",
      text: "100",
      max: 99,
      pagePath: "pages/home/index",
    },
    {
      title: "其他",
      iconType: "folder",
      text: "100",
      dot: true,
      pagePath: "pages/other/index",
    },
  ]);
  const [current, setCurrent] = useState(0);
  const handleClick = (e) => {
    console.log(e, "eeeee");
    setCurrent(e);
    Taro.switchTab({
      url: "/" + menu[e].pagePath,
      fail: () => {
        Taro.navigateTo({
          url: "/" + menu[e].pagePath,
        });
      },
    });
  };
  return (
    <View>
      <AtTabBar tabList={menu} onClick={handleClick} current={current} />
    </View>
  );
}

export default CustomTabBar;
