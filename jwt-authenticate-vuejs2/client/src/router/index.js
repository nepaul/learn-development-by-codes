import Vue from 'vue';
import Router from 'vue-router';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';

import Home from '@/views/Home';
import Dashboard from '@/views/Dashboard';
// import NotFound from '@/views/NotFound';


export default (store) => {
  Vue.use(Router);

  const router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
    ],
  });

  router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.matched.some(record => record.meta.requiredAuth)) {
      if (store.state.token) {
        next();
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        });
      }
    } else {
      next();
    }
  });

  router.afterEach(() => NProgress.done());

  return router;
};
