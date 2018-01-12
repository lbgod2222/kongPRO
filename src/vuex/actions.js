/* eslint-disable */
// F-B connection here
import aschJS from 'asch-js';
// @params:
// const url = 'http://192.168.2.179:4096/api/dapps/826571fb9dd13627377c4e86e46908aaecdc97e6fc97ccaf3e68e318867229b6';
const url = 'http://101.200.123.124:4096/api/dapps/e930cfe9b66757575ec500a2fbf2ccb78ba056894597c64452825108e93ed5ea';
const getMarketOverviewUrl = `${url}/markets`;
const getShareOverviewUrl = `${url}/shares`;
const getHeight = `${url}/blocks/height`;
const signedUrl = `${url}/transactions/signed`;
const loginUrl = `${url}/accounts/`;
const recordUrl = `${url}/transfers/`;

let secret;
// import server from './server';

const actions = {
  // Get market overview
  getMarketOverview({ commit }, { state, limit, offset, that }) {
    return that.$axios.get(getMarketOverviewUrl, {
      params: {
        state,
        limit,
        offset,
      },
    });
  },
  // 获取个人发起市场
  getOwnMarket({ commit }, { initiator, limit, offset, that }) {
    return that.$axios.get(getMarketOverviewUrl, {
      params: {
        initiator,
        limit,
        offset,
      }
    })
  },
  // 获取指定市场
  getSepecificMarket({ commit }, { id, that }) {
    return that.$axios.get(`${getMarketOverviewUrl}/${id}`);
  },
  // 股份详情， 带几率计算
  getMarketResult({ commit }, { id, that }) {
    return that.$axios.get(`${getMarketOverviewUrl}/${id}/results`, {
      params: {
        probability: 1,
      },
    });
  },
  // 获取特定市场的个人持有股份股份
  getShareInOneMarket({ commit }, { id, address, that }) {
    return that.$axios.get(`${getMarketOverviewUrl}/${id}/shares/${address}`);
  },
  // 获取交易记录
  getAllTradeRecord({ commit }, { id, limit, offset, that }) {
    return that.$axios.get(`${getMarketOverviewUrl}/${id}/trades`, {
      params: {
        limit,
        offset,
      }
    });
  },
  // 获取所有评论
  getAllcomment({ commit }, { id, limit, offset, that }) {
    return that.$axios.get(`${getMarketOverviewUrl}/${id}/comments`, {
      params: {
        limit,
        offset,
      },
    });
  },
  // 获取用户所有的股份
  getAllSharesOfOne({ commit }, { address, that }) {
    return that.$axios.get(`${getShareOverviewUrl}/${address}`);
  },
  // 计算购买金额
  getTotalPrice({ commit }, { id, choice, share, that }) {
    console.log(typeof share);
    return that.$axios.get(`${getMarketOverviewUrl}/${id}/calc`, {
      params: {
        choice,
        share: Number(share),
      },
    });
  },
  // 买卖行为
  tradeShare({ commit }, { id, share, choice, that}) {
    console.log(typeof share);
    secret = that.$store.state.user.secret;
    let trs = aschJS.dapp.createInnerTransaction({
      fee: '10000000',
      type: 1001,
      args: JSON.stringify([
        id, Number(share), choice,
      ]),
    }, secret);
    return that.$axios.put(signedUrl, {
      transaction: trs,
    })
  },
  // 结算
  toDeal({ commit }, { id, that}) {
    secret = that.$store.state.user.secret;
    let trs = aschJS.dapp.createInnerTransaction({
      fee: '10000000',
      type: 1002,
      args: JSON.stringify([
        String(id),
      ]),
    }, secret);
    return that.$axios.put(signedUrl, {
      transaction: trs,
    })
  },
  // 获取区块高度
  getBlockHeight({ commit }, { that }) {
    return that.$axios.get(getHeight);
  },
  // Transaction ↓ 
  // 发布话题/创建市场
  toIssueTopic({ commit }, { title, image, desc, results, currency, gurantee, share, endHeight, that}) {
    secret = that.$store.state.user.secret;
    console.log(title, image, desc, results, currency, gurantee, share, endHeight);
    let trs = aschJS.dapp.createInnerTransaction({
      fee: '10000000',
      type: 1000,
      args: JSON.stringify([
        title, image, desc, results, currency, gurantee, share, endHeight,
      ]),
    }, secret);
    return that.$axios.put(signedUrl, {
      transaction: trs,
    });
  },
  // 发布评论
  toComment({ commit }, { id, content, that }) {
    secret = that.$store.state.user.secret;
    let trs = aschJS.dapp.createInnerTransaction({
      fee: '10000000',
      type: 1006,
      args: JSON.stringify([
        id,
        content
      ])
    }, secret);
    return that.$axios.put(signedUrl, {
      transaction: trs,
    })
  },
  // 结算
  toDeal({ commit }, { id, that }) {
    secret = that.$store.state.user.secret;
    let trs = aschJS.dapp.createInnerTransaction({
      fee: '10000000',
      type: 1002,
      args: JSON.stringify([
        id,
      ])
    }, secret);
    return that.$axios.put(signedUrl, {
      transaction: trs,
    })
  },
  // 揭示
  toReveal({ commit }, { id, choice, that }) {
    secret = that.$store.state.user.secret;
    let trs = aschJS.dapp.createInnerTransaction({
      fee: '10000000',
      type: 1003,
      args: JSON.stringify([
        id,
        choice
      ])
    }, secret);
    return that.$axios.put(signedUrl, {
      transaction: trs,
    })
  },
  // 申诉
  toAppeal({ commit }, { id, content, amount, that }) {
    secret = that.$store.state.user.secret;
    let trs = aschJS.dapp.createInnerTransaction({
      fee: '10000000',
      type: 1004,
      args: JSON.stringify([
        id,
        choice
      ])
    }, secret);
    return that.$axios.put(signedUrl, {
      transaction: trs,
    })
  },
  // 仲裁
  toArbitrate({ commit }, { id, choice, signatures, that}) {
    secret = that.$store.state.user.secret;
    let trs = aschJS.dapp.createInnerTransaction({
      fee: '10000000',
      type: 1005,
      args: JSON.stringify([
        id,
        choice
      ])
    }, secret);
    return that.$axios.put(signedUrl, {
      transaction: trs,
    });
  },
  // 修改用户名
  toSetNickName({ commit }, { name, that }) {
    secret = that.$store.state.user.secret;
    let trs = aschJS.dapp.createInnerTransaction({
      fee: '10000000',
      type: 4,
      args: JSON.stringify([
        name,
      ])
    }, secret);
    return that.$axios.put(signedUrl, {
      transaction: trs,
    });
  },
  // 获取交易信息
  getTransactionInfo({ commit }, { limit, offset, currency, id, that }) {
    console.log(limit, offset, id, currency, 'come from action');
    return that.$axios.get(recordUrl, {
      params: {
        limit: limit,
        offset: offset,
        ownerId: id,
        currency: currency,
      }
    })
  },
  // 转账
  toTransfer({ commit }, { type, amount, address, that }) {
    secret = that.$store.state.user.secret;
    let trs = aschJS.dapp.createInnerTransaction({
      fee: '10000000',
      type: 3,
      args: JSON.stringify([
        type,
        amount,
        address,
      ])
    }, secret);
    return that.$axios.put(signedUrl, {
      transaction: trs,
    });
  },
  // 贮存user信息
  loginAction({ commit }, { address, that }) {
    return that.$axios.get(loginUrl + address);
  },
  // // 获取用户下所有的股份
  // allShares({ commit }, { address, that }) {
  //   return that.$axios.get(getShareOverviewUrl + '/' + address);
  // }
};

export default actions;
