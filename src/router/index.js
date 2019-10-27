import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/article/:id',
    name: 'article',
    component: () => import('@/views/Article.vue'),
  },
  {
    path: '/create',
    name: 'CreateArticle',
    component: () => import('@/views/CreateArticle.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/my-profile',
    name: 'myprofile',
    component: () => import('@/views/MyProfile.vue'),
  },
  {
    path: '/explore',
    name: 'explore',
    component: () => import('@/views/Explore.vue'),
  },
  {
    path: '/*',
    name: 'notfound',
    component: () => import('@/views/NotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;