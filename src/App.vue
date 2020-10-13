<template>
  <v-app>
    <v-app-bar app color="white" prominent height="115px">
      <v-container class="pt-3 pb-0 px-3 ma-0">
        <v-row>
          <v-icon size="36px">mdi-play-network-outline</v-icon>
          <h2>MEDIA SERVER</h2>
        </v-row>
        <v-row align="center">
          <v-tabs
              class="sm"
              centered
              background-color="transparent"
              color="grey darken-1"
              mobile-breakpoint=300
            >
              <v-tab                
                v-for="link in links"
                :key="link.id"
                :to="link.route"
              >
                {{ link.name }}
              </v-tab>
            </v-tabs>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <Footer/>
  </v-app>
</template>

<script>
import Footer from './components/footer';
export default {
  name: 'App',
  components: {
    Footer
  },
  data: () => ({
    links: [
      {id:1, name:'Home', route:'/'},
      {id:2, name:'Files', route:'/files'},
      {id:3, name:'Player option', route:'/Setup'},
      {id:4, name:'IP Address', route:'/Setup'},
      {id:5, name:'ABOUT', route:'/Setup'}

    ]
  }),
};
</script>