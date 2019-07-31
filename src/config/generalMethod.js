// 工具类
let obj = {
    //鉴空
    checkNull: function (str) {
        if (str !== null && str !== '' && str !== undefined) {
            return true
        } else {
            return false
        }
    },
    // 往storage内存入对象
    setStorage: function (key, obt) {
        localStorage.setItem(key, JSON.stringify(obt))
    },
    // 从storage内取出对象
    getStorage: function (key) {
        return JSON.parse(localStorage.getItem(key))
    },
    //将首字母转成大写
    convertToCamelCase(flag, str) {
        if (flag === '') return str
        return flag + str[0].toUpperCase() + str.substring(1)
    },
    // 将字符串黏贴到黏贴版
  copyToClipboard(str) {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  },
    //是否是url
    isURL(s) {
        return /^http[s]?:\/\/.*/.test(s)
    },
       //在数组指定位置插入数组
  insertArray(index, arr1, arr2) {
        arr1.splice(index + 1, 0, ...arr2)
        return arr1
    },

}
export default obj