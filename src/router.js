import React, { useEffect } from "react";
import { Router, Route, Switch } from "dva/router";

// const ZyHome = lazy(() => import('./components/ZyHome/ZyHome'));
// const ZyFund = lazy(() => import('./components/ZyFund/ZyFund'));
// const ZyCapital = lazy(() => import('./components/ZyCapital/ZyCapital'));
// const ZyMine = lazy(() => import('./components/ZyMine/ZyMine'));
// const NotFound = lazy(() => import('./components/NotFound/NotFound'));

import ZyHome from "./components/ZyHome/ZyHome";
import ZyFund from "./components/ZyFund/ZyFund";
import ZyCapital from "./components/ZyCapital/ZyCapital";
import ZyMine from "./components/ZyMine/ZyMine";
import NotFound from "./components/NotFound/NotFound";
import Login from "./components/Login/Login";

const routerList = [
  {
    title: "首页",
    component: ZyHome,
    path: "/zyhome",
    exact: true,
  },
  {
    title: "基金",
    component: ZyFund,
    path: "/zyfund",
    exact: true,
  },
  {
    title: "资产",
    component: ZyCapital,
    path: "/zycapital",
    exact: true,
  },
  {
    title: "我的",
    component: ZyMine,
    path: "/zymine",
    exact: true,
  },
  {
    title: "登录",
    component: Login,
    path: "/login",
    exact: true,
  },
  {
    title: "notFund",
    component: NotFound,
    path: "",
    exact: true,
  },
];
function RouterConfig({ history }) {
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    history.listen(({ pathname }) => {
      const item = routerList.find((item) => item.path === pathname);
      document.title = (item && item.title) || "中银基金";
    });
  });
  return (
    <Router history={history}>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <Switch>
        {routerList.map((item) => (
          <Route
            exact={item.exact}
            path={item.path}
            component={item.component}
            key={item.path}
            title={item.title}
          ></Route>
        ))}
        {/* <Route exact path="/zyhome" component={ZyHome}></Route>
        <Route exact path="/zyfund" component={ZyFund}></Route>
        <Route exact path="/zycapital" component={ZyCapital}></Route>
        <Route exact path="/zymine" component={ZyMine}></Route>
        <Route component={NotFound} /> */}
      </Switch>
      {/* </Suspense> */}
    </Router>
  );
}
export default RouterConfig;
