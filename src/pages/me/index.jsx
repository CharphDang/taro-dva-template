import React, { Component } from "react";
import { View, Text } from "@tarojs/components";
import { AtAvatar, AtButton } from "taro-ui";
import { connect } from "react-redux";
import VirtualList from "@tarojs/components/virtual-list";

import Taro from "@tarojs/taro";

import "./index.less";

const Row = React.memo(({ id, index, style, data }) => {
  return (
    <View
      id={id}
      className={index % 2 ? "ListItemOdd" : "ListItemEven"}
      style={style}
    >
      Row {index} : {data[index]}
    </View>
  );
});

function buildData(offset = 0) {
  return Array(100)
    .fill(0)
    .map((_, i) => i + offset);
}

@connect(
  // mapStateToProps
  ({ userinfo }) => ({ userinfo }),
  // mapDispatchToProps
  {
    updateUserInfo: (payload) => ({ type: "userinfo/updateUserInfo", payload }),
  }
)
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: buildData(0),
      scrollViewHeight: 0,
    };
  }

  componentDidMount() {
    this.loading = false;
    const res = Taro.getSystemInfoSync();
    this.setState({
      scrollViewHeight: res.windowHeight,
    });
    // 选择收货地址
    Taro.chooseAddress({
      success: (res1) => {
        console.log("Address", res1);
      },
    });
  }

  listReachBottom() {
    Taro.showLoading();
    // 如果 loading 与视图相关，那它就应该放在 `this.state` 里
    // 我们这里使用的是一个同步的 API 调用 loading，所以不需要
    this.loading = true;
    setTimeout(() => {
      const { data } = this.state;
      this.setState(
        {
          data: data.concat(buildData(data.length)),
        },
        () => {
          this.loading = false;
          Taro.hideLoading();
        }
      );
    }, 1000);
  }

  login = () => {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    if (!this.props.userinfo.hasUserInfo) {
      Taro.getUserProfile({
        desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          this.props.updateUserInfo({
            ...res.userInfo,
            hasUserInfo: true,
          });
        },
      });
    } else {
      console.log("您已经登录过了。");
    }
  };

  gender = (num) => {
    const arr = ["未知", "男", "女"];
    return arr[num];
  };

  render() {
    const { data } = this.state;
    const { userinfo } = this.props;
    const dataLen = data.length;
    const itemSize = 100;
    const num = Math.floor((this.state.scrollViewHeight - 50) / itemSize);
    return (
      <View>
        {userinfo.hasUserInfo ? (
          <View>
            <Text>性别：{this.gender(userinfo.gender)}</Text>
            <Text>昵称：{userinfo.nickName}</Text>
            <View onClick={this.chooseImage}>
              <AtAvatar circle image={userinfo.avatarUrl}></AtAvatar>
            </View>
            <VirtualList
              className="List"
              height={this.state.scrollViewHeight - 50}
              itemData={data}
              itemCount={dataLen}
              itemSize={itemSize}
              width="100%"
              style={{ color: "green" }}
              onScroll={({ scrollDirection, scrollOffset }) => {
                console.log(scrollOffset, "scrollOffset");
                console.log((dataLen - num) * itemSize - 150, "limit");

                if (
                  // 避免重复加载数据
                  !this.loading &&
                  // 只有往前滚动我们才触发
                  scrollDirection === "forward" &&
                  // 5 = (列表高度 / 单项列表高度)
                  // 100 = 滚动提前加载量，可根据样式情况调整
                  scrollOffset > (dataLen - num) * itemSize - 150
                ) {
                  this.listReachBottom();
                }
              }}
            >
              {Row}
            </VirtualList>
          </View>
        ) : (
          <AtButton type="primary" onClick={this.login}>
            微信一键登录
          </AtButton>
        )}
      </View>
    );
  }
}
export default Index;
