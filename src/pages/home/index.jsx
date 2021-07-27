import { Component } from "react";
import { View, Text } from "@tarojs/components";

import "./index.less";

class Home extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="home">
        <View>
          <Text>home</Text>
        </View>
      </View>
    );
  }
}

export default Home;
