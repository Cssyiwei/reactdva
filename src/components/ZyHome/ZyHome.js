import React from "react";
import { connect } from "dva";
import TabBar from "../TabBar/TabBar";
import HomeHeader from "./HomeHeader";
import { query } from "../../services/example.js";

class ZyHome extends React.Component {
  // 常用生命周期
  constructor(props) {
    super(props);
    this.state = { user: {} };
    this.handleQuery = this.handleQuery.bind(this);
    // 始化 state 或进行方法绑定
  }

  handleQuery() {
    query({ moduleNo: "99" })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 渲染函数
  render() {
    console.log(this.props);
    return (
      <main>
        {/* <h1>ZyHome</h1> */}
        <HomeHeader history={this.props.history} />
        <TabBar history={this.props.history} match={this.props.match} />
      </main>
    );
  }
  // 挂载函数
  componentDidMount() {
    this.handleQuery();
  }

  //数据更新函数
  componentDidUpdate(prevProps, prevState, snapshot) {}

  //组件卸载函数
  componentWillUnmount() {}

  // 完整生命周期

  // 1、挂载周期
  // constructor() {}
  // static getDerivedStateFromProps() {}
  // render() {}
  // componentDidMount() {}

  //更新周期
  // static getDerivedStateFromProps() {}
  // shouldComponentUpdate() {}
  // render(){}
  // getSnapshotBeforeUpdate() {}
  // componentDidUpdate(prevProps, prevState, snapshot) {}

  //卸载周期
  // componentWillUnmount() {}
}
export default connect()(ZyHome);
