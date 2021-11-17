<template>
  <div class="text-center border">
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="ma-1"
          color="indigo lighten-5 indigo--text"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon small class="mr-2"> mdi-cart </v-icon>
          Order
        </v-btn>
      </template>

      <v-card class="pa-5">
        <v-card-title class="text-h6">
          {{ product.name }}
        </v-card-title>
        <v-card-text class="pa-1 indigo--text font-weight-medium">
          Product Price: {{ product.price }} PLN
        </v-card-text>
        <v-text-field
          label="Amount"
          type="number"
          outlined
          v-model.number="amount"
          min="1"
          step="1"
          single-line
          :rules="rules"
          hide-details="auto"
        ></v-text-field>
        <v-card-text class="pa-1 indigo--text font-weight-medium">
          Total price: {{ totalPrice}} PLN
        </v-card-text>
        <DiscountInput @send-code="updateCode" :reset="dialog" />
        <v-card-text class="pa-1">{{ discountText }}</v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="indigo darken-3" text @click="sendForm()">
            Order
          </v-btn>
          <v-btn color="indigo darken-3" text @click="resetForm()">
            Exit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :timeout="5000">
      Order Number: {{ orderNubmer }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          orderNubmer
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import DiscountInput from "../components/DiscountInput";

export default {
  name: "OrderDialog",
  props: {
    product: Object,
  },
  components: {
    DiscountInput,
  },
  data: () => ({
    dialog: false,
    snackbar: false,
    totalPrice: 0,
    discount: 0,
    amount: 1,
    code: "",
    orderNubmer: "",
    rules: [
      (v) => v !== "" || "Amount cannot be empty",
      (v) => v > 0 || "Amount must be > 0",
      (v) => Number.isInteger(v) || "Amount must be integer",
    ],
  }),
  watch: {
    amount(value) {
      if (value !== "" && value >= 1) {
        if (Number.isInteger(value)) {
          this.calcTotalPrice();
        }
      }
    },
    totalPrice(value) {
      if(value <= 0) {
        this.totalPrice = this.product.price;
      }
    }
  },
  computed: {
    discountText() {
      if (this.discount === 0 || (this.discount === "" && this.code == "")) {
        return "Discount 0%";
      } else if (this.code != "" && this.discount === "") {
        return "Discount code was used";
      }
      return "Discount " + this.discount + "%";
    },
  },
  created() {
    this.totalPrice = this.product.price;
  },
  methods: {
    getDiscountValue(code) {
      axios
        .get("http://localhost:8080/discounts?code=" + code)
        .then((response) => {
          console.log("response: ", response);
          this.discount = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    calcTotalPrice() {
      this.totalPrice = axios
        .get("http://localhost:8080/orders", {
          params: {
            price: this.product.price,
            amount: this.amount,
            code: this.code ? this.code : "",
          },
        })
        .then((response) => {
          this.totalPrice = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateCode(updatedCode) {
      this.code = updatedCode;
      this.getDiscountValue(this.code);
      this.calcTotalPrice();
    },
    sendPost() {
      axios
        .post("http://localhost:8080/orders", {
          discountCode: this.code ? this.code : "",
          productId: this.product.id,
          amount: this.amount,
        })
        .then((response) => {
          this.orderNubmer = response.data;
        });
    },
    sendForm() {
      if (this.amount !== "" && this.amount >= 1) {
        if (Number.isInteger(this.amount)) {
          this.sendPost();
          this.snackbar = true;
          this.resetForm();
        }
      }
    },
    resetForm() {
      this.amount = 1;
      this.code = "";
      this.dialog = false;
    },
  },
};
</script>