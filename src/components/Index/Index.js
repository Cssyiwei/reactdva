import React from "react";
import { connect } from "dva";
import { Link } from "dva/router";
import style from "./index.scss";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routeList: [
        { path: "/zyhome", name: "首页" },
        { path: "/zyfund", name: "基金" },
        { path: "/zycapital", name: "资产" },
        { path: "/zymine", name: "我的" },
      ],
    };
  }
  handleClickEvent(path) {
    console.log(path);
    this.props.history.push(path);
  }
  render() {
    // const { path, url, params } = this.props.match;

    // console.log(path, url, params);
    return (
      <div>
        {/* {this.props.children} */}
        <ul className={style.tarbar}>
          {this.state.routeList.map((item, index) => {
            return (
              <li onClick={() => this.handleClickEvent(item.path)} key={index}>
                {item.name}
              </li>
            );
          })}
          {/* <li onClick={() => this.handleClickEvent()}>
            首页
            <Link to="/zyhome">首页</Link>
          </li> */}
        </ul>
      </div>
    );
  }
}
export default connect()(Index);
