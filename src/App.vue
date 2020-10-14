<template>
  <v-app>
    <AppBar></AppBar>

    <v-main>
      <router-view></router-view>
    </v-main>
    
    <Footer/>
  </v-app>
</template>

<script>
import AppBar from './components/appbar';
import Footer from './components/footer'
export default {
  name: 'App',
  components: {
    AppBar,
    Footer
  },
  data: () => ({
    //
  }),
};
</script>