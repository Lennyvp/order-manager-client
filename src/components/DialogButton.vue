<template>
  <div class="text-center border">
    <v-dialog v-model="dialog" width="550" :disabled="isCodeValid(code)">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="indigo darken-3"
          dark
          v-bind="attrs"
          v-on="on"
          @click="sendCode(code)"
        >
          Check Code
        </v-btn>
      </template>

      <v-card>
        <v-img gradient="to top right">
          <v-card-title class="text-h6">
            Discount code: {{ code }}
          </v-card-title>
        </v-img>
        <v-card-text>
          <v-alert v-if="getDescription(discount)" dense outlined type="error">
            {{ description }}
          </v-alert>
          <v-alert v-else dense text type="success">
            {{ description }}
          </v-alert>
        </v-card-text>

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
import axios from "axios";

export default {
  data: () => ({
    dialog: false,
    description: "",
    result: false,
    discount: null,
  }),
  props: {
    code: String,
  },
  methods: {
    isCodeValid(code) {
      return code == "";
    },
    getDescription(discount) {
      if (this.discount === "") {
        this.description = "The discount code was already used.";
        return true;
      } else {
        this.description =
          "The discount code is ready to use. Your discount is " +
          discount +
          "%.";
        return false;
      }
    },
    sendCode(code) {
      if (code !== "") {
        axios
          .get("http://localhost:8080/discounts?code=" + code)
          .then((response) => {
            console.log(response.data);
            this.discount = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
