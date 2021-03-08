import React from "react";
import { connect } from "dva";
import TabBar from "../TabBar/TabBar";
import { Carousel } from "antd-mobile";
import style from "./ZyFund.less";
import { tjjjlb, ztjjlb } from "../../services/example.js";
import { typeDic, typeColorDic } from "../../utils/commonData.js";
import { convertInc } from "../../utils/common.js";

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
      hotFunds: [],
      slides: [
        {
          picurl: require("../../assets/market/pic_banner_zqjdsy.png"),
          moduleno: "02",
        },
        {
          picurl: require("../../assets/market/pic_banner_zqjj.png"),
          moduleno: "03",
        },
        {
          picurl: require("../../assets/market/pic_banner_zsjj.png"),
          moduleno: "04",
        },
      ],
      themeFunds: [],
      themeSum: [],
    };
    this.handleBeforeChange = this.handleBeforeChange.bind(this);
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
  handleTjjjlbHot() {
    tjjjlb({ moduleNo: "01", careFlag: "1" })
      .then((data) => {
        if (data.isSuccess === "0") {
          if (data.content.fundList && data.content.fundList.length > 0) {
            this.setState({ hotFunds: data.content.fundList.slice(0, 3) });
          } else {
            // this.setState({ showRadio: false });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleZtjjlb(position) {
    ztjjlb({ position })
      .then((data) => {
        if (data.isSuccess === "0") {
          if (data.content.moduleList && data.content.moduleList.length > 0) {
            let arr = [];
            data.content.moduleList.forEach((item) => {
              item.fundlist = item.fundlist.slice(0, 3);
              if (item.moduleno === "02") {
                arr = item.fundlist;
              }
            });
            this.setState({ themeFunds: arr });
            this.setState({ themeSum: data.content.moduleList });
          } else {
            // this.setState({ showRadio: false });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  goOtherPgae(item) {
    console.log(item);
  }
  fundCheck(item) {
    console.log(item);
  }
  handleBeforeChange(form, to) {
    if (this.state.themeSum.length <= 0) return false;
    switch (to) {
      case 0:
        this.setState({ themeFunds: this.state.themeSum[0].fundlist });
        break;
      case 1:
        this.setState({ themeFunds: this.state.themeSum[2].fundlist });
        break;
      case 2:
        this.setState({ themeFunds: this.state.themeSum[1].fundlist });
        break;
      default:
        break;
    }
  }
  componentDidMount() {
    this.handleTjjjlb("14", (data) => {
      if (data.isSuccess === "0") {
        if (data.content.fundList && data.content.fundList.length > 0) {
          this.setState({ newFunds: data.content.fundList.slice(0, 3) });
        } else {
          // this.setState({ showRadio: false });
        }
      }
    });
    this.handleZtjjlb("themefunds");
    this.handleTjjjlbHot();
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
    if (this.state.newFunds.length > 0) {
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
    } else {
      return false;
    }
  }
  hotFunds() {
    if (this.state.hotFunds.length > 0) {
      return (
        <section className="hot-funds">
          <div
            className="hot-investment"
            onClick={() => this.goOtherPgae("all-fund", 1)}
          >
            <span className="title">热销基金</span>
            <img
              alt=""
              className="arrow"
              src={require("../../assets/zymine/more@2x.png")}
            />
          </div>
          <div className="hot-fund">
            <ul>
              {this.state.hotFunds.map((item, index) => (
                <li key={index}>
                  <div className="flex">
                    <div
                      className="flex-1 rateDiv"
                      onClick={() =>
                        this.goOtherPgae("fund-detail", item.fundcode, item)
                      }
                    >
                      {convertInc(item.inc) < 0 ? (
                        <p className="rateInfo green">{item.inc}</p>
                      ) : (
                        <p className="rateInfo">+{item.inc}</p>
                      )}
                      <p className="rateTip">{item.descrip}</p>
                    </div>
                    <div
                      className="flex-2"
                      style={{ marginLeft: "0.2rem" }}
                      onClick={() =>
                        this.goOtherPgae("fund-detail", item.fundcode, item)
                      }
                    >
                      <p className="middleTop">
                        {item.fundname}
                        <a
                          style={{
                            fontSize: "0.26rem",
                            color: "#999999",
                            marginLeft: " 0.15rem",
                            fontFamily: "PingFangSC-Regular",
                          }}
                        >
                          {item.fundcode}
                        </a>
                      </p>
                      <p className="middleCenter">{item.titledescrip1}</p>
                      <p className="middleBottom">{item.titledescrip2}</p>
                    </div>
                    <div
                      className="flex-1"
                      style={{ marginRight: "0.1rem", textAlign: "right" }}
                    >
                      {item.careYN === "1" ? (
                        <p>
                          <img
                            alt=""
                            className="fund-checked"
                            src={require("../../assets/market/icon_collect_checked.png")}
                            onClick={() =>
                              this.fundCheck(item.fundcode, item.careYN)
                            }
                          />
                        </p>
                      ) : (
                        <p>
                          <img
                            alt=""
                            className="fund-checked"
                            src={require("../../assets/market/icon_collect_normal.png")}
                            onClick={() =>
                              this.fundCheck(item.fundcode, item.careYN)
                            }
                          />
                        </p>
                      )}

                      <p>
                        <span
                          className="button"
                          onClick={() =>
                            this.goOtherPgae("fund-buy", item.fundcode)
                          }
                        >
                          购买
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="divide"></div>
        </section>
      );
    } else {
      return false;
    }
  }
  themeFunds() {
    return (
      <section className="theme-funds">
        <div
          className="hot-investment"
          onClick={() => this.goOtherPgae("theme-fund")}
        >
          <span className="title">主题基金</span>
          <img
            alt=""
            className="arrow"
            src={require("../../assets/zymine/more@2x.png")}
          />
        </div>

        <div className="caro-wrap">
          <Carousel
            autoplay
            autoplayInterval={3000}
            infinite
            dotStyle={{
              width: "0.1rem",
              height: "0.1rem",
            }}
            dotActiveStyle={{
              background: "#ff2525",
              width: "0.1rem",
              height: "0.1rem",
            }}
            beforeChange={this.handleBeforeChange}
          >
            {this.state.slides.map((item, index) => (
              <div className="caro-img" key={index}>
                <img alt="" src={item.picurl} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="theme-fund">
          <ul>
            {this.state.themeFunds.map((item, index) => (
              <li
                key={index}
                onClick={() =>
                  this.goOtherPgae("fund-detail", item.fundcode, item)
                }
              >
                <div className="theme-funds-list">
                  <p className="tf name overellipsid">{item.fundname}</p>
                  <p className="tf code">{item.fundcode}</p>
                  {convertInc(item.inc) < 0 ? (
                    <p className="tf percent green">{item.inc}</p>
                  ) : (
                    <p className="tf percent">+{item.inc}</p>
                  )}
                  <p className="tf tips">{item.descrip}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
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
        {this.hotFunds()}
        {this.themeFunds()}
        {/*  */}

        <TabBar history={this.props.history} match={this.props.match} />
      </main>
    );
  }
}
export default connect(({ main }) => ({ main }))(ZyFund);
