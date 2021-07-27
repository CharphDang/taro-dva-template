import { Component } from "react";
import { ScrollView, View, Button, Text, Icon } from "@tarojs/components";
import { AtDivider, AtFab, AtActivityIndicator, AtIcon } from "taro-ui";
import Taro from "@tarojs/taro";
import { connect } from "react-redux";
import "./index.less";

@connect(
  // mapStateToProps
  ({ users }) => ({ users }),
  // mapDispatchToProps
  {
    setAge: (age) => ({ type: "users/setAge", payload: { age } }),
  }
)
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresherTriggered: false,
      scrollViewHeight: 0,
      scrollTop: Math.random(),
      noDataFlag: false,
      loadingMore: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {
    // eslint-disable-next-line no-undef
    const res = Taro.getSystemInfoSync();
    this.setState({
      scrollViewHeight: res.windowHeight,
    });

    // 设置分享
    Taro.showShareMenu({
      showShareItems: ["qq", "qzone", "wechatFriends", "wechatMoment"],
    });
  }

  componentDidHide() {}

  handleClick = (e) => {
    console.log(e);
    if (e === 2) {
      Taro.redirectTo({
        url: `/pages/other/index`,
      });
    }
  };

  scrollToTopFun = () => {
    this.setState({
      scrollTop: Math.random(),
    });
  };

  onRefresherAbort = (e) => {
    console.log("onRefresherAbort", e);
  };

  onRefresherPulling = (e) => {
    console.log("onRefresherPulling", e);
  };

  onRefresherRefresh = (e) => {
    console.log("onRefresherRefresh", e);
    this.setState({
      refresherTriggered: true,
    });
    // Taro.startPullDownRefresh(); // 效果一样
    setTimeout(() => {
      //   Taro.stopPullDownRefresh();
      this.setState({
        refresherTriggered: false,
      });
    }, 3000);
  };

  onRefresherRestore = (e) => {
    console.log("onRefresherRestore", e);
  };

  onScrollToLower = (e) => {
    console.log("onScrollToLower", e);
    // Taro.showLoading({
    //   title: "加载内容中...",
    //   mask: true,
    // });
    this.setState({
      loadingMore: true,
    });
    setTimeout(() => {
      //   Taro.hideLoading();
      this.setState({
        loadingMore: false,
      });
    }, 3000);
  };

  render() {
    const { users, setAge } = this.props;
    const { title, name, age } = users;
    return (
      <View>
        <ScrollView
          className="scrollView"
          refresherEnabled
          refresherThreshold={500}
          refresherDefaultStyle="black"
          refresherBackground="#FFF"
          refresherTriggered={this.state.refresherTriggered}
          onRefresherAbort={() => {
            this.onRefresherAbort();
          }}
          onRefresherPulling={this.onRefresherPulling}
          onRefresherRefresh={this.onRefresherRefresh}
          onRefresherRestore={this.onRefresherRestore}
          onScrollToLower={this.onScrollToLower}
          lowerThreshold={-50}
          style={{ height: this.state.scrollViewHeight - 54 }}
          scrollTop={this.state.scrollTop}
          scrollY
          enableBackToTop
          scrollWithAnimation
          enableFlex
          scrollAnchoring
        >
          <View className="index">
            <Text>title: {title}</Text>
            <Text>name: {name}</Text>
            <Text>age: {age}</Text>
            <Button
              className="dec_btn"
              onClick={() => {
                setAge(28);
              }}
            >
              异步请求数据，并set
            </Button>

            <AtIcon value="clock" size="30" color="#F00"></AtIcon>
            <Icon size="60" type="success" />
            <Icon size="60" type="info" />
            <Icon size="60" type="warn" color="#ccc" />
            <Icon size="60" type="warn" />
            <Icon size="60" type="waiting" />
            <Icon size="20" type="success_no_circle" />
            <Icon size="20" type="warn" />
            <Icon size="20" type="success" />
            <Icon size="20" type="download" />
            <Icon size="20" type="clear" color="red" />
            <Icon size="20" type="search" />
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            <Button className="dec_btn">async</Button>
            {this.state.noDataFlag && <AtDivider content="暂无数据" />}

            {this.state.loadingMore ? (
              <AtDivider>
                <AtActivityIndicator
                  size={32}
                  color="#13CE66"
                  content="加载中..."
                ></AtActivityIndicator>
              </AtDivider>
            ) : (
              <AtDivider>
                <Text>继续上滑加载更多数据</Text>
              </AtDivider>
            )}
          </View>
        </ScrollView>
        <View className="rightBottom">
          <AtFab
            className="float-icon"
            size="small"
            onClick={() => {
              this.scrollToTopFun();
            }}
          >
            <Text className="at-fab__icon at-icon at-icon-arrow-up"></Text>
          </AtFab>
          <AtFab
            className="float-icon"
            size="small"
            onClick={() => {
              this.scrollToTopFun();
            }}
          >
            <Text className="at-fab__icon at-icon at-icon-menu"></Text>
          </AtFab>
        </View>
      </View>
    );
  }
}

export default Index;
