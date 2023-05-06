
<template>
  <v-app>    
    <Sidebar app class="v-toolbar" ></Sidebar>
    <v-snackbar dark :color="$store.state.SNACKBAR_COLOR" top v-model="$store.state.SNACKBAR">
      <v-icon >{{$store.state.SNACKBAR_ICON}}</v-icon>
      {{ $store.state.SNACKBAR_TEXT }}
      <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="$store.state.SNACKBAR = false">Cerrar</v-btn>
      </template>
    </v-snackbar>
    
    <v-main style="background-color: #D7D6D7;">       
      <Navbar app class="v-toolbar"></Navbar>   
      <router-view/> 
    </v-main>
  </v-app>
</template>
<style lang="scss" scoped>
  .menu {
    position: fixed;
    height: 100vh;
    width: 240px;
    left: 0;
    top: 0;
    border-right: 1px solid #ececec;
    transition: all .3s ease;
    overflow: auto;
    i {
      position: fixed;
      left: 250px;
      font-size: 20px;
      top: 15px;
      user-select: none;
      cursor: pointer;
      transition: all .3s ease;
    }
    &.small-menu {
      overflow: inherit;
      width: 60px;
      padding-top: 50px;
      i {
        left: 20px;
      }
    }
  }
</style>
<style lang="css">
.dark {
  background-color: #263238 !important;
  text-align: center;
}
.dark-1 {
  color: white !important;
  background-color: #263238 !important;
  
}
.dark-2 {
  color: white !important;
  background-color: #263238 !important;
  text-align: left !important;
}
</style>

<script>
// DOMINIO API
import Store from './store'
var ENDPOINT_PATH = Store.state.ENDPOINT_PATH
// Librerias
import axios from 'axios'
import auth from './services/auth'
// Componentes
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
// Variables
var ItemsMenu = []
// Peticiones
if (Store.state.SESSION.status){
  axios.get(ENDPOINT_PATH+'/api/Menu/List?ID_Rol='+Store.state.SESSION.rol.iD_Rol).then((res) => {
    res.data.forEach((item) => ItemsMenu.push(item))
    Store.commit('UPDATE_ITEMS_MENU',ItemsMenu)
  }) 
}
export default {
  name: 'App',
  components: {
    Sidebar,
    Navbar,
  },
  beforeCreate () {
    
  },
  mounted(){
    console.log("APP MOUNT")
  } , 
  created() {
    console.log("APP CREADA")
  },
  destroyed(){
    console.log("APP DESTRUIDA")
  },
  data () {
    return {
    }
  },
  methods: {
    
  },
  computed: {
    
  },
};
</script>
