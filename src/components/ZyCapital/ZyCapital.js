import React from "react";
import { connect } from "dva";
import TabBar from "../TabBar/TabBar";
import { qlzccx } from "../../services/example.js";
import { calMoneyQuantile, toFixed } from "../../utils/common.js";
import style from "./zycapital.less";
class ZyCapital extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      isLook:
        localStorage.isLook === undefined
          ? true
          : localStorage.isLook === "true"
          ? true
          : false,
    };
  }
  handleQlzccx() {
    let custNo = localStorage.custNo;
    qlzccx({ custNo }).then((data) => {
      if (data.isSuccess === "0") {
        data.content.totalasset1 = calMoneyQuantile(
          toFixed(data.content.totalasset1, 2)
        );

        data.content.totalIncome1 = calMoneyQuantile(
          toFixed(data.content.totalIncome1, 2)
        );
        data.content.totalIncome1 = data.content.totalIncome1.includes("-")
          ? data.content.totalIncome1
          : "+" + data.content.totalIncome1;

        data.content.totalIncome2 = calMoneyQuantile(
          toFixed(data.content.totalIncome2, 2)
        );
        data.content.totalIncome2 = data.content.totalIncome2.includes("-")
          ? data.content.totalIncome2
          : "+" + data.content.totalIncome2;

        data.content.totalIncome3 = calMoneyQuantile(
          toFixed(data.content.totalIncome3, 2)
        );
        data.content.totalIncome3 = data.content.totalIncome3.includes("-")
          ? data.content.totalIncome3
          : "+" + data.content.totalIncome3;

        data.content.dayIncome1 = calMoneyQuantile(
          toFixed(data.content.dayIncome1, 2)
        );
        data.content.dayIncome1 = data.content.dayIncome1.includes("-")
          ? data.content.dayIncome1
          : "+" + data.content.dayIncome1;

        data.content.dayIncome2 = calMoneyQuantile(
          toFixed(data.content.dayIncome2, 2)
        );
        data.content.dayIncome2 = data.content.dayIncome2.includes("-")
          ? data.content.dayIncome2
          : "+" + data.content.dayIncome2;

        data.content.totalIncome3 = calMoneyQuantile(
          toFixed(data.content.totalIncome3, 2)
        );
        data.content.totalIncome3 = data.content.totalIncome3.includes("-")
          ? data.content.totalIncome3
          : "+" + data.content.totalIncome3;

        data.content.totalShare = calMoneyQuantile(
          toFixed(data.content.totalShare, 2)
        );
        data.content.totalasset4 = calMoneyQuantile(
          toFixed(data.content.totalasset4, 2)
        );
        data.content.dayIncome4 = calMoneyQuantile(
          toFixed(data.content.dayIncome4, 2)
        );
        data.content.totalIncome4 = calMoneyQuantile(
          toFixed(data.content.totalIncome4, 2)
        );
        data.content.totalasset3 = calMoneyQuantile(
          toFixed(data.content.totalasset3, 2)
        );
        data.content.totalasset1 = calMoneyQuantile(
          toFixed(data.content.totalasset1, 2)
        );
        // if (localStorage.isLook === undefined) {
        //   this.setState({
        //     isLook: true,
        //   });
        //   localStorage.setItem("isLook", true);
        // }
        this.setState({ userInfo: data.content });
      }
    });
  }
  toggleEye() {
    localStorage.setItem("isLook", !this.state.isLook);
    this.setState({
      isLook: !this.state.isLook,
    });
  }
  componentDidMount() {
    this.handleQlzccx();
  }

  header() {
    return (
      <header className="color-fff align-center">
        <div className="flex-between" style={{ padding: "0.3rem 0.2rem 0" }}>
          <span className="updateTime">最后更新于:updateDate</span>
          <div>
            <img
              className="message"
              src={require("../../assets/position/icon_message_write.png")}
              alt=""
            />
          </div>
        </div>
        <div className="total ta-c">
          <span className="ft-20">
            总资产(元)
            <i
              className={!this.state.isLook ? "eye-off" : ""}
              onClick={() => this.toggleEye()}
            ></i>
          </span>
          <p>{this.state.isLook ? this.state.userInfo.totalasset1 : "****"}</p>
        </div>
        <div className="income flex ta-c" ref="income">
          <dl className="left flex-1">
            <dd>最新收益(元)</dd>
            <dt>
              {this.state.isLook ? this.state.userInfo.dayIncome1 : "****"}
            </dt>
          </dl>
          <dl className="flex-1">
            <dd>累计收益(元)</dd>
            <dt>
              {this.state.isLook ? this.state.userInfo.totalIncome1 : "****"}
            </dt>
          </dl>
        </div>
      </header>
    );
  }

  render() {
    return (
      <main className={style.zycapital}>
        {this.header()}
        <TabBar history={this.props.history} match={this.props.match} />
      </main>
    );
  }
}
export default connect()(ZyCapital);
