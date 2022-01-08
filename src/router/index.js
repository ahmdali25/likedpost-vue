import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store/index";
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Admin from '@/views/Admin.vue'
import LikedPost from '@/views/LikedPost.vue'
import Create from '@/views/Create.vue'
import Edit from '@/views/Edit.vue'

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    meta: { requiresAuth: true },
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: { requiresAuth: true },
    component: Admin,
    children: [
      {
        path: 'create',
        name: 'Create',
        component: Create
      },
      {
        path: 'posts/:id/edit',
        name: 'Edit',
        component: Edit
      },
    ]
  },
  {
    path: '/liked-post',
    name: 'Liked Post',
    component: LikedPost
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (to.name !== "Login" && !store.getters.isLoggedIn) {
      next({
        path: "/login",
      });
    } else if (to.name === "Login" && store.getters.isLoggedIn) {
      next({
        path: "/admin",
      });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
