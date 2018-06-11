export default [
  { path: '/', component: () => import('pages/Home') },
  { path: '/Account', component: () => import('pages/Account') },
  { path: '/Login', component: () => import('pages/Login') },
  { path: '/Register', component: () => import('pages/Register') },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
