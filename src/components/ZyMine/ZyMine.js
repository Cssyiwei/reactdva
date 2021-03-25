import React, { Fragment } from "react";
import { connect } from "dva";
import TabBar from "../TabBar/TabBar";
import { Modal } from "antd-mobile";
import style from "./zyMine.less";
import { RiskLevel, RiskLevelLogo } from "../../utils/commonData.js";
import { isWeChat } from "../../utils/common.js";
import { tcdl } from "../../services/example.js";

const alert = Modal.alert;

class ZyMine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      riskLevelText: "",
      riskLevel: "",
      list: [
        {
          list: [
            {
              logo: require("../../assets/zymine/icon_mine_list_fxpc.png"),
              title: "风险测评",
              link: "",
              isShow: true,
            },
            {
              logo: require("../../assets/zymine/icon_mine_list_zczm.png"),
              title: "资产证明",
              link: "",
              isShow: true,
            },
          ],
        },
        {
          list: [
            {
              logo: require("../../assets/zymine/icon_mine_list_jfzx@3x.png"),
              title: "积分中心",
              link: "",
              isShow: true,
              tips: "小积分，抽大奖",
            },
            {
              logo: require("../../assets/zymine/icon_mine_list_tjhy.png"),
              title: "推荐好友",
              link: "",
              isShow: true,
            },
            {
              logo: require("../../assets/zymine/icon-mingpian@1.5x.png"),
              title: "我的二维码",
              link: "",
              isShow: false,
              code: require("../../assets/zymine/icon_code@1.5x.png"),
            },
          ],
        },
        {
          list: [
            {
              logo: require("../../assets/zymine/icon_mine_list_cjwt.png"),
              title: "常见问题",
              link: "",
              isShow: true,
            },
            {
              logo: require("../../assets/zymine/icon_mine_list_kefu.png"),
              title: "在线客服",
              link: "",
              isShow: true,
            },
            {
              logo: require("../../assets/zymine/icon_mine_list_zyzx.png"),
              title: "关于中银",
              link: "",
              isShow: true,
            },
            {
              logo: require("../../assets/zymine/icon_setImg.png"),
              title: "设置",
              link: "",
              isShow: false,
            },
          ],
        },
        {
          list: [
            {
              logo: require("../../assets/zymine/exit-logon@2x.png"),
              title: isWeChat() ? "退出绑定" : "退出登录",
              link: "",
              isShow: false,
            },
          ],
        },
      ],
    };
  }
  handleKhxxcx() {
    this.props
      .dispatch({
        type: "main/fetch",
        payload: {
          custId: localStorage.custId,
          custNo: localStorage.custNo,
        },
      })
      .then((data) => {
        console.log(data);
        let riskLevelText;
        if (data.riskLevel === "1" && data.isMinRisk === "Y") {
          riskLevelText = RiskLevel[data.riskLevel] + "(最低风险等级)";
        } else {
          riskLevelText = RiskLevel[data.riskLevel];
        }
        let list = this.state.list;
        if (!localStorage.custNo && !localStorage.custId) {
          if (data.bocimEmpFlag === "Y") {
            list[1].list[2].isShow = true;
          }
        } else {
          list[3].list[0].isShow = true;
          list[2].list[3].isShow = true;
        }
        this.setState({
          riskLevelText,
          riskLevel: data.riskLevel,
        });
      });
  }
  handleTcdl(resolve) {
    tcdl().then((data) => {
      if (data.isSuccess === "0") {
        localStorage.clear();
        sessionStorage.clear();
        resolve();
        this.props.history.push("/login");
      }
    });
  }
  render_person() {
    return (
      <section className="person">
        <div className="personinfo flex-start">
          {Object.keys(this.props.main.userInfo).length > 0 ? (
            <Fragment>
              <div className="custname">
                {this.props.main.userInfo.custName}
              </div>
              <div className="flex-1 ml-10">
                <p className="risklevel flex-start">
                  <img
                    className="riskimg mr-5"
                    src={RiskLevelLogo[this.state.riskLevel]}
                  />
                  {this.state.riskLevelText}
                </p>
              </div>
            </Fragment>
          ) : (
            <div className="login">登录/注册</div>
          )}
          <img
            className="moreimg"
            src={require("../../assets/zymine/more@2x.png")}
          />
        </div>
        <div className="navdiv">
          <div className="navitem" on="safeCenter">
            <img
              className="icon"
              src={require("../../assets/zymine/icon_anquanzhongxin.png")}
              alt=""
            />
            <p className="title">安全中心</p>
          </div>
          <p className="line"></p>
          <div className="navitem" on="bankCardList">
            <img
              className="icon"
              src={require("../../assets/zymine/icon_bank_my.png")}
              alt=""
            />
            <p className="title">银行卡管理</p>
          </div>
        </div>
      </section>
    );
  }
  render_list() {
    return (
      <section className="list">
        {this.state.list.map((list, index) => (
          <ul className="outer-list" key={index}>
            {list.list.map((item) => {
              if (item.isShow) {
                return (
                  <li
                    key={item.title}
                    className="inner-list flex"
                    onClick={() => this.handle_listItem_event(item.title)}
                  >
                    <img className="icon-img" src={item.logo} alt="" />
                    <p className="flex-1 center-title">{item.title}</p>
                    {item.tips && <p className="right-tips">{item.tips}</p>}
                    {item.code && (
                      <img className="right-code" src={item.code} alt="" />
                    )}
                    <img
                      className="right-img"
                      src={require("../../assets/zymine/more@2x.png")}
                      alt=""
                    />
                  </li>
                );
              } else {
                return false;
              }
            })}
          </ul>
        ))}
      </section>
    );
  }
  componentDidMount() {
    this.handleKhxxcx();
  }
  handle_listItem_event(type) {
    // console.log(type);
    const self = this;
    switch (type) {
      case "积分中心":
        window.location.href =
          "http://m.bocim.com/zyfund/zywx/index.html#/integral";
        break;
      case "在线客服":
        window.location.href =
          "http://chat.looyuoms.com/chat/chat/p.do?c=20003950&f=10105823&g=10082953";
        break;
      case "退出绑定":
      case "退出登录":
        alert("", "确认退出登录吗？", [
          { text: "取消", onPress: () => console.log("cancel") },
          {
            text: "确定",
            onPress: () =>
              new Promise((resolve) => {
                self.handleTcdl(resolve);
              }),
          },
        ]);
        break;

      default:
        break;
    }
  }
  render() {
    return (
      <main className={style.zymine}>
        <header className="header">
          <div className="headerIcon" />
        </header>
        {this.render_person()}
        {this.render_list()}
        <TabBar history={this.props.history} match={this.props.match} />
      </main>
    );
  }
}
export default connect(({ main }) => ({ main }))(ZyMine);
