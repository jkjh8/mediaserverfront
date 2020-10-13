<template>
  <div class="home">
    <v-container>
      <v-card>
        <v-card-title>
          PLAY LIST
          <v-spacer/>
          <v-btn @click="getlist">ADD</v-btn>
        </v-card-title>
        
        <v-divider/>
        
        <v-card-text>
          <v-list>
            <draggable v-model="items">            
              <v-list-item v-for="(item, i) in items" :key="i">
                <v-list-item-avatar color="teal darken-4" style="color:white" size="30px">
                  <span>{{i+1}}</span>
                </v-list-item-avatar>
                {{ item }}
                <v-spacer/>
                <v-btn color="green darken-4" icon @click="play(i)">
                  <v-icon>
                    mdi-play  
                  </v-icon>
                </v-btn>
                <v-btn color="blue-grey darken-4" icon @click="stop(i)">
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

    <v-btn @click="play('play')">
      PLAY
    </v-btn>
    <v-btn @click="play('stop')">
      STOP
    </v-btn>
    <div>
      <template>
        {{ file.name }}
        <v-file-input
          label="File input"
          v-model="file"
        ></v-file-input>
        <v-btn @click="upload">
          UPLOAD
        </v-btn>
      </template>
    </div>
    <div>
      {{ filenames }}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import draggable from 'vuedraggable'

export default {
  name: 'Home',
  components: {
            draggable,
        },
  data: ()=>({
    file : {},
    filenames: '',
    items:[]
  }),
  methods: {
    play(id){
      console.log(id)
      this.sendPost({command:'play',file:this.items[id]})
    },
    stop(id) {
      console.log(id)
      this.sendPost({command:'stop',file:this.items[id]})
    },
    del(id) {
      console.log(id)
      this.items.splice(id,1)
    },
    sendPost(comm) {axios.post('http://127.0.0.1:5000/play',comm
      ).then(res => {
        console.log(res.data)
      })
    },
    async upload() {
      var fd = new FormData();
      fd.append('file', this.file)
      await axios.post('http://127.0.0.1:5000/upload',
            fd, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          ).then( response => {
            console.log('SUCCESS!!');
            this.listupdate(response.data)
            this.filenames = response.data
          })
          .catch(function () {
            console.log('FAILURE!!');
          });
    },
    getlist() {
      axios.get('http://127.0.0.1:5000/refresh')
        .then(res => {
          this.listupdate(res.data)
        })

    },
    listupdate(list) {
      console.log(list)
      this.items = list
    }
  }
}
</script>
