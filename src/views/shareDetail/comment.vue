<template>
  <div class="myComment" v-if="item.author">
    <div class="commentInfo">
      <div class="commentUser">
        <div class="userIcon">
          <img :src="baseURL + item.author.avatar" alt="" @click="clickImg" />
        </div>
        <div class="nameAndtime">
          <div class="userName">{{ item.author.nickname }}</div>
          <div class="time">{{ item.created_at | normalTime }}</div>
        </div>
      </div>
      <div class="star">
        <van-icon
          @click="starComments"
          name="good-job-o"
          :color="getComments ? 'red' : '#ccc'"
        />
        <span class="num">{{ item.star ? item.star : 0 }}</span>
      </div>
    </div>
    <div class="commentMsg">
      <div class="message">{{ item.content }}</div>
      <div class="reply" v-if="item.children_comments.length > 0">
        <div
          class="item"
          v-for="(userItem, index) in item.children_comments"
          :key="index"
        >
          <span class="user">{{ userItem.author }} :</span
          >{{ userItem.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// 导入封装好的点赞文章接口
import { starCommentsApi } from '@/api/technic'
export default {
  props: ['item'],
  data () {
    return {
      baseURL: process.env.VUE_APP_URL
    }
  },
  methods: {
    ...mapActions(['getUserInfo']),
    // 点击头像回复
    clickImg () {
      this.$emit('clickImg', this.item)
    },
    // 点赞文章
    async starComments () {
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
      const res = await starCommentsApi(this.item.id)
      // 将最新的点赞次数赋值给评论
      this.item.star = res.data.data.num
      // 更新vuex中的数据
      this.getUserInfo()
      // 判断是点击收藏还是取消收藏
      if (res.data.data.list.includes(+this.item.id)) {
        this.$toast.success('点赞成功')
      } else {
        this.$toast.success('取消点赞')
      }
    }
  },
  computed: {
    ...mapState(['userInfo']),
    // 将判断方法写进计算属性
    getComments () {
      return (
        this.userInfo.starComments &&
        this.userInfo.starComments.includes(+this.item.id)
      )
    }
  }
}
</script>

<style lang="less" scoped>
.myComment {
  padding-bottom: 30px;
  .commentInfo {
    display: flex;
    justify-content: space-between;
    .commentUser {
      display: flex;
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
    .star {
      display: flex;
      align-items: center;
      .num {
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #b4b4bd;
        margin-left: 5px;
      }
      .van-icon-good-job-o {
        font-size: 16px;
      }
    }
  }
  .commentMsg {
    margin-left: 45px;
    .message {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: #181a39;
      line-height: 40px;
    }
    .reply {
      background-color: #f7f4f5;
      .item {
        line-height: 30px;
        margin-left: 15px;
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Semibold;
        color: #545671;
        // 字母过长换行
        word-break: break-all;
        // 符号过长换行
        // word-wrap: break-word;
        .user {
          font-weight: 600;
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
