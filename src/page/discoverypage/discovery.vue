<template>
  <div class="discovery">
    <div class="dis-header" v-if="hideFooterHeader">
      <div class="header">
        <div class="title">
          <h2>发现</h2>
        </div>
      </div>
    </div>
    <!--顶部轮播-->
    <div class="swipe-wrapper" v-show="topCarousel">
        <mt-swipe :show-indicators="false">
            <mt-swipe-item v-for="(item,index) in topCarousel" :key="index">
            <a class="imgshow" :href="item.link">
                <img :src="item.img_url" alt="大家有话说">
            </a>
            </mt-swipe-item>
        </mt-swipe>
        <!-- <div>
            <a class="imgshow" :href="topCarousel[0].link">
                <img :src="topCarousel[0].img_url" alt="大家有话说"> 
            </a>
        </div> -->
        <!-- <div>
            <a class="imgshow" :href="topCarousel[1].link">
                <img :src="topCarousel[1].img_url" alt="大家有话说">
            </a>
        </div> -->
    </div>
    <div class="content">
      <div class="content-title">她们都在晒</div>
      <wordItem v-for="(item, index) in discovery_list" :key="index" :item="item" :like_list="like_list"></wordItem>
    </div>

  </div>
</template>
<script>
import Vue from "vue";
import wordItem from './children/wordItem'
import { Toast, Swipe, SwipeItem } from 'mint-ui'
import '../../../node_modules/mint-ui/lib/toast/style.css'
import '../../../node_modules/mint-ui/lib/swipe/style.css'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
import { getFoundList } from '../../service/getData'
import common from '../../common/common'
export default {
  name: 'discovery',
  data() {
    return {
      hideFooterHeader: true,
      topCarousel: [], // 顶部轮播图
      discovery_list: [], // 评论列表
      like_list: [], // 用户点赞列表
      hide_sendbox: false, // 默认隐藏输入框
      icon_show: false, // 隐藏评论时的删除按钮
      comment_txt: '', // 评论的内容
      comment_top: 0, // 评论距离顶部的距离
      count: '0', // 评论总数
      page: '1', // 页数
      page_size: '4', // 一页显示10条
      flag: true,
    }
  },
  created() {
    this.showHeaderFooter();
    this.getFoundList();
    this.scroll();
    console.log(this.topCarousel)
  },
  methods: {
    /*获取发现页数据*/
    async getFoundList() {
      this.flag = false;
      let res = await getFoundList({page: this.page, page_size: this.page_size})
      if (res.status == "ok") {
        this.discovery_list = this.discovery_list.concat(res.data);
        this.count = res.count;
        this.topCarousel = res.ad;
        this.like_list = res.user_dz ? res.user_dz : '';
        this.flag = true;
        if(this.count === this.discovery_list.length){
          this.flag = false;
        }
      }
    },

    /*APP站内隐藏顶部*/
    showHeaderFooter() {
      let query = this.$route.query
      query = query ? query : {}
      if (query.app == 'ios' || query.app == 'android' || query.app == 'wechatapp') {
        this.hideFooterHeader = false;
      }
    },
    scroll(){
      let _this = this
      if(this.$route.path === '/discovery'){
        common.scroll(()=>{
          if(_this.flag){
              _this.page++
              _this.getFoundList();
            }
        })
      }
    },

  },
  components: {
    wordItem,
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.discovery {
  @include wh(100%, 100%);
  /* @include bgColor(#f3f3f3);*/
  padding-bottom: 50px;
  position: relative;
  -webkit-overflow-scrolling: touch;
  .dis-header {
    @include wh(100%, 4rem);
  }
  .header {
    position: fixed;
    z-index: 999;
    @include wh(100%, 4rem);
    @include bgColor(#fff);
    .title {
      @include wh(100%, 4rem); // border-bottom: 1px solid #999;
      @include average(#999);
      line-height: 4rem;
      text-align: center;
      h2 {
        font-size: 1.8rem;
        color: #000;
        letter-spacing: 1px;
      }
    }
  }
  /*banner*/
  .banner {
    font-size: 0;
    img {
      font-size: 0;
      width: 100%;
    }
  }
  .swipe-wrapper {
    display: flex;
    padding: .8rem 1.5rem;
    width: 100%;
    height: 10rem;
    >div{
      flex: 1;
      &:nth-of-type(1){
        margin-right: 5px;
      }
    }
    a.imgshow {
      display: block;
      width: 100%;
    //   height: 10rem;
    }
    img {
      width: 100%;
    }
  }

  .content {
    @include wh(100%, 100%);
    padding: 1.5rem 0 1.5rem 1.5rem;
    .content-title{
      position: relative;
      @include sc(1.6rem, #000);
      // margin-left: 1rem;
      padding-left: 1rem;
      &::before{
        position: absolute;
        content: '';
        height: 1.5rem;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        border-left: .25rem solid #e70034;
      }
    }
  }

}
</style>