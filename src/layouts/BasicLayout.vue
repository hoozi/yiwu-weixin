<template>
  <view-box 
    class="layout"
    body-padding-top="46px"
    body-padding-bottom="0"
  >
    <x-header 
      :title="screenName"
      slot="header"
      :left-options="leftOptions"
      :right-options="rightOptions"
      :transition="headerTransition"
    >
    </x-header>
    <div class="layout-content">
      <transition
      @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
      :name="viewTransition" :css="!!direction">
        <keep-alive exclude="FixStatus">
          <router-view class="router-view" :key="route.path"></router-view>
        </keep-alive>
      </transition>
    </div>
    <div v-transfer-dom>
      <loading v-model="screenLoading"></loading>
    </div>
  </view-box>
</template>

<script>
  import { XHeader, ViewBox, TransferDom, Loading } from 'vux'
  import { mapState } from 'vuex'
  export default {
    directives: {
      TransferDom
    },
    components: {
      ViewBox,
      Loading,
      XHeader
    },
    computed: {
      ...mapState({
        direction: state => state.direction,
        screenLoading: state => state.screenLoading,
        route: state => state.route,
        meta: state => state.route.meta
      }),
      screenName() {
        const { screenName } = this.meta;
        return screenName;
      },
      leftOptions() {
        const { leftOptions } = this.meta;
        return Object.assign({showBack: false}, leftOptions)
      },
      rightOptions() {
        const { rightOptions } = this.meta;
        return Object.assign({showMore: false}, rightOptions)
      },
      viewTransition() {
        return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
      },
      headerTransition() {
        return ''//this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
      }
    }
  }
</script>

<style lang="scss" scoped>
$perfix: layout;
.#{$perfix} {
  height: 100%;
  width: 100%;
  background-color: #f0f2f5;
  .#{$perfix}-content {
    //background-color:#f0f2f5;
    width: 100%;
    height: 100%;
  }
}
.vux-header {
  width: 100%;
  position:absolute;
  left:0;
  top:0;
  z-index:100;
  .header-right {
    color: #fff;
    font-size:16px;
  }
}
.screen-container,
.router-view{
  width:100%;
  height: 100%;
  position: relative;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms ease;
  height: 100%;
  top: 46px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  position: relative;
  transform: translate3d(-100%, 0, 0);
}
</style>
