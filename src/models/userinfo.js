export default {
  namespace: "userinfo",

  state: {
    hasUserInfo: false,
    nickName: "",
    avatarUrl: "",
    gender: "",
  },

  subscriptions: {
    setup() {
      // eslint-disable-line
      console.log("userinfo subscriptions"); //sy-log
    },
  },

  reducers: {
    updateUserInfo(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
