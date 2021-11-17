<template>
  <v-container>
    <v-card
      v-for="product in products"
      :key="product.id"
      outlined
      class="ma-1"
      color="grey lighten-5"
      elevation="1"
      raised
    >
      <v-list-item three-line>
        <v-list-item-avatar tile size="100" color="grey">
          <v-img alt="jpg" :src="setImgPath(product.img)" class="rounded"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            class="text-h5 mb-1"
            v-text="product.name"
          ></v-list-item-title>
          <v-list-item-subtitle class="indigo--text font-weight-medium">{{ product.price }} PLN</v-list-item-subtitle>
          <v-list-item-subtitle
            v-text="product.description"
          ></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-spacer></v-spacer>
        <ProductDetailsDialog :product="product"/>
        <OrderDialog :product="product"/>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import ProductDetailsDialog from "../components/ProductDetailsDialog";
import OrderDialog from "../components/OrderDialog";

export default {
  name: "TheProductList",
  data: () => ({
    products: [],
  }),
  components: {
    ProductDetailsDialog,
    OrderDialog
  },
  mounted() {
    axios
      .get("http://localhost:8080/products")
      .then((response) => {
        this.products = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    setImgPath(img) {
      return require('../assets/' + img)
    }
  },
};
</script>