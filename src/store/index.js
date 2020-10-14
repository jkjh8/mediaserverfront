import Vue from 'vue'
import Vuex from 'vuex'
import http from '../api/http'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fileList:[],
    playList:[]
  },
  mutations: {
    refreshFileList: ( state, payload ) => {
      state.fileList = payload
    },
    playerCallBack: ( payload ) => {
      console.log(payload)
    },
    updatePlayList: ( state, payload ) => {
      state.playList = payload
    },
    addPlayList: ( state, payload ) => {
      state.playList.push(payload)
    }
  },
  actions: {
    getFileList ( { commit }) {
      return http.get('/getFileList').then(({data}) => {
        commit('refreshFileList', data)
      console.log(data)
      })
    },
    playerFN({ commit }, payload) {
      return http.post('/player', payload).then(res => {
        commit('playerCallBack',res.data)
      })
    },
    playListUpdate({ commit }, payload) {
      return commit('updatePlayList', payload)
    },
    playListAdd({ commit }, payload) {
      return commit('addPlayList', payload)
    } 
  },
  modules: {
  }
})
