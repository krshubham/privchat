import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Home from '@/components/Home';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        secured: false
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        secured: true
      }
    }
  ]
});
