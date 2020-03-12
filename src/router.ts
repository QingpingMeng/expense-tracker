import Vue from 'vue';
import Router from 'vue-router';
import AddTransaction from './views/AddTransaction.vue';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/home', component: Home, alias: "/" },
    { path: '/transactions/add', component: AddTransaction },
    { path: '/transactions/:id', component: AddTransaction }
  ],
});
