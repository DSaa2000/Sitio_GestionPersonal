<template>
    <div class="fondo">    
      <Breadcrumbs :breadcrumbsList="breadcrumbsList" Titulo="Generar QR"></Breadcrumbs>
      <div class="div-principal-qr">      
        <div class="div-secundario-qr" id="downloadQR"> 
            <v-row>
                <v-col class="col-md-12">
                    <center>
                        Generar Código QR
                    </center>
                    <v-text-field  type="text" v-model="textToQR"  :rules="[v => !! v || 'Este campo es requerido']" label="Texto a generar en QR" required></v-text-field> 
                </v-col>                 
            </v-row>
            <v-row>
                <v-spacer></v-spacer>
                <vue-qr :text="textToQR" :dotScale="0.5" :size="200" :logoSrc="logoSrc"  :logoMargin="0"></vue-qr>
                <v-spacer></v-spacer>
                <vue-qr :text="textToQR" :dotScale="1" :size="200"></vue-qr>
                <v-spacer></v-spacer>
            </v-row>
            <v-row>
                <v-spacer></v-spacer>
                <v-btn color="warning" @click="generateReport()">
                    <v-icon class="mr-2">mdi-file-download</v-icon>
                    Descargar
                </v-btn>
                <v-spacer></v-spacer>
            </v-row>
            
            
        </div>
      </div>
    </div>
  </template>
  <script>
  // DOCUMENTACION
  // https://www.npmjs.com/package/vue-qr
  // DOMINIO API
  import Store from '../../store'
  var ENDPOINT_PATH = Store.state.ENDPOINT_PATH
  // Librerias
  import html2pdf from "html2pdf.js";
  // Componentes
  import Breadcrumbs from '@/components/Breadcrumbs.vue';
  import VueQr from 'vue-qr'
  // Imagenes
  import bgSrc from '@/assets/bg1.png'
  import logoSrc from '@/assets/logo.png'
  // Variables 
  
  // Peticiones
  
  // Funciones 
  
  export default {
    props: {
    
    },
    data () {
      return {  
        bgSrc: bgSrc,
        logoSrc: logoSrc,
        textToQR: 'diego',    
        breadcrumbsList: [
          { text: 'Home', disabled: false, href: '/home' },
          { text: 'Generar QR', disabled: true, href: '' },
        ],      
      }
    },
    methods: {
        generateReport () {
          html2pdf(document.getElementById('downloadQR'));
        
        }
    },
    computed: {
  
    },
    components: {
      Breadcrumbs,
      VueQr,
    }
  }
  </script>
  <style>
  .fondo {
    background-color: #D7D6D7;
  }
  .div-principal-qr {
    width: 500px;
    margin: auto; 
    background-color: white !important;
    border-radius: 5px;
  }
  .div-secundario-qr {
    margin: 5%; 
    padding-top: 3%; 
    padding-bottom: 5%;
  }
  </style>