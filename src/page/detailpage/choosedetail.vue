<template>
  <section class="detail" id="detail">
    <div class="main" v-if="!pingjiaShow">
      <!--顶部模块-->
      <div class="top">
        <ul>
          <li id="tab1">
            <!-- <a href="#banner" :class="{active:scroll <= pingjia_top}">商品</a> -->
            <a href="javascript:void (0);" target="_self" :class="{active: tabIndex==1}" @click="funTab(1,'banner')">商品</a>
          </li>
          <li id="tab2">
            <!-- <a href="#pingjia" :class="{active:scroll > pingjia_top && scroll < details_top}">评价</a> -->
            <a href="javascript:void (0);" target="_self" :class="{active: tabIndex==2}" @click="funTab(2,'pingjia')">评价</a>
          </li>
          <li id="tab3">
            <!-- <a href="#details" :class="{active:scroll >= details_top}">详情</a> -->
            <a href="javascript:void (0);" target="_self" :class="{active: tabIndex==3}" @click="funTab(3,'details')">详情</a>
          </li>
          <i class="line" :style="tabStyle"></i>
        </ul>
        <span class="left" @click="$router.go(-1)"></span>
        <!-- <span class="right"  @click="share_show"></span> -->
      </div>
      <!--baner模块-->
      <div class="banner" id="banner">
        <!-- <a class="back" href="javascript:void(0);" @click="$router.go(-1)" ></a> -->
        <!-- <span class="share" @click="share_show"></span> -->
        <!--轮播图-->
        <div class="swipe">
          <mt-swipe :show-indicators="false">
            <mt-swipe-item v-for="(item,index) in product_info.images" :key="index">
              <img :src="item" :alt="item">
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <!--描述及价格-->
        <div class="descript">
          <p class="title">{{product_info.name}}</p>
          <div>
            <i v-if="product_info.dingjingShow">定金</i>
            <p class="price">¥{{product_info.price}}
              <span>¥{{product_info.market_price}}</span>
            </p>
            <p class="star">{{product_info.product_favorite_count}}人喜欢</p>
          </div>
          <span v-if="product_info.dingjingShow" class="pay_more">到店再付:{{product_info.shop_price}}元</span>
        </div>
        <!--服务模块-->
        <div v-show="product_info.cate_id == 2048 || product_info.service_form != 2 || product_info.service_form.length > 1" class="service" @click="chengnuo_show">
          <span :class="'icon'+(index+1)" v-for="(item,index) in product_info.commitList" :key="index">
            <img :src="require('../../../src/assets/image/icon/detail/'+item.icon_m)" alt="">
            {{item.title}}
          </span>
          <i></i>
        </div>
        <!--优惠券模块-->
        <div class="coupon" @click="coupon_show" v-if="product_info.couponList.length !=0">
          <span class="couponText">领券</span>
          <span class="couponTip" v-for="(item,index) in product_info.couponList" :key="index" v-if="index ==0 || index == 1">满{{item.base_amount}}减{{parseInt(item.coupon_amount)}}</span>
          <i @click="coupon_show"></i>
        </div>
      </div>
      <!--服务商圈-->
      <div class="address">
        <p class="time">服务时长 【
          <span>{{product_info.duration ? product_info.duration : '0'}}分钟</span>】</p>
        <p class="mode">服务方式 
            【上门服务】【屈臣氏门店服务】
          <!-- <span v-if="product_info.service_form == '1' || !product_info.service_form">【上门服务】</span> -->
          <!-- <span v-else-if="product_info.service_form == '2'">【到店服务】</span> -->
            
          <!-- <span v-else-if="product_info.service_form.length == '3'">上门服务/到店服务</span> -->
          <!-- <span v-else>上门服务</span> -->
        </p>
        <div class="sq" v-if="product_info.type_user && product_info.type_user ==1">
          <p>服务商圈 （{{mys_info.streetlist ? mys_info.streetlist.length : '0'}}）</p>
          <div class="add">
            {{mys_info.streetlist.join("、")}}
          </div>
          <button @click="server_show">查看全部</button>
        </div>
      </div>
      <div id="pingjia"></div>
      <!--晒单评价-->
      <div class="pingjia">
        <p class="title">评价晒单 （{{product_info.num ? product_info.num : '0'}}）</p>
        <pingjia v-for="(item,index) in product_info.comments" :key="index" :list="item" v-if="index < 3"></pingjia>
        <span class="more" @click="pingjia_show">查看全部</span>
      </div>
      <!-- 订购须知 -->
       <!-- <div class="orderInfo" v-show="product_info.service_form != 2 || product_info.service_form.length > 1"> -->
        <div class="orderInfo" v-if="isshowrule">
        <div class="title clear">
          <span class="left">订购须知</span>
          <router-link to="/desc">
            <p class="right">
            <span>退单、退款、赔付规则</span>
            <span class="icon"></span>
          </p>
          </router-link>
        </div>
        <div class="content">
          <ul>
            <li v-for="(item,i) in orderDesc" :key="i">{{i+1}}.{{item}};</li>
          </ul>
        </div>
      </div>
      <!--机构个人自营-->
      <shopDesc :info="mys_info.infoList" v-if="product_info.type_user && product_info.type_user ==1"></shopDesc>
      <!--图文详情-->
      <div id="details"></div>
      <div class="details" v-if="product_info.picText_detail.length !=0 || product_info.img_detail.length != 0">
        <h4>图文详情</h4>
        <i></i>
        <p>
          <span> GRAPHIC&nbsp;&nbsp;&nbsp;&nbsp;DETAILS</span>
        </p>
        <div class="picText_detail" v-html="product_info.picText_detail"></div>
        <div class="img_detail">
          <img v-for="(item,index) in product_info.img_detail" :key="index" :src="item" alt="">
        </div>
      </div>
      <!--为你推荐-->
      <div class="tuijian">
        <p>
          <span>为你推荐</span>
        </p>
        <i></i>
        <h4>RECOMMND</h4>
        <div class="pro_box">
          <listItem v-for="(item,index) in product_info.commend" :key="index" :list="item"></listItem>
        </div>
      </div>
    </div>

    <!--分享模块-->
    <share v-show="shawShow" @share_hide="share_hide"></share>
    <!--服务承诺-->
    <Connaught v-show="chengnuoShow" @chengnuo_hide="chengnuo_hide" :commitment="product_info.commitList"></Connaught>
    <!-- 领取优惠券 -->
    <coupon v-if="couponShow" ref="couponDetail" @coupon_hide="coupon_hide" :coupon="product_info.couponList"></coupon>
    <!--服务商圈-->
    <server v-if="severShow" @server_hide="server_hide" :serverStreet="mys_info.server_street"></server>
    <!--全部评价-->
    <all-evaluate :productId="product_info.productId" v-if="pingjiaShow" @pingjia_hide="pingjia_hide"></all-evaluate>
    <!--产品详情（底部）-->
    <chooseDetailFooter :productId="product_info.productId" :typeUser="product_info.type_user" :ZIndex="zIndex" :InfoList="mys_info.infoList" @contStar="getProduct" @followTips="showFollowTips"></chooseDetailFooter>
  </section>
