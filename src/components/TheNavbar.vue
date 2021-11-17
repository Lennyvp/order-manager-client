<template>
    <v-card class="overflow-hidden" tile>
      <v-app-bar
        absolute
        color="#6A76AB"
        dark
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(25,32,72,.7), rgba(3, 53, 252,.7)"
          ></v-img>
        </template>
  
        <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
  
        <v-toolbar-title>Order Manager</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <template v-slot:extension>
          <v-tabs align-with-title>
            <v-tab v-for="item in items" :key="item.title" link :to="item.to">{{item.title}}</v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
      
      <v-container style="height: 100px;"></v-container>
    </v-card>
</template>

<script>
export default {
  name: 'TheNavbar',
  data: () => ({
    items: [
        { to: "products", title: "Products", icon: "mdi-home-city" },
        { to: "discounts", title: "Discounts", icon: "mdi-account" },
      ],
  }),
  methods: {
    goHome(){
        // this.$router.push('/').catch(()=>{})
    }
  }
};
</script>