<template>
  <div class="screen">
    <div class="tab-container">
      <tab 
        v-model="statusIndex" 
        prevent-default 
        @on-before-index-change="handleChangeTabIndex"
        class="status-tab"
        custom-bar-width="60px"
      >
        <tab-item selected>全部</tab-item>
        <tab-item>未完成</tab-item>
        <tab-item>已完成</tab-item>
      </tab>
    </div>
    <load-more v-if="querying" tip="查询中..."></load-more>
    <scroller 
      ref="scroller"
      height="-106"
      lock-x 
      class="pl16 pr16 pt16 pb0" 
      v-else-if="!querying && page.records.length > 0"
    >
      <div class="pb8">
        <card class="pt24 pl48 pr24 pb16 card mb24" v-for="item in status" :key="item.id">
          <div class="card-content" slot="content">
            <timeline class="pt0 pl32 pr0 pb0">
              <timeline-item 
                v-for="(sub, index) in item.statusList" 
                :key="sub.id"
              >
                <h4 :class="index==0?'recent':''">{{transformStatus(sub.repairStatus)}}</h4>
                <p :class="index==0?'status-time recent lh23':'status-time lh23'" v-html="transformTime(sub.repairTime)"></p>
                <p :class="index==0?'recent lh23':'lh23'">[地点] {{item.address}}，{{item.content}}</p>
              </timeline-item>
            </timeline>
          </div>
        </card>
      </div>   
    </scroller>
    <div v-else class="no-result"><img src="../../assets/nc.png" width="128" height="128"><span>暂无内容</span></div>
  </div>
</template>

<script>
  import { 
    Scroller, 
    Tab, 
    TabItem,
    LoadMore,
    Timeline,
    TimelineItem,
    Card
  } from 'vux';
  import { mapState, mapActions, mapMutations } from 'vuex';
  import { getLoadings } from '@tw666/vuex-loading';
  import { CLEAR_REPAIR_PAGE } from '@/store/mutationsType';
  export default {
    components: { 
      LoadMore,
      Scroller,
      Timeline,
      TimelineItem,
      Tab,
      Card,
      TabItem
    },
    data() {
      return {
        searchValue: {
          flag: '',
          current: 1,
          size: 30
        },
        statusIndex: 0
      }
    },
    computed: {
      ...getLoadings(loading => ({
        querying: loading.action('repair/getRepair')
      })),
      ...mapState({
        route: state => state.route
      }),
      ...mapState('repair', ['page']),
      status() {
        return this.page.records.map(r => {
          const statusList = r.statusList.reverse();
          return {
            ...r,
            statusList
          }
        })
      }
    },
    methods: {
      ...mapActions('repair', ['getRepair']),
      handleChangeTabIndex(index) {
        const statusList = ['', 0, 1];
        Object.assign(this.searchValue, {flag: statusList[index]});
        this.getRepairOnInit(() => {
          this.statusIndex = index
        })
      },
      transformStatus(status) {
        const statusMap = {
          'GET': '已接受',
          'SEND': '已派工',
          'DONE': '已完成'
        };
        return `${statusMap[status]}`
      },
      transformTime(time) {
        const _time = time.substring(5).substring(0,11);
        const timeSplit = _time.split(' ').join('<br/>');
        
        return `<span class="status-time-badge">${timeSplit}</span>`
      },
      getRepairOnInit(success) {
        const { query:{tel} } = this.route
        const params = {
          ...this.searchValue,
          tel
        }
        this.getRepair({
          params,
          success
        })
      }
    },
    activated() {
      const { from: { path } } = this.route;
      if(path == '/fix') {
        Object.assign(this.searchValue, {status: ''});
        this.statusIndex = 0;
        this.getRepairOnInit();
      }
    },
    mounted() {
      this.getRepairOnInit();
    }
    
  }
</script>

<style lang="scss" scoped>
.card{
  box-shadow: 1px 1px 4px rgba(0,0,0,.05);
  border-radius: 4px;
}

.card-label {
  font-weight: 400;
  font-size: 17px;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  word-wrap: break-word;
  word-break: break-all;
}
.card-value {
  color: #999999;
  font-size: 14px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.screen {
  overflow:hidden;
}
.tab-container {
  height: 44px;
}
.status-tab {
  //box-shadow: 0 1px 5px rgba(0,0,0,.12);
  font-size: 14px;
  /* width: 100%;
  position: fixed;
  top: 46px;
  left: 0;
  z-index: 500;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0); */
}
.status-preview {
  border-radius: 4px;
}
.status-link {
  display:block;
  -webkit-tap-highlight-color: rgba(0, 0, 0, .12);
}
.sticky-static-fixed {
  
}
.progress {
  text-align:left;
  float:right;
  line-height: 1.5;
  .vux-timeline {

  }
}
.recent {
  color: #595959
}
.status-time {
  position:relative;
}
.lh23 {
  line-height:1.4;
}
</style>
