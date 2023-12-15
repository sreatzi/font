import BaseLayout from '../../layouts/BaseLayout.vue';
import Login from '../../views/login/index.vue';
import Myfirst from '../../views/login/selfPage.vue';

export default [
  {
    path: '/login',
    component: Login,
    meta: { title: '登录页面' },
    
  },
  {
    path: '/myfirst',
    component: Myfirst,
    meta: { title: '首次修改页面' },

  },
  {
    path: '/main',
    redirect: '/workspace/workbench',
    component: BaseLayout,
    meta: { title: '首页' },
    children: [
      {
        path: '/main',
        component: () => import('../../views/main/mianPage.vue'),
        meta: { title: '首页' },
      },
      {
        path: '/error/403',
        component: () => import('../../views/error/403.vue'),
        meta: { title: '403' },
      },
      {
        path: '/error/404',
        component: () => import('../../views/error/404.vue'),
        meta: { title: '404' },
      },
      {
        path: '/error/500',
        component: () => import('../../views/error/500.vue'),
        meta: { title: '500' },
      }
    ]}, {
    path: '/error',
    component: BaseLayout,
    meta: { title: '错误页面' },
    
  }, {
    path: '/3+2',
    component: BaseLayout,
    meta: { title: '3+2转录申报管理' },
    children: [
      {
        path: '/3+2/plan',
        component: () => import('../../views/threetwo/mmPgae.vue'),
        meta: { title: '3+2转录计划管理' },
      },
      {
        path: '/3+2/me',
        component: () => import('../../views/threetwo/pplanPage.vue'),
        meta: { title: '3+2添加转录学校关系' },
      },
    
    ]
  }, {
    path: '/1+2',
    component: BaseLayout,
    meta: { title: '1+2转录申报管理' },
    children: [
      {
        path: '/1+2/plan',
        component: () => import('../../views/onetwo/mPage.vue'),
        meta: { title: '1+2转录计划管理' },
      },
 
    ]
  }, {
    path: '/save',
    component: BaseLayout,
    meta: { title: '核对管理' },
    children: [
      {
        path: '/save/m',
        component: () => import('../../views/mangerr/mmoPage.vue'),
        meta: { title: '核对管理' },
      },
     
    ]
  
  }, {
    path: '/my',
    component: BaseLayout,
    meta: { title: '个人信息管理' },
    children: [
      {
        path: '/my',
        component: () => import('../../views/myself/selfPage.vue'),
        meta: { title: '个人信息管理' },
      },
      {
        path: '/password',
        component: () => import('../../views/myself/passowrd.vue'),
        meta: { title: '密码重置' },
      },
    
    ]
  }, 


]