</template>
<script>

import Vue from 'vue';
import shopDesc from './children/shopDesc';
import chooseDetailFooter from './children/chooseDetailFooter';
import pingjia from './children/pingjia';
import { productList,commitmentList, getjson } from '@/service/getData';
import listItem from './children/listItem';
import share from './children/share';
import server from './children/server';
import allEvaluate from './children/all_evaluate';
import {storage_custom} from '../../common/store';
import keyConf from '../../common/keyConf';
import Connaught from './children/Connaught';
import coupon from './children/coupon';
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
import { Toast } from 'mint-ui';
import '../../../node_modules/mint-ui/lib/toast/style.css'
export default {
  name: "detail",
  data() {
    return {
        isshowrule:false,//隐藏订购须知
      product_info: {
        productId: '', // 产品ID
        images: [],
        name: '',
        market_price: '',
        price: '',
        duration: '', // 服务时长
        service_form: '', // 服务形式
        commend: [],
        comments: [],
        product_favorite_count: '',
        num: '',
        picText_detail: '', // 图文详情(文本为主)
        img_detail: '', // 图文详情(图为主)
        commitList: [], // 服务承诺
        couponList: [], // 产品优惠券（该功能暂未开放）
        type_user: '', // 是否是美业师
        commit_type: '', // 服务承诺type
        dingjingShow: false, // 医美的就显示定金
        shop_price: '', // 医美的到店支付
        cate_id: 0, // 商品类别
      }, // 产品信息
      mys_info: {
        shoppingId: null, // 美业师店铺ID
        infoList: "", // 美业师信息
        streetlist: [],// 美业师商圈列表
        server_street: '', // 美业师商圈
      },

      scroll: '',
      alpha: "0",
      pingjia_top: "",
      details_top: "",
      shawShow: false, // 分享模块显示
      chengnuoShow: false, // 服务承诺显示
      couponShow: false, // 显示优惠券
      severShow: false, // 显示服务商圈
      pingjiaShow: false, // 显示全部评价
      zIndex: 0, // 底部栏--层级
      messageShow: false, // 显示产品留言
      orderDesc: [], // 显示赔付规则
      
      tabIndex: 1,
      tabStyle: {
        left: '0',
        width: '2rem'
      },
      flag: true,
    };
  },
  created() {
    $(window).scrollTop(0);
    // 判断参数是否带有美业师id，如果有，则显示底部的店铺
    this.mys_info.shoppingId = this.$route.query.stylist_id;
    this.getProduct();
    // 订购须知
    this.getConfigJson();
    // document.addEventListener('scroll', this.menu);
    if(this.$route.query.id==1000370 || this.$route.query.id==1000167 || this.$route.query.id==1000069){
        this.isshowrule=false
        console.log(this.$route.query.id)
    }else{
        this.isshowrule=true
        console.log(this.$route.query.id)
    }
  },
  mounted() {
    let tabBarDom = document.getElementById(`tab${this.tabIndex}`);
    this.tabStyle = {
      left: `${tabBarDom.offsetLeft}px`,
      width: `${tabBarDom.clientWidth}px`
    };
  },
  watch: {
    '$route'(to, from) {
      this.getProduct();
    }
  },
  methods: {
    async getConfigJson(){
      if(storage_custom.isExpire(keyConf.orderDesc)){
        let json =await getjson();
      if(json.status == 'ok'){
        storage_custom.set(keyConf.orderDesc,json.data);
        this.orderDesc = json.data.Compensation_rule;
        console.log(json)
      }
      }else{
        this.orderDesc = storage_custom.get(keyConf.orderDesc).Compensation_rule;
      }
      
    },
    funTab(index, selector) {
      let dom = event.target, dom2 = dom.offsetParent;
      this.tabStyle = { left: `${dom2.offsetLeft}px`, width: `${dom.offsetWidth}px` };
      this.tabIndex = index;
      $("html,body").animate({ scrollTop: $("#" + selector).offset().top - 40 }, 500);
    },
    //滚动事件
    menu() {
      if (this.$route.path == (`/detail/${this.$route.params.id}`) && !this.pingjiaShow) { //当前页面监听滚动事件
        this.scroll = document.body.scrollTop;
        this.pingjia_top = $("#pingjia").offset().top;
        this.details_top = $("#details").offset().top;
        if (this.scroll < $(".swipe").height()) {
          this.alpha = this.scroll / $(".swipe").height();
        }
        else {
          this.alpha = 1;
        }
      }
    },
    // 分享的显示隐藏
    share_show() {
      this.shawShow = true;
    },
    share_hide() {
      this.shawShow = false;
    },
    // 服务承诺的显示隐藏
    chengnuo_show() {
      this.chengnuoShow = true;
    },
    chengnuo_hide() {
      this.chengnuoShow = false;
    },
    // 优惠券的显示隐藏
    coupon_show() {
      this.couponShow = true;
      // this.$refs.couponDetail.getCouponList;
    },
    coupon_hide() {
      this.couponShow = false;
    },
    // 服务商圈的显示和隐藏
    server_show() {
      this.severShow = true;
    },
    server_hide() {
      this.severShow = false;
    },
    // 全部评价的显示
    pingjia_show() {
      this.pingjiaShow = true;
      this.zIndex = 1000;
    },
    pingjia_hide() {
      this.pingjiaShow = false;
      this.zIndex = 0;
    },
    /* 获取产品详情 */
    async getProduct() {
      let _this = this;
      _this.product_info.productId = _this.$route.params.id;
      let result = await productList({ product_id: _this.product_info.productId, stylist_id: this.mys_info.shoppingId ? this.mys_info.shoppingId : 0});
      if (result.status == "ok") {
        _this.product_info.images = result.data.images.split(",");
        _this.product_info.name = result.data.name;
        _this.product_info.market_price = result.data.market_price;
        _this.product_info.price = result.data.price;
        _this.product_info.duration = result.data.duration;
        _this.product_info.service_form = result.data.service_form;
        _this.product_info.cate_id = result.data.cate_id;
        _this.product_info.commend = result.data.commend;
        _this.product_info.product_favorite_count = result.data.product_favorite_count;
        _this.product_info.comments = result.data.comments;
        _this.product_info.num = result.data.comments_count;
        _this.product_info.picText_detail = result.data.description ? result.data.description : '';
        _this.product_info.img_detail = result.data.new_pic_path ? result.data.new_pic_path.split(",") : '';
        _this.product_info.type_user = result.data.type_user ? result.data.type_user : ''; // 是否是美业师
        _this.product_info.dingjingShow = result.data.cate_id == 2048 ? true : false;//判断是否是医美
        _this.product_info.commit_type = result.data.cate_id ? result.data.cate_id : '1';
        _this.product_info.shop_price = result.data.shop_price ? result.data.shop_price : '0';
        if (result.data.stylists.length != 0 && result.data.stylists[0]) {
          _this.mys_info.infoList = result.data.stylists[0]; // 美业师信息
          _this.mys_info.shoppingId = _this.mys_info.infoList.stylist_id ? _this.mys_info.infoList.stylist_id : ''; // 店铺ID
          _this.mys_info.server_street = _this.mys_info.infoList.server_street_name; // 美业师商圈
          if (this.flag) {
            _this.mys_info.infoList.server_street_name.forEach(function(n, i) { // 美业师商圈列表
              n.data.forEach(function(m, j) {
                _this.mys_info.streetlist.push(m.s_name);
              })
            });
          }
          this.flag = false;
        }
        // this.product_info.couponList = result.data.store_coupon; // 优惠券(该功能暂未开放)
        this.getCommitmentList();
      } else {
        alert(result.msg);
        this.$router.go(-1);
      }
    },
    /* 获取产品对应的服务承诺 */
    async getCommitmentList() {
      let res = await commitmentList({ type: this.product_info.commit_type });
      if (res.status == "ok") {
        this.product_info.commitList = res.data;
      }
    },
    /* 关注、取消关注提示 */
    showFollowTips (tipMsg) {
      Toast({
        message: tipMsg,
        duration: 1000,
        position: 'top',
        className: 'toast-tip'
      })
    },
  },
  components: {
    chooseDetailFooter,
    pingjia,
    shopDesc,
    share,
    Connaught, // 承诺
    coupon, // 优惠券
    server, // 服务商圈
    allEvaluate, // 全部评价
    listItem
  }
};

