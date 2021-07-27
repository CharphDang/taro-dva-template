import { Component } from "react";
import { View, Text } from "@tarojs/components";

import "./index.less";

class Other extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="other">
        <View>
          <Text>other</Text>
        </View>
      </View>
    );
  }
}

export default Other;
