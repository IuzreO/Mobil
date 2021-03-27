<template>
  <div class="shareDetail" v-if="articleInfo.author">
    <hm-nav-bar path="/find" :fixed="true"></hm-nav-bar>
    <div class="content">
      <!-- 标题区域 -->
      <div class="title">
        {{ articleInfo.title }}
      </div>
      <!-- 作者区域 -->
      <div class="author">
        <div class="userIcon">
          <img :src="baseURL + articleInfo.author.avatar" alt="" />
        </div>
        <div class="nameAndtime">
          <div class="userName">{{ articleInfo.author.nickname }}</div>
          <div class="time">{{ articleInfo.created_at | normalTime }}</div>
        </div>
      </div>
      <!-- 文章区域 -->
      <div class="article">
        <div v-html="articleInfo.content"></div>
      </div>
      <!-- 评论区域 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了..."
        @load="onload"
      >
        <div class="comment">
          <div class="commentTitel">
            <span class="word">评论</span><sup class="num">88</sup>
          </div>
          <!-- 使用组件 -->
          <comment
            :item="item"
            v-for="(item, index) in commentList"
            :key="index"
            @clickImg="clickImg"
          ></comment></div
      ></van-list>
    </div>
    <!-- 底部区域 -->
    <div class="bottom">
      <div class="reply">
        <span @click="showPop">我来补充两句</span>
      </div>
      <!-- 收藏 -->
      <div class="collect">
        <!-- 判断用户是否登录,且有无保存文章的ID -->
        <van-icon
          name="star-o"
          :class="{
            active: getMyProp('collectArticles', id)
          }"
          @click="collectArticles"
        ></van-icon
        ><span>{{ articleInfo.collect }} </span>
      </div>
      <!-- 点赞 -->
      <div class="star">
        <van-icon
          name="good-job-o"
          :class="{
            active: getMyProp('starArticles', id)
          }"
          @click="starAriticles"
        /><span>{{ articleInfo.star }}</span>
      </div>
      <div class="share">
        <van-icon name="share-o" /><span>{{ articleInfo.share }}</span>
      </div>
    </div>
    <!-- 弹出层 -->
    <van-popup v-model="isShow" position="bottom">
      <div class="popup">
        <textarea
          class="textareaText"
          :placeholder="placeholder"
          rows="4"
          v-model="commentValue"
        ></textarea>
        <div class="sendBtn">
          <span
            v-if="commentValue.length > 0"
            style="color:red"
            @click="sendComment"
            >发送</span
          >
          <span v-else>发送</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
