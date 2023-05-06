<template>
    <div class="fondo">    
      <Breadcrumbs :breadcrumbsList="breadcrumbsList" Titulo="Perfil"></Breadcrumbs>
      
      <div class="div-principal">      
        <div class="div-secundario"> 
          <v-card-title>Mi Perfil</v-card-title>
          <v-row>
            <v-col class="col-md-3">
              <v-img
                height="265"
                max-width="250"
                src="../../assets/perfil.png"
              ></v-img>
            </v-col>
            <v-col class="col-md-9">
              <v-row>
                <v-col class="col-md-4">
                  <v-text-field :value="perfil.user.nombre" label="Nombre" readonly></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="col-md-4">
                  <v-text-field :value="perfil.user.correo" label="Correo" readonly></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="col-md-4">
                  <v-text-field :value="perfil.rol.nombre" label="Rol" readonly></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </template>
  <script>
  // DOMINIO API
  import Store from '../../store'
  var ENDPOINT_PATH = Store.state.ENDPOINT_PATH
  // Librerias
  
  // Componentes
  import Breadcrumbs from '@/components/Breadcrumbs.vue';
import axios from 'axios';
  // Variables 
  
  // Peticiones
  
  // Funciones 
  
  export default {
    props: {
    
    },
    data () {
      return {      
        perfil: this.$store.state.SESSION,
        image: '../../assets/perfil.png',
        breadcrumbsList: [
          { text: 'Home', disabled: false, href: '/home' },
          { text: 'Perfil', disabled: true, href: '/perfil' },
        ],      
      }
    },
    methods: {
      mostrarNotificaciones() {
        this.$store.commit('SHOW_NOTIFICATION',{text: "--- agregado exitosamente",icon: "mdi-check",color: "success", show: true})
        this.$store.commit('SHOW_NOTIFICATION',{text: "Ha ocurrido un error",icon: "mdi-close",color: "error", show: true})
        this.$store.commit('SHOW_NOTIFICATION',{text: "----",icon: "mdi-comment-text",color: "warning", show: true})
      }
    },
    computed: {
  
    },
    components: {
      Breadcrumbs
    }
  }
  </script>
  <style>
  .fondo {
    background-color: #D7D6D7;
  }
  .div-principal {
    margin: 5%; 
    background-color: white !important;
    border-radius: 5px;
  }
  .div-secundario {
    margin: 5%; 
    padding-top: 3%; 
    padding-bottom: 5%;
  }
  </style>