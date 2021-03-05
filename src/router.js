import React, { useEffect } from "react";
import { Router, Route, Switch } from "dva/router";

// 异步模块加载
import dynamic from "dva/dynamic";

// import Counter from "./routes/Counter";
// import Main from "./routes/Main";

// import ZyHome from "./components/ZyHome/ZyHome";
// import ZyFund from "./components/ZyFund/ZyFund";
// import ZyCapital from "./components/ZyCapital/ZyCapital";
// import ZyMine from "./components/ZyMine/ZyMine";
// import NotFound from "./components/NotFound/NotFound";
// import Login from "./components/Login/Login";

function RouterConfig({ history, app }) {
  const Counter = dynamic({
    app,
    component: () => import("./routes/Counter"),
  });
  const Main = dynamic({
    app,
    component: () => import("./routes/Main"),
  });
  const ZyHome = dynamic({
    app,
    component: () => import("./components/ZyHome/ZyHome"),
  });
  const ZyFund = dynamic({
    app,
    component: () => import("./components/ZyFund/ZyFund"),
  });
  const ZyCapital = dynamic({
    app,
    component: () => import("./components/ZyCapital/ZyCapital"),
  });
  const ZyMine = dynamic({
    app,
    component: () => import("./components/ZyMine/ZyMine"),
  });
  const NotFound = dynamic({
    app,
    component: () => import("./components/NotFound/NotFound"),
  });
  const Login = dynamic({
    app,
    component: () => import("./components/Login/Login"),
  });

  const routerList = [
    {
      title: "首页",
      component: Counter,
      path: "/counter",
      exact: true,
    },
    {
      title: "首页",
      component: Main,
      path: "/main",
      exact: true,
    },
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
