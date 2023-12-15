import BaseLayout from '../../layouts/BaseLayout.vue';
import Login from '../../views/login/index.vue';


export default [
  
  {
    path: '/login',
    component: Login,
    meta: { title: '登录页面' },
    
  },
  {
    path: '/my',
    component: () => import('../../views/myself/selfPage.vue'),
    meta: { title: '个人信息管理' },
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
    meta: { title: '中职普通' },
    children: [
      {
        path: '/3+2/plan',
        component: () => import('../../views/threetwo/mmPgae.vue'),
        meta: { title: '中职普通专业管理' },
      },
      {
        path: '/3+2/me',
        component: () => import('../../views/threetwo/pplanPage.vue'),
        meta: { title: '中职普通计划管理' },
      },
    
    ]
  }, {
    path: '/1+2',
    component: BaseLayout,
    meta: { title: '三年艺体类' },
    children: [
      {
        path: '/1+2/plan',
        component: () => import('../../views/onetwo/mPage.vue'),
        meta: { title: '三年艺体类专业管理' },
      },
      {
        path: '/1+2/me',
        component: () => import('../../views/onetwo/planPage.vue'),
        meta: { title: '三年艺体类计划管理' },
      },
 
    ]
  }, {
    path: '/high',
    component: BaseLayout,
    meta: { title: '高中中专' },
    children: [
      {
        path: '/high/plan',
        component: () => import('../../views/high/hmPage.vue'),
        meta: { title: '高中中专专业管理' },
      },
      {
        path: '/high/me',
        component: () => import('../../views/high/hpPage.vue'),
        meta: { title: '高中中专计划管理' },
      },
 
    ]
  },{
    path: '/onetwo',
    component: BaseLayout,
    meta: { title: '1+2招生' },
    children: [
      {
        path: '/onetwo/plan',
        component: () => import('../../views/onetw/hmPage.vue'),
        meta: { title: '1+2招生专业管理' },
      },
      {
        path: '/onetwo/me',
        component: () => import('../../views/onetw/hpPage.vue'),
        meta: { title: '1+2招生计划管理' },
      },
 
    ]
  },{
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
        path: '/myif',
        component: () => import('../../views/myself/mym.vue'),
        meta: { title: '信息管理' },
      },
      {
        path: '/password',
        component: () => import('../../views/myself/passwordPage.vue'),
        meta: { title: '修改密码' },
      },
    ]
  }, 
  


]
