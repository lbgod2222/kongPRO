// 临时方法
const realTime = {
  beginEpochTime() {
    let d = new Date(Date.UTC(2016, 5, 27, 20, 0, 0, 0));
    return d;
  },
  getEpochTime(time) {
    if (time === undefined) {
      time = (new Date()).getTime();
    }
    const d = this.beginEpochTime();
    let t = d.getTime();
    return Math.floor((time - t) / 1000);
  },
  getTime(time) {
    return this.getEpochTime(time);
  },
  getRealTime(epochTime) {
    if (epochTime === undefined) {
      epochTime = this.getTime();
    }
    let d = this.beginEpochTime();
    let t = Math.floor(d.getTime() / 1000) * 1000;
    return t + (epochTime * 1000);
  },
  formatDateTime(timeStamp) {
    var timestamp1 = new Date(Date.UTC(2016, 5, 27, 20, 0, 0, 0));
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
    return y + "-" + m + "-" + d + "日" + " " + h + ":" + minute + ":" + second
  },
};

export default realTime.formatDateTime;
