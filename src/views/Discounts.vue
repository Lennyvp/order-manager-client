<template>
  <v-container>
    <v-row justify="center">
      <DiscountInput @send-code="updateCode" />
    </v-row>
    <v-row justify="center">
      <DialogButton :code="code"/>
    </v-row>
  </v-container>
</template>

<script>
import DiscountInput from "../components/DiscountInput";
import DialogButton from "../components/DialogButton";

export default {
  name: "Discounts",

  components: {
    DiscountInput,
    DialogButton
  },

  data: () => ({
    code: "",
  }),
  methods: {
    updateCode(updatedCode) {
      this.code = updatedCode;
    },
  },
};
</script>
