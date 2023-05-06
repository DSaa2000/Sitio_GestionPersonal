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
    <Breadcrumbs :breadcrumbsList="breadcrumbsList" Titulo="Listado de Roles de Usuarios"></Breadcrumbs>
    <div class="div-principal">      
        <div class="div-secundario">           
          <v-data-table :headers="headers" :items="this.$store.state.ROLES" :items-per-page="10" class="elevation-1 mt-3">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Roles del Sistema</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="nuevoRol()">
                    <v-icon class="mr-2">mdi-plus</v-icon> 
                    Nuevo Rol
                  </v-btn>
                </v-toolbar>   
              </template>  
              <template v-slot:[`item.rol`]="{ item }">
                {{item.rol.nombre}}
              </template>   
              <!-- COLUMNA ACCIONES -->
              <template v-slot:[`item.acciones`]="{ item }">
                <v-btn elevation="2" small fab color="primary" class="mr-2" @click="editItem(item)">
                  <v-icon >mdi-pencil</v-icon>         
                </v-btn>
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
import router from '@/router';
// Variables
export default {
  name: 'listadoRoles',
  components: {
    Breadcrumbs
  },
  created() {
    this.$store.commit("UPDATE_ROLES",[])
  },
  data () {
    return {      
      breadcrumbsList: [
        { text: 'Home', disabled: false, href: '/home' },
        { text: 'Administración', disabled: true, href: '' },
        { text: 'Roles', disabled: true, href: '' },
        { text: 'Listado de Roles', disabled: true, href: '' }
      ], 
      // DATATABLE
      headers: [
        { text: 'ID Rol', value: 'iD_Rol', align: 'start', sortable: true, class: 'dtth' },
        { text: 'Nombre', value: 'nombre', align: 'start', sortable: true, class: 'dtth' },
        { text: 'Acciones', value: 'acciones', align: 'center', class: 'dtth', sortable: true },
      ],      
    }
  },
  computed: {
  },
  methods: {    
    nuevoRol(){
      router.push({path: '/administracion/roles/crear'})
    },
    editItem (item) {
      router.push({path: '/administracion/roles/edit/'+item.iD_Rol})
    }
  },
}
</script>