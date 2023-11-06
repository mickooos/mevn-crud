import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex'
import Dashboard from '../layouts/DashBoard.vue'
import Auth from '../layouts/AuTh.vue'
import Product from '../views/ProductList.vue'
import Add from '../views/AddProduct.vue'
import Edit from '../views/EditProduct.vue'
import Signin from '../views/auth/SignIn.vue'
import Signup from '../views/auth/SignUp.vue'

import Nav from '../components/NavBar.vue'
import Foo from '../components/FooTer.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: requireAuth,
      children: [
        {
          path: '',
          name: 'product',
          components: {
            default: Product,
            nav: Nav,
            foo: Foo
          }
        },
        {
          path: '/add',
          name: 'add',
          component: Add
        },
        {
          path: '/edit/:id',
          name: 'edit',
          component: Edit
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
      beforeEnter: preventAuthPage,
      children: [
        {
          path: '/signin',
          name: 'signin',
          component: Signin
        },
        {
          path: '/signup',
          name: 'signup',
          component: Signup
        }
      ]
    }
  ]
})

function requireAuth(to, from, next) {
  const store = useStore()
  if (store.state.authenticated == true) next()
  else next({ name: 'signin' })
}

function preventAuthPage(to, from, next) {
  const store = useStore()
  if (store.state.authenticated == false) next()
  else next({ name: 'product' })
}

export default router
