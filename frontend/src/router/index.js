import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import store from "@/store/index.js";

Vue.use(Router);
const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/",
    name: "Home",
    component: Home
  }
];

const router = new Router({
  mode: "history", // URLはハッシュ形式「#～～」ではなく「/～～」とする
  linkActiveClass: "active",
  routes
});
// router gards
router.beforeEach((to, from, next) => {
  console.log({
    token: store.state.auth.login.token,
    expire: store.state.auth.login.expire
  });
  NProgress.start();
  // トークンが存在、かつログイン有効期限を過ぎてない場合、またはログイン画面の場合
  if ((store.state.auth.login.token) ||
    to.matched.some(page => {
      // ログイン画面はリダイレクト対象外 (他にも404ページなどいくつか対象外にする必要があるかも)
      return page.path === "/login";
    })
  ) {
    next();
  } else {
    // ログイン画面に飛ばす。ログイン後に元の画面に戻れるよう、backuriパラメーターにリダイレクト前のURLを入れる
    next({ path: "/login", query: { backuri: to.fullPath } });
  }
});

router.afterEach((to, from) => {
  NProgress.done();
});

export default router;
