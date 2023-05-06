<template>
  <v-navigation-drawer app class="menu"  :mini-variant.sync="smallMenu" permanent >
    <v-app-bar-nav-icon  @click="smallMenu = !smallMenu" class="v-toolbar" elevation="0" style="margin: 15px auto  auto auto !important; margin-top: 5px !important;" color="white"></v-app-bar-nav-icon>
    <MenuItem
      v-for="(item, index) in this.$store.state.ITEMS_MENU"
      :key="index"
      :data="item.children"
      :label="item.label"
      :icon="item.icon"
      :depth="0"
      :smallMenu="smallMenu"
      :url="item.url"
    />
    
  </v-navigation-drawer>
</template>

<script>
import Store from '../store'
import MenuItem from './MenuItem.vue';

export default {
  name: 'recursive-menu',
  data: () => ({
    smallMenu: false,
  }),
  components: {
    MenuItem
  },
  props: {
  },
}
</script>

<style lang="scss" scoped>
.menu {
  i {
    display: flex !important;
    justify-content: center !important;
  }
  position: fixed;
  height: 100vh;
  width: 240px;
  left: 0;
  background-color: #263238;
  top: 0;
  border-right: 1px solid #ececec;
  transition: all .3s ease;
  overflow: auto;  
  
  &.small-menu {
    overflow: inherit;
    width: 60px;
    padding-top: 50px;
    i {
      left: 20px;
    }
  }
}
</style>