import { create } from "dva-core";
import { createLogger } from "redux-logger";
import createLoading from "dva-loading";

let app;
let store;
let dispatch;

function createApp(opt) {
  // redux日志
  opt.onAction = [createLogger()];
  // 创建应用，返回dva实例
  app = create(opt);
  // 配置插件 createLoading是解决异步加载的过渡问题
  app.use(createLoading({}));
  if (!global.registered) {
    // 注册model
    opt.models.forEach((model) => app.model(model));
  }
  global.registered = true;
  // 启动应用
  app.start();
  store = app._store;
  app.getStore = () => store;
  dispatch = store.dispatch;
  app.dispatch = dispatch;
  return app;
}

export default {
  createApp,
  getDispatch: () => {
    return app.dispatch;
  },
};
