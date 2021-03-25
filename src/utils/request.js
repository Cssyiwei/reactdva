import fetch from "dva/fetch";
import cipherUtils from "./cipherUtils";

function parseJSON(data) {
  if (data.resultCode === "403") {
    window.location.href =
      window.location.origin + window.location.pathname + "#/login";
  }
  return data;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
function formatDateToString() {
  // yyymmdd
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  return year + "" + month + "" + day;
}
function formateTimeToString() {
  // hhmmss
  const date = new Date();
  let hours = date.getHours();
  let mins = date.getMinutes();
  let secs = date.getSeconds();
  const msecs = date.getMilliseconds();
  if (hours < 10) hours = "0" + hours;
  if (mins < 10) mins = "0" + mins;
  if (secs < 10) secs = "0" + secs;
  if (msecs < 10) secs = "0" + msecs;
  return hours + "" + mins + "" + secs;
}

function createRequestNo() {
  // YYYYMMDD+AP01(固定值)+8位（0-Z）必须包含数字和字母
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  const maxPos = chars.length;
  let pwd = "";
  for (let i = 0; i < 8; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return formatDateToString() + "AP01" + pwd;
}

const requestUrl = {
  development: {
    // ZYWECHAT_IP: "http://zywechat.tongtongcf.com",
    ZYWECHAT_IP: "",
    BASEURL: "http://localhost:8082/module/index.html#",
    ZHAOHANGURL:
      "http://121.15.180.66:801/netpayment/BaseHttp.dll?MB_OSNPSign_Json",
    REPLACESTRING: "zy/wechat",
  },
  sit: {},
  gray: {},
  production: {},
};
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, method = "GET", options = { data: {} }) {
  let data = options.data;
  method = method.toUpperCase();
  url = requestUrl[process.env.NODE_ENV].ZYWECHAT_IP + url;
  url = url.replace(
    "zy/wechat",
    requestUrl[process.env.NODE_ENV].REPLACESTRING
  );
  let yyyymmdd = formatDateToString();
  let hhmmss = formateTimeToString();
  let requestNo = createRequestNo();
  let requestConfig = {
    credentials: "include", //为了在当前域名内自动发送 cookie ， 必须提供这个选项
    method,
    headers: Object.assign(
      {
        Accept: "application/json, text/plain, */*",
        custNo: localStorage.custNo,
        custId: localStorage.custId,
        sigMode: "H5Signature",
        tradeMode: "WECHAT",
        sigVersion: "1",
        sysDate: yyyymmdd,
        sysTime: hhmmss,
        requestNo: requestNo,
        token: localStorage.token,
      },
      options.headers
    ),
    mode: "cors", //请求的模式
    cache: "force-cache",
  };
  if (method === "GET") {
    let dataStr = ""; //数据拼接字符串
    Object.keys(data).forEach((key) => {
      dataStr += key + "=" + data[key] + "&";
    });

    if (dataStr !== "") {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"));
      url = url + "?" + dataStr;
    }
    let sig = `GET:tradeMode=WECHAT&sysDate=${yyyymmdd}&sysTime=${hhmmss}&sigVersion=1&sigMode=H5Signature&requestNo=${requestNo}`;
    sig = cipherUtils.hmacsha1(sig, "WECHAT");
    requestConfig.headers.sig = sig;
    requestConfig.headers.needSign = "1";
  }
  if (method === "POST") {
    console.log(url + "<=====>", data);
    let tempSig = cipherUtils.encrypt(
      JSON.stringify(data),
      "WECHAT3hsf3j35bh235b5b"
    );
    let sig = cipherUtils.hmacsha1("POST:" + tempSig, "WECHAT");
    Object.defineProperty(requestConfig, "body", {
      value: tempSig,
    });
    requestConfig.headers.sig = sig;
    requestConfig.headers.needPostAes = "1";
    requestConfig.headers["Content-Type"] = "application/json;charset=UTF-8";
  }
  return fetch(url, requestConfig)
    .then(checkStatus)
    .then(parseJSON)
    .catch((err) => ({ err }));
  // .then((data) => data)
  // try {
  //   const response = await fetch(url, requestConfig);
  //   const responseJson = await response.json();
  //   return responseJson;
  // } catch (error) {
  //   throw new Error(error);
  // }
}
