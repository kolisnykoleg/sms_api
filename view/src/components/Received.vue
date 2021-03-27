<template>
  <v-data-table
      :headers="headers"
      :items="messages"
      class="elevation-1"
  >
  </v-data-table>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    headers: [
      {text: 'ID', value: 'id'},
      {text: 'Sender', value: 'sender'},
      {text: 'Message', value: 'message'},
      {text: 'Date', value: 'date'},
    ],
    messages: [],
  }),

  mounted() {
    this.getMessages();
    this.$root.$on('update-received', this.getMessages);
  },

  methods: {
    getMessages() {
      axios.get('/message/received').then(res => {
        this.messages = res.data;
      }).catch(this.axiosError);
    },
  },
};
</script>
