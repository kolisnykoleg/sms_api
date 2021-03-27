<template>
  <v-snackbar
      v-model="snackbar"
      :multi-line="multiLine"
      color="error"
      top
  >
    {{ text }}
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    multiLine: true,
    snackbar: false,
    text: null,
  }),

  mounted() {
    this.$root.$on('axios-error', error => {
      this.text = error.response.data;
      this.snackbar = true;
    });
  },
};
</script>