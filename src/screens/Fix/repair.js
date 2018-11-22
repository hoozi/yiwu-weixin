import {
  addRepair,
  queryStatusListById,
  queryRepair
} from '@/api/repair';

import { SAVE_REPAIR_PAGE, SAVE_STATUS_LIST, CLEAR_REPAIR_PAGE } from '@/store/mutationsType';

const state = {
  page: {
    total: 0,
    size: 10,
    current: 1,
    pages: 0,
    records: []
  },
  concatRecords: [],
  statusList:[]
}

const mutations = {
  [CLEAR_REPAIR_PAGE](state) {
    state.concatRecords = [];
  },
  [SAVE_REPAIR_PAGE](state, page) {
    const concatRecords = state.concatRecords.concat(page.records);
    Object.assign(state, { concatRecords })
    Object.assign(state.page, page)
  },
  [SAVE_STATUS_LIST](state, list) {
    let statusList = list.reverse();
    Object.assign(state, {statusList});
  }
}

const actions = {
  async addRepair({ commit }, { params, success }) {
    const response = await addRepair(params);
    if(response.code!==1000) return;
    success && success();
  },
  async getRepair({commit}, {params, success}) {
    const response = await queryRepair(params);
    if(response.code!==1000) return;
    commit(SAVE_REPAIR_PAGE, response.data);
    success && success();
  },
  async getStatusListById({ commit }, id) {
    const response = await queryStatusListById(id);
    if(response.code!==1000) return;
    commit(SAVE_STATUS_LIST, response.data);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}