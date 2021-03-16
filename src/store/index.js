import Vue from 'vue'
import Vuex from 'vuex'
import REQUEST_FILTER_FIELDS, {
  SET_FILTER_PARAMS,
  SET_QUERY_WORD,
  CLEAR_FILTER_PARAMS,
  SET_FILTER_DATE_FROM,
  SET_FILTER_DATE_TO
} from '@/constats'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchParams: {
      types: null,
      authors: null,
      publishers: null,
      languages: null,
      rubrics: null,
      audiences: null,
      date_from: null,
      date_to: null,
      s: null
    },
    searchWords: {
      types: null,
      authors: null,
      publishers: null,
      languages: null,
      rubrics: null,
      audiences: null,
      date_from: null,
      date_to: null,
      s: null
    }
  },
  getters: {

  },
  mutations: {
    [SET_QUERY_WORD] (state, data) {
      state.searchParams.s = data.s
    },
    [SET_FILTER_PARAMS] (state, data) {
      state.searchParams[data.key] = data.id
      state.searchWords[data.key] = data.name
    },
    [SET_FILTER_DATE_FROM] (state, data) {
      state.searchParams.date_from = data
    },
    [SET_FILTER_DATE_TO] (state, data) {
      state.searchParams.date_to = data
    },
    [CLEAR_FILTER_PARAMS] (state) {
      for (const key in state.searchParams) {
        state.searchParams[key] = null
      }
      for (const key in state.searchWords) {
        state.searchWords[key] = null
      }
    }
  },
  actions: {

  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState()]
})
