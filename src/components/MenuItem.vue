<template>
  <div class="menu-item" :class="{ opened: expanded }" @click="menuActionClick(url)">
    <div class="label" @click="toggleMenu()" :style="{ paddingLeft: depth * 20 + 20 + 'px' }">
      <div class="left">
        <v-icon v-if="icon" class="material-icons-outlined">{{ icon }}</v-icon>
        <span v-if="showLabel">{{ label }}</span>
      </div>
      <div v-if="data && data.length > 0" class="right">
        <v-icon class="expand" :class="{ opened: expanded }">mdi-chevron-down</v-icon>
        
      </div>
    </div>
    <div v-show="showChildren" :class="{ 'small-menu': smallMenu }" class="items-container" :style="{ height: containerHeight }" ref="container">
      <menu-item
        :class="{ opened: showChildren }"
        v-for="(item, index) in data"
        :key="index"
        :data="item.children"
        :label="item.label"
        :icon="item.icon"
        :depth="depth + 1"
        :url="item.url"
        :smallMenu="smallMenu"
      />
    </div>
  </div>
</template>

<script>
import router from '../router'
export default {
  name: "menu-item",
  data: () => ({
    showChildren: false,
    expanded: false,
    containerHeight: 0,
  }),
  props: {
    data: {
      type: Array,
    },
    label: {
      type: String,
    },
    icon: {
      type: String,
    },
    url: {
      type: String,
    },
    depth: {
      type: Number,
    },
    smallMenu: {
      type: Boolean,
    },
  },
  computed: {
    showLabel() {
      return this.smallMenu ? this.depth > 0 : true;
    }
  },
  methods: {
    menuActionClick(url) {
      if (url != '' && router.currentRoute.path != url) {
        router.push({ path: url})        
      }       
    },
    toggleMenu() {
      this.expanded = !this.expanded;
      if (!this.showChildren) {
        this.showChildren = true;
        this.$nextTick(() => {
          this.containerHeight = this.$refs["container"].scrollHeight + "px";
          setTimeout(() => {
            this.containerHeight = "fit-content";
            if(navigator.userAgent.indexOf("Firefox") != -1) 
              this.containerHeight = "-moz-max-content"
            this.$refs["container"].style.overflow = "visible";
          }, 300);
        });
      } else {
        this.containerHeight = this.$refs["container"].scrollHeight + "px";
        this.$refs["container"].style.overflow = "hidden";
        setTimeout(() => {
          this.containerHeight = 0 + "px";
        }, 10);
        setTimeout(() => {
          this.showChildren = false;
        }, 300);
      }
    },

  },
};
</script>

<style lang="scss" scoped>
.menu-item {
  position: relative;
  width: 100%;
  .label {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    white-space: nowrap;
    user-select: none;
    height: 50px;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 14px;
    color: #cacaca;
    transition: all 0.3s ease;
    > div {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    i {
      font-size: 20px;
      color: #cacaca;
      transition: all 0.3s ease;
      &.expand {
        font-size: 16px;
        color: #cacaca;
        &.opened {
          transform: rotate(180deg);
        }
      }
    }
    &.small-item {
      width: fit-content;
    }
    &:hover {
      background: #deedff;
      color: #263238;
      cursor: pointer;
      i {
        color: #263238;
      }
    }
  }
  .items-container {
    width: 100%;
    left: calc(100% + 6px);
    transition: height 0.3s ease;
    overflow: hidden;
    &.small-menu {
      width: fit-content;
      position: absolute;
      background: #fff;
      box-shadow: 0 0 10px #ebebeb;
      top: 0;
      .label {
        width: 100% !important;
        padding-left: 20px !important;
      }
    }
  }
}
</style>
