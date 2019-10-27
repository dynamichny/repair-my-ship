import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
    user: null,
    articlesCounter: 0,
    users: null,
    searchRegex: '',
  },
  mutations: {
    setUser(state, usr) {
      state.user = usr;
      state.isLogged = true;
    },
    setUsers(state, usrs) {
      state.users = usrs;
    },
    setSearchRegex(state, key) {
      state.searchRegex = key;
    }
  },
  actions: {},
  modules: {},
});