// 导入封装好的comment组件
import comment from './comment'
// 导入封装好的数据接口
import {
  getarticleDataApi,
  getCommentApi,
  sendCommentApi,
  collectArticlesApi,
  starArticlesApi
} from '@/api/technic'
// 导入辅助函数
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  // 注册组件
  components: {
    comment
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['getMyProp'])
    // 将判断方法写进计算属性
    // getStar () {
    //   return (
    //     this.userInfo.starArticles &&
    //     this.userInfo.starArticles.includes(+this.id)
    //   )
    // },
    // getCollect () {
    //   return (
    //     this.userInfo.collectArticles &&
    //     this.userInfo.collectArticles.includes(+this.id)
    //   )
    // }
  },
  data () {
    return {
      id: this.$route.params.id,
      // 文章信息
      articleInfo: {},
      baseURL: process.env.VUE_APP_URL,
      // 加载状态
      loading: false,
      // 是否加载完结
      finished: false,
      // 起始索引
      start: -5,
      // 分页个数
      limit: 5,
      // 评价列表
      commentList: [],
      // 控制弹出层的显示与隐藏
      isShow: false,
      // 评论内容
      commentValue: '',
      // 默认文本
      placeholder: '我也来说两句',
      // 添加一个标识 区分是评论还是回复
      isReply: false,
      // 存放评论列表对象
      commentObj: {}
    }
  },
  created () {
    // 调用获取面经详情数据的方法
    this.getarticleData()
  },
  methods: {
    ...mapActions(['getUserInfo']),
    // 文章点赞
    async starAriticles () {
      // 判断用户是否登录
      // if (!this.$store.state.isLogin) {
      //   this.$toast.fail('请先登录')
      //   // 跳转到登录页,携带当前地址
      //   this.$router.push(`/login?_redirect=${this.$route.path}`)
      //   return
      // }
      if (!this.$login()) {
        return
      }
      this.$toast.loading('加载中')
      const res = await starArticlesApi(this.id)
      // 将最新的点赞次数赋值给文章
      this.articleInfo.star = res.data.data.num
      // 更新vuex中的数据
      this.getUserInfo()
      // 判断是点击收藏还是取消收藏
      if (res.data.data.list.includes(+this.id)) {
        this.$toast.success('点赞成功')
      } else {
        this.$toast.success('取消点赞')
      }
    },
    // 收藏文章
    async collectArticles () {
      // 判断用户是否登录
      // if (!this.$store.state.isLogin) {
      //   this.$toast.fail('请先登录')
      //   // 跳转到登录页,携带当前地址
      //   this.$router.push(`/login?_redirect=${this.$route.path}`)
      //   return
      // }
      if (!this.$login()) {
        return
      }
      this.$toast.loading('加载中')
      // 调用接口
      const res = await collectArticlesApi(this.id)
      // 将最新的收藏数量赋值给文章
      this.articleInfo.collect = res.data.data.num
      // 更新vuex中的数据
      this.getUserInfo()
      // 判断是点击收藏还是取消收藏
      if (res.data.data.list.includes(+this.id)) {
        this.$toast.success('收藏成功')
      } else {
        this.$toast.success('取消收藏')
      }
    },
    // 点击头像回复
    clickImg (item) {
      this.isShow = true
      this.placeholder = '回复:' + item.author.nickname
      this.isReply = true
      this.commentObj = item
    },
    // 点击发送评论
    async sendComment () {
      // 判断用户是否登录
      // if (!this.$store.state.isLogin) {
      //   this.$toast.fail('请先登录')
      //   // 跳转到登录页,携带当前地址
      //   this.$router.push(`/login?_redirect=${this.$route.path}`)
      //   return
      // }
      if (!this.$login()) {
        return
      }
      this.$toast.loading('加载中')
      if (this.isReply === false) {
        const res = await sendCommentApi({
          content: this.commentValue,
          article: this.id
        })
        const newCommentList = res.data.data
        this.commentList.unshift(newCommentList)
        this.$toast.success('评论成功')
        this.isShow = false
      } else {
        const newRes = await sendCommentApi({
          content: this.commentValue,
          article: this.id,
          parent: this.commentObj.id
        })
        // 将返回的数据动态添加到子组件中
        this.commentObj.children_comments.push(newRes.data.data)
        // 关闭弹出层
        this.isShow = false
        // 清空评论内容
        this.commentValue = ''
        // 提示用户评论成功
        this.$toast.success('评论成功')
      }
    },
    // 展示弹出层
    showPop () {
      this.isShow = true
      this.placeholder = '我也来说两句'
      this.isReply = false
    },
    // 加载方法
    async onload () {
      this.start += this.limit
      const res = await getCommentApi({
        id: this.id,
        start: this.start,
        limit: this.limit
      })
      this.commentList.push(...res.data.data.list)
      if (res.data.data.list.length === 0) {
        this.finished = true
      }
      this.loading = false
    },
    // 创建一个获取面经详情数据的方法
    async getarticleData () {
      const res = await getarticleDataApi(this.id)
      this.articleInfo = res.data.data
    }
  }
}
</script>

<style lang="less" scoped>
.shareDetail {
  background-color: #f7f4f5;
  padding-bottom: 88px;
  .content {
    .title {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      color: #181a39;
      background-color: #fff;
      padding: 15px 15px;
    }
    .author {
      display: flex;
      background-color: #fff;
      padding: 8px 15px;
      .userIcon {
        img {
          height: 35px;
          width: 35px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
      .nameAndtime {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .userName {
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          color: #545671;
        }
        .time {
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #b4b4bd;
        }
      }
    }
    .article {
      background: #fff;
      padding: 1px 15px;
      font-size: 16px;
      /deep/ img {
        width: 100%;
      }
    }
    .comment {
      margin-top: 10px;
      background: #fff;
      padding: 0 15px;
      .commentTitel {
        padding: 25px 0;
        .word {
          font-size: 18px;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          color: #222222;
          margin-right: 4px;
        }
        .num {
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          color: #b4b4bd;
        }
      }
    }
  }
  .bottom {
    position: fixed;
    display: flex;
    bottom: 0;
    left: 0;
    height: 85px;
    padding: 0 15px;
    width: 100%;
    align-items: center;
    background-color: #fff;
    box-sizing: border-box;
    .reply {
      width: 190px;
      background-color: #f7f4f5;
      line-height: 30px;
      span {
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #b4b4bd;
        margin-left: 5px;
      }
    }
    .collect,
    .star,
    .share {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 20px;
      span {
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #b4b4bd;
      }
    }
  }
  .popup {
    padding: 15px;
    .textareaText {
      font-size: 14px;
      width: 100%;
      border: none;
      padding: 10px;
      background-color: #f5f3f4;
      box-sizing: border-box;
    }
    .sendBtn {
      font-size: 14px;
      text-align: right;
    }
  }
  .active {
    color: red;
  }
}
</style>
