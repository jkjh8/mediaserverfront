<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
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

export default {

  name: 'Home',
  data: ()=>({
    file : {},
    filenames: ''
  }),
  methods: {
    play(comm){
      switch(comm) {        
        case 'play':
          this.sendPost({command:'play'})
          break
        case 'stop':
          this.sendPost({command:'stop'})
          break
      }      
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
            console.log(response.data)
            this.filenames = response.data
          })
          .catch(function () {
            console.log('FAILURE!!');
          });
    }
  }
}
</script>
