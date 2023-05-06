<template>
  <Menu v-if="isLoggedIn"></Menu>
</template>
<script>
import Menu from './Menu.vue';
//import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

export default {  
  name: 'Sidebar',
  components: {
    Menu,
  },
  data () {
    return {  
    }
  },
  props: {
  },
  methods: {
    
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.SESSION.status
    },
  },
};
</script>