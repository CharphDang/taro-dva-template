import { getProductData } from "../services/user";

export default {
  namespace: "users",
  state: {
    title: "Hello World",
    name: "",
    age: "",
  },

  subscriptions: {
    setup() {
      // eslint-disable-line
      console.log("users subscriptions"); //sy-log
    },
  },

  effects: {
    *setAge({ payload }, { call, put }) {
      //   eslint-disable-line
      const res = yield call(getProductData, payload);
      console.log("111", res);
      yield put({ type: "save", payload: res });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
