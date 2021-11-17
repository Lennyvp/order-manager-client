<template>
  <v-app app>
      <TheNavbar />

  <v-main>
    <v-container fluid>
      <router-view />
    </v-container>
  </v-main> 

  </v-app>
</template>

<script>
import TheNavbar from './components/TheNavbar';

export default {
  name: 'App',

  components: {
    TheNavbar,
  },

  data: () => ({
    //
  }),
};
</script>