</script>
<style>
  /*处理v-html中的样式*/
  .picText_detail img {
    display: block;
  }
</style>

<style lang="scss" scoped>
@import '../../../node_modules/mint-ui/lib/swipe/style.css';
@import '../../../src/assets/css/mixin.scss';

.detail {
  background-color: #F3F3F3;
  color: #000;
  max-width: 37.5rem;
  height: 100%;
  .main {
    background-color: $bodyBg;
  }
  /*顶部模块*/
  .top {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    @include wh(100%, 3.5rem);
    border-bottom: 0.05rem solid #999;
    background-color: #fff;
    ul {
      display: flex;
      width: 100%;
      padding: 0 6.75rem;
      li {
        position: relative;
        flex: 1;
        text-align: center;
        line-height: 3.5rem;
        font-size: 1.5rem;
        .active {
          color: $themeRed;
        }
        a {
          display: block;
          color: #999;
          cursor: pointer;
        }
      }
      .line {
        content: "";
        display: block;
        height: 0.3rem;
        background-color: $themeRed;
        position: absolute;
        bottom: 0.05rem;
        transition: left .2s, width .2s;
      }
    }
    .left {
      position: absolute;
      @include wh(3.2rem, 3.2rem);
      @include bis("../../../src/assets/image/icon/detail/details_btn_return02.png");
      left: 1.2rem;
      top: 0.15rem;
    }
    .right {
      position: absolute;
      @include wh(3.2rem, 3.2rem);
      @include bis("../../../src/assets/image/icon/detail/details_btn_share02.png");
      right: 1.5rem;
      top: 0.15rem;
    }
  }
  /*banner部分*/
  .banner {
    position: relative;
    background-color: #fff;
    .back {
      position: absolute;
      width: 3.2rem;
      height: 3.2rem;
      z-index: 1;
      top: 2rem;
      left: 1.5rem;
      @include bis("../../../src/assets/image/icon/detail/details_btn_return01.png");
    }
    .share {
      position: absolute;
      width: 3.2rem;
      height: 3.2rem;
      z-index: 1;
      top: 2rem;
      right: 1.5rem;
      @include bis("../../../src/assets/image/icon/detail/details_btn_share01.png");
    }
    .swipe {
      @include wh(100%, 33.5rem);
      margin-top: 3rem;
      img {
        display: block; // width: 100%;
        height: 100%;
        margin: 0 auto;
      }
    }
    .descript {
      padding: 2rem 1.5rem 2rem 0;
      margin-left: 1.5rem;
      border-bottom: 0.05rem dashed #ccc;
      .pay_more {
        display: block;
        font-size: 1.3rem;
        color: #999;
        text-align: left;
        line-height: 1.2rem;
        margin: 0.6rem 0 0rem;
      }
      p {
        font-size: 1.6rem;
        color: #000;
      }
      div {
        overflow: hidden;
        margin-top: 0.7rem;
        i {
          float: left;
          width: 2.8rem;
          height: 1.5rem;
          font-size: 1rem;
          color: #fff;
          border-radius: 0.4rem;
          background-color: $themeRed;
          text-align: center;
          line-height: 1.5rem;
          margin: 0.6rem 0.5rem 0 0;
        }
        .price {
          @include sc(1.8rem, #e65058);
          margin-right: 0.8rem;
          float: left;
          span {
            @include sc(1.2rem, #999);
            text-decoration: line-through;
            margin-left: 0.5rem;
          }
        }
        .star {
          float: right;
          @include sc(1.3rem, #999); // &:before {
          //   content: "";
          //   display: inline-block;
          //   @include wh(1.4rem, 1.2rem);
          //   @include bis("../../../src/assets/image/icon/detail/icon_share.png");
          //   margin-right: 0.5rem;
          //   vertical-align: baseline;
          // }
        }
      }
    }
    .service {
      display: flex;
      position: relative;
      height: 4.4rem;
      line-height: 4.4rem;
      padding: 0 0.8rem 0 1.5rem;
      box-sizing: border-box;
      span {
        flex: 1;
        font-size: 1.2rem;
        color: #000;
        img {
          @include wh(1.8rem, 1.8rem);
          vertical-align: middle;
          margin-top: -0.6rem;
          margin-right: 0.5rem;
          width: 1.8rem;
          height: 1.8rem;
        }
      }
/*      .icon1 {
        &:before {
          content: "";
          display: inline-block;
          @include wh(1.7rem, 1.7rem);
          @include bis("../../../src/assets/image/icon/detail/details_icon_promise01.png");
          margin-right: 0.5rem;
          margin-top: -0.4rem;
          vertical-align: middle;
        }
      }
      .icon2 {
        &:before {
          content: "";
          display: inline-block;
          @include wh(1.7rem, 1.7rem);
          @include bis("../../../src/assets/image/icon/detail/details_icon_promise02.png");
          margin-right: 0.5rem;
          margin-top: -0.4rem;
          vertical-align: middle;
        }
      }
      .icon3 {
        &:before {
          content: "";
          display: inline-block;
          @include wh(1.7rem, 1.7rem);
          @include bis("../../../src/assets/image/icon/detail/details_icon_promise03.png");
          margin-right: 0.5rem;
          margin-top: -0.4rem;
          vertical-align: middle;
        }
      }*/
      i {
        position: absolute;
        width: 0.7rem;
        height: 1.3rem;
        @include bis("../../../src/assets/image/icon/detail/icon_next.png");
        right: 1.5rem;
        top: 1.5rem;
      }
    }
    .coupon {
      position: relative;
      height: 4.4rem;
      line-height: 4.4rem;
      margin-left: 1.5rem;
      box-sizing: border-box;
      border-top: 0.05rem solid #ddd;
      .couponText {
        @include sc(1.4rem, #000);
        margin-right: 1.4rem;
      }
      .couponTip {
        display: inline-block;
        padding: 0 1rem;
        min-width: 8.4rem;
        height: 2rem;
        @include sc(1.3rem, #000);
        @include bis("../../../src/assets/image/img/detail/details_bg_coupon.png");
        line-height: 2rem;
        text-align: center;
        margin-right: 0.5rem;
      }
      i {
        position: absolute;
        width: 0.7rem;
        height: 1.3rem;
        @include bis("../../../src/assets/image/icon/detail/icon_next.png");
        right: 1.5rem;
        top: 1.5rem;
      }
    }
  }
  /*服务商圈*/
  .address {
    margin-top: 1rem;
    padding: 0 1.5rem 0;
    background-color: #fff;
    .time,
    .mode {
      @include sc(1.4rem, #000);
      height: 4.4rem;
      line-height: 4.4rem;
      border-bottom: 0.05rem solid #ddd;
      span {
        color: #000; // margin-left:1.8rem;
      }
      &:before {
        @include wh(1.8rem, 1.8rem);
        content: "";
        display: inline-block;
        vertical-align: sub;
        margin-right: 1rem;
      }
    }
    .time:before {
      @include bis("../../../src/assets/image/icon/detail/details_icon_time.png");
    }
    .mode:before {
      @include bis("../../../src/assets/image/icon/detail/details_icon_mode.png");
    }
    .sq {
      padding-bottom: 2.4rem;
      p {
        @include sc(1.4rem, #000);
        margin: 1.2rem 0 1.4rem;
        &:before {
          @include wh(1.8rem, 1.8rem);
          content: "";
          display: inline-block;
          @include bis("../../../src/assets/image/icon/detail/details_icon_district.png");
          vertical-align: sub;
          margin-right: 1rem;
        }
      }
      .add {
        @include sc(1.3rem, #666);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      button {
        display: block;
        @include wh(12rem, 2.8rem);
        @include sc(1.3rem, #000);
        text-align: center;
        margin: 2.4rem auto 0;
        line-height: 2.8rem;
        background-color: transparent;
        @include borderRadius(0.4rem);
        border: 1px solid #000;
      }
    }
  }
  /*晒单评价*/
  .pingjia {
    margin-top: 1rem;
    background-color: #fff;
    padding: 2rem 1.5rem 2.4rem;
    .title {
      @include sc(1.6rem, #000);
      margin-bottom: 2.8rem;
    }
    .more {
      display: block;
      @include wh(12rem, 2.8rem);
      @include sc(1.3rem, #000);
      text-align: center;
      margin: 2.4rem auto 0;
      line-height: 2.8rem;
      background-color: transparent;
      @include borderRadius(0.4rem);
      border: 1px solid #000;
    }
  }
  .orderInfo{
    margin-top: 1rem;
    padding-left: 1.3rem;
    @include bgColor($bgWhite);
    .title{
      padding: 1.3rem 0;
      .left{
        @include sc(1.6rem,$bgBlack)
      }
      .right{
        position: relative;
        line-height: 2.8rem;
        span:first-child{
          padding-right: 3.2rem;
          @include sc(1.2rem, #999);
        }
        span.icon{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 1.5rem;
          @include wh(.7rem,1.3rem);
          @include bis('/static/icon/order/icon_next.png');
        }
      }
    }
    .content{
      @include average_before(#ccc);
      ul{
        padding: 1.4rem 1.3rem 2.4rem 0;
      }
      li{
        @include sc(1.3rem,#666);
        line-height: 2.3rem;
      }
    }
  }
  /*图文详情*/
  .details {
    text-align: center;
    background-color: #fff;
    margin-top: 1rem;
    padding: 2.4rem 0;
    h4 {
      @include sc(1.6rem, #000)
    }
    i {
      display: block;
      width: 2rem;
      height: 0.3rem;
      background-color: #000;
      margin: 1rem auto;
    }
    p {
      margin-bottom: 1.5rem;
      span {
        position: relative;
        @include sc(1.6rem, #000);
        &:before,
        &:after {
          content: "";
          position: absolute;
          width: 8.7rem;
          border-bottom: 1px solid #000;
          top: 1.1rem;
        }
        &:before {
          left: -11rem;
        }
        &:after {
          right: -11rem;
        }
      }
    }
    /*图文详情--文*/
    .picText_detail {
      text-align: left;
      padding-bottom: 1rem;
      font-size: 1.2rem;
    }
    /*图文详情--图*/
    .img_detail {
      width: 100%;
      img {
        width: 100%;
      }
    }
    .product {
      margin-bottom: 1rem;
    }
    img {
      width: 100%;
    }
  }
  /*为你推荐*/
  .tuijian {
    text-align: center;
    background-color: #fff;
    margin-top: 1rem;
    padding: 2.4rem 0;
    div {
      background-color: #fff;
      overflow: hidden;
      padding-bottom: 2rem;
    }
    h4 {
      @include sc(1.6rem, #000)
    }
    i {
      display: block;
      width: 2rem;
      height: 0.3rem;
      background-color: #000;
      margin: 1rem auto;
    }
    p {
      margin-bottom: 1.5rem;
      span {
        position: relative;
        @include sc(1.6rem, #000);
        &:before,
        &:after {
          content: "";
          position: absolute;
          width: 13.7rem;
          border-bottom: 1px solid #000;
          top: 1.1rem;
        }
        &:before {
          left: -15.5rem;
        }
        &:after {
          right: -15.5rem;
        }
      }
    }
    .product {
      margin-bottom: 1rem;
    }
    img {
      width: 100%;
    }
    /*推荐产品列表*/
    .pro_box {
      padding-left: 1rem;
    }
  }
}
</style>
