import { createRouter, createWebHistory } from 'vue-router'
import Index from "../views/Index.vue";
import Create from "../views/Create.vue";
import Edit from "../views/Edit.vue";

const routes = [
  {
    name : "Index",
    path : "/",
    component : Index,
  },
  {
    name : "Create",
    path : "/create",
    component : Create,
  },
  {
    name : "Edit",
    path : "/edit/:id",
    component : Edit,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
