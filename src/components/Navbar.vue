<template>
  <v-card style="height: 55px !important;">
    <v-toolbar class="navbar-theme">
      <!-- <v-app-bar-nav-icon style="color:white"></v-app-bar-nav-icon> -->
      <label>{{ getRolSession }}</label>
      <label>v1.0.0</label>
      <v-spacer></v-spacer>
      <label v-if="isLoggedIn && !isLogin"> Hola <b>{{ getUsername }}</b></label>
      <v-btn v-if="!isLoggedIn" class="navbar-icon" elevation="0" @click="goLogin()">
        <v-icon class="mr-2">mdi-login</v-icon>
        <label>Iniciar Sesión</label>
      </v-btn>
      <v-btn v-else-if="isLoggedIn" class="navbar-icon" elevation="0" @click="logout()">
        <v-icon class="mr-2">mdi-login</v-icon>
        <label>Cerrar Sesión</label>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>
<style lang="css">
.navbar-icon {
  color: white !important;
  background-color: #263238 !important;
}
.navbar-theme {
  background-color: #263238 !important;  
  color: white !important;
  padding-bottom: 3px;
}
</style>
<script>
import auth from '@/services/auth'
  export default {
    name: 'Navbar',
    
    data: () => ({
    }),
    computed: {
      isLoggedIn () {
        return this.$store.state.SESSION.status
      },
      isLogin (){
        return this.$store.state.THIS_ROUTE_IS_LOGIN
      },
      getRolSession (){
        return this.$store.state.SESSION.rol.nombre
      },
      getUsername (){
        return this.$store.state.SESSION.user.nombre
      }
    },
    methods: {
      goLogin(){
        if (this.$router.currentRoute.fullPath != '/login') this.$router.push({path: "/login"})        
      },
      logout(){
        auth.logout()
      }
    }
  }
</script>
