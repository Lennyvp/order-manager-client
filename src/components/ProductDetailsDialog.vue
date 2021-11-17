<template>
  <div class="text-center border">
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="ma-1" color="indigo darken-2" dark v-bind="attrs" v-on="on">
          <v-icon small class="mr-2"> mdi-details </v-icon>
          Details
        </v-btn>
      </template>

      <v-card class="pa-5 grey lighten-4">
        <v-card tile elevation="0" class="pa-5 grey lighten-4"><v-img height="100%" width="100%" :src="setImgPath(product.img)" class="rounded"></v-img></v-card>
        <v-card-title class="text-h6"> {{ product.name }} </v-card-title>
        <v-card-text class="pa-1 indigo--text font-weight-medium"> {{ product.price }} PLN </v-card-text>
        <v-card-text class="pa-1"> {{ product.description }}</v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="indigo darken-3" text @click="dialog = false">
            Exit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "ProductDetailsDialog",
  props: {
    product: Object,
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    setImgPath(img) {
      return require('../assets/' + img)
    }
  }
};
</script>