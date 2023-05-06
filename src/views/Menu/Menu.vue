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
    <Breadcrumbs :breadcrumbsList="breadcrumbsList" Titulo="Items del Menú"></Breadcrumbs>
    <div class="div-principal">      
        <div class="div-secundario"> 
          <v-snackbar dark :color="snackbarColor" top v-model="snackbar">
            <v-icon >{{snackbarIcon}}</v-icon>
            {{ snackbarText }}
            <template v-slot:action="{ attrs }">
              <v-btn color="white" text v-bind="attrs" @click="snackbar = false">Cerrar</v-btn>
            </template>
          </v-snackbar>
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table 
              :headers="headers" 
              :items="ItemsMenu" 
              :search="search" 
              :items-per-page="10" 
              class="elevation-1 mt-3" 
              loading
              loading-text="Cargando... Por favor espere">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Items del Menú</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  
                  <!-- CREATE -->
                  <v-dialog v-model="dialogCreate" max-width="500px" >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" @click="limpiar()"> 
                        <v-icon class="mr-2">mdi-plus</v-icon> 
                        Nuevo Item
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                          <span class="text-h5">Nuevo Item</span>
                      </v-card-title>
                      <v-card-text class="mt-4 px-10">
                        <v-form ref="form" v-model="valid" lazy-validation>                
                          <h4>Datos del Item</h4>              
                          <v-row>
                            <v-col class="col-md-12">
                              <v-text-field  type="text" v-model="Titulo"  :rules="[v => !! v || 'Este campo es requerido']" label="Título" required></v-text-field> 

                            </v-col>                 
                          </v-row>
                          <v-row>
                            <v-col class="col-md-6">
                              <v-text-field  type="text" v-model="Icono" label="Ícono"></v-text-field> 
                            </v-col>
                            <v-col class="col-md-6">
                              <v-text-field  type="text" v-model="Url" label="Url"></v-text-field> 
                            </v-col>                 
                          </v-row>
                          <v-row>
                            <v-col class="col-md-6">
                              <v-text-field  type="number" v-model="ID_ItemPadre" label="ID Item Padre" required></v-text-field> 
                            </v-col>
                            <v-col class="col-md-6">
                              <v-text-field  type="number" v-model="Prioridad"  :rules="[v => !! v || 'Este campo es requerido']" label="Prioridad" required></v-text-field> 
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-card-text>
                      <v-card-actions class="mt-5 pt-5">
                          <v-spacer></v-spacer>
                          <v-btn depressed color="primary" text @click="validate">Guardar</v-btn>
                          <v-btn depressed color="error" text @click="closeCreate">Cancelar</v-btn>
                      </v-card-actions>
                    </v-card>          
                  </v-dialog>       

                  <!-- EDIT -->
                  <v-dialog v-model="dialogEdit" max-width="500px" >          
                    <v-card>
                      <v-card-title>
                          <span class="text-h5">Editar Item</span>
                      </v-card-title>
                      <v-card-text class="mt-4 px-10">
                        <v-form ref="form" v-model="valid" lazy-validation>                
                          <h4>Datos del Item</h4>              
                          <v-row>
                            <v-col class="col-md-12">
                              <v-text-field  type="text" v-model="Titulo"  :rules="[v => !! v || 'Este campo es requerido']" label="Título" required></v-text-field> 
                            </v-col>                  
                          </v-row>
                          <v-row>
                            <v-col class="col-md-6">
                              <v-text-field  type="text" v-model="Icono" label="Ícono"></v-text-field> 

                            </v-col>
                            <v-col class="col-md-6">
                              <v-text-field  type="text" v-model="Url" label="Url"></v-text-field> 

                            </v-col>                 
                          </v-row>
                          <v-row>
                            <v-col class="col-md-6">
                              <v-text-field  type="number" v-model="ID_ItemPadre" label="ID Item Padre" required></v-text-field> 
                            </v-col>
                            <v-col class="col-md-6">
                              <v-text-field  type="number" v-model="Prioridad"  :rules="[v => !! v || 'Este campo es requerido']" label="Prioridad" required></v-text-field> 
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-card-text>
                      <v-card-actions class="mt-5 pt-5">
                          <v-spacer></v-spacer>
                          <v-btn depressed color="primary" text @click="validateEdit">Guardar</v-btn>
                          <v-btn depressed color="error" text @click="closeEdit">Cancelar</v-btn>
                      </v-card-actions>
                    </v-card>          
                  </v-dialog>         

                  <!-- DELETE -->
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="text-h5 justify-center">¿Está seguro que desea eliminarlo?</v-card-title>
                      <v-card-text class="text-center">
                        <v-icon size="75" class="mr-2" max-widht="300px" elevation="2" fabcolor="error">mdi-delete</v-icon>
                      </v-card-text>            
                      <v-card-text>
                        <v-row>
                          <v-col class="col-md-12">
                            <v-text-field :value="itemToDelete.label" label="Título" disabled></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">Aceptar</v-btn>
                        <v-btn color="red darken-1" text @click="closeDelete">Cancelar</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
              </v-toolbar>   
              </template>        
              <!-- COLUMNA ACCIONES -->
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn elevation="2" small fab color="primary" class="mr-2" @click="editItem(item)">
                  <v-icon >mdi-pencil</v-icon>         
                </v-btn>
                <v-btn elevation="2" small fab color="error" class="mr-2" @click="deleteItem(item)">
                  <v-icon>mdi-delete</v-icon>      
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import Store from '../../store'
var ENDPOINT_PATH = Store.state.ENDPOINT_PATH
import axios from 'axios'
import Breadcrumbs from '@/components/Breadcrumbs.vue';
var itemsRespaldo = []
var items = []

