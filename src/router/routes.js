export default [
  { path: '/', component: () => import('pages/Home') },
  { path: '/Account', component: () => import('pages/Account') },
  { path: '/Login', component: () => import('pages/Login') },
  { path: '/Register', component: () => import('pages/Register') },
  { path: '/', component: () => import('pages/index') },
  { path: '/invoice', component: () => import('pages/invoice') },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
