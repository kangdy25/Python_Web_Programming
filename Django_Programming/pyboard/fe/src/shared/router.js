import { createRouter, createWebHistory } from "vue-router";
import {
  Main,
  Like,
  My,
  Login,
  Detail,
  Register,
  New,
  Profile,
} from "../pages/index.js";

const routes = [
  { path: "/", name: "Main", component: Main },
  { path: "/like", name: "Like", component: Like },
  { path: "/my", name: "My", component: My },
  { path: "/detail/:pk", name: "Detail", component: Detail, props: true },
  { path: "/new", name: "New", component: New },
  { path: "/profile", name: "Profile", component: Profile },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
