import Vue from 'vue'
import Vuex from 'vuex'
import http from '../api/http'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fileList:[]
  },
  mutations: {
    refreshFileList: (state, payload) => {
      state.fileList = payload
    },
    playerCallBack (payload) {
      console.log(payload)
    }
  },
  actions: {
    getFileList ( { commit }) {
      return http.get('/getFileList').then(({data}) => {
        commit('refreshFileList', data)
      console.log(data)
      })
    },
    playerFN ( {commit}, payload) {
      return http.post('/player', payload).then(res => {
        commit('playerCallBack',res.data)
      })
    }
  },
  modules: {
  }
})
