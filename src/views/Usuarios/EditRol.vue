<template>
    <div class="fondo">    
      <Breadcrumbs :breadcrumbsList="breadcrumbsList" Titulo="Editar Rol"></Breadcrumbs>
      <div class="div-principal">      
        <div class="div-secundario"> 
            <v-form ref="form" lazy-validation>                
                <center>
                    <h4>Modifique el nombre y/o los permisos de acceso el rol seleccionado</h4><br>
                    <v-btn v-if="!permisos" @click="cargarData($router.currentRoute.params.id_rol)">Cargar Permisos</v-btn>
                    
                    
                </center> 
                <v-row>
                    <v-col class="col-md-4">
                        <v-text-field v-if="permisos"  v-model="id_rol" label="ID_Rol" required disabled></v-text-field> 
                    </v-col>
                    <v-col class="col-md-4">
                        <v-text-field v-if="permisos" class="col-md-4" v-model="nombre" :counter="100" :rules="[v => !! v || 'Este campo es requerido']" label="Nombre del Rol" required></v-text-field> 
                </v-col>
                </v-row>
                <v-data-table v-if="permisos" :headers="headers" :items="ItemsMenuRoles" :items-per-page="10" class="elevation-1 mt-3">
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title>Modificar Permisos de Acceso</v-toolbar-title>
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
                  <v-btn v-if="permisos" color="blue darken-1" text @click="validarFormRol">Guardar</v-btn>
                  <v-btn v-if="permisos" color="error darken-1" text @click="limpiar()">Limpiar</v-btn>
                  <v-btn v-if="permisos" color="yellow darken-3" text @click="marcarTodos()">Todos los Módulos</v-btn>
                  <v-btn v-if="permisos" color="green darken-3" text @click="invertirPermisos()">Invertir Permisos</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
            </v-form>
        </div>
      </div>
    </div>
  </template>
  <script>
  import router from '../../router';
  // DOMINIO API
  import Store from '../../store'
  var ENDPOINT_PATH = Store.state.ENDPOINT_PATH
  // Librerias
  import axios from 'axios'
  // Componentes
  import Breadcrumbs from '@/components/Breadcrumbs.vue';
  // Variables 
  var itemsRespaldoRoles = []
  var itemsRoles = []
  var rolActual =  ''
  // Peticiones

  // Funciones 
   
export default {
      name: "editRol",
      props: {
        id: {
            type: Number
        }
      },
      data () {        
        return {      
        
          breadcrumbsList: [
              { text: 'Home', disabled: false, href: '/home' },
              { text: 'Administración', disabled: true, href: '' },
              { text: 'Roles', disabled: false, href: '/administracion/roles/list' },
              { text: 'Editar Rol', disabled: true, href: '' }
          ],  
          headers: [
            { text: 'ID Item', value: 'iD_ItemMenu', align: 'start', sortable: true, class: 'dtth' },
            { text: 'ID Padre', value: 'iD_ItemPadre', align: 'start', sortable: true, class: 'dtth' },
            { text: 'Título', value: 'label', class: 'dtth', sortable: true },
            { text: 'Permiso', value: 'permiso', align: 'center', class: 'dtth', sortable: false },
          ],          
          // Form
          ItemsMenuRoles: [],
          nombre: rolActual, 
          id_rol: this.$router.currentRoute.params.id_rol,
          // Mostrar tabla
          permisos: false
        }
      },
      created (){
        this.permisos= true
        this.cargarData(this.$router.currentRoute.params.id_rol)
      },
      methods: {   
        async cargarData (id_rol){
            itemsRespaldoRoles = []
            await axios.get(ENDPOINT_PATH+'/api/RolUsuario/Listar_PermisosByRol?ID_Rol='+id_rol).then((res) => {    
                var data = res.data;
                var rol = data.rolUsuario.nombre
                var cont = 0;
                data.permisos.forEach((i) => {
                    itemsRoles.push({
                        iD_ItemMenu: i.iD_ItemMenu,
                        label: i.nombre,
                        iD_ItemPadre: i.iD_ItemPadre,
                        id: cont,
                        permiso: i.permiso
                    })
                    itemsRespaldoRoles.push({
                        iD_ItemMenu: i.iD_ItemMenu,
                        label: i.nombre,
                        iD_ItemPadre: i.iD_ItemPadre,
                        id: cont,
                        permiso: i.permiso
                    })
                    cont++    
                })  
                this.nombre = rol,
                this.ItemsMenuRoles = itemsRespaldoRoles
            });
            this.permisos = true
        },  
        
        limpiar () {
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
            this.sendEditRol()
          }
        },
        sendEditRol(){
          var lista = []
          this.ItemsMenuRoles.forEach((i) => {
            lista.push({
              ID_ItemMenu: i.iD_ItemMenu,
              ID_ItemPadre: i.iD_ItemPadre,
              Nombre: i.label,
              Path: '',
              Permiso: i.permiso
            })
          })
          var nRol = {
            RolUsuario: {
              ID_Rol: this.id_rol,
              Nombre: this.nombre
            },          
            Permisos: lista
          }
          axios.put(ENDPOINT_PATH+'/api/RolUsuario/Edit',nRol).then((res) => {
            var data = res.data;
            if (res.data.codigo == 200){
              this.$store.commit('UPDATE_ROLES',[])
              this.$router.push("/administracion/roles/list")    
              this.$store.commit('SHOW_NOTIFICATION',{text: "Rol editado exitosamente",icon: "mdi-check",color: "success", show: true})
            }
            else {            
              this.$store.commit('SHOW_NOTIFICATION',{text: "Ha ocurrido un error",icon: "mdi-close",color: "error", show: true})  
            }
          }).catch((error) => {
            this.$store.commit('SHOW_NOTIFICATION',{text: "Ha ocurrido un error con el servidor",icon: "mdi-close",color: "error", show: true})
          })
        },
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