import React from "react";
import { Router, Route, Switch } from "dva/router";
import IndexPage from "./routes/IndexPage";
import Counter from "./routes/Counter";
import Index from "./components/Index/Index";
import ZyHome from "./components/ZyHome/ZyHome";
import ZyFund from "./components/ZyFund/ZyFund";
import ZyCapital from "./components/ZyCapital/ZyCapital";
import ZyMine from "./components/ZyMine/ZyMine";
import NotFound from "./components/NotFound/NotFound";
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/" exact component={Index} /> */}
        {/* <Index path="/index" component={Index}>
          <Switch></Switch>
        </Index> */}
        <Route exact path="/zyhome" component={ZyHome}></Route>
        <Route exact path="/zyfund" component={ZyFund}></Route>
        <Route exact path="/zycapital" component={ZyCapital}></Route>
        <Route exact path="/zymine" component={ZyMine}></Route>
        {/* <Route path="/index" exact component={Index}></Route> */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
export default RouterConfig;
