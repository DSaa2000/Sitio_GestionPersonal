import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export default new Vuex.Store({
  state: {
    // NOTIFICACIONES
    SNACKBAR: false,
    SNACKBAR_TEXT: '',
    SNACKBAR_COLOR: 'success',
    SNACKBAR_ICON: 'mdi-check',
    // PATH
    ENDPOINT_PATH: "http://localhost:7098",
    // LISTAS
    ROLES: [],
    MODULOS: [],
    ITEMS_MENU: [],
    MOVIMIENTOS: [],
    USUARIOS: [],
    // SESSION
    SESSION: {
      "status": false,
      "user": '',
      "rol": '',
      "permisos": []
    },
    THIS_ROUTE_IS_LOGIN: false,
  },
  plugins: [createPersistedState()],
  getters: {
    AUTHENTICATED (state) {
      return state.SESSION.status
    },
    GET_USER: state => state.SESSION.user
  },
  mutations: {
    // LOG IN
    UPDATE_POSITION_LOGIN (state){
      state.THIS_ROUTE_IS_LOGIN = !state.THIS_ROUTE_IS_LOGIN
    },
    LOGIN (state, sesion) {
      state.SESSION = sesion
    },
    LOGOUT (state){
      state.SESSION = {
        "status": false,
        "user": '',
        "rol": '',
        "permisos": []
      }      
    },
    // NOTIFICACIONEs
    SHOW_NOTIFICATION(state,info){
      if (state.SNACKBAR) state.SNACKBAR = false
      state.SNACKBAR_TEXT = info.text;
      state.SNACKBAR_COLOR = info.color;
      state.SNACKBAR_ICON = info.icon;
      state.SNACKBAR = info.show;  
      
      
    },
    // USUARIOS
    PUSH_USUARIO(state,user){
      state.USUARIOS.push(user)  
    },
    UPDATE_USUARIOS (state, usuarios) {
      state.USUARIOS = []
      if (usuarios.length == 0) {
        axios.get(this.state.ENDPOINT_PATH+'/api/Usuario/ListSP').then((res) => {
          var data = res.data;
          data.forEach(u => state.USUARIOS.push(u))
        });
      }
      else {
        usuarios.forEach((r) => {
          state.USUARIOS.push(r)
        })  
      }  
    },
    // MENU
    UPDATE_ITEMS_MENU (state, items) {
      state.ITEMS_MENU = []
      items.forEach((i) => {
        state.ITEMS_MENU.push(i)
      })      
    },
    UPDATE_MENU (state,id_rol) {
      axios.get(this.state.ENDPOINT_PATH+'/api/Menu/List?ID_Rol='+id_rol).then((res) => {
        state.ITEMS_MENU = []
        res.data.forEach((item) => state.ITEMS_MENU .push(item))
      }) 
    },
    // ROLES DE USUARIO
    UPDATE_ROLES (state, roles) {
      state.ROLES = []
      if (roles.length == 0) {
        axios.get(this.state.ENDPOINT_PATH+'/api/RolUsuario/List').then((res) => {
          var data = res.data;
          data.forEach(i => state.ROLES.push(i))
        });
      }
      else {
        roles.forEach((r) => {
          state.ROLES.push(r)
        })  
      }
          
    },
    PUSH_ROL (state, rol) {
      state.ROLES.push(rol)  
    },
  },
  actions: {
    
  },
  modules: {
  }
})
