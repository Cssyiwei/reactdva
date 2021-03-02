import React from "react";
import { Router, Route, Switch } from "dva/router";
import ZyHome from "./components/ZyHome/ZyHome";
import ZyFund from "./components/ZyFund/ZyFund";
import ZyCapital from "./components/ZyCapital/ZyCapital";
import ZyMine from "./components/ZyMine/ZyMine";
import NotFound from "./components/NotFound/NotFound";
const routerList = [
  {
    name: "首页",
    component: ZyHome,
    path: "/zyhome",
    exact: true,
  },
  {
    name: "基金",
    component: ZyFund,
    path: "/zyfund",
    exact: true,
  },
  {
    name: "资产",
    component: ZyCapital,
    path: "/zycapital",
    exact: true,
  },
  {
    name: "我的",
    component: ZyMine,
    path: "/zymine",
    exact: true,
  },
  {
    name: "notFund",
    component: NotFound,
    path: "",
    exact: true,
  },
];
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        {routerList.map((item) => (
          <Route
            exact={item.exact}
            path={item.path}
            component={item.component}
            key={item.path}
          ></Route>
        ))}
        {/* <Route exact path="/zyhome" component={ZyHome}></Route>
        <Route exact path="/zyfund" component={ZyFund}></Route>
        <Route exact path="/zycapital" component={ZyCapital}></Route>
        <Route exact path="/zymine" component={ZyMine}></Route>
        <Route component={NotFound} /> */}
      </Switch>
    </Router>
  );
}
export default RouterConfig;
