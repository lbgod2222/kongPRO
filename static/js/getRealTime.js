// 临时方法
const realTime = {
  getCorrectTimestamp(timestamp) {
    let date = new Date();
    let timestamp1 = new Date(Date.UTC(2016, 5, 27, 20, 0, 0, 0));
    timestamp1 = timestamp1 / 1000;
    timeStamp += timestamp1;
    date.setTime(timeStamp * 1000);
    return date;
  },
  formatDateTime(timeStamp) {
    let timestamp1 = new Date(Date.UTC(2016, 5, 27, 20, 0, 0, 0));
    timestamp1 = timestamp1 / 1000;
    timeStamp += timestamp1;
    var date = new Date();
    date.setTime(timeStamp * 1000);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ("0" + m) : m;
    var d = date.getDate();
    d = d < 10 ? ("0" + d) : d;
    var h = date.getHours();
    h = h < 10 ? ("0" + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ("0" + minute) : minute;
    second = second < 10 ? ("0" + second) : second;
    return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second
  },
};

export default realTime;
