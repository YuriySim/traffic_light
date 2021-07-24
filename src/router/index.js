import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    meta: { layout: "layout" },
    component: () => import("@/views/TrafficLight")
  },

  {
    path: "/red",
    name: "Red",
    meta: { layout: "layout" },
    component: () => import("@/views/TrafficLight")
  },

  {
    path: "/yellow",
    name: "Yellow",
    meta: { layout: "layout" },
    component: () => import("@/views/TrafficLight")
  },

  {
    path: "/green",
    name: "Green",
    meta: { layout: "layout" },
    component: () => import("@/views/TrafficLight")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
