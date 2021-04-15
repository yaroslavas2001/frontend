import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@layouts/layout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "layout",
    component: Layout,
    children: [
      {
        path: "/",
        name: "catalog",
        alias: "/catalog",
        component: () => import(/* webpackChunkName: "catalog" */ "@views/catalog.vue"),
      },
      {
        path: "/product-categories",
        name: "product-categories",
        component: () => import(/* webpackChunkName: "product-categories" */ "@views/product-categories/product-categories.vue"),
      },
      {
        path: "/pharmacy-addresses",
        name: "pharmacy-addresses",
        component: () => import(/* webpackChunkName: "pharmacy-addresses" */ "@views/pharmacy-addresses.vue"),
      },
      {
        path: "/users-list",
        name: "users-list",
        component: () => import(/* webpackChunkName: "users-list" */ "@views/users-list.vue"),
      },
      {
        path: "/discount-cards",
        name: "discount-cards",
        component: () => import(/* webpackChunkName: "discount-cards" */ "@views/discount-cards.vue"),
      },
      {
        path: "/slides",
        name: "slides",
        component: () => import(/* webpackChunkName: "slides" */ "@views/slides.vue"),
      },
      {
        path: "/promotions",
        name: "promotions",
        component: () => import(/* webpackChunkName: "promotions" */ "@views/promotions.vue"),
      },
      {
        path: "/cities",
        name: "cities",
        component: () => import(/* webpackChunkName: "cities" */ "@views/cities.vue"),
      },
      {
        path: "/articles",
        name: "articles",
        component: () => import(/* webpackChunkName: "articles" */ "@views/articles.vue"),
      },
      {
        path: "/pictures",
        name: "pictures",
        component: () => import(/* webpackChunkName: "slides" */ "@views/pictures.vue"),
      },
      {
        path: "/search",
        name: "search",
        component: () => import(/* webpackChunkName: "search" */ "@views/search.vue"),
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import(/* webpackChunkName: "profile" */ "@views/profile.vue"),
      },
      {
        path: "/change-password",
        name: "change-password",
        component: () => import(/* webpackChunkName: "change-password" */ "@views/change-password.vue"),
      },
      {
        path: "/map",
        name: "map",
        component: () => import(/* webpackChunkName: "test" */ "@views/map.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "@views/account/login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
