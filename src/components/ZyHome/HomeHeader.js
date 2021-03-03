import React, { useState, useEffect } from "react";
import style from "./css/header.less";
import { qlzccx } from "../../services/example.js";

function Login(props) {
  return (
    <section className={style.home_header}>
      <div className={style.title_wrap}>
        <p className={style.title}>中国银行控股</p>
        <p className={style.title}>2020年末资产管理规模达到5015亿元</p>
        <p className={style.title}>购基费率0.1折起</p>
      </div>
      <div className={style.login_btn}>
        <div
          className={`${style.btn} ${style.btn_red}`}
          onClick={() => props.history.push("/register")}
        >
          注册
        </div>
        <div
          className={`${style.btn} ${style.btn_white}`}
          onClick={() => props.history.push("/login")}
        >
          登录
        </div>
      </div>
    </section>
  );
}
function Asset(props) {
  const [assetList, setAssetList] = useState(null);
  const [custNo] = useState(localStorage.custNo);
  async function hanfleAlzccx() {
    let data = await qlzccx({ custNo });
    if (data.isSuccess === "0") {
      setAssetList(data.content);
    }
  }
  const [showStatus, setShowStatus] = useState(true);
  useEffect(() => {
    if (props.token && !assetList) {
      hanfleAlzccx();
    }
    // 使用浏览器的 API 更新页面标题
    // document.title = `You clicked ${assetList} times`;
  });
  return (
    <section className={style.home_header}>
      <div className={style.title_wrap + " ta-c"}>
        <p className={style.title_asset}>
          总资产(元)
          <img
            src={
              showStatus
                ? require("../../assets/position/icon_capital_can_see.png")
                : require("../../assets/position/icon_capital_no_see.png")
            }
            onClick={() => {
              setShowStatus(!showStatus);
            }}
            alt=""
          />
        </p>
        <p className={style.asset_num}>
          {showStatus && assetList ? assetList.totalasset1 : "****"}
        </p>
      </div>
      <div className={style.income_wrap + " ta-c"}>
        <div className="">
          <p>最新收益(元)</p>
          <p>{showStatus && assetList ? assetList.dayIncome1 : "****"}</p>
        </div>
        <div className="">
          <p>累计收益(元)</p>
          <p>{showStatus && assetList ? assetList.totalIncome1 : "****"}</p>
        </div>
      </div>
    </section>
  );
}
function HomeHeader(props) {
  const token = localStorage.token;
  if (token) {
    return <Asset history={props.history} token={token} />;
  } else {
    return <Login history={props.history} />;
  }
}

export default HomeHeader;
