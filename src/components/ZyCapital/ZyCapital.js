import React, { Fragment } from "react";
import { connect } from "dva";
import TabBar from "../TabBar/TabBar";
import { qlzccx, xtgzrcx } from "../../services/example.js";
import { Toast } from "antd-mobile";

import {
  calMoneyQuantile,
  toFixed,
  dateFormatNew,
} from "../../utils/common.js";
import style from "./zycapital.less";
class ZyCapital extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      updateDate: "",
      isLook:
        localStorage.isLook === undefined
          ? true
          : localStorage.isLook === "true"
          ? true
          : false,
    };
  }
  handleXtgzrcx() {
    xtgzrcx({ subFactor: "-1" }).then((data) => {
      if (data.isSuccess === "0") {
        this.setState({
          updateDate: dateFormatNew(data.content.busiDate),
        });
      }
    });
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
    this.handleXtgzrcx();
  }

  header() {
    return (
      <header className="color-fff ta-c">
        <div className="flex-between" style={{ padding: "0.3rem 0.2rem 0" }}>
          <span className="updateTime">最后更新于:{this.state.updateDate}</span>
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
  nav() {
    return (
      <nav className="flex ta-c fs-24 bgc-ff">
        <div to="/position/income/all" className="flex-1 navitem">
          <img
            className="line"
            src={require("../../assets/position/icon_shouyifengxi.png")}
            alt=""
          />
          <span className="line_desc">收益分析</span>
        </div>
        <div className="gap_line"></div>
        <div to="/position/record/all" className="flex-1 navitem">
          <img
            className="line"
            src={require("../../assets/position/icon_jiaoyifenxi.png")}
            alt=""
          />
          <span className="line_desc">交易查询</span>
        </div>
      </nav>
    );
  }
  assetList() {
    return (
      <Fragment>
        {/* 活期理财 */}
        <section className="section flex fs-24 ta-c bgc-ff" on="goToWhere(4)">
          <img
            className="imgLogo"
            src={require("../../assets/position/icon_list_huoqibao.png")}
            alt=""
          />
          <span className="childTitle">活期理财</span>
          <span className="quickGet c-fff">快速取现</span>
          <span className="profit_tip incomClass">
            最新收益
            <span
              className={
                this.state.userInfo.dayIncome2 &&
                this.state.userInfo.dayIncome2.includes("-")
                  ? "green profit_val"
                  : "profit_val"
              }
            >
              {this.state.isLook ? this.state.userInfo.dayIncome2 : "****"}
            </span>
            累计收益
            <span
              className={
                this.state.userInfo.totalIncome2 &&
                this.state.userInfo.totalIncome2.includes("-")
                  ? "green profit_val"
                  : "profit_val"
              }
            >
              {this.state.isLook ? this.state.userInfo.totalIncome2 : "****"}
            </span>
          </span>
          <dl className="flex-2" style={{ margin: "0.15rem 0.25rem 0 0" }}>
            <dd
              className={
                this.state.userInfo.totalasset2 &&
                this.state.userInfo.totalasset2.includes("-")
                  ? "green amount_num"
                  : "amount_num"
              }
              style={{ marginTop: "0.3rem" }}
            >
              {this.state.isLook ? this.state.userInfo.totalasset2 : "****"}
            </dd>
          </dl>
        </section>
        {/* 养老专区(原定期字段) parseFloat(this.state.userInfo.totalasset4) > 0*/}
        {parseFloat(this.state.userInfo.totalasset4) > 0 && (
          <section
            v-show=""
            className="section flex fs-24 ta-c bgc-ff"
            on="goToWhere(3)"
          >
            <img
              className="imgLogo"
              src={require("../../assets/position/icon_list_mmm.png")}
              alt=""
            />
            <span className="childTitle">养老理财</span>
            <span className="profit_tip incomClass">
              最新收益
              <span
                className={
                  this.state.userInfo.dayIncome4 &&
                  this.state.userInfo.dayIncome4.includes("-")
                    ? "green profit_val"
                    : "profit_val"
                }
              >
                {this.state.isLook ? this.state.userInfo.dayIncome4 : "****"}
              </span>
              累计收益
              <span
                className={
                  this.state.userInfo.totalIncome4 &&
                  this.state.userInfo.totalIncome4.includes("-")
                    ? "green profit_val"
                    : "profit_val"
                }
              >
                {this.state.isLook ? this.state.userInfo.totalIncome4 : "****"}
              </span>
            </span>
            <dl className="flex-2" style={{ margin: "0.15rem 0.25rem 0 0" }}>
              <dd
                className={
                  this.state.userInfo.totalasset4 &&
                  this.state.userInfo.totalasset4.includes("-")
                    ? "green amount_num"
                    : "amount_num"
                }
                style={{ marginTop: "0.3rem" }}
              >
                {this.state.isLook ? this.state.userInfo.totalasset4 : "****"}
              </dd>
            </dl>
          </section>
        )}
        {/* 其他基金 */}
        <section className="section flex fs-24 ta-c bgc-ff" on="goToWhere(5)">
          <img
            className="imgLogo"
            src={require("../../assets/position/icon_list_mine.png")}
            alt=""
          />
          <span className="childTitle">其他基金</span>
          <span className="profit_tip incomClass">
            最新收益
            <span
              className={
                this.state.userInfo.dayIncome3 &&
                this.state.userInfo.dayIncome3.includes("-")
                  ? "green profit_val"
                  : "profit_val"
              }
            >
              {this.state.isLook ? this.state.userInfo.dayIncome3 : "****"}
            </span>
            累计收益
            <span
              className={
                this.state.userInfo.totalIncome3 &&
                this.state.userInfo.totalIncome3.includes("-")
                  ? "green profit_val"
                  : "profit_val"
              }
            >
              {this.state.isLook ? this.state.userInfo.totalIncome3 : "****"}
            </span>
          </span>
          <dl className="flex-2" style={{ margin: "0.15rem 0.25rem 0 0" }}>
            <dd
              className={
                this.state.userInfo.totalasset3 &&
                this.state.userInfo.totalasset3.includes("-")
                  ? "green amount_num"
                  : "amount_num"
              }
              style={{ marginTop: "0.3rem" }}
            >
              {this.state.isLook ? this.state.userInfo.totalasset3 : "****"}
            </dd>
          </dl>
        </section>

        {/* 交易策略 */}
        <section className="section flex fs-24 ta-c bgc-ff" on="goToWhere(1)">
          <img
            className="imgLogo"
            src={require("../../assets/position/icon_list_strategy.png")}
            alt=""
          />
          <span className="childTitle">交易策略</span>

          <dl className="flex-1">
            {this.state.isLook ? (
              this.state.userInfo.agreeCount ? (
                <dd className="jycl">
                  <a className="ztzc_big">{this.state.userInfo.agreeCount}</a>
                  <a className="ztzc_small">笔</a>
                </dd>
              ) : (
                <dd className="jycl_no">无</dd>
              )
            ) : (
              <dd className="jycl_blue">****</dd>
            )}
          </dl>
        </section>
        {/* 在途资产 */}
        {parseFloat(this.state.userInfo.intransitCount) > 0 && (
          <section
            className="section flex fs-24 ta-c bgc-ff"
            style={{ marginBottom: "0.5rem" }}
            on="goToWhere(2)"
          >
            <img
              className="imgLogo"
              src={require("../../assets/position/icon_list_money_on_the_road.png")}
              alt=""
            />
            <span className="childTitle">在途资产</span>
            <img
              style={{
                height: "0.3rem",
                width: "0.3rem",
                marginTop: "0.65rem",
                marginLeft: "0.1rem",
              }}
              src={require("../../assets/position/icon_nav_mean.png")}
              onClick={() => {
                Toast.info("在途资产是尚未确认的有效购买");
              }}
              alt=""
            />
            {this.state.isLook ? (
              <dl className="flex-2" style={{ margin: "0.15rem 0.25rem 0 0" }}>
                <p style={{ textAlign: "right", marginTop: "0.2rem" }}>
                  <a className="ztzc_big">
                    {this.state.userInfo.intransitCount}
                  </a>
                  <a className="ztzc_small">笔 合计</a>
                </p>
                <p
                  className={
                    this.state.userInfo.totalShare &&
                    this.state.userInfo.totalShare.includes("-")
                      ? "green ztzc_amount"
                      : "ztzc_amount"
                  }
                  style={{ textAlign: "right", marginTop: "0.1rem" }}
                >
                  {this.state.userInfo.totalShare}
                </p>
              </dl>
            ) : (
              <dl className="flex-2" style={{ margin: "0.15rem 0.25rem 0 0" }}>
                <p
                  className={
                    this.state.userInfo.totalShare &&
                    this.state.userInfo.totalShare.includes("-")
                      ? "green ztzc_amount"
                      : "ztzc_amount"
                  }
                  style={{ textAlign: "right", marginTop: "0.4rem" }}
                >
                  ****
                </p>
              </dl>
            )}
          </section>
        )}
      </Fragment>
    );
  }
  render() {
    return (
      <main className={style.zycapital}>
        {this.header()}
        {this.nav()}
        {this.assetList()}
        <TabBar history={this.props.history} match={this.props.match} />
      </main>
    );
  }
}
export default connect()(ZyCapital);
