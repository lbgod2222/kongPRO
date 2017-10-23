// F-B connection here

// @params:
const url = 'http://192.168.2.179:4096/api/dapps/826571fb9dd13627377c4e86e46908aaecdc97e6fc97ccaf3e68e318867229b6';
const getMarketOverviewUrl = `${url}/markets`;

// import server from './server';

const actions = {
  // Get market overview
  getMarketOverview({ commit }, { state, limit, offset, that }) {
    that.$axios.get(getMarketOverviewUrl, {
      params: {
        state,
        limit,
        offset,
      },
    });
  },
};

export default actions;
