import {setItem,getItem} from '@/utils/storage'

const TOKEN_KEY = "TOTIAO_USER";

// state
const state = {
    // lognToken: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    loginToken: getItem(TOKEN_KEY)
};

// getters
const getters = {};

// mutations
const mutations = {
  USERTOKEN(state, data) {
    state.loginToken = data;
    // 防止刷线 数据丢失 把数据备份到本地存储
    // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
    setItem(TOKEN_KEY, JSON.stringify(data));
  },
};

// actions
const actions = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
