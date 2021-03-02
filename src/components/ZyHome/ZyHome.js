import React from "react";
import { connect } from "dva";
import TabBar from "../TabBar/TabBar";
import { query } from "../../services/example.js";
class ZyHome extends React.Component {
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


  //挂载
  // constructor() {}
  // static getDerivedStateFromProps() {}
  // render() {}
  componentDidMount() {
    this.handleQuery();
    // 会在组件挂载后（插入 DOM 树中）立即调用。依赖于 DOM 节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方。
    // 这个方法是比较适合添加订阅的地方。如果添加了订阅，请不要忘记在 componentWillUnmount() 里取消订阅
    // 你可以在 componentDidMount() 里直接调用 setState()。它将触发额外渲染，但此渲染会发生在浏览器更新屏幕之前。如此保证了即使在 render() 两次调用的情况下，用户也不会看到中间状态。请谨慎使用该模式，因为它会导致性能问题。通常，你应该在 constructor() 中初始化 state。如果你的渲染依赖于 DOM 节点的大小或位置，比如实现 modals 和 tooltips 等情况下，你可以使用此方式处理
  }
  // componentWillUnmount() {}

  // //更新
  // static getDerivedStateFromProps() {}
  // shouldComponentUpdate() {}
  // // render(){}
  // getSnapshotBeforeUpdate() {}
  // componentDidUpdate() {}

  // //卸载
  // componentWillUnmount()

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>ZyHome</h1>
        <TabBar history={this.props.history} match={this.props.match} />
      </div>
    );
  }
}
export default connect()(ZyHome);
