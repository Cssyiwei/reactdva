import { khxxcx } from "./../services/example.js";

const defaultState = {
  userInfo: {},
};

export default {
  namespace: "main",

  state: {
    ...defaultState,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      return history.listen(({ pathname }) => {
        // if (pathname.includes("count")) {
        console.log(pathname);
        // }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      const data = yield call(khxxcx, payload);
      if (data.isSuccess === "0") {
        yield put({ type: "save", payload: { userInfo: data.content } });
        return data.content;
      } else {
        yield put({ type: "save", payload: { userInfo: {} } });
        return {};
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
