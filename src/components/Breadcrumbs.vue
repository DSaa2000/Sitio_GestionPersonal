<template>
    <v-card style="padding-left:5%; border-radius: 0; margin-top: 0px;">
        <v-toolbar-title class="pt-5">{{Titulo}}</v-toolbar-title>
        <v-breadcrumbs :items="breadcrumbsList" class="pt-2 pb-2 pl-0 mt-5" >
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs> 
      </v-card> 
</template>
<script>
import Store from '@/store';
export default {
  name: 'App',
  components: {
  },
  data () {
    return {      
      /* breadcrumbsList: [
        { text: 'Home', disabled: false, href: '/home' },
        { text: 'Movimientos', disabled: true, href: '/movimientos' },
      ],  */  
    }
  },
  props: {
    breadcrumbsList: {
      type: Array
    },
    Titulo: {
      type: String
    }
  },
  methods: {
  },
  computed: {
  },
};
</script>
