import { Component } from "react";
import { Provider } from "react-redux";
import Taro from "@tarojs/taro";
import dva from "./utils/dva";
import models from "./models";

import "./app.less";
import "./custom-theme.scss";

const dvaApp = dva.createApp({
  initialState: {},
  models,
});
const store = dvaApp.getStore();

class App extends Component {
  componentDidMount() {
    const res = Taro.getLaunchOptionsSync();
    console.log(res, "res");
    if (res.referrerInfo) {
      const { appId, extraData } = res.referrerInfo;
      console.log("appId", appId);
      console.log("extraData", extraData);
    }
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
