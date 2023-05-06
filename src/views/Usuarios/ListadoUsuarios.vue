<style>
.dtth {
  color: #FFF !important;
  background-color: #263238;
}
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
<template>
  <div class="fondo">    
    <Breadcrumbs :breadcrumbsList="breadcrumbsList" Titulo="Listado de Usuarios"></Breadcrumbs>
    <div class="div-principal">      
        <div class="div-secundario">           
          <v-data-table :headers="headers" :items="$store.state.USUARIOS" :items-per-page="10" class="elevation-1 mt-3">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Usuarios del Sistema</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="$router.push('/register')">
                    <v-icon class="mr-2">mdi-plus</v-icon> 
                    Nuevo Usuario
                  </v-btn>
                </v-toolbar>   
              </template>  
              <template v-slot:[`item.rol`]="{ item }">
                {{item.rol.nombre}}
              </template>   
            </v-data-table>
      </div>
    </div>
  </div>
</template>
<script>
import Store from '../../store'
var ENDPOINT_PATH = Store.state.ENDPOINT_PATH
import axios from 'axios'
import Breadcrumbs from '@/components/Breadcrumbs.vue';
// Variables
var items = []

axios.get(ENDPOINT_PATH+'/api/Usuario/ListSP').then((res) => {
  var data = res.data;
  data.forEach(i => items.push(i))
  Store.commit("UPDATE_USUARIOS",items)
});


export default {
  name: 'listadoUsuarios',
  components: {
    Breadcrumbs
  },
  data () {
    return {      
      breadcrumbsList: [
        { text: 'Home', disabled: false, href: '/home' },
        { text: 'Administración', disabled: true, href: '' },
        { text: 'Usuarios del Sistema', disabled: true, href: '' },
        { text: 'Listado de Usuarios', disabled: true, href: '' }
      ], 
      // DATATABLE
      headers: [
        { text: 'ID Usuario', value: 'iD_Usuario', align: 'start', sortable: true, class: 'dtth' },
        { text: 'Nombre', value: 'nombre', align: 'start', sortable: true, class: 'dtth' },
        { text: 'Correo', value: 'correo', class: 'dtth', sortable: true },
        { text: 'Rol', value: 'rol', class: 'dtth', sortable: true }, 
      ],
      Usuarios: items,
      // DIALOG
      
    }
  },
  computed: {
    
  },
  methods: {    
    
  },
}
</script>