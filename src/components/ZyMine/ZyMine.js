import React from "react";
import { connect } from "dva";
import TabBar from "../TabBar/TabBar";
import style from "./zyMine.less";

const RiskLevel = {
  1: "安全型",
  2: "保守型",
  3: "稳健型",
  4: "积极型",
  5: "激进型",
};
const RiskLevelLogo = {
  1: require("../../assets/riskLevel/icon_type_jjxx.png"),
  2: require("../../assets/riskLevel/icon_type_bsx.png"),
  3: require("../../assets/riskLevel/icon_type_wjx.png"),
  4: require("../../assets/riskLevel/icon_type_jsx.png"),
  5: require("../../assets/riskLevel/icon_type_jjx.png"),
};
class ZyMine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      riskLevelText: "",
      riskLevel: "",
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
        this.setState({
          riskLevelText,
          riskLevel: data.riskLevel,
        });
      });
  }
  person() {
    return (
      <section className="person">
        <div className="personinfo flex-start">
          <div className="custname">{this.props.main.userInfo.custName}</div>
          <div className="flex-1 ml-10">
            <p className="risklevel flex-start">
              <img
                className="riskimg mr-5"
                src={RiskLevelLogo[this.state.riskLevel]}
              />
              {this.state.riskLevelText}
            </p>
          </div>
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
  componentDidMount() {
    this.handleKhxxcx();
  }
  render() {
    return (
      <main className={style.zymine}>
        <header className="header">
          <div className="headerIcon" />
        </header>
        {this.person()}
        <TabBar history={this.props.history} match={this.props.match} />
      </main>
    );
  }
}
export default connect(({ main }) => ({ main }))(ZyMine);
