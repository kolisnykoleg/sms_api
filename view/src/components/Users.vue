<template>
  <v-data-table
      :headers="headers"
      :items="users"
      :expanded.sync="expanded"
      show-expand
      class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      cols="12"
                  >
                    <v-text-field
                        v-model="editedItem.email"
                        label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                  >
                    <v-text-field
                        v-model="editedItem.phone"
                        label="Phone"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                  >
                    <v-text-field
                        v-model="editedItem.description"
                        label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="editedItem.api_key"
                         cols="12"
                  >
                    <v-text-field
                        v-model="editedItem.api_key"
                        label="API Key"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <procedures v-bind:user="item"></procedures>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios';
import Procedures from './Procedures';

export default {
  components: {
    Procedures,
  },

  data: () => ({
    expanded: [],
    dialog: false,
    dialogDelete: false,
    headers: [
      {text: 'ID', value: 'id'},
      {text: 'Email', value: 'email'},
      {text: 'Phone', value: 'phone'},
      {text: 'Description', value: 'description'},
      {text: 'API Key', value: 'api_key'},
      {text: 'Actions', value: 'actions', sortable: false},
      {text: '', value: 'data-table-expand'},
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      id: null,
      email: null,
      phone: null,
      api_key: null,
      description: null,
    },
    defaultItem: {
      id: null,
      email: null,
      phone: null,
      api_key: null,
      description: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  mounted() {
    this.getUsers();
    this.$root.$on('update-users', this.getUsers);
  },

  methods: {
    getUsers() {
      axios.get('/user/list').then(res => {
        this.users = res.data;
      }).catch(this.axiosError);
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      axios.get(`/user/delete/${this.editedItem.id}`).then(() => {
        this.users.splice(this.editedIndex, 1);
        this.closeDelete();
      }).catch(this.axiosError);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        axios.post('/user/update', this.editedItem).then(() => {
          Object.assign(this.users[this.editedIndex], this.editedItem);
          this.close();
        }).catch(this.axiosError);
      }
      else {
        axios.post('/user/create', this.editedItem).then(res => {
          this.editedItem.id = res.data.id;
          this.editedItem.api_key = res.data.api_key;
          this.users.unshift(this.editedItem);
          this.close();
        }).catch(this.axiosError);
      }
    },
  },
};
</script>
