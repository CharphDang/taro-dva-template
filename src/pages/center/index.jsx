import { Component } from "react";
import { View, Text, Image, Input } from "@tarojs/components";
import {
  AtGrid,
  AtSlider,
  AtAvatar,
  AtImagePicker,
  AtButton,
  AtForm,
  AtInput,
} from "taro-ui";
import { connect } from "react-redux";
import Taro from "@tarojs/taro";
import "./index.less";

@connect(
  // mapStateToProps
  ({ userinfo }) => ({ userinfo })
)
class Center extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [
        {
          url: "https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF",
        },
        {
          url: "https://t7.baidu.com/it/u=2942499027,2479446682&fm=193&f=GIF",
        },
        {
          url: "https://t7.baidu.com/it/u=3165657288,4248157545&fm=193&f=GIF",
        },
      ],
      headImg:
        "http://img4.imgtn.bdimg.com/it/u=708482407,3295795161&fm=26&gp=0.jpg",
      inputVal: "默认值",
      phoneNum: "",
      code: "",
    };
  }
  componentWillMount() {
    console.log("componentWillMount");
  }
  componentDidMount() {
    console.log("componentDidMount");
  }
  componentWillReceiveProps() {
    console.log("componentWillReceiveProps");
  }

  shouldComponentUpdate() {
    console.log("shouldComponentUpdate");
    return true;
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
  componentDidShow() {
    console.log("componentDidShow");
  }
  componentDidHide() {
    console.log("componentDidHide");
  }
  componentDidCatchError() {
    console.log("componentDidCatchError");
  }
  componentDidNotFound() {
    console.log("componentDidNotFound");
  }

  payFun = () => {
    Taro.login({
      success: (res) => {
        console.log(res.code);
        // 请求后台获取支付参数
        Taro.request({
          url: "https://test.com/onLogin",
          data: {
            code: res.code,
          },
          success: (res2) => {
            const payment = res2.result.payment;
            //获取成功后直接进行支付
            Taro.requestPayment({
              //   timeStamp: "",
              //   nonceStr: "",
              //   package: "",
              //   signType: "MD5",
              //   paySign: "",
              ...payment,
              success(res3) {
                console.log(res3, "success");
              },
              fail(res1) {
                console.log(res1, "fail");
              },
            });
          },
        });
      },
    });
  };

  selectRectDomFun = (item, index) => {
    console.log("item", item);
    console.log("index", index);
  };

  onChange = (files) => {
    console.log("files", files);
    this.setState({
      files,
    });
  };
  onFail = (mes) => {
    console.log(mes);
  };
  onImageClick = (index, file) => {
    console.log(index, file);
  };

  chooseImage = () => {
    Taro.chooseImage({
      count: 1, // 默认9
      sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log("tempFilePaths", tempFilePaths);
        this.setState({
          headImg: tempFilePaths,
        });
      },
    });
  };

  handleChange = (val) => {
    this.setState({
      inputVal: val,
    });
  };

  handleCodeChange = (val) => {
    console.log("code", val);
    this.setState({
      code: val,
    });
  };

  handlePhoneChange = (val) => {
    this.setState({
      phoneNum: val,
    });
  };
  render() {
    return (
      <View className="index">
        <View className="example-body">
          <Text>可以自动聚焦的 input</Text>
          <Input type="text" placeholder="将会获取焦点" focus />
          <Text>控制最大输入长度的 input</Text>
          <Input type="text" placeholder="最大输入长度为 10" maxlength="10" />
          <Text>数字输入的 input</Text>
          <Input type="number" placeholder="这是一个数字输入框" />
          <Text>密码输入的 input</Text>
          <Input type="password" password placeholder="这是一个密码输入框" />
          <Text>带小数点的 input</Text>
          <Input type="digit" placeholder="带小数点的数字键盘" />
          <Text>身份证输入的 input</Text>
          <Input type="idcard" placeholder="身份证输入键盘" />
          <Text>控制占位符颜色的 input</Text>
          <Input
            type="text"
            placeholder="占位符字体是红色的"
            placeholderStyle="color:red"
          />
        </View>
        <AtForm>
          <AtInput
            name="value"
            title="标准五个字"
            type="text"
            placeholder="标准五个字"
            value={this.state.inputVal}
            onChange={this.handleChange}
          />
          <AtInput
            clear
            title="验证码"
            type="text"
            placeholder="验证码"
            maxLength="4"
            required
            value={this.state.code}
            onChange={this.handleCodeChange}
          >
            <Image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F13501054110%2F1000&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625897654&t=8d59899e076f569d170b46bbb0af8ed4" />
          </AtInput>
          <AtInput
            name="value6"
            border={false}
            type="phone"
            maxLength="11"
            required
            placeholder="手机号码"
            value={this.state.phoneNum}
            onChange={this.handlePhoneChange}
          >
            <Text>发送验证码</Text>
          </AtInput>
          <AtButton className="dec_btn" onClick={this.payFun}>
            支付
          </AtButton>
        </AtForm>

        <View>
          <Text className="title">宽度根据内容撑开</Text>
          <open-data type="userNickName"></open-data>
          <open-data type="userAvatarUrl"></open-data>
          <open-data type="userGender" lang="zh_CN"></open-data>
          <View onClick={this.chooseImage}>
            <AtAvatar circle image={this.state.headImg}></AtAvatar>
          </View>
          <AtButton type="primary" onClick={this.chooseImage}>
            选取用户头像
          </AtButton>
          <AtImagePicker
            showAddBtn
            multiple={false}
            mode="center"
            length={5}
            count={1}
            files={this.state.files}
            onChange={this.onChange}
            onFail={this.onFail}
            onImageClick={this.onImageClick}
          />
        </View>
        <View className="at-row">
          <View className="at-col at-col-1 at-col--auto">
            被内容撑开，被内容撑开，被内容撑开
          </View>
          <View className="at-col">B</View>
        </View>
        <View className="at-row">
          <View className="at-col at-col-1 at-col--wrap">内容自动换行</View>
          <View className="at-col center">B</View>
        </View>
        <AtSlider
          step={1}
          value={50}
          activeColor="#4285F4"
          backgroundColor="#BDBDBD"
          blockColor="#4285F4"
          blockSize={24}
          showValue
        ></AtSlider>
        <View>
          <AtGrid
            mode="square"
            data={[
              {
                image:
                  "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png",
                value: "领取中心",
              },
              {
                image:
                  "https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png",
                value: "找折扣",
              },
              {
                image:
                  "https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png",
                value: "领会员",
              },
              {
                image:
                  "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png",
                value: "新品首发",
              },
              {
                image:
                  "https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png",
                value: "领京豆",
              },
              {
                image:
                  "https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png",
                value: "手机馆",
              },
            ]}
            columnNum="2"
            hasBorder={false}
          ></AtGrid>
        </View>
        <View>
          <AtGrid
            mode="rect"
            onClick={this.selectRectDomFun}
            data={[
              {
                image:
                  "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png",
                value: "领取中心",
              },
              {
                image:
                  "https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png",
                value: "找折扣",
              },
              {
                image:
                  "https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png",
                value: "领会员",
              },
              {
                image:
                  "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png",
                value: "新品首发",
              },
              {
                image:
                  "https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png",
                value: "领京豆",
              },
              {
                image:
                  "https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png",
                value: "手机馆",
              },
            ]}
            columnNum="3"
            hasBorder={false}
          ></AtGrid>
        </View>
      </View>
    );
  }
}

export default Center;
