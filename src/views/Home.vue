<template>
  <div class="home">
    <v-container>
      <v-card>
        <v-card-title>
          PLAY LIST
          <v-spacer/>
          <v-btn @click="openDialog">ADD</v-btn>
        </v-card-title>
        
        <v-divider/>
        
        <v-card-text>
          <v-list>
            <draggable v-model="playList">            
              <v-list-item v-for="(item, i) in playList" :key="i">
                <v-list-item-avatar :color="ramdomColor()" style="color:white" size="30px">
                  <span>{{i+1}}</span>
                </v-list-item-avatar>
                {{ item }}
                <v-spacer/>
                <v-btn color="green darken-4" icon @click="player('play',i)">
                  <v-icon>
                    mdi-play  
                  </v-icon>
                </v-btn>
                <v-btn color="blue-grey darken-4" icon @click="player('stop',i)">
                  <v-icon>mdi-stop</v-icon>
                </v-btn>
                <v-btn  color="red darken-4" icon @click="del(i)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item>
            </draggable>
          </v-list>
        </v-card-text>
      </v-card>
    </v-container>

    <v-dialog v-model="dialog" width='600px' persistent>
      <v-card>
        <v-card-title>
          dialog
        </v-card-title>
        <v-card-text>
          <v-list-item-group v-model="checkList" multiple active-class="">
            <v-list-item v-for="(item, i) in fileList" :key="i">
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox :input-value="active"></v-checkbox>
                </v-list-item-action>
                {{ item }}
                <v-spacer/>
                <v-btn color="green darken-4" icon @click="player('play',i)">
                  <v-icon>mdi-play</v-icon>
                </v-btn>
                <v-btn color="blue-grey darken-4" icon @click="player('stop',i)">
                  <v-icon>mdi-stop</v-icon>
                </v-btn>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn text @click="playListAddFile">
            <v-icon>mdi-check</v-icon>
            OK
          </v-btn>
          <v-btn text class="pa-3" @click="cancelPlayListAddFile">
            <v-icon>mdi-cancel</v-icon>
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import http from '../api/http'
import { mapState } from 'vuex'
import draggable from 'vuedraggable'
let getplayliststate = true

export default {
  name: 'Home',
  components: {
    draggable,
  },
  data: ()=>({
    playList:[],
    dialog:false,
    checkList:[]
  }),
  computed: {
    ...mapState(['fileList'])
  },
  created() {
    this.$store.dispatch('getFileList')
    this.getPlayList()
  },
  watch: {
    playList: (changelist) => {
      let newplaylist = {
        playList: changelist
      }
      if (getplayliststate === true) {
        getplayliststate = false        
      } else {
        http.post('/setPlayList', newplaylist).then(res =>{
          console.log(res.data)
        })
      }
      
    }
  },
  methods: {
    player(func, id){
      let command = {
        command:func,
        file:this.playList[id]
      }
      this.$store.dispatch('playerFN', command)
    },
    del(id) {
      console.log(id)
      this.playList.splice(id,1)
    },
    ramdomColor() {
      return('#'+ Math.random().toString(16).slice(2,8))
    },
    async openDialog() {
      await this.$store.dispatch('getFileList')
      this.dialog = true
    },
    getPlayList() {
      getplayliststate = true
      http.get('/getPlayList').then(res => {
        this.playList = res.data
      })
    },
    playListAddFile() {
      this.checkList.forEach((element) => {
        this.playList.push(this.fileList[element])
      })
      this.dialog=false
    },
    cancelPlayListAddFile() {
      this.dialog = false
      this.checkList = []
    }
  }
}
</script>
