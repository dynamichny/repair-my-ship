import Vue from 'vue';
import Vuex from 'vuex';
import {
  stat
} from 'fs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
    user: null,
    articlesCounter: 0,
    users: null,
    searchRegex: '',
    edit: false,
  },
  mutations: {
    setUser(state, {
      user,
      isL
    }) {
      state.user = user;
      state.isLogged = isL;
    },
    setUsers(state, usrs) {
      state.users = usrs;
    },
    setSearchRegex(state, key) {
      state.searchRegex = key;
    },
    edit(state) {
      state.edit = !state.edit;
    },
    updateUser(state, data) {
      state.user = data;
    }
  },
  actions: {},
  modules: {},
});