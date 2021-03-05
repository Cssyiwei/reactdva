import React from "react";
import { connect } from "dva";
import TabBar from "../TabBar/TabBar";
import style from "./ZyFund.less";
import { tjjjlb } from "../../services/example.js";
import { typeDic, typeColorDic } from "../../utils/commonData.js";

// import {  } from "../../services/example.js";

class ZyFund extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: [
        {
          logo: require("../../assets/market/icon_quanbujijin.png"),
          title: "全部基金",
          link: "/all-fund/2",
        },
        {
          logo: require("../../assets/market/icon_paihangbang.png"),
          title: "排行榜",
          link: "/market/fund-rank",
        },
        {
          logo: require("../../assets/market/icon_zhutijijin.png"),
          title: "主题基金",
          link: "/market/theme-fund",
        },
        {
          logo: require("../../assets/market/icon_wodeguanzhu.png"),
          title: "我的关注",
          link: "/home/optional",
        },
      ],
      newFunds: [],
    };
  }

  handleTjjjlb(moduleNo, cb) {
    tjjjlb({ moduleNo })
      .then((data) => {
        if (typeof cb === "function") {
          cb(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  goOtherPgae(item) {
    console.log(item);
  }
  componentDidMount() {
    this.handleTjjjlb("15", (data) => {
      if (data.isSuccess === "0") {
        if (data.content.fundList && data.content.fundList.length > 0) {
          this.setState({ newFunds: data.content.fundList.slice(0, 3) });
        } else {
          // this.setState({ showRadio: false });
        }
      }
    });
  }

  header() {
    return (
      <header className={style.header}>
        <div className={style.search_input}></div>
        <img
          alt=""
          className={style.search_icon}
          src={require("../../assets/market/icon_search_write.png")}
        />
        <input
          className={style.inputinfo}
          type="text"
          placeholder="请输入基金名称／代码"
        />
        <img
          alt=""
          className={style.message}
          src={require("../../assets/position/icon_message_write.png")}
          onClick={() => this.props.history.push("./usermsg")}
        />
      </header>
    );
  }
  nav() {
    return (
      <nav className="">
        <ul className="nav-funds flex">
          {this.state.icon.map((item, index) => (
            <li key={item.title}>
              <img alt="" src={item.logo} />
              <p>{item.title}</p>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
  newFunds() {
    return (
      <section className="new-funds">
        <div
          className="hot-investment"
          onClick={() => this.goOtherPgae("all-fund", 0)}
        >
          <span className="title">新发基金</span>
          <img
            alt=""
            className="arrow"
            src={require("../../assets/zymine/more@2x.png")}
          />
        </div>
        <div className="new-fund">
          <ul>
            {this.state.newFunds.map((item, index) => (
              <li key={index}>
                <div className="flex">
                  <div
                    className="flex-2"
                    onClick={() =>
                      this.goOtherPgae("fund-detail", item.fundcode, item)
                    }
                  >
                    <p className="leftTop">{item.fundname + item.fundcode}</p>
                    <div className="flex leftBottom">
                      <p className="flex-1">
                        <span
                          style={{
                            color: typeColorDic[item.fundtype],
                            borderColor: typeColorDic[item.fundtype],
                          }}
                          className="logo"
                        >
                          {typeDic[item.fundtype]}
                        </span>
                      </p>
                      <p
                        className="flex-3"
                        style={{
                          maxWidth: "3.5rem",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.titledescrip1}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1" style={{ marginRight: "0.1rem" }}>
                    <p className="rightTop">
                      <span
                        className="new-fund-button"
                        onClick={() =>
                          this.goOtherPgae("fund-subscribe", item.fundcode)
                        }
                      >
                        购买
                      </span>
                    </p>
                    {/* <p className="rightBottom">现金理财'升级版'</p> */}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="divide"></div>
      </section>
    );
  }

  render() {
    return (
      <main className={style.zyfund}>
        {/* <h1>ZyFund</h1> */}
        {this.header()}
        {this.nav()}
        {this.newFunds()}
        {/*  */}

        <TabBar history={this.props.history} match={this.props.match} />
      </main>
    );
  }
}
export default connect(({ main }) => ({ main }))(ZyFund);
