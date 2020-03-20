import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

/* constantRouterMap */
import Layout from '../views/layout/Layout';
import dashboard from '../views/dashboard/index';

/*asyncRouterMap*/
import Shows from '../views/shows/index';
import World from '../views/world/index';
import Communaute from '../views/communaute/index';
import Communautelist from '../views/communautelist/index';
import News from '../views/news/index';
import Favoris from '../views/favoris/index';
import Profilelist from '../views/profilelist/index';
import Jira from '../views/jira/index';
import Desktop from '../views/desktop/index';
import Profile from '../views/profile/index';
import Article from '../views/article/index';
import Newarticle from '../views/article/new';
import Updatearticle from '../views/article/update';
import Articlelist from '../views/articlelist/index';
import Skearspace from '../views/others/skearspace';

Vue.use(Router)
Vue.use(require('vue-moment'));

export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    name: 'Acceuil',
    redirect: '/dashboard',
    children: [{ path: 'dashboard', component: dashboard }]
  },
  /*asyncRouterMap plus tard*/
  {
    path: '/shows',
    component: Layout,
    redirect: 'noredirect',
    // name: 'shows',
    children: [{ path: 'index', component: Shows, name: 'Shows' }]
  },
  {
    path: '/world',
    component: Layout,
    redirect: 'noredirect',
    // name: 'world',
    children: [{ path: 'index', component: World, name: 'World' }]
  },
  {
    path: '/communaute',
    component: Layout,
    redirect: 'noredirect',
    // name: 'communaute',
    children: [{ path: 'index', component: Communaute, name: 'Communaute' }]
  },
  {
    path: '/communaute/:name',
    component: Layout,
    redirect: 'noredirect',
    // name: 'communautelist',
    children: [{ path: 'index', component: Communautelist, name: 'Communautelist' }]
  },
  {
    path: '/news',
    component: Layout,
    redirect: 'noredirect',
    // name: 'news',
    children: [{ path: 'index', component: News, name: 'News' }]
  },
  {
    path: '/favoris',
    component: Layout,
    redirect: 'noredirect',
    // name: 'favoris',
    children: [{ path: 'index', component: Favoris, name: 'Favoris' }]
  },
  {
    path: '/profile-liste',
    component: Layout,
    redirect: 'noredirect',
    // name: 'profilelist',
    children: [{ path: 'index', component: Profilelist, name: 'Profilelist' }]
  },
  {
    path: '/jira',
    component: Layout,
    redirect: 'noredirect',
    // name: 'jira',
    children: [{ path: 'index', component: Jira, name: 'Jira' }]
  },
  {
    path: '/desktop',
    component: Layout,
    redirect: 'noredirect',
    // name: 'desktop',
    children: [{ path: 'index', component: Desktop, name: 'Desktop' }]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: 'noredirect',
    // name: 'profile',
    children: [{ path: 'index', component: Profile, name: 'Profile' }]
  },
  {
    path: '/article:name',
    component: Layout,
    redirect: 'noredirect',
    // name: 'article',
    children: [{ path: 'index', component: Article, name: 'Article' }]
  },
  {
    path: '/article',
    component: Layout,
    redirect: 'noredirect',
    // name: 'articlelist',
    children: [{ path: 'index', component: Articlelist, name: 'Articlelist' }]
  },
  {
    path: '/new-article',
    component: Layout,
    redirect: 'noredirect',
    // name: 'articlelist',
    children: [{ path: 'new', component: Newarticle, name: 'Newarticle' }]
  },
  {
    path: '/update-article:name',
    component: Layout,
    redirect: 'noredirect',
    // name: 'articlelist',
    children: [{ path: 'update', component: Updatearticle, name: 'Updatearticle' }]
  },
  {
    path: '/skear-space',
    component: Layout,
    redirect: 'noredirect',
    // name: 'articlelist',
    children: [{ path: 'skearspace', component: Skearspace, name: 'Skearspace' }]
  }
]

export default new Router({
  // mode: 'history',
  routes: constantRouterMap,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

/*export const asyncRouterMap = [
  {
    path: '/shows',
    component: Layout,
    redirect: 'noredirect',
    name: 'Shows',
    children: [{ path: 'index', component: Shows, name: 'Shows' }]
  },
]*/
