<template>
  <div class="pro_footer clear" :style='{zIndex: ZIndex}'>
    <div class="item-box">
      <router-link :to="`/detail/shopping/${InfoList.stylist_id ? InfoList.stylist_id : ''}`" class="option_item" v-if="InfoList.stylist_id || (typeUser && typeUser == 1)">
        <img class="sign" src="/static/icon/detail/details_icon_tab01.png">
        <p class="option_label">店铺</p></router-link>
      <a class="option_item"  href="javascript:void(0);" @click="get_attention">
        <img class="sign" :src="isActive ? '/static/icon/detail/details_icon_tab_sel02.png' : '/static/icon/detail/details_icon_tab02.png'">
        <p class="option_label">{{isActive ? '已关注' : '关注'}}</p>
      </a>
      <a href="tel:4008335138" class="option_item">
        <img class="sign" src="/static/icon/detail/details_icon_tab03.png">
        <p class="option_label">客服</p>
      </a>
    </div>
    <a class="appointment" href="javascript:void(0);" @click="appiont">
    <!-- <a class="appointment" href="/order"> -->
      立即预约
    </a>
  </div>
</template>
<script>

import Vue from 'vue';
import keyConf from '../../../common/keyConf'
import {followProduct,productFollow,productUnfollow,userIsLogin} from '@/service/getData';
import common from "../../../common/common";
export default {
  name: "detailFooter",
  data () {
    return {
      isActive: false,
      tipMsg: '', // 关注提示
      appOpen: false, // 产品详情页面是否在APP中打开(便于拦截，采用app原生支付)

      plid: '', //便于统计新用户从专题来的
    };
  },
  props: ['productId','typeUser','ZIndex','InfoList'],
  created (){
    /*已登录则判断是否已关注*/
    if($.cookie(keyConf.qm_cookie)){
      this.getFollowList();
    }

    /*判断是否在APP打开*/
    if (common.getQueryString("app") == "ios" || common.getQueryString("app") == "android") {
        this.appOpen = true; // 页面是在APP中打开
    }

    this.plid = common.getQueryString("plid") ? common.getQueryString("plid") : "";
  },
  methods: {

    get_attention(){
      if(!this.isActive){
        this.getAttention();
      }else{
        this.cancle_attention();
      }
    },
    //所关注产品列表
    async getFollowList (){
      let _this = this;
      let RES = await followProduct();
      if(RES.status == "ok"){
        RES.data.result.forEach(function (n,i) {
          if(n.pid == _this.productId){
            _this.isActive = true;
            return;
          }
        })
      }
    },
    //关注产品
    async getAttention(){
      if(!$.cookie(keyConf.qm_cookie)){
        if (this.appOpen) { // APP中打开页面
          window.location.href = `/login?action=login`;
        }else {
          // this.$router.push({name: "login", query: {url:"/detail/" + this.productId}});
          alert('请您先登录')
          let stylist_id = this.$route.query.stylist_id;
          let baseUrl = stylist_id ? `/login?url=/choosedetail/${this.productId}?stylist_id=${stylist_id}?plid=${this.plid}` : `/login?url=/choosedetail/${this.productId}?plid=${this.plid}`;
          this.$router.push(baseUrl)
        }
      }else{
        let res = await productFollow({productId: this.productId});
        if(res.status == "ok"){
          this.isActive = !this.isActive;
          this.tipMsg = res.msg;
          this.$emit('followTips',this.tipMsg); // 弹框提示‘关注’成功
          this.$emit("contStar"); // 重新刷新数据
        }
      }
    },
    //取消关注产品
    async cancle_attention (){
      if(!$.cookie(keyConf.qm_cookie)){
        this.$router.push({name: "login", query: {url:"/choosedetail/" + this.productId}});
      }else{
        let res = await productUnfollow({productId: this.productId});
        if(res.status == "ok"){
          this.isActive = !this.isActive;
          this.tipMsg = res.msg;
          this.$emit('followTips',this.tipMsg); // 弹框提示‘已取消关注’
          this.$emit("contStar"); // 重新刷新数据
        }
      }
    },
    // 关注
    toFollow () {
      this.isActive = !this.isActive;
    },
    async appiont(){
      let qm_cookie = $.cookie(keyConf.qm_cookie);
      let isLogin = await userIsLogin();
      let stylist_id = this.$route.query.stylist_id;
      if(!qm_cookie || isLogin.status == 'error'){
        if (this.appOpen) { // APP中打开页面
          window.location.href = `/login?action=login`;
        }else {
          alert('未登录');
          let baseUrl = stylist_id ? `/login?url=/choosedetail/${this.productId}?stylist_id=${stylist_id}?plid=${this.plid}` : `/login?url=/choosedetail/${this.productId}?plid=${this.plid}`;
          this.$router.push(baseUrl)
        }
      }else{
        let baseUrl;
        if (this.appOpen) { // APP中打开页面
          baseUrl = stylist_id ? `/chooseorder/${this.productId}?stylist_id=${stylist_id}&appOpen=true` : `/chooseorder/${this.productId}?appOpen=true`;
        }else {
          baseUrl = stylist_id ? `/chooseorder/${this.productId}?stylist_id=${stylist_id}` : `/chooseorder/${this.productId}`;
        }
        this.$router.push(baseUrl);
      }
    }
  }
}
 </script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.pro_footer{
  @include wh(100%,4.9rem);
  position: fixed;
  bottom: 0px;
  left: 0px;
  border-top: 1px solid #ccc;
  background-color: #f9f9f9;
  opacity: 0.95;
  .item-box{
    display: flex;
    margin-right: 13rem;
    padding: 0.6rem 0 0;
    .option_item{
      flex: 1;
      text-align: center;
      font-size: 1rem;
      color: #000;
      cursor: pointer;
      img{
        vertical-align: top;
        width: 2.1rem;
        margin-bottom: 0.2rem;
      }
    }
  }
  .appointment{
    position: absolute;
    right: 0;
    top: 0;
    width: 13rem;
    height: 4.9rem;
    line-height: 4.9rem;
    text-align: center;
    background-color: $themeRed;
    font-size: 1.6rem;
    color: $bgWhite;
    cursor: pointer;
  }
}
</style>
