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
    <Breadcrumbs :breadcrumbsList="breadcrumbsList" Titulo="Movimientos"></Breadcrumbs>
    <v-snackbar dark :color="snackbarColor" top v-model="snackbar">
      <v-icon >{{snackbarIcon}}</v-icon>
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">Cerrar</v-btn>
      </template>
    </v-snackbar>
    <div class="div-principal">      
      <div class="div-secundario">             
        <v-toolbar flat>
          <v-toolbar-title>Filtros Avanzados</v-toolbar-title>    
          <v-spacer></v-spacer>
          <v-btn color="primary" dark class="mb-2" @click="resetFilter()"> 
            <v-icon class="mr-2">mdi-filter-remove</v-icon> 
            Limpiar Filtros
          </v-btn>    
        </v-toolbar>
        <v-row>
          <!-- YEARS -->
          <v-col class="col-md-3">
            <v-select :items="years" v-on:change="filtrar()" v-model="yearsSelected" item-text="Nombre" item-value="ID_Year" label="Seleccione Año" multiple>
              <template v-slot:prepend-item>
                <v-list-item ripple @mousedown.prevent @click="toggleYear">
                  <v-list-item-action>
                    <v-icon :color="years.length > 0 ? 'indigo darken-4' : ''">
                      {{ iconSelectYear }}
                    </v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      Todos los Años
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class="mt-2"></v-divider>
              </template>
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0">
                  <span>{{ item.Nombre }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text text-caption">
                  (+{{ yearsSelected.length - 1 }} más)
                </span>
              </template>
            </v-select>
          </v-col>
          <!-- MONTH -->
          <v-col class="col-md-3">
            <v-select :items="meses" v-on:change="filtrar()" v-model="mesesSelected" item-text="Nombre" item-value="ID_Mes" label="Seleccione Mes" multiple>
              <template v-slot:prepend-item>
                <v-list-item ripple @mousedown.prevent @click="toggleMonth">
                  <v-list-item-action>
                    <v-icon :color="meses.length > 0 ? 'indigo darken-4' : ''">
                      {{ iconSelectMonth }}
                    </v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      Todos los Meses
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class="mt-2"></v-divider>
              </template>
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0">
                  <span>{{ item.Nombre }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text text-caption">
                  (+{{ mesesSelected.length - 1 }} más)
                </span>
              </template>
            </v-select>
          </v-col>
          <!-- FUENTE -->
          <v-col class="col-md-3">
            <v-select :items="fuentes" v-on:change="filtrar()" v-model="fuentesSelected" item-text="Nombre" item-value="Nombre" label="Seleccione Fuente" multiple>
              <template v-slot:prepend-item>
                <v-list-item ripple @mousedown.prevent @click="toggleFuente">
                  <v-list-item-action>
                    <v-icon :color="fuentes.length > 0 ? 'indigo darken-4' : ''">
                      {{ iconSelectFuente }}
                    </v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      Todas las Fuentes
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class="mt-2"></v-divider>
              </template>
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0">
                  <span>{{ item.Nombre }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text text-caption">
                  (+{{ fuentesSelected.length - 1 }} más)
                </span>
              </template>
            </v-select>
          </v-col>
          <!-- TIPO MOVIMIENTO -->
          <v-col class="col-md-3">
            <v-select :items="tiposMovimientos" v-on:change="filtrar()" v-model="tiposMovimientosSelected" item-text="Nombre" item-value="Nombre" label="Seleccione Tipos de Movimientos" multiple>
              <template v-slot:prepend-item>
                <v-list-item ripple @mousedown.prevent @click="toggleTM()">
                  <v-list-item-action>
                    <v-icon :color="tiposMovimientos.length > 0 ? 'indigo darken-4' : ''">
                      {{ iconSelectTM }}
                    </v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      Todos los Tipos de Movimientos
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class="mt-2"></v-divider>
              </template>
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0">
                  <span>{{ item.Nombre }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text text-caption">
                  (+{{ tiposMovimientosSelected.length - 1 }} más)
                </span>
              </template>
            </v-select>
          </v-col>
        </v-row>
        
        <v-data-table :headers="headers" :items="movimientos" :items-per-page="10" class="elevation-1 mt-3">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Mis Movimientos</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <!-- CREATE -->
              <v-dialog v-model="dialogMovimientos" max-width="500px" >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" > 
                    <v-icon class="mr-2">mdi-plus</v-icon> 
                    Nuevo Movimiento 
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                      <span class="text-h5">Nuevo Movimiento</span>
                  </v-card-title>
                  <v-card-text class="mt-4 px-10">
                    <v-form ref="form" v-model="valid" lazy-validation>                
                      <h4>Datos del Movimiento</h4>              
                      <v-row>
                        <v-col class="col-md-6">
                          <v-menu ref="menu" :close-on-content-click="false" :return-value.sync="fecha"  transition="transition" max-width="290">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="fecha" label="Fecha" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" :rules="[v => !!v || 'Este campo es requerido']" required></v-text-field>
                            </template>
                            <v-date-picker v-model="fecha" no-title>
                                <v-btn text color="primary" @click="menu = false">
                                    Cancelar
                                </v-btn>
                                <v-btn text color="primary" @click="$refs.menu.save(fecha)">
                                    OK
                                </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col class="col-md-6">
                          <v-select v-model="tipoMovimiento" item-text="Nombre" item-value="ID_TipoMovimiento" :items="tiposMovimientos" :rules="[v => !!v || 'Este campo es requerido']"  label="Tipo de Movimiento" required></v-select >  
                        </v-col>                  
                      </v-row>
                      <v-row>
                        <v-col class="col-md-6">
                          <v-select v-model="fuente" item-text="Nombre" item-value="ID_Fuente" :items="fuentes" :rules="[v => !! v || 'Este campo es requerido']"  label="Fuente Destino" required></v-select > 
                        </v-col>
                        <v-col class="col-md-6">
                          <v-text-field  type="number" v-model="monto"  :rules="[v => !! v || 'Este campo es requerido']" label="Monto" required></v-text-field> 
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="col-md-12">
                          <v-text-field v-model="motivo" :counter="100" :rules="[v => !! v || 'Este campo es requerido']" label="Motivo" required></v-text-field> 
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                  <v-card-actions class="mt-5 pt-5">
                      <v-spacer></v-spacer>
                      <v-btn depressed color="primary" text @click="validate">Guardar</v-btn>
                      <v-btn depressed color="error" text @click="close">Cancelar</v-btn>
                  </v-card-actions>
                </v-card>          
              </v-dialog>       

              <!-- EDIT -->
              <v-dialog v-model="dialogEdit" max-width="500px" >          
                <v-card>
                  <v-card-title>
                      <span class="text-h5">Editar Movimiento</span>
                  </v-card-title>
                  <v-card-text class="mt-4 px-10">
                    <v-form ref="form" v-model="valid" lazy-validation>                
                      <h4>Datos del Movimiento</h4>              
                      <v-row>
                        <v-col class="col-md-6">
                          <v-menu ref="menu" :close-on-content-click="false" :return-value.sync="fecha"  transition="transition" max-width="290">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="fecha" label="Fecha" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" :rules="[v => !!v || 'Este campo es requerido']" required></v-text-field>
                            </template>
                            <v-date-picker v-model="fecha" no-title>
                                <v-btn text color="primary" @click="menu = false">
                                    Cancelar
                                </v-btn>
                                <v-btn text color="primary" @click="$refs.menu.save(fecha)">
                                    OK
                                </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col class="col-md-6">
                          <v-select v-model="tipoMovimiento" item-text="Nombre" item-value="ID_TipoMovimiento" :items="tiposMovimientos" :rules="[v => !!v || 'Este campo es requerido']"  label="Tipo de Movimiento" required></v-select >  
                        </v-col>                  
                      </v-row>
                      <v-row>
                        <v-col class="col-md-6">
                          <v-select v-model="fuente" item-text="Nombre" item-value="ID_Fuente" :items="fuentes" :rules="[v => !! v || 'Este campo es requerido']"  label="Fuente Destino" required></v-select > 
                        </v-col>
                        <v-col class="col-md-6">
                          <v-text-field  type="number" v-model="monto"  :rules="[v => !! v || 'Este campo es requerido']" label="Monto" required></v-text-field> 
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="col-md-12">
                          <v-text-field v-model="motivo" :counter="100" :rules="[v => !! v || 'Este campo es requerido']" label="Motivo" required></v-text-field> 
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
                      <v-col class="col-md-6">
                        <v-text-field :value="itemToDelete.Fecha" label="Fecha" disabled></v-text-field>
                        <v-text-field :value="itemToDelete.Fuente" label="Fuente" disabled></v-text-field>
                      </v-col>
                      <v-col class="col-md-6">
                        <v-text-field :value="itemToDelete.TipoMovimiento" label="Tipo de Movimiento" disabled></v-text-field>
                        <v-text-field :value="'$ '+itemToDelete.Monto" label="Monto" disabled></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-text class="text-center">
                    <v-text-field :value="itemToDelete.Motivo" label="Motivo" disabled></v-text-field>              
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
          <template v-slot:[`item.Monto`]="{ item }">
            $ {{item.Monto}}
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn elevation="2" small fab color="primary" class="mr-2" @click="editItem(item)">
              <v-icon >mdi-pencil</v-icon>         
            </v-btn>
            <v-btn elevation="2" small fab color="error" class="mr-2" @click="deleteItem(item)">
              <v-icon>mdi-delete</v-icon>      
            </v-btn>
          </template>
        </v-data-table>
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
// Componentes
import Breadcrumbs from '../../components/Breadcrumbs.vue';
// Variables
var itemsRespaldo = []
var items = []

var fuentes = []
var fuentesOL = []

var tiposMovimientos = []
var tiposMovimientosOL = []
var mesesOL = []
// Peticiones
axios.get(ENDPOINT_PATH+'/api/Mes/List').then((res) => {
  var data = res.data;
  data.forEach((item) => {
    mesesOL.push({
      ID_Mes : item.iD_Mes,
      Nombre : item.nombre
    })
  })  
});
axios.get(ENDPOINT_PATH+'/api/Fuente/List').then((res) => {
  var data = res.data;
  data.forEach((item) => {
    fuentes.push(item.nombre)
    fuentesOL.push({
      ID_Fuente : item.iD_Fuente,
      Nombre : item.nombre
    })
  })  
});
axios.get(ENDPOINT_PATH+'/api/TipoMovimiento/List').then((res) => {
  var data = res.data;
  data.forEach((item) => {
    tiposMovimientos.push(item.nombre)
    tiposMovimientosOL.push({
      ID_TipoMovimiento: item.iD_TipoMovimiento,
      Nombre: item.nombre
    })
  })  
});
axios.get(ENDPOINT_PATH+'/api/Movimiento/ListSP').then((res) => {
  var data = res.data;
  data.forEach((item) => { 
    var date = new Date(item.movimientoDB.fecha);
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = yyyy + '-' + mm + '-' + dd;
    items.push({
      ID_Movimiento: item.movimientoDB.iD_Movimiento,
      TipoMovimiento: item.tipoMovimiento.nombre,
      ID_TipoMovimiento: item.tipoMovimiento.iD_TipoMovimiento,
      Motivo: item.movimientoDB.motivo,
      Monto: item.movimientoDB.monto,
      Fecha: formattedToday,
      Fuente: item.fuente.nombre,
      ID_Fuente: item.fuente.iD_Fuente
  })})
  itemsRespaldo = items; // Respaldo
  Store.state.MOVIMIENTOS = items;
});
// Funciones
function getFuente(id){
  var elem = {ID_Fuente : 0, Nombre: ""};
  fuentesOL.forEach((f) => {      
    if (f.ID_Fuente == id) {
      elem = f; 
    }
  })
  return elem;
}
function getTipoMovimiento(id){
  var elem =  {ID_TipoMovimiento : 0, Nombre: ""};
  tiposMovimientosOL.forEach((tm) => {
    if (tm.ID_TipoMovimiento == id) {
      elem = tm   
    }
  })
  return elem;
}
function getFecha(text){
  var date = new Date(text);
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // Months start at 0!
  let dd = date.getDate()+1;

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  return yyyy + '-' + mm + '-' + dd;
}
function findRespaldoID(id){
  var index = 0
  var cont = 0
  itemsRespaldo.forEach((item) => {   
    if (item.ID_Movimiento == id) index = cont
    cont++
  })
  return index
}

export default {
  name: 'Movimientos',
  fuente: '',      
  monto: '',
  tipoMovimiento: '',
  components: {
    Breadcrumbs
  },
  data () {
    return {      
      itemToDelete: '',
      // SNACKBAR
      snackbar: false,
      snackbarText: '',
      snackbarColor: 'success',
      snackbarIcon: '',
      // DATATABLE
      headers: [
        { text: 'ID', value: 'ID_Movimiento', align: 'start', sortable: true, class: 'dtth' },
        { text: 'Fecha', value: 'Fecha', class: 'dtth', sortable: true },
        { text: 'Tipo de Movimiento', value: 'TipoMovimiento', class: 'dtth', sortable: true },
        { text: 'Fuente', value: 'Fuente', class: 'dtth', sortable: true },
        { text: 'Motivo', value: 'Motivo', class: 'dtth', sortable: false},
        { text: 'Monto', value: 'Monto', class: 'dtth', sortable: true },        
        { text: 'Acciones', value: 'actions', align: 'center', class: 'dtth', sortable: false },
      ],
      movimientos: items,
      editedIndex: -1,
      editedIndex2:-1,
      valid: true,        
      editedItem: {
        fecha: '',
        tipoMovimiento: '',
        motivo: '',
        monto: '',
        fuente: '',
      },
      defaultItem: {
        fecha: '',
        tipoMovimiento: '',
        motivo: '',
        monto: '',
        fuente: '',
      },
      // DIALOG
      dialogMovimientos: false, 
      dialogDelete:false,      
      dialogEdit:false,
      // FORM
      fuente: '',      
      fuentes: fuentesOL,
      monto: '',
      tipoMovimiento: '',
      motivo: '',
      tiposMovimientos: tiposMovimientosOL,
      fecha: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      // FILTROS
      meses: mesesOL,
      mesesSelected: [],
      years: [{ID_Year: 1, Nombre: '2022'}],
      yearsSelected: [],
      fuentesSelected: [],
      tiposMovimientosSelected: [],
      year: '',
      // OTROS
      menu: '',
      breadcrumbsList: [
        { text: 'Home', disabled: false, href: '/home' },
        { text: 'Movimientos', disabled: true, href: '/movimientos' },
      ],   
    }
  },
  computed: {
    AllSelectedFuente () {
      return this.fuentesSelected.length === this.fuentes.length
    },
    SomeSelectedFuente() {
      return this.fuentesSelected.length > 0 && !this.AllSelectedFuente
    },
    iconSelectFuente () {
      if (this.AllSelectedFuente) return 'mdi-close-box'
      if (this.SomeSelectedFuente) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    AllSelectedTM () {
      return this.tiposMovimientosSelected.length === this.tiposMovimientos.length
    },
    SomeSelectedTM() {
      return this.tiposMovimientosSelected.length > 0 && !this.AllSelectedTM
    },
    iconSelectTM () {
      if (this.AllSelectedTM) return 'mdi-close-box'
      if (this.SomeSelectedTM) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    AllSelectedYear () {
      return this.yearsSelected.length === this.years.length
    },
    SomeSelectedYear () {
      return this.yearsSelected.length > 0 && !this.AllSelectedYear
    },
    iconSelectYear () {
      if (this.AllSelectedYear) return 'mdi-close-box'
      if (this.SomeSelectedYear) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    AllSelectedMonth () {
      return this.mesesSelected.length === this.meses.length
    },
    SomeSelectedMonth () {
      return this.mesesSelected.length > 0 && !this.AllSelectedMonth
    },
    iconSelectMonth () {
      if (this.AllSelectedMonth) return 'mdi-close-box'
      if (this.SomeSelectedMonth) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    }
  },
  props: {
    ENDPOINT_PATH:{
      type: String
    }
  },
  methods: {
    // TOGGLE
    toggleFuente () {
      this.$nextTick(() => {
        if (this.AllSelectedFuente) {
          this.fuentesSelected = []
        } else {
          this.fuentesSelected = this.fuentes.slice()
        }
      })
      this.filtrar()
    },
    toggleTM () {      
      this.$nextTick(() => {
        if (this.AllSelectedTM) {
          this.tiposMovimientosSelected = []          
        } else {
          this.tiposMovimientosSelected = this.tiposMovimientos.slice() 
        }
        if (this.tiposMovimientosSelected.length == 0) this.filtrar()
      })
      this.filtrar()
    },
    toggleYear () {
      this.$nextTick(() => {
        if (this.AllSelectedYear) {
          this.yearsSelected = []
        } else {
          this.yearsSelected = this.years.slice()
        }
      })
      this.filtrar()
    },
    toggleMonth () {
      this.$nextTick(() => {
        if (this.AllSelectedMonth) {
          this.mesesSelected = []      
              
        } else {
          this.mesesSelected = this.meses.slice()     
        }
        this.filtrar()
      })
    },
    filtrar(){
      var lista = []
      itemsRespaldo.forEach((mov) => {
        var date = mov.Fecha.split('-');
        if (this.mesesSelected.includes(1*date[1]) || this.mesesSelected.length == 0 || this.mesesSelected.length == this.meses.length){
          if (this.yearsSelected.includes(1*date[2]) || this.yearsSelected.length == 0 || this.yearsSelected.length == this.years.length){
            if (this.tiposMovimientosSelected.includes(mov.TipoMovimiento) || this.tiposMovimientosSelected.length == 0 || this.tiposMovimientosSelected.length == this.tiposMovimientos.length) {
              if (this.fuentesSelected.includes(mov.Fuente) || this.fuentesSelected.length == 0 || this.fuentesSelected.length == this.fuentes.length){
                lista.push(mov)
              }
            }
          }
        }
      })
      this.movimientos = lista
    },
    // VALIDATE FORM
    validate () {
      if(this.$refs.form.validate()){
        this.sendNewMov()
      }
      else {
        this.resetForm()
      }
    },
    validateEdit () {
      if(this.$refs.form.validate()){
        this.sendEditMov()
        this.resetForm()
      }
    },
    // RESET FORM
    resetForm(){
      var date = new Date();
      const yyyy = date.getFullYear();
      let mm = date.getMonth() + 1; // Months start at 0!
      let dd = date.getDate()+1;

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      this.fecha = yyyy + '-' + mm + '-' + dd;
      this.tipoMovimiento = ''
      this.monto = ''
      this.fuente = ''
      this.motivo = ''
    },    
    // CREATE
    async sendNewMov (){      
      var nuevoMovimiento = {
        "ID_Movimiento": 0,
        "ID_Fuente": this.fuente,
        "ID_TipoMovimiento": this.tipoMovimiento,
        "Fecha": this.fecha+'T00:00:00.007Z',
        "Motivo": this.motivo,
        "Monto": this.monto,
      }      
      await axios.post(ENDPOINT_PATH+'/api/Movimiento/Create',nuevoMovimiento).then((res) => {
        var data = res.data;
        if (data.codigo == 200 && data.item != null) {
          this.snackbarColor = "success"
          this.snackbarIcon = "mdi-check"
          this.snackbarText = "Movimiento creado exitosamente"  
          this.snackbar = true
          this.editedItem = {
            ID_Movimiento: res.data.item,
            Motivo: this.motivo,
            Monto: this.monto,
            Fecha: this.fecha,
            Fuente: getFuente(this.fuente).Nombre,
            TipoMovimiento: getTipoMovimiento(this.tipoMovimiento).Nombre,
            ID_Fuente: this.fuente,
            ID_TipoMovimiento: this.tipoMovimiento,
          }  
          itemsRespaldo.push(this.editedItem)
          this.movimientos = itemsRespaldo;       
          this.filtrar()
          this.$store.commit('SHOW_NOTIFICATION',{text: "Movimiento creado exitosamente",icon: "mdi-check",color: "success", show: true})
        }
        else {
          this.$store.commit('SHOW_NOTIFICATION',{text: "Ha ocurrido un error",icon: "mdi-close",color: "error", show: true})
        }
      });              
      this.resetForm()
      this.close()   
    },
    close () {
      this.dialogMovimientos = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
    })},
    // EDIT
    async sendEditMov (){  
      var editMovimiento = {
        "ID_Movimiento": this.editedItem.ID_Movimiento,
        "ID_Fuente": this.fuente,
        "ID_TipoMovimiento": this.tipoMovimiento,
        "Fecha": this.fecha,
        "Motivo": this.motivo,
        "Monto": this.monto,
      }      
      await axios.put(ENDPOINT_PATH+'/api/Movimiento/Edit',editMovimiento).then((res) => {
        var data = res.data;
        if (data.codigo == 200) {
          this.$store.commit('SHOW_NOTIFICATION',{text: "Movimiento editado exitosamente",icon: "mdi-check",color: "success", show: true})
          this.editedItem = {
            ID_Movimiento: editMovimiento.ID_Movimiento,
            Motivo: this.motivo,
            Monto: this.monto,
            Fecha: this.fecha,
            Fuente: getFuente(this.fuente).Nombre,
            TipoMovimiento: getTipoMovimiento(this.tipoMovimiento).Nombre,
            ID_Fuente: this.fuente,
            ID_TipoMovimiento: this.tipoMovimiento,
          }            
          var index = findRespaldoID(editMovimiento.ID_Movimiento);
          itemsRespaldo.splice(index,1)
          itemsRespaldo.push(this.editedItem)
          this.movimientos = itemsRespaldo;
          //Object.assign(this.itemsRespaldo[index], this.editedItem)
          this.filtrar()
        }
        else {
          this.$store.commit('SHOW_NOTIFICATION',{text: "Ha ocurrido un error",icon: "mdi-close",color: "error", show: true})
        }
      }); 
      this.resetForm()      
      this.closeEdit()               
    },
    editItem (item) {      
      this.editedIndex = this.movimientos.indexOf(item)      
      this.editedItem = Object.assign({}, item)
      this.fecha = item.Fecha
      this.tipoMovimiento = item.ID_TipoMovimiento
      this.fuente = item.ID_Fuente
      this.monto = item.Monto
      this.motivo = item.Motivo
      this.dialogEdit = true
    },
    closeEdit () {
      this.dialogEdit = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    // DELETE
    deleteItem (item) {   // Desplegar Dialog DELETE   
      this.editedIndex = this.movimientos.indexOf(item)
      this.itemToDelete  = this.movimientos[this.editedIndex]
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () { // Cuando se confirma la eliminaci[on]
      var movEliminado = this.movimientos[this.editedIndex]      
      axios.delete(ENDPOINT_PATH+'/api/Movimiento/Delete?ID_Movimiento='+movEliminado.ID_Movimiento).then((res) => {
        //var data = res.data; 
        itemsRespaldo.splice(findRespaldoID(movEliminado.ID_Movimiento),1)
        this.movimientos = itemsRespaldo;
        this.$store.commit('SHOW_NOTIFICATION',{text: "Movimiento eliminado exitosamente",icon: "mdi-check",color: "success", show: true})
      }).catch((error) => {
        this.$store.commit('SHOW_NOTIFICATION',{text: "Ha ocurrido un error",icon: "mdi-close",color: "error", show: true})
      });       
      this.closeDelete()
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
    })},
    // FILTRAR
    resetFilter (){
      this.fuentesSelected = []
      this.tiposMovimientosSelected = []
      this.mesesSelected = []
      this.yearsSelected = [] 
      this.movimientos = itemsRespaldo;
    }
  },
}
</script>