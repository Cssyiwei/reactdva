import React, { useEffect } from "react";
import { dl } from "../../services/example.js";

function Login(props) {
  async function handleDl() {
    let data = await dl({
      certNo: "",
      certType: "0",
      confirmBind: undefined,
      dealPwd: "123123",
      mobile: "18111223355",
    });
    if (data.isSuccess === "0") {
      let content = data.content;
      localStorage.setItem("token", content.token);
      localStorage.setItem("custId", content.custId);
      localStorage.setItem("custNo", content.custNo);
      props.history.push("/zyhome");
    }
  }
  return (
    <div
      onClick={() => {
        handleDl();
      }}
    >
      <h1 className="ta-c">登录</h1>
    </div>
  );
}

export default Login;
