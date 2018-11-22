<template>
  <div class="screen">
    <div class="p16">
      <card class="status-card">
        <div class="p8" slot="content">
          <load-more v-if="querying" tip="查询中..."></load-more>
          <timeline v-else-if="!querying && statusList.length > 0">
            <timeline-item 
              v-for="(item, index) in statusList" 
              :key="item.id"
            >
              <h4 :class="index==0?'recent':''">{{transformStatus(item.repairStatus)}}</h4>
              <p :class="index==0?'recent':''">{{item.repairTime}}</p>
            </timeline-item>
          </timeline>
          <div v-else class="no-result"><img src="../../assets/nc.png" width="128" height="128"><span>暂无内容</span></div>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
  import { 
    LoadMore,
    Timeline,
    TimelineItem,
    Card
  } from 'vux';
  import { mapState, mapActions } from 'vuex';
  import { getLoadings } from '@tw666/vuex-loading';
  export default {
    name: 'FixStatus',
    components: { 
      Timeline,
      TimelineItem,
      LoadMore,
      Card
    },
    computed: {
      ...getLoadings(loading => ({
        querying: loading.action('repair/getStatusListById')
      })),
      ...mapState({
        route: state => state.route
      }),
      ...mapState('repair', ['statusList']),
    },
    methods: {
      ...mapActions('repair', ['getStatusListById']),
      getStatusOnInit(success) {
        const { query:{rid} } = this.route
        this.getStatusListById(rid)
      },
      transformStatus(status) {
        const statusMap = {
          'GET': '已接受',
          'SEND': '已派工',
          'DONE': '已完成'
        };
        return statusMap[status];
      }
    },
    mounted() {
      this.getStatusOnInit();
    }
    
  }
</script>

<style lang="scss" scoped>
.status-card {
  border-radius: 4px;
  min-height: 182px
}
.recent {
  color: #52c41a
}
</style>
