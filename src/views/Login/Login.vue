<template>
    <div class="fondo-login">    
      <div class="div-principal-login">     
        <v-card>
        <v-card-text class="mt-4 px-10">
            <v-form ref="form" lazy-validation>                               
                <center>
                    <span class="text-h5 titulo-login" >Iniciar Sesión</span>
                    <v-icon size="150">mdi-account-circle</v-icon> 
                    <h4>Ingrese sus credenciales</h4>
                </center> 
                <v-row>
                    <v-col class="col-md-12">
                        <v-text-field v-model="user" :counter="100" :rules="[v => !! v || 'Este campo es requerido']" label="Usuario o Correo" required></v-text-field> 
                    </v-col>
                    <v-col class="col-md-12">
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
                </v-row>
                <a>¿Ha olvidado su contraseña?</a>
            </v-form>
            </v-card-text>
            <v-card-actions class="mt-5 pt-5 acciones">
                <v-btn depressed color="primary" text @click="validate">Iniciar Sesión</v-btn>
                <v-btn color="primary" text @click="registrarse()">Registrarse</v-btn>
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
</template>
<script>
// DOMINIO API
import Store from '../../store'
import auth from '@/services/auth';
import axios from 'axios';
//import Auth from '@/services/auth'
var ENDPOINT_PATH = Store.state.ENDPOINT_PATH
// Librerias
import router from '@/router';
// Componentes

// Variables
// Peticiones
export default {
    props: {

    },
    data () {
        return {  
            user: '',
            password: '', 
            show1: false,
            rulesPassword: {
            required: value => !!value || 'Este campo es requerido.',
            min: v => v.length >= 4 || 'Mínimo] 4 caracteres',
            max: v => v.length <= 8 || 'Máximo 8 caracteres',
            emailMatch: () => (`The email and password you entered don't match`),
            },     
        }
    },
    created () {
        this.$store.commit("UPDATE_POSITION_LOGIN")
    },
    destroyed () {
        this.$store.commit("UPDATE_POSITION_LOGIN")
    },
    methods: {
        validate () {
            if(this.$refs.form.validate()){
                this.login()
            }
        },
        login () {
            var user = {
                "Nombre" : this.user,
                "Correo" : "",
                "ID_Rol" : 0,
                "ID_Usuario" : 0,
                "Password" : this.password
            }
            auth.login(user)
        },
        registrarse(){
            router.push({path: '/register'})
        }
    },
    computed: {

    },
    components: {
    }
}
</script>
<style>
.acciones {
    justify-content: center;
}
.fondo-login {
    background-color: #D7D6D7;
    background-size: 100%;
    background-image: url("../../assets/fondo.jpg");
    height: 100% !important;
    padding-top: 5%;
}
.titulo-login {
    margin: auto;
}
.div-principal-login {
    width: 320px; 
    margin: auto; 
    
    background-color: white !important;
    border-radius: 5px;
    align-items: center !important;
}
.div-secundario {
    margin: 5%; 
    padding-top: 3%; 
    padding-bottom: 5%;
}
</style>