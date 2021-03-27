<template>
  <div class="testIndex" v-if="questionList && currentTitle">
    <!-- 标题 -->
    <van-nav-bar
      title="刷题"
      right-text="答题卡"
      @click-left="leftclick"
      @click-right="rightclick"
    >
      <template #left>
        <i style="font-size: 40px" class="iconfont iconbtn_nav_back"></i>
      </template>
    </van-nav-bar>
    <!-- 题面 -->
    <div class="content">
      <!-- 单选 -->
      <div class="radio" v-if="currentTitle.type === 1">
        <div class="text">
          [{{ questionTypes[currentTitle.type] }}]
          {{ currentTitle.title }}
        </div>
        <div class="tags">
          <van-tag
            color="#f7f4f5"
            text-color="#6f6d6b"
            class="tag"
            v-for="(item, index) in currentTitle.tag"
            :key="index"
            >{{ item }}
          </van-tag>
        </div>
        <!-- 选项 -->
        <div class="options">
          <ul class="items ">
            <li
              class="item"
              :class="{
                active: singleAnswer === select[index],
                right:
                  questionList[currentQuetion].answer &&
                  questionList[currentQuetion].answer.singleAnswer ===
                    select[index],
                error:
                  questionList[currentQuetion].answer &&
                  questionList[currentQuetion].answer.isRight === false &&
                  singleAnswer === select[index]
              }"
              @click="selectAnswer(select[index])"
              v-for="(item, index) in currentTitle.option"
              :key="index"
            >
              {{ select[index] }}. {{ item
              }}<i class="iconfont iconicon_cuowu"></i>
              <i class="iconfont iconicon_zhengque"></i>
            </li>
          </ul>
        </div>
      </div>
      <!-- 多选 -->
      <div class="radio" v-if="currentTitle.type === 2">
        <div class="text">
          [{{ questionTypes[currentTitle.type] }}]
          {{ currentTitle.title }}
        </div>
        <div class="tags">
          <van-tag
            color="#f7f4f5"
            text-color="#6f6d6b"
            class="tag"
            v-for="(item, index) in currentTitle.tag"
            :key="index"
            >{{ item }}
          </van-tag>
        </div>
        <!-- 选项 -->
        <div class="options">
          <ul class="items ">
            <li
              class="item"
              :class="{
                active: multipleAnswer.includes(select[index]),
                right:
                  questionList[currentQuetion].answer &&
                  questionList[currentQuetion].answer.multipleAnswer.includes(
                    select[index]
                  ),
                error:
                  questionList[currentQuetion].answer &&
                  !questionList[currentQuetion].answer.multipleAnswer.includes(
                    select[index]
                  ) &&
                  multipleAnswer.includes(select[index])
              }"
              @click="MultiSelect(select[index])"
              v-for="(item, index) in currentTitle.option"
              :key="index"
            >
              {{ select[index] }}. {{ item
              }}<i class="iconfont iconicon_cuowu"></i>
              <i class="iconfont iconicon_zhengque"></i>
            </li>
          </ul>
        </div>
      </div>
      <!-- 简答 -->
      <div v-if="currentTitle.type === 3" class="singerAnswer">
        <div class="text">
          [{{ questionTypes[currentTitle.type] }}]
          {{ currentTitle.title }}
        </div>
        <div class="tags">
          <van-tag
            color="#f7f4f5"
            text-color="#6f6d6b"
            class="tag"
            v-for="(item, index) in currentTitle.tag"
            :key="index"
            >{{ item }}
          </van-tag>
        </div>
      </div>
    </div>
    <!-- 答案解析区域 -->
    <div class="answerKeys" v-if="step === 2">
      <hr />
      <span class="answerTitel">答案解析</span>
      <div class="rightAnswer">
        正确答案:{{ questionList[currentQuetion].answer.singleAnswer }}
      </div>
      <div class="answerMsg">
        <div class="diffcult">
          难度:
          {{ diffcultObj[questionList[currentQuetion].answer.difficulty] }}
        </div>
        <div class="submitNum">
          提交次数: {{ questionList[currentQuetion].answer.submitNum }}
        </div>
        <div class="rghitNum">
          正确次数: {{ questionList[currentQuetion].answer.correctNum }}
        </div>
      </div>
      <div class="parse">
        {{ questionList[currentQuetion].answer.answerAnalysis }}
      </div>
    </div>
    <!-- 底部区域 -->
    <div class="bottom">
      <div class="icon">
        <div class="collect">
          <i class="iconfont iconbtn_shoucang_nor"></i><span>收藏</span>
        </div>
        <div class="feedback">
          <i class="iconfont iconbtn_shuati_fankui"></i><span>反馈</span>
        </div>
      </div>
      <div class="num">
        <span class="current">{{ currentQuetion + 1 }}</span> /
        <span class="total">{{ questionList.length }}</span>
      </div>
      <div class="btn">
        <van-button
          v-if="step < 2 && !isFinished"
          color="#e40137"
          class="submit"
          :disabled="step !== 1"
          @click="submitAnswer"
          >提交</van-button
        >
        <van-button
          v-if="step === 2 && !isFinished"
          class="nextOne"
          type="info"
          @click="nextOne"
          >下一题</van-button
        >
        <van-button
          v-if="step === 2 && isFinished === true"
          class="submitTest"
          type="info"
          @click="submitTest"
          >交卷</van-button
        >
      </div>
    </div>
    <!-- 答题卡 -->
    <van-popup v-model="show" position="top" style="height:100%">
      <!-- 导航栏 -->
      <van-nav-bar title="答题卡" @click-left="cardLeftClick">
        <template #left>
          <i style="font-size: 40px" class="iconfont iconbtn_nav_back"></i>
        </template>
        <template #right>
          <span class="nowQuestion">{{ currentQuetion + 1 }}</span>
          <span class="slash"> / </span>
          <span class="totalQuestion">{{ questionList.length }}题</span>
        </template>
      </van-nav-bar>
      <div class="selectBox">
        <span class="selectQuestion">选择题</span>
        <span class="allQuestion">{{ questionList.length }}题</span>
      </div>
      <div class="topics">
        <span
          @click="changeQuestion(index)"
          class="topic"
          :class="{
            error:
              questionList[index].answer &&
              questionList[index].answer.isRight === false,
            right:
              questionList[index].answer &&
              questionList[index].answer.isRight === true,
            active: currentQuetion === index
          }"
          v-for="(item, index) in questionList.length"
          :key="index"
          >{{ index + 1 }}</span
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
// 导入封装好的数据接口
import {
  interviewQuestionsApi,
  submitAnswerApi,
  getNextOneApi
} from '@/api/interview'
export default {
  data () {
    return {
      // 获取题库参数
      type: this.$route.params.type,
      city: this.$route.params.city,
      // 保存题库信息
      questionList: '',
      // 当前操作的题数
      currentQuetion: 0,
      // 选项
      select: 'ABCDEFG',
      // 题型
      questionTypes: {
        1: '单选',
        2: '多选',
        3: '简答题'
      },
      diffcultObj: {
        1: '简单',
        2: '一般',
        3: '困难'
      },
      singleAnswer: '', // 单选答案
      multipleAnswer: [], // 多选答案
      // 定义一个操作的步骤： 0 ~ 1 ~ 2 ~ 3
      step: 0,
      // 默认弹出层不显示
      show: false
    }
  },
  computed: {
    // 封装成计算属性
    currentTitle () {
      return this.questionList[this.currentQuetion].detail
    },
    // 判断答题是否结束
    isFinished () {
      // 用every方法判断,作用是判断是否每个元素都满足条件
      // 满足则返回true
      // 不满足则返回false
      return this.questionList.every(item => {
        return item.answer
      })
    }
  },
  methods: {
    cardLeftClick () {},
    // 选择单选答案
    selectAnswer (select) {
      // 判断当前的步骤是否为0或1
      if (this.step === 0 || this.step === 1) {
        this.singleAnswer = select
        this.step = 1
      }
    },
    // 选择多选答案
    MultiSelect (selects) {
      // 思路,如果str已经包含在multipleAnswer数组,再次触发时应该将Str删除
      // 如果selects不包含在multipleAnswer数组中,触发事件时应该将str数组添加到multipleAnswer
      if (this.step === 0 || this.step === 1) {
        const index = this.multipleAnswer.indexOf(selects)
        if (index !== -1) {
          // 存在 则将元素删除
          this.multipleAnswer.splice(index, 1)
        } else {
          // 不存在 则添加到数组中
          this.multipleAnswer.push(selects)
        }
        // 将步骤改为1
        this.step = 1
      }
    },
    // 提交答案
    async submitAnswer () {
      this.$toast.loading('提交中...')
      const res = await submitAnswerApi({
        id: this.questionList[this.currentQuetion].id,
        singleAnswer: this.singleAnswer,
        multipleAnswer: this.multipleAnswer
      })
      // 将获取到的数据保存到题库信息中
      // this.questionList[this.currentQuetion].answer = res.data.data
      // 动态添加属性
      this.$set(this.questionList[this.currentQuetion], 'answer', res.data.data)
      this.step = 2
    },
    // 点击下一题
    async nextOne () {
      // 题数++
      this.currentQuetion++
      // 清空答案
      this.singleAnswer = ''
      this.multipleAnswer = []
      // 获取下一题数据
      const res = await getNextOneApi(this.questionList[this.currentQuetion].id)
      // 将获取到的数据保存到questionList.detail中
      this.$set(this.questionList[this.currentQuetion], 'detail', res.data.data)
      // 将状态重置为0
      this.step = 0
      // 判断当前题目是否为简答题
      if (this.currentTitle.type === 3) {
        this.step = 1
      }
    },
    // 切换题目
    async changeQuestion (index) {
      this.currentQuetion = index
      // 发送请求获取数据
      // 清空答案
      this.singleAnswer = ''
      this.multipleAnswer = []
      // 获取下一题数据
      const res = await getNextOneApi(this.questionList[this.currentQuetion].id)
      // 将获取到的数据保存到questionList.detail中
      this.$set(this.questionList[this.currentQuetion], 'detail', res.data.data)
      // 将状态重置为0
      this.step = 0
      // 关闭弹出框
      this.show = false
      // 判断当前题目是否为简答题
      if (this.currentTitle.type === 3) {
        this.step = 1
      }
    },
    // 交卷
    submitTest () {
      this.$toast.success('交卷成功')
      setTimeout(() => {
        this.$router.push('/question')
      }, 2000)
    },

    leftclick () {
      // 后退返回答题页
      this.$router.push('/question')
    },
    rightclick () {
      // 展示弹出层
      this.show = true
    }
  },
  async created () {
    // 获取题目信息
    const res = await interviewQuestionsApi({
      type: this.type,
      city: this.city
    })
    this.questionList = res.data.data
  }
}
</script>

