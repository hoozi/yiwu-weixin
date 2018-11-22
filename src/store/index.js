import Vue from 'vue';
import Vuex from 'vuex';
import vuexLoading from '@tw666/vuex-loading';
import { UPDATE_DIRECTION, UPDATE_SCREEN_LOADING_STATUS } from './mutationsType';

import repair from './modules/repair';

Vue.use(Vuex);

const state = {
  direction: 'forward',
  screenLoading: false
}

const mutations = {
  [UPDATE_DIRECTION](state, direction) {
    Object.assign(state, direction);
  },
  [UPDATE_SCREEN_LOADING_STATUS](state, screenLoading) {
    Object.assign(state, screenLoading);
  }
}

export default new Vuex.Store({
  state,
  modules: {
    repair
  },
  mutations,
  plugins: [vuexLoading]
})