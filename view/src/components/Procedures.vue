<template>
  <v-container>
    <v-simple-table v-if="procedures.length" class="mb-3">
      <template v-slot:default>
        <thead>
        <tr>
          <th>Type</th>
          <th>Recipient</th>
          <th width="1"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in procedures" :key="item.id">
          <td>{{ item.type }}</td>
          <td>{{ item.recipient }}</td>
          <td>
            <v-icon
                small
                @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-form ref="form">
      <v-row>
        <v-col
            cols="12"
            md="6"
        >
          <v-select
              v-model="type"
              :items="types"
              item-value="val"
              item-text="text"
              label="Type"
          ></v-select>
        </v-col>
        <v-col
            cols="12"
            md="6"
        >
          <v-text-field
              v-model="recipient"
              label="Recipient"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn
          color="blue darken-1"
          text
          @click="submit"
      >
        Save
      </v-btn>
    </v-form>
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
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  props: ['user'],

  data: () => ({
    dialogDelete: false,
    types: ['sms', 'email'],
    type: null,
    recipient: null,
    procedures: [],
    editedIndex: -1,
    editedItem: {
      id: null,
      type: null,
      recipient: null,
    },
    defaultItem: {
      id: null,
      type: null,
      recipient: null,
    },
  }),

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.getProcedures();
  },

  methods: {
    getProcedures() {
      axios.get(`/user/procedure/list/${this.user.id}`).then(res => {
        this.procedures = res.data;
      }).catch(this.axiosError);
    },

    submit() {
      const procedure = {
        type: this.type,
        recipient: this.recipient,
        user_id: this.user.id,
      };
      axios.post('/user/procedure/create', procedure).then(res => {
        procedure.id = res.data.id;
        this.procedures.push(procedure);
        this.clear();
      }).catch(this.axiosError);
    },

    clear() {
      this.$refs.form.reset();
    },

    deleteItem(item) {
      this.editedIndex = this.procedures.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      axios.get(`/user/procedure/delete/${this.editedItem.id}`).then(() => {
        this.procedures.splice(this.editedIndex, 1);
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
