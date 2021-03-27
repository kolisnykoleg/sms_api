<template>
  <v-data-table
      :headers="headers"
      :items="messages"
      class="elevation-1"
  >
    <template v-slot:top>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
          small
          @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    dialogDelete: false,
    headers: [
      {text: 'ID', value: 'id'},
      {text: 'Sender', value: 'sender'},
      {text: 'Recipient', value: 'recipient'},
      {text: 'Message', value: 'message'},
      {text: 'Delete', value: 'actions', sortable: false},
    ],
    messages: [],
    editedIndex: -1,
    editedItem: {
      id: null,
      sender: null,
      recipient: null,
      message: null,
    },
    defaultItem: {
      id: null,
      sender: null,
      recipient: null,
      message: null,
    },
  }),

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  mounted() {
    this.getMessages();
    this.$root.$on('update-pending', this.getMessages);
  },

  methods: {
    getMessages() {
      axios.get('/message/pending').then(res => {
        this.messages = res.data;
      }).catch(this.axiosError);
    },

    deleteItem(item) {
      this.editedIndex = this.messages.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      axios.get(`/message/delete/pending/${this.editedItem.id}`).then(() => {
        this.messages.splice(this.editedIndex, 1);
        this.closeDelete();
      }).catch(this.axiosError);
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>
