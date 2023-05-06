import store from '@/store'

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Movimientos from '../views/Movimientos/Movimientos.vue'
import Dashboard from '../views/Movimientos/Dashboard.vue'
import Menu  from '../views/Menu/Menu.vue'
import Login from '../views/Login/Login.vue'
import Register from '../views/Login/Register.vue'
import ListadoUsuarios from '../views/Usuarios/ListadoUsuarios.vue'
import CrearRol from '../views/Usuarios/CrearRol.vue'
import EditRol from '../views/Usuarios/EditRol.vue'
import ListadoRoles from '../views/Usuarios/ListadoRoles.vue'
import Perfil from '../views/Usuarios/Perfil.vue'
import Map from '../views/Ejemplos/Map.vue'
import Restringido from '../views/Restringido.vue'
import GenerarQR from '../views/Ejemplos/GenerarQR.vue'
import Portada from '../views/Portada.vue'
Vue.use(VueRouter)

const routes = [
  { id: 4, path: '/', name: '', component: Portada, meta: {requiresAuth: false}  },
  { id: 4, path: '/home', name: 'home', component: Home, meta: {requiresAuth: true} },
  
  // ADMINISTRACION
  { id: 5, path: '/menu', name: 'menu', component: Menu, meta: {requiresAuth: true}  },

  { id: 17, path: '/administracion/usuarios/list', name: 'listadoUsuarios', component: ListadoUsuarios, meta: {requiresAuth: true} },
  { id: 19, path: '/administracion/roles/list', name: 'listadoRoles', component: ListadoRoles, meta: {requiresAuth: true} },
  { id: 20, path: '/administracion/roles/crear', name: 'crearRol', component: CrearRol, meta: {requiresAuth: true} },
  { id: 20, path: '/administracion/roles/edit/:id_rol', name: 'editRol', component: EditRol, meta: {requiresAuth: true}},

  { id: 15, path: '/login', name: 'login', component: Login},
  { id: 14, path: '/register', name: 'register', component: Register, meta: {requiresAuth: false} },
  // PERFIL
  { id: 12, path: '/perfil', name: 'perfil', component: Perfil, meta: {requiresAuth: true}},
  // MOVIMIENTOS
  { id: 3, path: '/movimientos', name: 'movimientos', component: Movimientos, meta: {requiresAuth: true} },
  { id: 6, path: '/dashboard', name: 'dashboard', component: Dashboard, meta: {requiresAuth: true} },  
  // EJEMPLOS
  { id: 21, path: '/map', name: 'map', component: Map, meta: {requiresAuth: true} }, 
  { id: 21, path: '/generarQR', name: 'generarQR', component: GenerarQR, meta: {requiresAuth: true} }, 
  // ELSE
  { id: 0, path: '/restringido', name: 'restringido', component: Restringido, meta: {requiresAuth: false}  },
  { id: 0, path: '.*', name: 'about', component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'), meta: {requiresAuth: false}  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.SESSION.status) {  
      var acceso = false;
      store.state.SESSION.permisos.forEach((i) => {
        var acceso_rutaIndirecta = routes.some((r) => { return r.id == i.iD_ItemMenu})
        /* routes.forEach((r) => {
          if (r.id == i.iD_ItemMenu) acceso_rutaIndirecta = true
        }) */
        if (to.path == i.path || acceso_rutaIndirecta) acceso = true
      })
      if (acceso) next()   
      else router.push({path: '/restringido'})      
      return
    }
    else if (from == null || from.path != "/login") {   
      return { path: '/login'}
    }
    else {
      return
    }
  } else {
    next()
  }
})
export default router
