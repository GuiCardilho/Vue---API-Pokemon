import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      title:"Pesquisar",
    }
  },

  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta:{
      title:"About",
    }
  },

  {
    path: '/pokedex',
    name: 'Pokedex',
    component: () => import('../views/Pokedex.vue'),
    meta:{
      title:"Pokedex",
    }
  },

  {
    path: '/sorteador',
    name: 'Sorteador',
    component: () => import('../views/Sorteador.vue'),
    meta:{
      title:"Sorteador",
    }
  },

  {
    path: '/mypokedex',
    name: 'MyPokedex',
    component: () => import('../views/MyPokedex.vue'),
    meta:{
      title:"MyPokedex",
    }
  },

  {
    path: '/duelo',
    name: 'Duelo',
    component: () => import('../views/Duelo.vue'),
    meta:{
      title:"Duelo",
    }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to,from,next) =>{
  document.title = `${to.meta.title}`;
  next();
})
export default router
