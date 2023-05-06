<template>
  <div class="fondo">    
    <Breadcrumbs :breadcrumbsList="breadcrumbsList" Titulo="Crear Rol"></Breadcrumbs>
    <div class="div-principal">      
      <div class="div-secundario"> 
          <v-form ref="form" lazy-validation>                
              <center>
                  <h4>Ingrese un nombre y seleccione permisos para el nuevo rol</h4>
                  <v-text-field style="width: 300px;" v-model="nombre" :counter="100" :rules="[v => !! v || 'Este campo es requerido']" label="Nombre del Rol" required></v-text-field> 

              </center> 
              <v-data-table :headers="headers" :items="ItemsMenuRoles" :items-per-page="10" class="elevation-1 mt-3">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Asignar Permisos de Acceso</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
              </v-toolbar>   
              </template>        
              <!-- COLUMNA ACCIONES -->
              <template v-slot:[`item.permiso`]="{ item }">
                <v-switch v-model="item.permiso"></v-switch>
              </template>
            </v-data-table>
            <v-card-actions>
                <v-spacer></v-spacer>                
                <v-btn color="blue darken-1" text @click="validarFormRol">Guardar</v-btn>
                <v-btn color="error darken-1" text @click="limpiar()">Limpiar</v-btn>
                <v-btn color="yellow darken-3" text @click="marcarTodos()">Todos los Módulos</v-btn>
                <v-btn color="green darken-3" text @click="invertirPermisos()">Invertir Permisos</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
          </v-form>
      </div>
    </div>
  </div>
</template>
<script>
// DOMINIO API
import Store from '../../store'
var ENDPOINT_PATH = Store.state.ENDPOINT_PATH
// Librerias
import axios from 'axios'
import router from '@/router';
// Componentes
import Breadcrumbs from '@/components/Breadcrumbs.vue';
// Variables 
var itemsRespaldoRoles = []
var itemsRoles = []
// Peticiones
axios.get(ENDPOINT_PATH+'/api/Menu/Listar_Items').then((res) => {
  var data = res.data;
  var cont = 0;
  data.forEach((i) => {
    itemsRoles.push({
      iD_ItemMenu: i.iD_ItemMenu,
      label: i.label,
      iD_ItemPadre: i.iD_ItemPadre,
      id: cont,
      permiso: false
    })
    itemsRespaldoRoles.push({
      iD_ItemMenu: i.iD_ItemMenu,
      label: i.label,
      iD_ItemPadre: i.iD_ItemPadre,
      id: cont,
      permiso: false
    })
    cont++    
  })  
});  
// Funciones 
  
export default {
    name: "crearRol",
    props: {
    
    },
    data () {
      return {      
        ItemsMenuRoles: itemsRoles,
        breadcrumbsList: [
            { text: 'Home', disabled: false, href: '/home' },
            { text: 'Administración', disabled: true, href: '' },
            { text: 'Roles', disabled: false, href: '/administracion/roles/list' },
            { text: 'Crear Rol', disabled: true, href: '' }
        ],  
        headers: [
          { text: 'ID Item', value: 'iD_ItemMenu', align: 'start', sortable: true, class: 'dtth' },
          { text: 'ID Padre', value: 'iD_ItemPadre', align: 'start', sortable: true, class: 'dtth' },
          { text: 'Título', value: 'label', class: 'dtth', sortable: true },
          { text: 'Permiso', value: 'permiso', align: 'center', class: 'dtth', sortable: false },
        ],
        // Form
        nombre: '', 
      }
    },
    methods: {      
      limpiar () {
        this.nombre = ''
        itemsRespaldoRoles.forEach((i) => i.permiso = false)
        this.ItemsMenuRoles = itemsRespaldoRoles
      },
      marcarTodos () {
        itemsRespaldoRoles.forEach((i) => i.permiso = true)
        this.ItemsMenuRoles = itemsRespaldoRoles
      },
      invertirPermisos () {
        this.ItemsMenuRoles.forEach((i) => i.permiso = this.invertir(i.permiso))
      },
      invertir (val) {
        if (val) return false
        else return true
      },
      validarFormRol () {
        if(this.$refs.form.validate()){
          this.sendCreateRol()
        }
      },
      sendCreateRol(){
        var lista = []
        this.ItemsMenuRoles.forEach((i) => {
          lista.push({
            ID_ItemMenu: i.iD_ItemMenu,
            ID_ItemPadre: i.iD_ItemPadre,
            Nombre: i.label,
            Permiso: i.permiso
          })
        })
        var nRol = {
          RolUsuario: {
            ID_Rol: 0,
            Nombre: this.nombre
          },          
          Permisos: lista
        }
        axios.post(ENDPOINT_PATH+'/api/RolUsuario/Create',nRol).then((res) => {
          var data = res.data;
          if (data.codigo == 200){
            var nuevo = {
              iD_Rol: data.item,
              nombre: nRol.RolUsuario.Nombre
            }
            this.$store.commit('PUSH_ROL',nuevo)
            this.$router.push("/administracion/roles/list")
            this.$store.commit('SHOW_NOTIFICATION',{text: "Rol agregado exitosamente",icon: "mdi-check",color: "success", show: true})
          }
          else {
            this.$store.commit('SHOW_NOTIFICATION',{text: "Ha ocurrido un error",icon: "mdi-close",color: "error", show: true})
          }
        }).catch((error) => {
          this.$store.commit('SHOW_NOTIFICATION',{text: "Ha ocurrido un error con el servidor",icon: "mdi-close",color: "error", show: true})
        })
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
  .tr-tabla-head {
    background-color: #263238;
    color: #ececec;    
  }
  .tr-tabla-head th {
    padding: 5px;
  }  
  .tr-tabla-body td {
    border: 1px solid #cccfd0;
  }
  .td-tabla {
    padding-left: 10px;
    text-align: left;
  }
</style>