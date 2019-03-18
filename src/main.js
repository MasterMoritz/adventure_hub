import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './style.css';
import "./registerServiceWorker";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  

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
