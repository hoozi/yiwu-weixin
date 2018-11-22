<template>
  <div class="screen">
    <search
      placeholder="请输入联系电话"
      top="46px"
      ref="search"
      v-model="searchTel"
      @on-submit="handleSearchSubmit"
      :auto-fixed="false"
    ></search> 
    <div class="p8">
      <x-button type="warn" @click.native="handleOpenFixPopup">报修</x-button>
    </div>
    <div v-transfer-dom>
      <popup v-model="addFixVisible" position="bottom" should-scroll-top-on-show>
        <group>
          <!-- <cell title="上报时间" :value="now"></cell> -->
          <x-input v-model="submitValue.repairMan" placeholder="请输入">
            <div slot="label" class="label mr12">报修人<span class="required">*</span></div>
          </x-input>
          <x-input v-model="submitValue.tel" ref="tel" placeholder="请输入" keyboard="number">
            <div slot="label" class="label mr12">联系电话<span class="required">*</span></div>
          </x-input>
          <x-input v-model="submitValue.address" ref="address" placeholder="请输入">
            <div slot="label" class="label mr12">设备地点<span class="required">*</span></div>
          </x-input>
          <x-textarea v-model="submitValue.content" ref="content" placeholder="请输入" :autosize="true" :show-counter="false" :rows="3">
            <div slot="label" class="label mr12">报修内容<span class="required">*</span></div>
          </x-textarea>
        </group>
        <div class="p8">
          <x-button 
            type="primary" 
            @click.native="handleAddRepair" 
            :show-loading="submitting" 
            class="wfull">提交</x-button>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import { 
    dateFormat,
    Cell,
    Popup, 
    Group,  
    XInput, 
    XTextarea, 
    XButton, 
    TransferDom, 
    Search
  } from 'vux';
  import { mapActions } from 'vuex';
  import { getLoadings } from '@tw666/vuex-loading';
  export default {
    directives: { TransferDom },
    components: { 
      Cell,
      Search, 
      Popup, 
      Group, 
      XInput, 
      XTextarea, 
      XButton,
    },
    data() {
      return {
        addFixVisible: false,
        submitValue: {
          repairMan: '',
          tel: '',
          address: '',
          content: ''
        },
        searchTel: ''
      }
    },
    computed: {
      ...getLoadings(loading => ({
        submitting: loading.action('repair/addRepair')
      })),
      now() {
        return dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
      }
    },
    methods: {
      ...mapActions('repair', ['addRepair']),
      handleChangeFixPopup(flag) {
        this.addFixVisible = !!flag
      },
      handleOpenFixPopup() {
        this.handleChangeFixPopup(true)
      },
      handleAddRepair() {
        const { tel, address, content, repairMan } = this.submitValue;
        if(!tel || !address || !content || !repairMan) {
          return this.$vux.toast.show({
            type: 'text',
            text: '信息不完整'
          })
        }
        this.$refs.search.setBlur();
        this.addRepair({
          params: {
            ...this.submitValue,
            time: dateFormat(Date.now(), 'YYYY-MM-DD hh:mm:ss')
          },
          success: () => {
            this.$vux.toast.show({
              type: 'text',
              text: '添加成功'
            });
            this.handleChangeFixPopup(false);
          }
        })
      },
      handleSearchSubmit() {
        if(!this.searchTel) {
          return this.$vux.toast.show({
            type: 'text',
            text: '联系电话必填'
          })
        }
        this.$router.push({
          path: '/fix-result',
          query: { tel: this.searchTel }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.label {
  width: 80px;
}
.required {
  color:red;
}
</style>
