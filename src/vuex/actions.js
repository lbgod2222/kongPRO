/* eslint-disable */
// F-B connection here
import aschJS from 'asch-js';
// @params:
const url = 'http://192.168.2.179:4096/api/dapps/826571fb9dd13627377c4e86e46908aaecdc97e6fc97ccaf3e68e318867229b6';
const getMarketOverviewUrl = `${url}/markets`;
const getShareOverviewUrl = `${url}/shares`;
const getHeight = `${url}/blocks/height`;
const signedUrl = `${url}/transactions/signed`;

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
  getSepecificMarket({ commit }, { id, that }) {
    return that.$axios.get(`${getMarketOverviewUrl}/${id}`);
  },
  getMarketResult({ commit }, { id, that }) {
    return that.$axios.get(`${getMarketOverviewUrl}/${id}/results`, {
      params: {
        probability: 1,
      },
    });
  },
  getShareInOneMarket({ commit }, { id, address, that }) {
    return that.$axios.get(`${getMarketOverviewUrl}/${id}/shares/${address}`);
  },
  getAllTradeRecord({ commit }, { id, that }) {
    return that.$axios.get(`${getMarketOverviewUrl}/${id}/trades`);
  },
  getAllcomment({ commit }, { id, that }) {
    return that.$axios.get(`${getMarketOverviewUrl}/${id}/comments`);
  },
  // 获取用户所有的股份
  getAllSharesOfOne({ commit }, { address, that }) {
    return that.$axios.get(`${getShareOverviewUrl}/${address}`);
  },
  // 计算购买金额
  getTotalPrice({ commit }, { id, choice, share, that }) {
    return that.$axios.get(`${getMarketOverviewUrl}/${id}/calc`, {
      params: {
        choice,
        share,
      },
    });
  },
  // 买卖行为
  tradeShare({ commit }, { id, share, choice, that}) {
    secret = that.$store.state.user.secret;
    console.log('in action', share, choice);
    let trs = aschJS.dapp.createInnerTransaction({
      fee: '10000000',
      type: 1001,
      args: JSON.stringify([
        String(id), share, choice,
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
  // 发布话题/创建市场
  toIssueTopic({ commit }, { title, image, desc, results, currency, gurantee, share, endHeight, that}) {
    secret = that.$store.state.user.secret;
    console.log('now we start to issue a topic');
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
  loginAction({ commit }, { secret, that }) {
    let keypair = aschJS.crypto.getKeys(secret);
    let address = aschJS.crypto.getAddress(keypair.publicKey);
    console.log('in action', secret, address);
    that.$store.commit('login', { secret: secret, address: address });
    console.log(that.$store.state.user);
  }
};

export default actions;
