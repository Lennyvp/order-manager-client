<template>
  <div>
    <v-text-field
      label="Discount Code"
      outlined
      :rules="rules"
      hide-details="auto"
      v-model="inputValue"
      @input="updateCode()"
      class="ma-5"
      single-line
    ></v-text-field>
  </div>
</template>

<script>
export default {
  data: () => ({
    inputValue: "",
    rules: [
      // value => (value && value !== null) || 'Cannot be empty',
      (value) =>
        (value && value.length >= 2) || value.length == 0 || "Min 2 characters",
      (value) =>
        (value && value.length <= 8) || value.length == 0 || "Max 8 characters",
    ],
  }),
  props: {
    reset: Boolean,
  },

  watch: {
    reset(value) {
      if (value == false) {
        this.inputValue = "";
      }
    }
  }, 
  methods: {
    updateCode() {
      this.$emit("send-code", this.getValue(this.inputValue));
    },
    getValue(value) {
      if (value.length >= 2 && value.length <= 8) {
        return value;
      }
      return "";
    },
  },
};
</script>