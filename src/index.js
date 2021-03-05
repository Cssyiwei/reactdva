import dva from "dva";
import "./assets/css/base.less";
import "./utils/layout.js";

// import "antd/dist/antd.less";

import { browserHistory } from 'dva/router';
// import createLoading from 'dva-loading';
import { Toast } from 'antd-mobile';

const ERROR_MSG_DURATION = 3; // 3 秒


// 1. Initialize
const app = dva({
  history: browserHistory,
  onError(e) {
    Toast.fail(e.message, ERROR_MSG_DURATION);
  },
});

// 2. Plugins
// app.use(createLoading());

// 3. Model
// app.model(require("./models/counter").default);
// app.model(
//   require("./models").default.forEach((key) =>
//     app.model(require(`./models/${key}`).default)
//   )
// );

require("./models").default.forEach((key) => app.model(key.default));

// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");
