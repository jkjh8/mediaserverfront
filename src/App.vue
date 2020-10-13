<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <router-link class="px-6" style="text-decoration: none; color: inherit;" to="/" >
        <v-icon>mdi-home</v-icon>
        HOME
      </router-link>

      <router-link class="px-6" style="text-decoration: none; color: inherit;" to="/files" >
        <v-icon>mdi-file</v-icon>
        FILES
      </router-link>
    <router-link class="px-6" style="text-decoration: none; color: inherit;" to="/setup" >
        <v-icon>mdi-cog-outline</v-icon>
        SETUP
      </router-link>   
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>

<style>
router-link {
  font-size: small;
}
</style>