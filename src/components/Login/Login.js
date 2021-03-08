import React from "react";
// import React, { useEffect } from "react";
import { connect } from "dva";
import { dl } from "../../services/example.js";

function Login(props) {
  // async function handleKhxxcx() {
  //   const { dispatch } = props;
  //   let data = await khxxcx({
  //     custId: localStorage.custId,
  //     custNo: localStorage.custNo,
  //   });
  //   if (data.isSuccess === "0") {
  //     let content = data.content;
  //     dispatch({
  //       type: "main/save",
  //       payload: { userInfo: content },
  //     });
  //     localStorage.setItem("userInfo", JSON.stringify(content));
  //   }
  // }
  async function handleDl() {
    const { dispatch } = props;
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
      // handleKhxxcx();
      dispatch({
        type: "main/fetch",
        payload: {
          custId: localStorage.custId,
          custNo: localStorage.custNo,
        },
      });
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

export default connect((main) => ({ main }))(Login);
// export default Login;
