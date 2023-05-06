<template>
  <div class="fondo">    
      <Breadcrumbs :breadcrumbsList="breadcrumbsList" Titulo="Dashboard"></Breadcrumbs>
      <div class="div-principal">
        <v-row>
        <v-col class="col-md-12">
          <GChart type="ColumnChart" :data="chartData1" :options="chartOptions1"/>
        </v-col>        
      </v-row>
      <v-row>
        <v-col class="col-md-4">
          <GChart type="ColumnChart" :data="chartData2" :options="chartOptions2"/>
        </v-col>
        <v-col class="col-md-4">
          <GChart type="PieChart" :data="chartData2" :options="chartOptions2"/>
        </v-col>
        <v-col class="col-md-4">
          <GChart type="AreaChart" :data="chartData2" :options="chartOptions2"/>
        </v-col>
      </v-row>
    </div>
  </div>      
</template>
<style>
.fondo {
    background-color: #D7D6D7;
}
.div-principal {
    margin: 5%; 
    background-color: white;
}
.div-secundario {
    margin: 5%; 
    padding-top: 3%; 
    padding-bottom: 5%;
}
</style>
<script>
// DOMINIO API
import Store from '../../store'
var ENDPOINT_PATH = Store.state.ENDPOINT_PATH
// Librerias
import axios from 'axios'
// Componentes
import { GChart } from 'vue-google-charts/legacy';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
// Variables
var items = []
var headersChart1 = []
var dataChart1 = []
var headersChart2 = []
var dataChart2 = []
var mesesOL = []
// Funciones
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
function getHexColor(){
  var h = '#'
  var cont = 0
  while (cont < 6){
    var r = getRandomInt(0,15)
    if (r < 9) h += r;
    else {
      if (r == 10) h += 'a';
      else if (r == 11) h += 'b';
      else if (r == 12) h += 'c';
      else if (r == 13) h += 'd';
      else if (r == 14) h += 'e';
      else if (r == 15) h += 'f';
    }
    cont++;
  }
  return h
}
async function  cargarDatosDashboard(){
  items = []
  headersChart1 = []
  dataChart1 = []
  headersChart2 = []
  dataChart2 = []
  mesesOL = []
  await axios.get(ENDPOINT_PATH+'/api/Mes/List').then((res) => {
    var data = res.data;
    data.forEach((item) => {
      mesesOL.push({
        ID_Mes : item.iD_Mes,
        Nombre : item.nombre
      })
      headersChart1.push(item.nombre) 
    })  
    dataChart1.push(['Mes','Ingreso','Gasto']);
    axios.get(ENDPOINT_PATH+'/api/Movimiento/ListSP').then((res) => {
      var itemsMov = []
      var data = res.data;
      data.forEach((item) => { 
        itemsMov.push({
          tipoMovimiento: item.tipoMovimiento.nombre,
          fecha: item.movimientoDB.fecha,
          monto: item.movimientoDB.monto,
        })
      });
      var cont = 1
      headersChart1.forEach((m) => { // Por cada mes
        var lista = []
        lista.push(m)
        var ingresoSum = 0
        var gastoSum = 0
        itemsMov.forEach((mov) => {
          var date = new Date(mov.fecha);
          const yyyy = date.getFullYear();
          let mm = 1*date.getMonth() + 1; // Months start at 0!        
          if (mov.tipoMovimiento == 'Ingreso' && mm == cont){
            ingresoSum += mov.monto
          }
          else if (mov.tipoMovimiento == 'Gasto' && mm == cont){
            gastoSum += mov.monto
          }        
        })
        lista.push(ingresoSum)
        lista.push(-1*gastoSum)
        cont++
        //lista.push(getHexColor())
        dataChart1.push(lista)
      });
    });
  });
  await axios.get(ENDPOINT_PATH+'/api/TipoMovimiento/List').then((res) => {
    var data = res.data;  
    data.forEach((item) => {
      headersChart2.push(item.nombre)    
    })  
    //dataChart.push(['Tipo de Movimiento','Monto Total',{ role: 'style' }]);
    dataChart2.push(['Tipo de Movimiento','Monto Total']);
    axios.get(ENDPOINT_PATH+'/api/Movimiento/ListSP').then((res) => {
      var data = res.data;    
      data.forEach((item) => { 
        items.push({
          tipoMovimiento: item.tipoMovimiento.nombre,
          monto: item.movimientoDB.monto,
        })
      });
      headersChart2.forEach((tm) => {
        var lista = []
        var sumaMonto = 0
        lista.push(tm)
        items.forEach((mov) => {
          if (mov.tipoMovimiento == tm){
            sumaMonto += mov.monto
          }
        });
        lista.push(sumaMonto)
        //lista.push(getHexColor())
        dataChart2.push(lista)
      });
    });
  });
}
cargarDatosDashboard()
export default {  
  name: 'Dashboard',
  components: {
    GChart,
    Breadcrumbs
  },
  created () {
    // Peticiones
    
  },
  data () {
    return {
      breadcrumbsList: [
        { text: 'Home', disabled: false, href: '/home' },
        { text: 'Dashboard', disabled: true, href: '/dashboard' },
      ], 
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData1: dataChart1,
      chartOptions1: {
        title: 'Ingreso Vs Gastos por Mes',
        chartArea: { width: '70%' },
        vAxis: {
          title: 'Monto Total',
          minValue: 0,
        },
        hAxis: {
          title: 'Meses',
          minValue: 0,
        },
        ///width: 800,
        height: 300,
      },
      chartData2: dataChart2,
      chartOptions2: {
        title: 'Ingreso vs Gastos',
        chartArea: { width: '50%' },
        vAxis: {
          title: 'Monto Total',
          minValue: 0,
        },
        hAxis: {
          title: 'Tipo de Movimiento',
          minValue: 0,
        },
        ///width: 800,
        height: 300,
      }
    }
  },
  methods:{
    async recargar(){
        items = []
        headersChart1 = []
        dataChart1 = []
        headersChart2 = []
        dataChart2 = []
        mesesOL = []
        await axios.get(ENDPOINT_PATH+'/api/Mes/List').then((res) => {
          var data = res.data;
          data.forEach((item) => {
            mesesOL.push({
              ID_Mes : item.iD_Mes,
              Nombre : item.nombre
            })
            headersChart1.push(item.nombre) 
          })  
          dataChart1.push(['Mes','Ingreso','Gasto']);
          axios.get(ENDPOINT_PATH+'/api/Movimiento/ListSP').then((res) => {
            var itemsMov = []
            var data = res.data;
            data.forEach((item) => { 
              itemsMov.push({
                tipoMovimiento: item.tipoMovimiento.nombre,
                fecha: item.movimientoDB.fecha,
                monto: item.movimientoDB.monto,
              })
            });
            var cont = 1
            headersChart1.forEach((m) => { // Por cada mes
              var lista = []
              lista.push(m)
              var ingresoSum = 0
              var gastoSum = 0
              itemsMov.forEach((mov) => {
                var date = new Date(mov.fecha);
                const yyyy = date.getFullYear();
                let mm = 1*date.getMonth() + 1; // Months start at 0!        
                if (mov.tipoMovimiento == 'Ingreso' && mm == cont){
                  ingresoSum += mov.monto
                }
                else if (mov.tipoMovimiento == 'Gasto' && mm == cont){
                  gastoSum += mov.monto
                }        
              })
              lista.push(ingresoSum)
              lista.push(-1*gastoSum)
              cont++
              //lista.push(getHexColor())
              dataChart1.push(lista)
            });
          });
        });
        await axios.get(ENDPOINT_PATH+'/api/TipoMovimiento/List').then((res) => {
          var data = res.data;  
          data.forEach((item) => {
            headersChart2.push(item.nombre)    
          })  
          //dataChart.push(['Tipo de Movimiento','Monto Total',{ role: 'style' }]);
          dataChart2.push(['Tipo de Movimiento','Monto Total']);
          axios.get('https://localhost:7098/api/Movimiento/ListSP').then((res) => {
            var data = res.data;    
            data.forEach((item) => { 
              items.push({
                tipoMovimiento: item.tipoMovimiento.nombre,
                monto: item.movimientoDB.monto,
              })
            });
            headersChart2.forEach((tm) => {
              var lista = []
              var sumaMonto = 0
              lista.push(tm)
              items.forEach((mov) => {
                if (mov.tipoMovimiento == tm){
                  sumaMonto += mov.monto
                }
              });
              lista.push(sumaMonto)
              //lista.push(getHexColor())
              dataChart2.push(lista)
            });
          });
        });
      }
  }
  
}
</script>