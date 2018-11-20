<template>
  <div class="layout">
    <x-header 
      :title="pageName"
      :left-options="leftOptions"
      v-bind="$attrs"
    >
      <div class="header-right" slot="right">
        <slot name="right"></slot>
      </div>
    </x-header>
    <div class="layout-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux'

  export default {
    components: {
      XHeader
    },
    data: () => {
      return {
        pageName: '',
        leftOptions: {
          showBack: false
        }
      }
    },
    mounted(){
      const { meta } = this.$route; 
      Object.assign(this, meta);
    }
  }
</script>

<style lang="scss" scoped>
$perfix: layout;
.#{$perfix} {
  margin: 0;
  padding: 0;
  position: absolute;
  top:0;
  bottom:0;
  left: 0;
  right: 0;
}
.vux-header {
  //background-color: #428bca;
  .header-right {
    color: #fff;
    font-size:16px;
  }
}
</style>
