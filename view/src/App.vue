<template>
  <v-app>
    <v-main>
      <v-container>
        <v-tabs v-model="tab" v-on:change="tabChange">
          <v-tab
              v-for="item in items"
              :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <users></users>
          </v-tab-item>
          <v-tab-item>
            <pending></pending>
          </v-tab-item>
          <v-tab-item>
            <sent></sent>
          </v-tab-item>
          <v-tab-item>
            <received></received>
          </v-tab-item>
        </v-tabs-items>
        <snackbar></snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Users from './components/Users';
import Pending from './components/Pending';
import Sent from './components/Sent';
import Received from './components/Received';
import Snackbar from './components/Snackbar';

export default {
  name: 'App',

  components: {
    Users,
    Pending,
    Sent,
    Received,
    Snackbar,
  },

  data: () => ({
    tab: null,
    items: [
      'users',
      'pending',
      'sent',
      'received',
    ],
  }),

  methods: {
    tabChange(index) {
      this.$root.$emit(`update-${this.items[index]}`);
    },
  },
};
</script>
