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
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
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
      path: "/overview",
      name: "overview",
      // route level code-splitting
      component: () =>
        import("./views/Overview.vue")
    }
  ]
});
