<template>
  <div class="fondo">    
    <Breadcrumbs :breadcrumbsList="breadcrumbsList" Titulo="Plantilla"></Breadcrumbs>
    <div class="div-principal">      
      <div class="div-secundario"> 
        <p>Contenido</p>
      </div>
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
        { text: 'Movimientos', disabled: true, href: '/movimientos' },
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