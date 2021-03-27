import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    axiosError: function(error) {
      this.$root.$emit('axios-error', error);
    },
  },
});

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app');
