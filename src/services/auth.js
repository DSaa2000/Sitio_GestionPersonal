import axios from "axios";
import Cookies from "js-cookie";
import Store from '@/store'
import router from "@/router";
const ENDPOINT_PATH = Store.state.ENDPOINT_PATH;

export default {
  // COOKIE
  setUserLogged(userLogged) {
    Cookies.set("userLogged", userLogged);
  },
  getUserLogged() {
    Cookies.get("userLogged")
    //Store.commit("LOGIN",cookie)
  },
  register(user) {
    axios.post(ENDPOINT_PATH+'/api/Usuario/Create_Perfil',user).then((res) => {
      var data = res.data;
      if (data.codigo == 200){
          Store.commit("UPDATE_USUARIOS",[])
          router.push("/administracion/usuarios/list")
          Store.commit('SHOW_NOTIFICATION',{text: "Usuario registrado exitosamente",icon: "mdi-check",color: "success", show: true})
      }
      else {
          Store.commit('SHOW_NOTIFICATION',{text: "Ha ocurrido un error",icon: "mdi-close",color: "error", show: true})
      }
    }).catch((error) => {
        Store.commit('SHOW_NOTIFICATION',{text: "Ha ocurrido un error",icon: "mdi-close",color: "error", show: true})
    })
  }, 
  login(user) {
    axios.post(ENDPOINT_PATH+'/api/Usuario/Login',user).then((res) => {
        var data = res.data;
        if (data.codigo == 200 && data.status) {
            var user = {
                status: true,
                user: data.item.usuario,
                rol: data.item.rol.rolUsuario,
                permisos: data.item.rol.permisos
            };
            this.setUserLogged(user)
            Store.commit("LOGIN",user)
            Store.commit('SHOW_NOTIFICATION',{text: "Sesión Iniciada",icon: "mdi-check",color: "success", show: true})                  
            Store.commit('UPDATE_MENU',user.rol.iD_Rol)
            router.push({path: '/home'})
        }
        else  Store.commit('SHOW_NOTIFICATION',{text: "Credenciales Inválidas, inténtelo de nuevo",icon: "mdi-comment-text",color: "warning", show: true})
    }).catch((error) => {
        Store.commit('SHOW_NOTIFICATION',{text: "Ha ocurrido un error",icon: "mdi-close",color: "error", show: true})
    })
  },
  logout () {    
    Cookies.remove('userLogged');
    Store.commit("UPDATE_MENU",8) // Cargar nuevamente el menu de usuario comun
    Store.commit("LOGOUT")        
    router.push({path: "/login"})
  }
};