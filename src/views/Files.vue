<template>
  <div class="files">
    <h1>This is an files page</h1>
  </div>
</template>

<script>
// const resourceHost = 'http://localhost:5000'

import axios from 'axios'
export default {
  name: 'Files',
  components: {

        },
  data: ()=>({

  }),
  methods: {
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
      axios.get('${resourceHost}/getFileList')
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