export function convertInc(num) {
  if (num.indexOf("-") > -1 || num === "" || num === "-") {
    return -1;
  }
  return 1;
}

/**
 * 金额添加分位符: parseInt toFixed计算过的number值, 是否需要小数位
 */
export function calMoneyQuantile(number, hasPoint = true) {
  if (number === undefined || isNaN(number)) {
    return 0;
  }
  let arr = [];
  if ((number + "").indexOf("+") === 0) {
    arr = (number + "").split("+");
    arr[0] = "+";
  } else if ((number + "").indexOf("-") === 0) {
    arr = (number + "").split("-");
    arr[0] = "-";
  } else {
    arr = ["", number + ""];
  }
  if (arr[1].length < 4) {
    return hasPoint ? arr[0] + arr[1] + ".00" : arr[0] + arr[1];
  }
  const pointNum =
    arr[1].indexOf(".") < 0
      ? ""
      : arr[1].substr(arr[1].indexOf(".") + 1, arr[1].length);
  let num =
    pointNum === ""
      ? arr[1]
      : arr[1].substr(0, arr[1].length - pointNum.length - 1);
  let result = "";
  while (num.length > 3) {
    result = "," + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (hasPoint) {
    switch (pointNum.length) {
      case 0:
        return arr[0] + num + result + ".00";
      case 1:
        return arr[0] + num + result + "." + pointNum + "0";
      case 2:
      default:
        return arr[0] + num + result + "." + pointNum;
    }
  }
  return arr[0] + num + result;
}

export function toFixed(number, length, hasPer = false) {
  if (number === undefined || isNaN(number)) {
    return "--";
  }
  const numberPlus = number < 0 ? number * -1 : number; // 负数做正数四舍五入后，再输出负数
  const multiple = 10 ** length; // multiple为10的length次方 设置浮点数要扩大的倍数
  const str = numberPlus + "";
  let dot = str.indexOf(".");
  // 找到要进行舍入的数的位置，手动判断是否大于等于5，满足条件进位标志置为1(存放进位标志)
  // num为原浮点数放大multiple倍后的数, 去掉舍入位后的所有数，然后加上我们的手动进位数
  // 失精!!! 当前 9.04 * 100 = 903.9999999??
  const num =
    dot > -1 && str.substr(dot + length + 1, 1) >= 5
      ? Math.round(numberPlus * multiple) + 1
      : Math.round(numberPlus * multiple);
  // const num = dot > -1 && str.substr(dot + length + 1, 1) >= 5 ? Math.floor(numberPlus * multiple) + 1 : Math.floor(numberPlus * multiple);
  let result = num / multiple + ""; // 将进位后的整数再缩小为原浮点数
  // 处理进位后无小数
  if (result.indexOf(".") < 0) {
    result += ".";
  }
  dot = result.indexOf(".");
  // 处理多次进位、保留length长度的小数
  const len = result.length - (dot + 1);
  if (len < length) {
    for (let i = 0; i < length - len; i++) {
      result += 0;
    }
  }
  const resultStr = number < 0 ? "-" + result : result;
  return hasPer ? resultStr + "%" : resultStr;
}

/**
 * 20190922 >>> 2019-09-22
 * @param date
 * @returns {string}
 */
export function dateFormatNew(date) {
  let str = "-";
  if (date.length === 8) {
    str = date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2);
  } else {
    str = "-";
  }
  return str;
}
