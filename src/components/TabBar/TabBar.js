import React from "react";
// import { connect } from "dva";
import style from "./tabbar.less";

class TabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routeList: [
        {
          path: "/zyhome",
          name: "首页",
          imgUrl: require("../../assets/home/icon_tab_home_normal.png"),
          imgActive: require("../../assets/home/icon_tab_home_click.png"),
        },
        {
          path: "/zyfund",
          name: "基金",
          imgUrl: require("../../assets/home/icon_tab_jijin_normal.png"),
          imgActive: require("../../assets/home/icon_tab_jijin_click.png"),
        },
        {
          path: "/zycapital",
          name: "资产",
          imgUrl: require("../../assets/home/icon_tab_zichan_normal.png"),
          imgActive: require("../../assets/home/icon_tab_zichan_click.png"),
        },
        {
          path: "/zymine",
          name: "我的",
          imgUrl: require("../../assets/home/icon_tab_mine_normal.png"),
          imgActive: require("../../assets/home/icon_tab_mine_click.png"),
        },
      ],
    };
  }
  handleClickEvent(path) {
    this.props.history.push(path);
  }
  render() {
    const { path } = this.props.match;
    return (
      <div className={style.tabBar_wrap}>
        {/* {this.props.children} */}
        <ul className={style.tarbar}>
          {this.state.routeList.map((item, index) => {
            return (
              <li
                onClick={() => this.handleClickEvent(item.path)}
                key={index}
                className={item.path === path ? style.active : ""}
              >
                <img
                  src={item.path === path ? item.imgActive : item.imgUrl}
                  alt=""
                ></img>
                <p>{item.name}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default TabBar;