axios.get(ENDPOINT_PATH+'/api/Menu/Listar_Items').then((res) => {
  var data = res.data;
  data.forEach(i => items.push(i))
  
  itemsRespaldo = items; // Respaldo
});

function findRespaldoID(id){
  var index = 0
  var cont = 0
  itemsRespaldo.forEach((item) => {   
    if (item.iD_ItemMenu == id) index = cont
    cont++
  })
  return index
}
export default {
  name: 'Menu',
  components: {
    Breadcrumbs
  },
  data () {
    return {      
      breadcrumbsList: [
        { text: 'Home', disabled: false, href: '/home' },
        { text: 'Administración', disabled: true, href: '' },
        { text: 'Menú', disabled: true, href: '/menu' },
      ], 
      nivelProfundidad: 1,      
      Titulo: '',
      Url: '',
      Icono: '',
      ID_ItemPadre: 0,
      Prioridad: 1,
      itemToDelete: '',
      // SNACKBAR
      snackbar: false,
      snackbarText: 'Hola',
      snackbarColor: 'success',
      snackbarIcon: 'mdi-pencil',
      // DATATABLE
      search: '',
      headers: [
        { text: 'ID Item', value: 'iD_ItemMenu', align: 'start', sortable: true, class: 'dtth' },
        { text: 'ID Padre', value: 'iD_ItemPadre', align: 'start', sortable: true, class: 'dtth' },
        { text: 'Título', value: 'label', class: 'dtth', sortable: true },
        { text: 'Ícono', value: 'icon', class: 'dtth', sortable: true },
        { text: 'Url', value: 'url', class: 'dtth', sortable: true },
        { text: 'Prioridad', value: 'prioridad', class: 'dtth', sortable: false}, 
        { text: 'Acciones', value: 'actions', align: 'center', class: 'dtth', sortable: false },
      ],
      ItemsMenu: items,
      editedIndex: -1,
      editedIndex2:-1,
      valid: true,        
      editedItem: {
        iD_ItemMenu: '',
        iD_ItemPadre: 0,
        label: '',
        icon: '',
        url: '',
        prioridad: 1,
      },
      defaultItem: {
        iD_ItemMenu: '',
        iD_ItemPadre: 0,
        label: '',
        icon: '',
        url: '',
        prioridad: 1,
      },
      // DIALOG
      dialogCreate: false, 
      dialogDelete:false,      
      dialogEdit:false,
      // FORM
      
    }
  },
  computed: {
    
  },
  methods: {    
    limpiar () {
        this.Titulo = ''
        this.ID_ItemPadre = 0
        this.Icono = ''
        this.Prioridad = 1
        this.Url = ''
    },
    // CREATE
    validate () {
      if(this.$refs.form.validate()){
        this.sendNewMov()
      }
    },
    sendNewMov (){      
      var nuevo = {
        "ID_ItemMenu": 0,
        "ID_ItemPadre": this.ID_ItemPadre,
        "Titulo": this.Titulo,
        "Icon": this.Icono,
        "Url": this.Url,
        "Prioridad": this.Prioridad,
      }      
      axios.post(ENDPOINT_PATH+'/api/Menu/Create',nuevo).then((res) => {
        var data = res.data;
        if (data.codigo == 200 && data.item != null) {          
          this.editedItem = {
            iD_ItemMenu: res.data.item,
            iD_ItemPadre: this.ID_ItemPadre,
            label: this.Titulo,
            icon: this.Icono,
            url: this.Url,
            prioridad: this.Prioridad,
          }  
          itemsRespaldo.push(this.editedItem)
          this.ItemsMenu = itemsRespaldo; 
          this.$store.commit('UPDATE_MENU',this.$store.state.SESSION.rol.iD_Rol)
          this.$store.commit('SHOW_NOTIFICATION',{text: "Item agregado exitosamente",icon: "mdi-check",color: "success", show: true})
        }
        else {
          this.$store.commit('SHOW_NOTIFICATION',{text: "Ha ocurrido un error",icon: "mdi-close",color: "error", show: true})
        }
      });        
      this.closeCreate()   
    },
    closeCreate () {
      this.dialogCreate = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
    })},
    // EDIT
    validateEdit () {
      if(this.$refs.form.validate()){
        this.sendEditMov()
      }
    },  
    editItem (item) {      
      this.editedIndex = this.ItemsMenu.indexOf(item)      
      this.editedItem = Object.assign({}, item)
      this.Titulo = item.label
      this.Url = item.url
      this.Icono = item.icon
      this.Prioridad = item.prioridad
      this.ID_ItemPadre = item.iD_ItemPadre
      this.dialogEdit = true
    },      
    sendEditMov (){        
      var edit= {
        "ID_ItemMenu": this.editedItem.iD_ItemMenu,
        "ID_ItemPadre": this.ID_ItemPadre,
        "Titulo": this.Titulo,
        "Icon": this.Icono,
        "Url": this.Url,
        "Prioridad": this.Prioridad,
      }        
      axios.put(ENDPOINT_PATH+'/api/Menu/Edit',edit).then((res) => {
        var data = res.data;
        if (data.codigo == 200) {
          this.editedItem = {
            iD_ItemMenu: edit.ID_ItemMenu,
            iD_ItemPadre: this.ID_ItemPadre,
            label: this.Titulo,
            icon: this.Icono,
            url: this.Url,
            prioridad: this.Prioridad,
          }          
          var index = findRespaldoID(edit.ID_ItemMenu);
          itemsRespaldo.splice(index,1)
          itemsRespaldo.push(this.editedItem)
          //Object.assign(this.itemsRespaldo[index], this.editedItem)
          this.ItemsMenu = itemsRespaldo
          this.$store.commit('UPDATE_MENU',this.$store.state.SESSION.rol.iD_Rol)
          this.$store.commit('SHOW_NOTIFICATION',{text: "Item editado exitosamente",icon: "mdi-check",color: "success"})          
        }
        else {
          this.$store.commit('SHOW_NOTIFICATION',{text: "Ha ocurrido un error",icon: "mdi-close",color: "error"})
        }
        // reset
        this.limpiar()
      });  
      
      this.closeEdit()          
    },
    closeEdit () {
      this.dialogEdit = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
    })},
    // DELETE
    deleteItem (item) {   // Desplegar Dialog DELETE   
      this.editedIndex = this.ItemsMenu.indexOf(item)
      this.itemToDelete  = this.ItemsMenu[this.editedIndex]
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () { // Cuando se confirma la eliminaci[on]
      var Eliminado = this.ItemsMenu[this.editedIndex]
      
      axios.delete(ENDPOINT_PATH+'/api/Menu/Delete?ID_ItemMenu='+Eliminado.iD_ItemMenu).then((res) => {
        //var data = res.data; 
        itemsRespaldo.splice(findRespaldoID(Eliminado.iD_ItemMenu),1)
        this.ItemsMenu = itemsRespaldo;
        this.$store.commit('UPDATE_MENU',this.$store.state.SESSION.rol.iD_Rol)
        this.$store.commit('SHOW_NOTIFICATION',{text: "Item eliminado exitosamente",icon: "mdi-check",color: "success"})
      }).catch((error) => {
        this.$store.commit('SHOW_NOTIFICATION',{text: "Ha ocurrido un error",icon: "mdi-close",color: "error"})
      }); 
      
      this.closeDelete()
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
    })},
  },
}
</script>