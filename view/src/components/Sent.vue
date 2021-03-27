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
      {text: 'Recipient', value: 'recipient'},
      {text: 'Message', value: 'message'},
      {text: 'Date', value: 'date'},
      {text: 'Status', value: 'status'},
    ],
    messages: [],
  }),

  mounted() {
    this.getMessages();
    this.$root.$on('update-sent', this.getMessages);
  },

  methods: {
    getMessages() {
      axios.get('/message/sent').then(res => {
        this.messages = res.data;
      }).catch(this.axiosError);
    },
  },
};
</script>
