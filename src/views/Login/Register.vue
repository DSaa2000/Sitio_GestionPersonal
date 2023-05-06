<template>
    <div class="fondo-principal-register">
        <Breadcrumbs :breadcrumbsList="breadcrumbsList" Titulo="Registrar Usuario"></Breadcrumbs>        
        <div class="fondo-register">          
            <div class="div-principal-register">      
                <v-card>
                <v-card-title>         
                    <span class="text-h5 titulo-register" >Registrar Usuario</span>
                </v-card-title>
                <v-card-text class="mt-4 px-10">
                    <v-form ref="form" lazy-validation>                
                        <center>
                            <h4>Ingrese los datos del nuevo Usuario del Sistema</h4>
                        </center> 
                        <v-row>
                            <v-col class="col-md-6">
                                <v-text-field v-model="user" :counter="100" :rules="[v => !! v || 'Este campo es requerido']" label="Nombre" required></v-text-field> 
                            </v-col>
                            <v-col class="col-md-6">
                                <v-text-field v-model="correo" :counter="100" :rules="[v => !! v || 'Este campo es requerido', v => /.+@.+\..+/.test(v) || 'El correo debe ser válido',]" label="Correo Electrónico" required></v-text-field> 
                            </v-col>
                            <v-col class="col-md-6">
                                <v-text-field 
                                    label="Contraseña" 
                                    v-model="password" 
                                    :type="show1 ? 'text' : 'password'"
                                    :counter="8"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" 
                                    @click:append="show1 = !show1" 
                                    :rules="[rulesPassword.required, rulesPassword.min, rulesPassword.max]"   
                                    required>
                                </v-text-field> 
                            </v-col>
                            <v-col class="col-md-6">
                                <v-text-field 
                                    label="Confirmar Contraseña" 
                                    v-model="passwordRepeat" 
                                    :type="show1 ? 'text' : 'password'"
                                    :counter="8"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" 
                                    @click:append="show1 = !show1" 
                                    :rules="[rulesPassword.required, rulesPassword.min, rulesPassword.max, rulesPassword.emailMatch]"   
                                    required>
                                </v-text-field>                  
                            </v-col>
                            <v-col class="offset-3 col-md-6">
                                <v-select v-model="rol" item-text="Nombre" item-value="ID_Rol" :items="roles" :rules="[v => !!v || 'Este campo es requerido']"  label="Rol del Usuario" required></v-select >  
                            </v-col> 
                        </v-row>
                    </v-form>
                    </v-card-text>
                    <v-card-actions class="mt-5 pt-5 acciones">
                        <v-btn depressed color="primary" text @click="validate">Registrar Usuario</v-btn>                
                        <v-btn color="primary" text @click="loginView()">Iniciar Sesión</v-btn>
                    </v-card-actions>
                </v-card>
            </div>
            <!-- NOTIFICACION -->
            <v-dialog max-width="500px">
                <v-card class="text-center">
                    <v-card-title class="text-h5 justify-center">
                        <span class="text-h5">Notificación del Sistema</span>
                    </v-card-title>
                    
                    <v-card-text class="text-center">
                    <v-icon size="75" class="align-text" max-widht="300px" color="green">
                        mdi-checkbox-marked-circle-outline
                    </v-icon>
                </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>              
                    <v-btn color="blue darken-1" text @click="dialogEdit=false">Aceptar</v-btn>              
                    <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div> 
    </div>    
</template>
<script>
// DOMINIO API
import Store from '../../store'
var ENDPOINT_PATH = Store.state.ENDPOINT_PATH
// Librerias
import auth from '@/services/auth';
import router from '@/router';
import axios from 'axios';
// Componentes
import Breadcrumbs from '@/components/Breadcrumbs.vue';
// Variables
var rolesOT = []
// Peticiones
axios.get(ENDPOINT_PATH+'/api/RolUsuario/List').then((res) => {
  var data = res.data;
  data.forEach(i => rolesOT.push({
    ID_Rol: i.iD_Rol,
    Nombre: i.nombre
  }))
});
export default {
props: {

},
data () {
    return {  
        breadcrumbsList: [
            { text: 'Home', disabled: false, href: '/home' },
            { text: 'Administración', disabled: true, href: '' },
            { text: 'Registrar Usuario', disabled: true, href: '/register' }
        ],
        rulesPassword: {
          required: value => !!value || 'Este campo es requerido.',
          min: v => v.length >= 4 || 'Mínimo 4 caracteres',
          max: v => v.length <= 8 || 'Máximo 8 caracteres',
          emailMatch: v => v == this.password || 'Las contraseñas no coinciden',
        },
        user: '',
        password: '',
        correo: '',  
        passwordRepeat: '', 
        rol: 1,
        roles: rolesOT,
        show1: false,
        show2: false,
        // SNACKBAR
        snackbar: false,
        snackbarText: '',
        snackbarColor: 'success',
        snackbarIcon: '',
    }
},
methods: {
    validate () {
        if(this.$refs.form.validate()){
            this.register()
        }
    },
    register () {
        var user = {
            "User" : this.user,
            "Password" : this.password,
            "Email": this.correo,
            "ID_Rol": this.rol
        }
        auth.register(user)        
    },
    loginView (){
        router.push({path: '/login'})
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
.acciones {
    justify-content: center;
}
.fondo-register {
    background-color: #D7D6D7;
    background-size: 100%;
    background-image: url("../../assets/fondo2.jpeg");
    height: 100% !important;

    padding-top: 5%;
}
.fondo-principal-register {
    height: 100% !important;

}
.titulo-register {
    margin: auto;
}
.div-principal-register {
    width: 520px; 
    margin: auto; 
    background-color: white !important;
    border-radius: 5px;
}
.div-secundario-register {
    margin: 5%; 
    padding-top: 3%; 
    padding-bottom: 5%;
    height: 100%;
}
</style>