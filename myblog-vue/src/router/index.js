import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView";
import loginView from "@/views/LoginView";
import NotFoundView from "@/views/NotFoundView";
import RegisterView from "@/views/RegisterView";
import UserListView from "@/views/UserListView";
import UserProfileView from "@/views/UserProfileView";

const routes = [
  {
    path: "/",
    name: "/",
    component: HomeView
  },
  {
    path: "/home/",
    name: "home",
    component: HomeView
  },
  {
    path: "/login/",
    name: "login",
    component: loginView
  },
  {
    path: "/404/",
    name: "404",
    component: NotFoundView
  },
  {
    path: "/register/",
    name: "register",
    component: RegisterView
  },
  {
    path: "/userlist/",
    name: "userlist",
    component: UserListView
  },
  {
    path: "/userprofile/:userId/",
    name: "userprofile",
    component: UserProfileView
  },
  {
    path: "/:catchAll(.*)",
    redirect: "404",
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
