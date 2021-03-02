import request from "../utils/request";

export function query(data) {
  return request("/zy/wechat/fund/tjjjlb", "GET", { data });
}
