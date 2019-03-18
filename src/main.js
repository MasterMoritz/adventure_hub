import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import styles from './assets/css/style.css';
import "./registerServiceWorker";
import Notifications from 'vue-notification';
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

Vue.config.productionTip = false;
Vue.use(Notifications);
Vue.use(VueApollo)

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
  render: h => h(App)
}).$mount("#app");