<style lang="less" scopee>
.testIndex {
  padding-bottom: 60px;
  /deep/.van-nav-bar__title {
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    color: #222222;
  }
  /deep/ .van-nav-bar__left {
    padding: 0;
  }
  .content {
    .radio,
    .singerAnswer {
      .text {
        margin: 25px 15px;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: justify;
        color: #181a39;
      }
      .tags {
        margin: 0 15px 28px 15px;
        .tag {
          font-size: 12px;
          margin-right: 10px;
          padding: 5px 5px;
        }
      }
      .items {
        margin: 0 15px;
        .item {
          display: flex;
          font-size: 16px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: justify;
          align-items: center;
          color: #181a39;
          height: 55px;
          background: #ffffff;
          border: 1px solid #f7f4f5;
          border-radius: 4px;
          margin-bottom: 15px;
          padding: 0 10px;
          // 设置字间距
          letter-spacing: 1px;
        }
        .iconfont {
          display: none;
        }
        .right {
          background-color: #ddfad9;
          position: relative;
          /deep/ .iconicon_zhengque {
            display: block;
            color: #1dc779;
            position: absolute;
            right: 0;
          }
        }
        .error {
          background-color: #ffefea;
          position: relative;
          /deep/ .iconicon_cuowu {
            display: block;
            color: #ff4949;
            position: absolute;
            right: 0;
          }
        }
        .active {
          border: 1px solid #000;
        }
      }
    }
  }
  hr {
    background-color: #eceaea;
  }
  .answerKeys {
    margin: 15px;
    .answerTitel {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 600;
      color: #222222;
    }
    .rightAnswer {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: justify;
      color: #1dc779;
      margin-top: 10px;
    }
    .answerMsg {
      display: flex;
      background-color: #f5f3f4;
      font-size: 12px;
      height: 32px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: #545671;
      align-items: center;
      justify-content: space-around;
      margin: 10px 0;
    }
    .parse {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: justify;
      color: #181a39;
    }
  }
  .bottom {
    position: fixed;
    display: flex;
    bottom: 0;
    left: 0;
    height: 60px;
    width: 100%;
    background-color: #fff;
    align-items: center;
    justify-content: space-around;
    .icon {
      display: flex;
      .collect,
      .feedback {
        display: flex;
        flex-direction: column;
        font-size: 12px;
        color: #666;
        align-items: center;
        margin-right: 20px;
      }
      /deep/ .iconbtn_shoucang_nor,
      .iconbtn_shuati_fankui {
        font-size: 20px;
      }
    }
    .num {
      margin: 0 35px;
      .current {
        color: #e61a4a;
        font-size: 20px;
      }
      .total {
        font-size: 16px;
        color: #a7a8b5;
      }
    }
    .btn {
      .submit {
        width: 98px;
        border-radius: 10px;
      }
      .nextOne {
        width: 98px;
        border-radius: 10px;
      }
    }
  }
  .nowQuestion {
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    color: #e40137;
  }
  .totalQuestion {
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    color: #898b9d;
  }
  .slash {
    font-size: 18px;
  }
  .selectBox {
    height: 44px;
    width: 100%;
    background-color: #f7f4f5;
    line-height: 44px;
    .selectQuestion {
      margin: 0 15px;
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      color: #222222;
    }
    .allQuestion {
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: #b4b4bd;
    }
  }
  .topics {
    .topic {
      margin: 9px;
      display: inline-block;
      width: 33px;
      height: 33px;
      opacity: 1;
      background: #ffffff;
      border: 1px solid #b4b4bd;
      border-radius: 50%;
      line-height: 33px;
      text-align: center;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: #b4b4bd;
    }
    .active {
      background: #ffffff;
      border: 1px solid #181a39;
      color: #181a39;
    }
    .right {
      background: #ddfad9;
      border-radius: 50%;
      color: #1dc779;
      border: 1px solid #1dc779;
    }
    .error {
      background: #ffefea;
      border-radius: 50%;
      border: 1px solid #ff4949;
      color: #ff4949;
    }
  }
  .submitTest {
    width: 98px;
    border-radius: 10px;
  }
}
</style>
