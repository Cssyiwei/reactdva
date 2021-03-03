import request from "../utils/request";

export function query(data) {
  return request("/zy/wechat/fund/tjjjlb", "GET", { data });
}

export function qlzccx({ custNo }) {
  return request("/zy/wechat/asset/qlzccx", "GET", { data: { custNo } });
}

export function dl({ certNo, certType, confirmBind, dealPwd, mobile }) {
  return request("/zy/wechat/user/dl", "POST", {
    data: { certNo, certType, confirmBind, dealPwd, mobile },
  });
}
