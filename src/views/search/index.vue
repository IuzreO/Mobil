<template>
  <div class="skillSearch">
    <hm-nav-bar title="面试技巧" path="/shareList"></hm-nav-bar>
    <div class="search">
      <!-- 搜索框 -->
      <!-- 将搜索框的回车事件改为hotSearch -->
      <van-search
        v-model="searchValue"
        shape="round"
        placeholder="请输入搜索关键词"
        show-action
        @search="hotSearch"
        @cancel="onCancel"
      />
    </div>
    <div v-if="isShowSearch">
      <div class="words">
        <div class="hotSearch">
          <p>大家都在搜</p>
          <div class="hotWords">
            <div
              class="tag"
              v-for="(item, index) in hotList"
              :key="index"
              @click="hotSearch(item)"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <div class="historySearch">
          <p>历史搜索</p>
          <span @click="clearHistory">清空</span>
        </div>
        <div class="historyWords">
          <!-- 历史搜索调用hotSearch方法即可 -->
          <div
            class="tag"
            v-for="(item, index) in historyList"
            :key="index"
            @click="hotSearch(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <div class="vanList" v-else>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="shareList">
          <!-- 使用组件 -->
          <technicItem
            v-for="(item, index) in shareList"
            :key="index"
            :item="item"
          ></technicItem>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
// 导入封装好的面经分享列表,面经热搜接口
import { getShareTopApi, getShareApi } from '@/api/technic'
// 导入封装好的localStorage文件
import {
  getHistoryLocal,
  setHistoryLocal,
  removeHistoryLocal
} from '@/utils/local'
// 导入封装好的面试技巧页面组件
import technicItem from '../find/technicItem'
export default {
  // 注册组件
  components: {
    technicItem
  },
  data () {
    return {
      // 搜索组件中双向绑定的数据源
      searchValue: '',
      // 热搜的数据源
      hotList: [],
      // 起始页
      start: -5,
      // 页容量
      limit: 5,
      // 分项数据
      shareList: [],
      // list加载状态
      loading: false,
      // 数据源是否加载完毕
      finished: false,
      // 判断显示的是搜索还是列表
      isShowSearch: true,
      // 历史搜索数据列表
      historyList: []
    }
  },
  methods: {
    // 清空历史搜索
    clearHistory () {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确认清空'
        })
        .then(() => {
          this.historyList = []
          removeHistoryLocal()
        })
    },
    // 上拉刷新
    async onLoad () {
      this.start += this.limit
      const res = await getShareApi({
        start: this.start,
        limit: this.limit,
        q: this.searchValue
      })
      // 遍历结果,将所有的关键词赋予特殊颜色 使用replace方法替换
      res.data.data.list.forEach(item => {
        item.title = item.title.replace(
          this.searchValue,
          `<span style="color:red">${this.searchValue}</span>`
        )
      })
      this.shareList.push(...res.data.data.list)
      if (res.data.data.list.length === 0) {
        this.finished = true
      }
      this.loading = false
    },
    // 点击热词搜索
    async hotSearch (item) {
      // 赋值给搜索框
      this.searchValue = item
      // 隐藏
      this.isShowSearch = false
      // 将点击的热词赋值给histroyList
      // 从头加入
      this.historyList.unshift(this.searchValue)
      // 数组去重
      this.historyList = [...new Set(this.historyList)]
      // 限长
      this.historyList.splice(5)
      // 将historyList存放到histroy中
      setHistoryLocal(JSON.stringify(this.historyList))
    },
    // 点击回车时触发
    // onSearch () {},
    // 点击取消触发
    onCancel () {
      this.isShowSearch = true
      this.searchValue = ''
      this.start = -5
      this.shareList = []
      this.loading = false
      this.finished = false
    },
    // 创建一个获取面经热搜数据的方法
    async getShareTop () {
      const res = await getShareTopApi({})
      this.hotList = res.data.data
    }
  },
  created () {
    // 获取面经热搜数据
    this.getShareTop()
    // 获取历史搜索数据
    this.historyList = JSON.parse(getHistoryLocal()) || []
  }
}
</script>

<style lang="less" scoped>
.skillSearch {
  /deep/.van-nav-bar__title {
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    text-align: left;
    color: #222222;
  }
  .words {
    padding: 0 15px;
    p {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 600;
      text-align: left;
      color: #222222;
    }
    .historySearch {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #545671;
      }
    }
    .hotWords,
    .historyWords {
      display: flex;
      flex-wrap: wrap;
      .tag {
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        line-height: 17px;
        margin-right: 5px;
        margin-top: 5px;
        padding: 10px;
        background-color: #f7f4f5;
      }
    }
  }
}
</style>
