<template>
  <div class="fondo">    
    <Breadcrumbs :breadcrumbsList="breadcrumbsList" Titulo="Home"></Breadcrumbs>
    <div class="div-principal-home">      
      <v-row>
        <v-col v-for="item in this.$store.state.ITEMS_MENU"  class="col-md-4" >
          <v-card class="mx-auto col-md-3 tarjeta" max-width="100%" outlined @click="menuActionClick(item.url, item.children)">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">
                  Módulo
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  {{item.label }}
                </v-list-item-title>
              </v-list-item-content>
              <v-icon size="80" style="color: #263238;">{{item.icon}}</v-icon>
            </v-list-item>
          </v-card>
        </v-col>
        <div class="text-center">
          <v-dialog v-model="dialog" width="500">
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Submódulos
              </v-card-title>
              <v-divider></v-divider>
              <table style="margin: 5%; width: 90%;">
                  <thead style="background-color: #263238; color: white;">
                    <tr style="padding: 5px !important;">
                      <th>Submódulo</th>
                      <th>Vínculo</th>
                    </tr>
                  </thead>                
                  <tbody>
                    <tr v-for="(item) in childrenNodes" style="padding: 5px !important;">
                      <td>
                        {{ item.label }}
                      </td>
                      <td class="text-center">
                        <v-btn style="background-color: #263238; color: white;" @click="menuActionClick(item.url, item.children)">Ir</v-btn>
                      </td>
                    </tr>
                  </tbody>
                </table>        
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  Cerrar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-row>
    </div>
  </div>
</template>
<style>
.fondo {
  background-color: #D7D6D7;
}
.div-principal-home {
  margin: 5%; 
  background-color: #D7D6D7 !important;
  border-radius: 5px;
}
.div-secundario {
  margin: 5%; 
  padding-top: 3%; 
  padding-bottom: 5%;
}
.tarjeta:hover {
  cursor: pointer;  
}
</style>
<script>
// DOMINIO API
import Store from '../store'
var ENDPOINT_PATH = Store.state.ENDPOINT_PATH
// Librerias
import router from '../router'
// Componentes
import Breadcrumbs from '@/components/Breadcrumbs.vue';

export default {
  name: 'Home',
  data () {
    return {
      breadcrumbsList: [
        { text: 'Home', disabled: true, href: '/home' },
      ],
      dialog: false,
      childrenNodes: []
    }
  },
  components: {
    Breadcrumbs
  },
  methods: {
    menuActionClick(url,children) {           
      if (url != "" && url != "/home"){
        router.push({ path: url}) 
      }      
      else if (url != "/home") {
        this.childrenNodes = children
        this.dialog = true
      }
    },
  }
}
</script>