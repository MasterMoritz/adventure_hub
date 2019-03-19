import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './style.css';
import "./registerServiceWorker";
import Notifications from 'vue-notification';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;
Vue.use(Notifications);
Vue.use(VueApollo);
Vue.use(Vuetify);

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  //uri: 'https://api.graphcms.com/simple/v1/awesomeTalksClone'
})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

new Vue({
  router,
  store,
  apolloProvider,
  

  //el: '#app-4',
  data: {
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ]
  },
  render: h => h(App)
}).$mount("#app");



