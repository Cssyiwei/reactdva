import React from "react";
import { connect } from "dva";
import TabBar from "../TabBar/TabBar";
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
      <div>
        <h1>ZyHome</h1>
        <TabBar history={this.props.history} match={this.props.match} />
      </div>
    );
  }
  // 挂载函数
  componentDidMount() {
    this.handleQuery();
    // 会在组件挂载后（插入 DOM 树中）立即调用。依赖于 DOM 节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方。
    // 这个方法是比较适合添加订阅的地方。如果添加了订阅，请不要忘记在 componentWillUnmount() 里取消订阅
    // 你可以在 componentDidMount() 里直接调用 setState()。它将触发额外渲染，但此渲染会发生在浏览器更新屏幕之前。如此保证了即使在 render() 两次调用的情况下，用户也不会看到中间状态。请谨慎使用该模式，因为它会导致性能问题。通常，你应该在 constructor() 中初始化 state。如果你的渲染依赖于 DOM 节点的大小或位置，比如实现 modals 和 tooltips 等情况下，你可以使用此方式处理
  }

  //数据更新函数
  componentDidUpdate(prevProps, prevState, snapshot) {
    // 会在更新后会被立即调用。首次渲染不会执行此方法。
    // 如果 shouldComponentUpdate() 返回值为 false，则不会调用 componentDidUpdate()。
    // 典型用法（不要忘记比较 props）：
    if (this.props.userID !== prevProps.userID) {
      this.fetchData(this.props.userID);
    }
  }

  //组件卸载函数
  componentWillUnmount() {
    // 在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，例如，清除 timer，取消网络请求或清除在 componentDidMount() 中创建的订阅等。
    // componentWillUnmount() 中不应调用 setState()，因为该组件将永远不会重新渲染。组件实例卸载后，将永远不会再挂载它。
  }

  // 不常用的生命周期方法

  // shouldComponentUpdate(nextProps, nextState) {
  // 根据 shouldComponentUpdate() 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。默认行为是 state 每次发生变化组件都会重新渲染。大部分情况下，你应该遵循默认行为。
  // 当 props 或 state 发生变化时，shouldComponentUpdate() 会在渲染执行之前被调用。返回值默认为 true。首次渲染或使用 forceUpdate() 时不会调用该方法。
  // 此方法仅作为性能优化的方式而存在。不要企图依靠此方法来“阻止”渲染，因为这可能会产生 bug。你应该考虑使用内置的 PureComponent 组件，而不是手动编写 shouldComponentUpdate()。PureComponent 会对 props 和 state 进行浅层比较，并减少了跳过必要更新的可能性。
  // 如果你一定要手动编写此函数，可以将 this.props 与 nextProps 以及 this.state 与nextState 进行比较，并返回 false 以告知 React 可以跳过更新。请注意，返回 false 并不会阻止子组件在 state 更改时重新渲染。
  // 我们不建议在 shouldComponentUpdate() 中进行深层比较或使用 JSON.stringify()。这样非常影响效率，且会损害性能。
  // 目前，如果 shouldComponentUpdate() 返回 false，则不会调用 UNSAFE_componentWillUpdate()，render() 和 componentDidUpdate()。后续版本，React 可能会将 shouldComponentUpdate 视为提示而不是严格的指令，并且，当返回 false 时，仍可能导致组件重新渲染。
  // }

  // static getDerivedStateFromProps(props, state) {
  // getDerivedStateFromProps 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。
  // 此方法适用于罕见的用例，即 state 的值在任何时候都取决于 props。例如，实现 <Transition> 组件可能很方便，该组件会比较当前组件与下一组件，以决定针对哪些组件进行转场动画。
  // 派生状态会导致代码冗余，并使组件难以维护。 确保你已熟悉这些简单的替代方案：
  //   如果你需要执行副作用（例如，数据提取或动画）以响应 props 中的更改，请改用 componentDidUpdate。
  //   如果只想在 prop 更改时重新计算某些数据，请使用 memoization helper 代替。
  //   如果你想在 prop 更改时“重置”某些 state，请考虑使组件完全受控或使用 key 使组件完全不受控代替。
  //   此方法无权访问组件实例。如果你需要，可以通过提取组件 props 的纯函数及 class 之外的状态，在getDerivedStateFromProps()和其他 class 方法之间重用代码。
  // 请注意，不管原因是什么，都会在每次渲染前触发此方法。这与 UNSAFE_componentWillReceiveProps 形成对比，后者仅在父组件重新渲染时触发，而不是在内部调用 setState 时。
  // }

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  // 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 componentDidUpdate()。
  // 此用法并不常见，但它可能出现在 UI 处理中，如需要以特殊方式处理滚动位置的聊天线程等。应返回 snapshot 的值（或 null）。
  // class ScrollingList extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.listRef = React.createRef();
  //   }
  //   getSnapshotBeforeUpdate(prevProps, prevState) {
  //     // 我们是否在 list 中添加新的 items ？
  //     // 捕获滚动​​位置以便我们稍后调整滚动位置。
  //     if (prevProps.list.length < this.props.list.length) {
  //       const list = this.listRef.current;
  //       return list.scrollHeight - list.scrollTop;
  //     }
  //     return null;
  //   }
  //   componentDidUpdate(prevProps, prevState, snapshot) {
  //     // 如果我们 snapshot 有值，说明我们刚刚添加了新的 items，
  //     // 调整滚动位置使得这些新 items 不会将旧的 items 推出视图。
  //     //（这里的 snapshot 是 getSnapshotBeforeUpdate 的返回值）
  //     if (snapshot !== null) {
  //       const list = this.listRef.current;
  //       list.scrollTop = list.scrollHeight - snapshot;
  //     }
  //   }
  //   render() {
  //     return (
  //       <div ref={this.listRef}>{/* ...contents... */}</div>
  //     );
  //   }
  // }
  // 在上述示例中，重点是从 getSnapshotBeforeUpdate 读取 scrollHeight 属性，因为 “render” 阶段生命周期（如 render）和 “commit” 阶段生命周期（如 getSnapshotBeforeUpdate 和 componentDidUpdate）之间可能存在延迟。
  // }

  // Error boundaries
  // Error boundaries 是 React 组件，它会在其子组件树中的任何位置捕获 JavaScript 错误，并记录这些错误，展示降级 UI 而不是崩溃的组件树。Error boundaries 组件会捕获在渲染期间，在生命周期方法以及其整个树的构造函数中发生的错误。
  // 如果 class 组件定义了生命周期方法 static getDerivedStateFromError() 或 componentDidCatch() 中的任何一个（或两者），它就成为了 Error boundaries。通过生命周期更新 state 可让组件捕获树中未处理的 JavaScript 错误并展示降级 UI。
  // 仅使用 Error boundaries 组件来从意外异常中恢复的情况；不要将它们用于流程控制。

  // static getDerivedStateFromError(error) {
  //   // 此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state
  //   // getDerivedStateFromError() 会在渲染阶段调用，因此不允许出现副作用。 如遇此类情况，请改用 componentDidCatch()。
  // }

  // componentDidCatch(error, info) {
  //   // 此生命周期在后代组件抛出错误后被调用。 它接收两个参数：
  //   // error —— 抛出的错误。
  //   // info —— 带有 componentStack key 的对象，其中包含有关组件引发错误的栈信息。
  //   // componentDidCatch() 会在“提交”阶段被调用，因此允许执行副作用。 它应该用于记录错误之类的情况：
  // }

  // 其他API
  // setState(updater, [callback])
  // setState() 将对组件 state 的更改排入队列，并通知 React 需要使用更新后的 state 重新渲染此组件及其子组件。这是用于更新用户界面以响应事件处理器和处理服务器数据的主要方式
  // 将 setState() 视为请求而不是立即更新组件的命令。为了更好的感知性能，React 会延迟调用它，然后通过一次传递更新多个组件。React 并不会保证 state 的变更会立即生效。
  // setState() 并不总是立即更新组件。它会批量推迟更新。这使得在调用 setState() 后立即读取 this.state 成为了隐患。为了消除隐患，请使用 componentDidUpdate 或者 setState 的回调函数（setState(updater, callback)），这两种方式都可以保证在应用更新后触发。如需基于之前的 state 来设置当前的 state，请阅读下述关于参数 updater 的内容。
  // 除非 shouldComponentUpdate() 返回 false，否则 setState() 将始终执行重新渲染操作。如果可变对象被使用，且无法在 shouldComponentUpdate() 中实现条件渲染，那么仅在新旧状态不一时调用 setState()可以避免不必要的重新渲染
  // 参数一为带有形式参数的 updater 函数：(state, props) => stateChange
  // state 是对应用变化时组件状态的引用。当然，它不应直接被修改。你应该使用基于 state 和 props 构建的新对象来表示变化。例如，假设我们想根据 props.step 来增加 state：
  // this.setState((state, props) => {
  //   return {counter: state.counter + props.step};
  // });
  // updater 函数中接收的 state 和 props 都保证为最新。updater 的返回值会与 state 进行浅合并。
  // setState() 的第二个参数为可选的回调函数，它将在 setState 完成合并并重新渲染组件后执行。通常，我们建议使用 componentDidUpdate() 来代替此方式。
  // setState() 的第一个参数除了接受函数外，还可以接受对象类型：setState(stateChange[, callback])
  // stateChange 会将传入的对象浅层合并到新的 state 中，例如，调整购物车商品数：this.setState({quantity: 2})
  // 这种形式的 setState() 也是异步的，并且在同一周期内会对多个 setState 进行批处理。例如，如果在同一周期内多次设置商品数量增加，则相当于：
  // Object.assign(
  //   previousState,
  //   {quantity: state.quantity + 1},
  //   {quantity: state.quantity + 1},
  //   ...
  // )
  // 后调用的 setState() 将覆盖同一周期内先调用 setState 的值，因此商品数仅增加一次。如果后续状态取决于当前状态，我们建议使用 updater 函数的形式代替：
  // this.setState((state) => {
  //   return {quantity: state.quantity + 1};
  // });

  // forceUpdate()
  // component.forceUpdate(callback)
  // 默认情况下，当组件的 state 或 props 发生变化时，组件将重新渲染。如果 render() 方法依赖于其他数据，则可以调用 forceUpdate() 强制让组件重新渲染。
  // 调用 forceUpdate() 将致使组件调用 render() 方法，此操作会跳过该组件的 shouldComponentUpdate()。但其子组件会触发正常的生命周期方法，包括 shouldComponentUpdate() 方法。如果标记发生变化，React 仍将只更新 DOM。
  // 通常你应该避免使用 forceUpdate()，尽量在 render() 中使用 this.props 和 this.state。

  // Class 属性
  // defaultProps
  // defaultProps 可以为 Class 组件添加默认 props。这一般用于 props 未赋值，但又不能为 null 的情况。例如：
  // class CustomButton extends React.Component {
  //   // ...
  // }
  // CustomButton.defaultProps = {
  //   color: 'blue'
  // };
  // 如果未提供 props.color，则默认设置为 'blue'
  // render() {
  //   return <CustomButton /> ; // props.color 将设置为 'blue'
  // }
  // 如果 props.color 被设置为 null，则它将保持为 null
  // render() {
  //   return <CustomButton color={null} /> ; // props.color 将保持是 null
  // }
  // displayName
  // displayName 字符串多用于调试消息。通常，你不需要设置它，因为它可以根据函数组件或 class 组件的名称推断出来。

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
