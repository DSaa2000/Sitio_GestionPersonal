<template>
    <div class="fondo">    
      <Breadcrumbs :breadcrumbsList="breadcrumbsList" Titulo="Vista Restringida"></Breadcrumbs>
      <div class="div-principal-restringido">  
        <v-card class="div-secundario-restringido">
           <center>
            Vista Restringida
           </center>
          <v-card-text>
            <v-icon size="300px" color="error">mdi-cancel</v-icon>
          <label>Has intentado ingresar a una vista restringida, tu cuenta no tiene los permisos para acceder a ella.</label>
          </v-card-text>
        </v-card> 
      </div>
    </div>
  </template>
  <script>
  // DOMINIO API
  import Store from '../store'
  var ENDPOINT_PATH = Store.state.ENDPOINT_PATH
  // Librerias
  
  // Componentes
  import Breadcrumbs from '@/components/Breadcrumbs.vue';
  // Variables 
  
  // Peticiones
  
  // Funciones 
  
  export default {
    props: {
    
    },
    data () {
      return {      
        breadcrumbsList: [
          { text: 'Home', disabled: false, href: '/home' },
          { text: 'Vista Restringida', disabled: true, href: '' },
        ],      
      }
    },
    methods: {
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
  .div-principal-restringido {
    width: 320px; 
    margin: auto; 
    
    background-color: white !important;
    border-radius: 5px;
  }
  .div-secundario-restringido {
    margin-top: 35%;
    text-align: justify;
    padding-top: 5%; 
    padding-bottom: 5%;
    
    align-content: center !important;
    align-items: center !important;
  }
  </style>