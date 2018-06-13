export default [
  { path: '/', component: () => import('pages/index') },
  { path: '/invoice', component: () => import('pages/invoice') },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
