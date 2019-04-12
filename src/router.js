import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/create",
      name: "create",
      // route level code-splitting
      component: () =>
        import("./views/NewAdventure.vue")
    },
    {
      path: "/adventure/edit",
      name: "editAdventure",
      // route level code-splitting
      component: () =>
        import("./views/EditAdventure.vue"),
        props:true
    },
    {
      path: "/adventure/play",
      name: "playAdventure",
      // route level code-splitting
      component: () =>
        import("./views/PlayAdventure.vue"),
        props:true
    },
    {
      path: "/overview",
      name: "overview",
      // route level code-splitting
      component: () =>
        import("./views/Overview.vue")
    }
  ]
});
