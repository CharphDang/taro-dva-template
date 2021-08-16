export default {
  namespace: "menu",

  state: {
    current: 0,
  },

  effects: {
    *setCurrent({ payload }, { put }) {
      //   eslint-disable-line
      yield put({ type: "update", payload });
    },
  },

  reducers: {
    update(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
