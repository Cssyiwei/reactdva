import React from "react";
import { connect } from "dva";
import TabBar from "../TabBar/TabBar";
import HomeHeader from "./HomeHeader";
import Swipe from "./Swipe.js";
import { query, cxzxlb, tjjjlb } from "../../services/example.js";
import { typeDic, typeColorDic } from "../../utils/commonData.js";
import style from "./css/zyhome.less";

class ZyHome extends React.Component {
  // 常用生命周期
  constructor(props) {
    super(props);
    this.state = {
      showRadio: false,
      noticeList: [],
      noticeTitle: "",
      newFundList: [],
      renderArray: [
        {
          logo: require("../../assets/zyhome/icon_zhisujijin.png"),
          title: "指数基金",
          linkType: 0,
          link: "/market/theme-fund-zhishu",
        },
        {
          logo: require("../../assets/zyhome/icon_xianjinguanli_red.png"),
          title: "现金管理",
          linkType: 0,
          link: "/zyCashManagement",
        },
        {
          logo: require("../../assets/zyhome/icon_yanglaobao.png"),
          title: "养老专区",
          linkType: 1,
          link: "https://m.bocim.com/zyfund/zy/index.html#/elderfund",
        },
        {
          logo: require("../../assets/zyhome/icon_dingtouzhuangqu.png"),
          title: "定投专区",
          linkType: 0,
          link: "/zyInvestRegularly",
        },
      ],
      hotFundList: [],
      likeFundList: [],
      newsList: [],
    };
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
  handleCxzxlb(infoType, cb) {
    cxzxlb({ infoType })
      .then((data) => {
        if (typeof cb === "function") {
          cb(data);
        }
      })
      .catch((err) => {});
  }
  handleSpecificEvent(item) {
    if (item.linktype === "0") {
      this.props.history.push(item.link);
    } else {
      window.location.href = item.link;
    }
  }
  handlePrototypeInc(inc) {
    if (!inc) {
      return "--";
    } else if (inc && inc.includes("-")) {
      return inc;
    } else {
      return "+" + inc;
    }
  }
  handleChanggeEvent() {
    const arr = ["15", "17", "18", "19", "20", "29"];
    const num = parseInt(Math.random() * 6, 10);
    this.handleTjjjlb(arr[num], (data) => {
      if (data.isSuccess === "0") {
        if (data.content.fundList && data.content.fundList.length > 0) {
          this.setState({ likeFundList: data.content.fundList });
        } else {
          // this.setState({ showRadio: false });
        }
      }
    });
  }
  goOtherPgae(item) {
    this.props.history.push(`/market/${item.fundcode}`);
  }
  goDetailPage(data) {
    if (data.articleType === "1") {
      window.location.href = data.information;
    } else if (data.filepath) {
      const fileurl = "https://www.bocim.com" + data.filepath;
      this.$router.push({
        pathname: "/pdf",
        query: { url: encodeURIComponent(fileurl) },
      });
    } else {
      this.props.history.push({
        path: "/zyDetailHtml",
        query: {
          info: data.information,
          headTitle: data.title,
          title: "中银咨讯",
        },
      });
    }
  }
  // 渲染函数
  render() {
    return (
      <main className={style.zyhome}>
        <HomeHeader history={this.props.history} />
        <section>
          <div className={style.specific_wrap + " pl-30 pr-30 pt-30 pb-30"}>
            <ul className={style.specific + " flex"}>
              {this.state.renderArray.map((item) => (
                <li
                  key={item.title}
                  onClick={() => this.handleSpecificEvent(item)}
                >
                  <div>
                    <img className={style.icon} src={item.logo} alt="" />
                    <p className={style.title}>{item.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        {this.state.showRadio && this.state.noticeList.length > 0 && (
          <section className="pt-30 pb-30">
            <div className={style.radioDiv}>
              <img
                alt=""
                className={style.msgIcon}
                src={require("../../assets/zyhome/icon_news_kuaixun.png")}
              />
              <p
                onClick={() =>
                  this.props.history.push({
                    pathname: "/zyDetailHtml",
                    state: this.state.noticeList[0],
                  })
                }
              >
                {this.state.noticeList[0].title}
              </p>
              <img
                alt=""
                className={style.closeIcon}
                onClick={() => this.setState({ showRadio: false })}
                src={require("../../assets/zyhome/icon_cloes.png")}
              />
            </div>
          </section>
        )}
        <Swipe moduleNo="99" history={this.props.history} />
        {this.state.hotFundList.length > 0 && (
          <section className={style.hotfund}>
            <p className={style.title}>热销基金</p>
            <p className={style.fundline}></p>
            <div className={style.fund}>
              <ul>
                {this.state.hotFundList.map((item, index) => (
                  <li key={index}>
                    <div
                      className={style.liContent}
                      onClick={() => this.goOtherPgae(item)}
                    >
                      {index === 0 ? (
                        <img
                          alt=""
                          className={style.img}
                          src={require("../../assets/zyhome/icon_rank_one.png")}
                        />
                      ) : index === 1 ? (
                        <img
                          alt=""
                          className={style.img}
                          src={require("../../assets/zyhome/icon_rank_two.png")}
                        />
                      ) : (
                        <img
                          alt=""
                          className={style.img}
                          src={require("../../assets/zyhome/icon_rank_three.png")}
                        />
                      )}
                      <div className={style.percentDiv}>
                        <p className={style.title}>
                          {this.handlePrototypeInc(item.inc)}
                        </p>
                        <p className={style.desc}>{item.descrip}</p>
                      </div>
                      <p className={style.infoline}></p>
                      <div className={style.info}>
                        <p className={style.name}>
                          {item.fundname}
                          <span>{item.fundcode}</span>
                        </p>
                        <p className={style.desc}>
                          <span
                            style={{
                              color: typeColorDic[item.fundtype],
                              borderColor: typeColorDic[item.fundtype],
                            }}
                          >
                            {typeDic[item.fundtype]}
                          </span>
                          {item.titledescrip1}
                        </p>
                      </div>
                    </div>
                    <p className={style.listline}></p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
        <Swipe moduleNo="5" history={this.props.history} />
        {this.state.likeFundList.length > 0 && (
          <section className={style.likeSection}>
            <div className={style.likeHeader}>
              <p className={style.title}>猜你喜欢</p>
              <div className={style.changge}>
                <img
                  alt=""
                  src={require("../../assets/zyhome/icon_change.png")}
                />
                <p onClick={() => this.handleChanggeEvent()}>换一换</p>
              </div>
            </div>
            <p className={style.fundline}></p>
            <div className={style.likeDiv}>
              <ul>
                {this.state.likeFundList.map((item, index) => (
                  <li key={index}>
                    <div
                      className={style.likeList}
                      onClick={() => this.goOtherPgae(item)}
                    >
                      <p
                        className={style.lb + " " + style.type}
                        style={{
                          color: typeColorDic[item.fundtype],
                          borderColor: typeColorDic[item.fundtype],
                        }}
                      >
                        {typeDic[item.fundtype]}
                      </p>
                      <p className={style.lb + " ta-c " + style.desc}>
                        {item.fundname}
                      </p>
                      {/* <p v-if="convertInc(item.inc) < 0" className={style.lb percent green">{ item.inc }</p> */}
                      <p
                        className={
                          item.inc && item.inc.includes("-")
                            ? style.green + style.lb + " " + style.percent
                            : style.lb + " " + style.percent
                        }
                      >
                        {this.handlePrototypeInc(item.inc)}
                      </p>
                      <p className={style.lb + " " + style.tips}>
                        {item.descrip}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {this.state.newsList.length > 0 && (
          <section className={style.bottomSection}>
            <div
              className={style.likeHeader}
              onClick={() => this.props.history.push("/zyNewsInfo")}
            >
              <p className={style.title}>中银资讯</p>
              <div className={style.more}>
                <img
                  alt=""
                  src={require("../../assets/zymine/icon_list_go.png")}
                />
              </div>
            </div>
            <p className={style.fundline}></p>
            <ul>
              {this.state.newsList.map((item, index) => (
                <li key={index}>
                  <div
                    className={style.newsDiv}
                    onClick={() => this.goOtherPgae(item)}
                  >
                    <p className={style.newsTitle}>{item.title}</p>
                    <p className={style.newsTime}>
                      <img
                        alt=""
                        className={style.timeImg}
                        src={require("../../assets/zyhome/icon_time.png")}
                      />
                      {item.starttime}
                      <img
                        alt=""
                        className={style.eyeImg}
                        src={require("../../assets/zyhome/icon_eye_grey.png")}
                      />
                      {item.reading}
                    </p>
                  </div>
                  <p className={style.listline}></p>
                </li>
              ))}
            </ul>
          </section>
        )}
        <footer>
          <ul>
            <li>
              <p className={style.title}>控股股东</p>
              <p className={style.desc}>中国银行</p>
              {/* <p className={time">item.time</p> */}
            </li>
            <li>
              <p className={style.title}>累计服务客户数</p>
              <p className={style.desc}>逾1000万</p>
              {/* <p className={time">item.time</p> */}
            </li>
            <li>
              <p className={style.title}>资产管理规模</p>
              <p className={style.desc}>5231亿</p>
              <p className={style.time}>2020.09.30</p>
            </li>
          </ul>
        </footer>
        <TabBar history={this.props.history} match={this.props.match} />
      </main>
    );
  }
  // 挂载函数
  componentDidMount() {
    // this.handleQuery();
    this.handleCxzxlb(5, (data) => {
      if (data.isSuccess === "0") {
        if (
          data.content.informationList &&
          data.content.informationList.length > 0
        ) {
          this.setState({ noticeList: data.content.informationList });
          this.setState({ showRadio: true });
        } else {
          this.setState({ showRadio: false });
        }
      }
    });
    this.handleCxzxlb("I", (data) => {
      if (data.isSuccess === "0") {
        if (
          data.content.informationList &&
          data.content.informationList.length > 0
        ) {
          this.setState({ newsList: data.content.informationList });
        } else {
          // this.setState({ showRadio: false });
        }
      }
    });
    this.handleTjjjlb("01", (data) => {
      if (data.isSuccess === "0") {
        if (data.content.fundList && data.content.fundList.length > 0) {
          this.setState({ hotFundList: data.content.fundList });
        } else {
          // this.setState({ showRadio: false });
        }
      }
    });
    this.handleTjjjlb("15", (data) => {
      if (data.isSuccess === "0") {
        if (data.content.fundList && data.content.fundList.length > 0) {
          this.setState({ likeFundList: data.content.fundList });
        } else {
          // this.setState({ showRadio: false });
        }
      }
    });
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
