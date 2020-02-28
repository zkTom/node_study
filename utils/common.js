/**
 * 将params拼接到url
 * eg: www.baidu.com + { a: 1, b: 2 } => www.baidu.com?a=1&b=2
 * @param { string } url
 * @param { object } params
 * @returns { string } path
 */
function buildUrl(url, params) {
  // 处理params参数比如数组和日期
  // 处理url,去掉hash,如果url原来已经有query string,则追加在后面
  // 编码拼接后的url, 处理特殊字符
  if (!params) {
    return url;
  }
  const parts = [];
  Object.keys(params).forEach(key => {
    const val = params[key];
    if (val === null || typeof val === "undefined") {
      return;
    }
    let values = [];
    // val统一处理成数组形式
    if (Array.isArray(val)) {
      values = val;
      key += "[]";
    } else {
      values = [val];
    }
    Object.keys(values).forEach(val => {
      if (Object.prototype.toString.call(val) === "[object Date]") {
        val = val.toISOString();
      } else if (typeof val === "object") {
        val = JSON.stringify(val);
      }
      parts.push(`${encode(key)}=${encode(val)}`);
    });
  });
  let serializedParmas = parts.join("&");
  if (serializedParmas) {
    const hashIndex = url.indexOf("#");
    if (hashIndex > -1) url = url.slice(0, hashIndex);
    url += url.indexOf("?") ? "&" : "?" + serializedParmas;
  }
  return url;
}
function encode(val) {
  return encodeURIComponent(val)
    .replace("/%40/g", "@")
    .replace("/%3A/ig", ":");
}
