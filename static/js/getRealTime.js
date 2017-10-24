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
};

export default realTime.getRealTime;
