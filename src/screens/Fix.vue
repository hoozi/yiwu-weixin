<template>
  <PageLayout>
    <i class="iconfont icon-plus" @click="handleAdd" slot="right"></i>
    <div>
      <search
        placeholder="请输入联系方式"
        top="46px"
        ref="search"
        :auto-fixed="false"
      ></search>
      <tab 
        v-model="statusIndex" 
        prevent-default 
        @on-before-index-change="handleChangeTabIndex"
      >
        <tab-item selected>未完成</tab-item>
        <tab-item>已完成</tab-item>
      </tab>
    </div>
    <div v-transfer-dom>
      <popup v-model="addFixVisible" position="bottom" should-scroll-top-on-show>
        <Group
          label-width="72px" 
          label-margin-right="16px" 
          label-align="justify"
        >
          <x-input title="上报人" placeholder="请输入"></x-input>
          <x-input title="联系方式" placeholder="请输入"></x-input>
          <x-textarea title="详细信息" placeholder="请输入" :autosize="true" :show-counter="false" :rows="5"></x-textarea>
        </Group>
        <div class="p8">
          <x-button type="primary" class="wfull">提交</x-button>
        </div>
      </popup>
    </div>
  </PageLayout>
</template>

<script>
  import PageLayout from '@/layouts/PageLayout';
  import Vue from 'vue';
  import { 
    Popup, 
    Group, 
    Cell, 
    XInput, 
    XTextarea, 
    XButton, 
    TransferDom, 
    Search, 
    Tab, 
    TabItem,
    LoadingPlugin
  } from 'vux';
  Vue.use(LoadingPlugin);
  export default {
    directives: { TransferDom },
    components: { 
      Search,
      PageLayout, 
      Popup, 
      Group, 
      Cell, 
      XInput, 
      XTextarea, 
      XButton,
      Tab,
      TabItem
    },
    data() {
      return {
        addFixVisible: false,
        statusIndex: 0,
      }
    },
    methods: {
      handleOpenFixPopup(flag) {
        this.addFixVisible = !!flag
      },
      handleAdd() {
        this.handleOpenFixPopup(true)
      },
      handleChangeTabIndex(index) {
        this.$vux.loading.show({
          text: '加载中...'
        })
        setTimeout(() => {
          this.$vux.loading.hide()
          this.statusIndex = index
        }, 1000)
      }
    }
  }
</script>

