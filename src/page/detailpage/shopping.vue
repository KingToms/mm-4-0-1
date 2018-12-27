<template>
  <!-- <section class="shopping" :now="nowNum" :num="totalPage"> -->
  <section class="shopping" :now="nowNum" :num="sum">
    <!--顶部模块12312-->
    <div class="top">
      <span class="left" @click="$router.go(-1)" v-show="invoked"></span>
      <!-- <span class="right"  @click="share_show"></span> -->
    </div>
    <!--banner部分-->
    <div class="banner">
      <!--是否关注-->
      <div class="follow">
        <div class="button" v-show="invoked">
          <a class="followA" v-if="follow == '关注'" @click="guanzhu">关注</a>
          <a class="followA followed" v-else @click="cancle_guanzhu">已关注</a>
        </div>
      </div>
      <!--店铺名字和信息-->
      <div class="info clear">
        <i v-if="shoppingImg"  :style="{background:'url('+shoppingImg+') no-repeat center/contain'}"></i>
        <i class="kong" v-else></i>
        <div class="name" :class="{personal:shoptype==1}">
          <h3>{{shopDetail.store_name?shopDetail.store_name:""}}</h3>
          <p v-if="shopDetail.store_type ==1">{{shopDetail.level_name}}</p>
          <!-- <p v-if="shopDetail.store_type ==1">{{shopDetail.level | lever}}</p> -->
        </div>
        <div class="renz">
          <img src="../../../src/assets/image/icon/detail/default_icon_approve.png" />
          <!-- <span>认证</span> -->
        </div>
      </div>
      <!--关注与好评率-->
      <ul class="score clear">
        <li v-if="shopDetail.Agency_rate && shopDetail.Agency_rate !='0%'">
          <span>{{shopDetail.Agency_rate}}</span>
          <p>好评率</p>
        </li>
        <li v-else>
          <span>0</span>
          <p>暂无评价</p>
        </li>
        <li>
          <span>{{shopDetail.Order_rate?shopDetail.Order_rate:"50%"}}</span>
          <p>接单率</p>
        </li>
        <li>
          <span>{{shopDetail.fans?shopDetail.fans:0 }}</span>
          <p>关注数</p>
        </li>
      </ul>
    </div>
    <!--服务时间和商圈和领券-->
    <div class="severTime">
      <p class="time">
        <span>服务时间 <i>{{shopDetail.business_start}}</i>- <i>{{shopDetail.business_end}}</i></span>
        <span>最近可约 <i>今天</i> <i>{{shopDetail.appointment}}</i></span>
      </p>
      <ul class="count clear" @click="server_show">
        <!--<li @click="quanshow">-->
          <!--<img src="../../../src/assets/image/img/detail/shop_icon_coupon.png" alt="">-->
          <!--<p>立即领券</p>-->
          <!--<span>满199减10、满199减10</span>-->
        <!--</li>-->
        <li>
          <img src="../../../src/assets/image/img/detail/shop_icon_district.png" alt="">
          <p>服务商圈</p>
          <span>{{server_addres_content}}</span>
          <i><img src="../../../src/assets/image/icon/detail/details_btn_return02.png" alt=""></i>
        </li>
      </ul>
    </div>
    <!--我的团队-->
    <div class="team" style='display: none'>
      <h4>我的团队【<i>10</i>】</h4>
      <div class="line"></div>
      <p>MY TEAM</p>
      <div class="team_list">
        <ul class="clear ullist" v-length>
          <li>
            <router-link to="/">
              <img src="../../../src/assets/image/img/detail/shop_photo_default_team.png">
              <p>张丽莎</p>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <img src="../../../src/assets/image/img/detail/shop_photo_default_team.png">
              <p>张丽莎</p>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <img src="../../../src/assets/image/img/detail/shop_photo_default_team.png">
              <p>张丽莎</p>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <img src="../../../src/assets/image/img/detail/shop_photo_default_team.png">
              <p>张丽莎</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!--服务项目、店铺简介、个人评价-->
    <div class="list">
      <mt-navbar v-model="selected" class="server_list">
        <mt-tab-item id="service_items">服务项目</mt-tab-item>
        <mt-tab-item id="shop_profile">店铺简介</mt-tab-item>
        <mt-tab-item id="customer_evaluation">顾客评价</mt-tab-item>
      </mt-navbar>
      <!-- 服务列表 -->
      <mt-tab-container v-model="selected" class="bgcfff">
        <!-- 服务项目 -->
        <mt-tab-container-item id="service_items" class="product_list">
          <div class="categary" v-show="categary.length > 1">
            <ul>
              <li :class="{'colorRed': selecteItem == '全部'}" @click="filter()">全部</li>
              <li v-for="(item,index) in categary" :data-id="index" :key="index" :class="{'colorRed': selecteItem == item.id}" @click="filter(item.id)">{{item.name}}</li>
            </ul>
          </div>
          <mt-navbar v-model="selecte">
            <!-- <listItem v-for="(item,index) in severlist" :key="index" :list="item"></listItem> -->
            <div v-for="(item,index) in severlist" :key="index" class="look_item">
              <a :href=" shoppingId ? `/detail/${item.id}?stylist_id=${shoppingId}` : `/detail/${item.id}`">
                <div class="look_part">
                  <div class="item_img">
                    <!-- <img v-lazy="list.images ? list.images : '../../../assets/image/img/detail/square_default_bg.jpg'" > -->
                    <!-- :style="{backgroundImage : 'url('+myimgs+')'}" -->
                    <div class="img_box" >
                      <a class="product_img" :href=" shoppingId ? `/detail/${item.id}?stylist_id=${shoppingId}` : `/detail/${item.id}`">
                        <!-- <img src="../../../assets/image/icon/detail/square_default_bg.jpg"> -->
                        <img :src="imgFilter(item.images)">
                      </a>
                    </div>
                  </div>
                  <p class="pro_desc">
                    <span>{{item.name}}</span>
                  </p>
                  <p class="price">
                    <span class="discount_price">￥{{item.price}}</span>
                    <span class="original_price">￥{{item.market_price}}</span>
                    <span class="follow">{{item.product_favorite_count}}</span>
                  </p>
                </div>
              </a>
            </div>
          </mt-navbar>
        </mt-tab-container-item>
        <!-- 店铺简介 -->
        <mt-tab-container-item id="shop_profile">
          <shop_profile  :detail="profile"></shop_profile>
        </mt-tab-container-item>
        <!-- 顾客评价 -->
        <mt-tab-container-item id="customer_evaluation">
          <customer_pingjia v-for="(item,index) in evaluation" :key="index" :list="item"></customer_pingjia>
          <mt-spinner type="fading-circle" v-if="more_show" color="#26a2ff" :size="40" style="margin: 0 auto"></mt-spinner>
          <p id="more">{{message}}</p>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <!--服务项目-->
    <!--<mt-tab-container v-model="selecte" class="bgcfff">-->
      <!--<mt-tab-container-item id="makeup">-->
        <!--<listItem v-for="(item,index) in list" :key="index" :list="item"></listItem>-->
      <!--</mt-tab-container-item>-->
      <!--<mt-tab-container-item id="beauty">-->
        <!--<listItem v-for="(item,index) in list" :key="index" :list="item"></listItem>-->
      <!--</mt-tab-container-item>-->
      <!--<mt-tab-container-item id="tattoo">-->
        <!--<listItem v-for="(item,index) in list" :key="index" :list="item"></listItem>-->
      <!--</mt-tab-container-item>-->
      <!--<mt-tab-container-item id="medical_beauty">-->
        <!--<listItem v-for="(item,index) in list" :key="index" :list="item"></listItem>-->
      <!--</mt-tab-container-item>-->
    <!--</mt-tab-container>-->
    <!--优惠券-->
    <coupon v-if="coupon_show" @coupon_hide="quanhide"></coupon>
    <!--服务商圈-->
    <server_shopping v-if="address_show" @server_hide="server_hide" :list="server_addres"></server_shopping>
  </section>

</template>
<script>
  import Vue from 'vue';
  import keyConf from '../../common/keyConf'
  import shop_profile from './children/shop_profile';
  import customer_pingjia from './children/customer_pingjia';
  import coupon from './children/coupon';
  import listItem from './children/listItem';
  import server_shopping from './children/server_shopping';
  import { Navbar, TabItem, TabContainer, TabContainerItem,Spinner,MessageBox } from 'mint-ui';
  import '../../../node_modules/mint-ui/lib/style.css';
  import {follow,unfollow,follow_list,store_detail,sever_list,introduction,store_ment,address} from '@/service/getData';
  Vue.component(Navbar.name, Navbar);
  Vue.component(TabItem.name, TabItem);
  Vue.component(TabContainer.name, TabContainer);
  Vue.component(TabContainerItem.name, TabContainerItem);
  Vue.component(Spinner.name, Spinner);
  export default {
    name: 'shopping',
    data() {
      return {
        shoppingId:"",//美业师id
        follow:"关注",//是否关注
        selected:"service_items",//一级切换
        selecte:"makeup",//二级切换
        selecteItem: '全部', // 选择的类别  默认为全部
        coupon_show:false,//优惠券的显示隐藏
        address_show:false,//服务商圈的显示隐藏
        more_show:false,
        shopDetail:{},//店铺的详情
        shoptype:"",//店铺类别 1为个人店铺，2为机构店铺
        severlist:[],//店铺服务项目
        allSeverList: [], // 所有的店铺服务项目
        categary: [], // 服务类别
        profile:{},//店铺服务简介
        evaluation:[],//顾客评价列表
        totalPage:"",//总评价页数
        sum: 0, // 评价总记录数
        nowNum:1,//每次请求的页数
        state:true,
        message:"加载更多",
        server_addres:{},//服务商圈地址
        server_addres_content:"",
        shoppingImg:"",
        invoked: true, // 页面是否被ios、android调用，调用则为false
      }
    },
    watch:{
      selected (newValue, oldValue){
        newValue=="service_items"?this.selecte="makeup":this.selecte="";
        if(newValue=="shop_profile"){this.shopp_profile()};//店铺服务简介
        if(newValue=="customer_evaluation"){this.pingjia()};//客户的评价
        if(this.$route.path == (`/detail/shopping/${this.$route.params.shopid}`) && newValue=="customer_evaluation"){
          this.loadmore();
        }
      }
    },
    created (){
      this.shoppingId=this.$route.params.shopid;//获取店铺或机构的id
      this.isInvoked();
      //判断该用户是否关注
      if(!$.cookie(keyConf.qm_cookie)){
        this.follow="关注";
      }else{
        this.guanzhu_list ();
      };
      this.storeDetail();//店铺的详情
      this.severList ();//店铺的服务项目
      this.shopAddre();//服务商圈地址
      if(this.$route.query.plid){
        $.cookie('shopping_plid', this.$route.query.plid, {path: '/'})
      }
    },
    mounted (){
      
      /*确保产品图片显示正方形*/
      let _this = this;
      $(window).resize(function() {
        _this.squareImg();
      });
    },
    methods: {
      quanshow (){
        this.coupon_show=true;//优惠券的显示隐藏
      },
      quanhide (){
        this.coupon_show=false;//优惠券的显示隐藏
      },
      server_show (){
        this.address_show=true;//服务商圈的显示隐藏
      },
      server_hide (){
        this.address_show=false;//服务商圈的显示隐藏
      },
      /*当前页面是否被ios或者android调用webview,若调用,则隐藏返回按钮*/
      isInvoked (){
        let query = this.$route.query
        query = query ? query : {}
        if(query.app == 'ios' || query.app == 'android'){ // IOS、Android端不弹框
          this.invoked = false;
        }
      },
      //关注
      async guanzhu(){
        let query = this.$route.query
        query = query ? query : {}
        if(query.app == 'ios' || query.app == 'android'){ // IOS、Android端不弹框
          location.href = "?follow";
        }else if(!$.cookie(keyConf.qm_cookie)){
          this.$router.push({name: "login", query: {url:"/detail/shopping/"+this.shoppingId}});
        }else{
          let res = await follow({stylistId:this.shoppingId});
          if(res.status == "ok"){
            this.follow="";
            this.storeDetail ();
          }
        }
      },
      //取消关注
      async cancle_guanzhu (){
        let query = this.$route.query
        query = query ? query : {}
        if(query.app == 'ios' || query.app == 'android'){ // IOS、Android端不弹框
          location.href = "?unfollow";
        }else if(!$.cookie(keyConf.qm_cookie)){
          this.$router.push({name: "login", query: {url:"/detail/shopping/"+this.shoppingId}});
        }else{
          let res = await unfollow({stylistId:this.shoppingId});
          if(res.status == "ok"){
            this.follow="关注";
            this.storeDetail ()
          }
        }
      },
      //获取关注列表
      async guanzhu_list (){
        let _this=this;
        let res = await follow_list();
        res.data.result.forEach(function (n,i) {
          if(n.id == _this.shoppingId){
            _this.follow="";
            return;
          }0
        })
      },
      //获取该店铺的详情
      async storeDetail (){
        let res = await store_detail({storeId:this.shoppingId});
        if(res.status == "ok"){
          this.shopDetail=res.data;
          console.log(res.data)
          this.shoptype=res.data.store_type;
          if(!res.data.user_img){
            this.shoppingImg=false;
          }else{
            if(res.data.user_img.indexOf("http") != -1){
              this.shoppingImg=res.data.user_img;
            }else{
              this.shoppingImg="http://pic.qiaocat.com/upload/" + res.data.user_img;
            }
          }
        }else{
         alert("您访问的店铺["+this.shoppingId+"]不存在！");
          this.$router.push('/');
        }

      },
      //获取该店铺的服务项目sever_list
      async severList (){
        let res = await sever_list({storeId:this.shoppingId});
        // this.severlist=res;
        this.allSeverList = res.store_service;
        this.categary = res.service_classification;
        this.filter();
      },
      //获取该店铺的简介profile
      async shopp_profile (){
        let res = await introduction({storeId:this.shoppingId});
        this.profile=res;
      },
      //顾客评价
      async pingjia (){
        this.nowNum=1;
        let res = await store_ment({stylist_id:this.shoppingId,page_no:this.nowNum,per_page:10,type:0});
        // let res = await store_ment({stylist_id:this.shoppingId,page_no:1,per_page:2,type:0});
        this.evaluation=res.data;
        if(res.info){
          this.totalPage=res.info.zhong;
          this.sum=res.info.sum;
        }
      },
      //顾客评价
      async pingjiaMore (){
        let _this=this;
        let result = await store_ment({stylist_id:this.shoppingId,page_no:this.nowNum,per_page:10,type:0});
        // let result = await store_ment({stylist_id:this.shoppingId,page_no:1,per_page:2,type:0});
        if(result.status == "ok"){
          for (var i=0; i < result.data.length; i++) {
            _this.evaluation.push( result.data[i] );
          }
          this.state=true;
          if(result.info){
            this.totalPage=result.info.zhong;
            this.sum=result.info.sum;
          }
          this.more_show=false;
        }else{
          this.state=false;
        }
      },
      //获取服务商圈
      async shopAddre (){
        let res = await address({stylist_id:this.shoppingId});
        this.server_addres=res.data;
        this.server_addres_content=res.data.street[0]?res.data.street.join("、") : res.data.province+"、"+ res.data.city;
      },
      filter(param){
        
        if(!param){
          this.selecteItem = '全部';
          this.severlist = this.allSeverList;
          this.squareImg();
          return;
        }else {
          this.selecteItem = param;
          this.severlist = this.allSeverList.filter(function(item){
            return param === item.cate_id
          });
          this.squareImg();
        }
      },
      imgFilter(image){
        if (!image) {
          return "";
        } else {
          if (image.indexOf("http") != -1) {
            return image;
          } else {
            return  "http://pic.qiaocat.com/upload/" + image;
          }
        }
      },
      // 确保产品图片显示正方形
      squareImg(){
        let cw;
        setTimeout(function() {
          cw = $('.product_img').width();
          console.log("cw:",cw);
          $('.product_img').css({
            'height': cw + 'px'
          });

          $('.product_img img').each(function(index,item){
            let imgDom = new Image();
            imgDom.src = item.src;
            imgDom.onload = function (){
              let imgW = imgDom.width;
              let imgH = imgDom.height;
              if(imgW > imgH){ // 图：宽大于高
                $(item).addClass("horizontal");
              }else if(imgW < imgH){ // 图：宽小于高
                $(item).addClass("vertical");
              }else{ // 图：宽等于高
                $(item).removeClass("horizontal");
                $(item).removeClass("vertical");
              }
            }
          })
        }, 0);
      },

      //加载更多数据
      loadmore() {
        let _this=this;
        //当前页面监听滚动事件
        $(document).scroll(function () {//滚动条滚动的时候
            //if(_this.$route.path == (`/detail/shopping/${_this.$route.params.shopid}`) && _this.selected=="customer_evaluation"){
            //获取当前加载更多按钮距离顶部的距离
            let bottomsubmit = $('#more').offset().top;
            //获取当前页面底部距离顶部的高度距离
            let nowtop = $(document).scrollTop() + $(window).height();
            if(_this.$route.path == (`/detail/shopping/${_this.$route.params.shopid}`) && _this.selected=="customer_evaluation"){

            //当当前页面的高度大于按钮的高度的时候开始触发加载更多数据
            if (nowtop > bottomsubmit) {
              //如果为真继续执行，这个是用于防止滚动获取过多的数据情况
              if (_this.state == true) {
                //执行一次获取数据并停止再进来获取数据
                _this.state = false;
                //当前页数++
                _this.nowNum++;
                if( _this.evaluation.length >= _this.sum){_this.message="没有更多数据！";return;} //获取页数是否大于总页数
                _this.more_show=true;
                _this.pingjiaMore();
                //记录当前为第二页
              }
            }
          }
        });
      },
    },
    components:{
      shop_profile,
      customer_pingjia,
      coupon,
      listItem,
      server_shopping
    },
    filters:{
      lever (n){
        switch (n){
          case 0:
            return "见习";
          case 1:
            return "新晋";
          case 2:
            return "专业";
          case 3:
            return "高级";
          case 4:
            return "首席";
          case 5:
            return "明星";
          default:
            return "见习";
        }
      },
    },
    directives:{
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../src/assets/css/mixin.scss';
  .shopping{
    background-color: #F3F3F3;
    color: #000;
    /*顶部模块*/
    .top{
      position: absolute;
      top:0;
      left: 0;
      z-index: 5;
      @include wh(100%,auto);
      background-color: #fff;
      .left{
        position: absolute;
        @include wh(3.2rem,3.2rem);
        @include bis("../../../src/assets/image/icon/detail/details_btn_return01.png");
        left: 1.2rem;
        top: 2.1rem;
      }
      .right{
        position: absolute;
        @include wh(3.2rem,3.2rem);
        @include bis("../../../src/assets/image/icon/detail/details_btn_share01.png");
        right: 1.5rem;
        top: 2.1rem;
      }
    }
    /*banner部分*/
    .banner{
      @include wh(100%,35.5rem);
      background: url("../../../src/assets/image/img/detail/shop_bg_top.png") no-repeat center;
      background-size: cover;
      overflow: hidden;
      position: relative;
      .follow{
        @include wh(6.6rem,2.8rem);
        @include sc(1.4rem,$themeRed);
        text-align: center;
        line-height: 2.8rem;
        margin: 10.2rem 0 3rem 1rem;
      }
      .button{
        @include wh(6.6rem,2.8rem);
        background-color: $bgWhite;
      }
      .followA{
        display: inline-block;
        @include wh(6.6rem,2.8rem);
        color: $themeRed;
      }
      .followed{
        background-color: #fff;
        color: #999;
      }
      .info{
        height: 8rem;
        margin-left:1.5rem;
        i{
          float: left;
          width: 8rem;
          height: 8rem;
          border: 1px solid #ddd;
        }
        .kong{
          background: url('../../../src/assets/image/icon/detail/details_photo_store.png') no-repeat center/contain;
        }
        .name{
          float: left;
          margin-left: 0.5rem;
          width: 16rem;
          h3{
            @include sc(1.5rem,#000);
            margin-top:1.7rem;
          }
        }
        .personal{
          h3{
            line-height: 3rem;
            margin-top: 1rem;
          }
          p{
            width: 4.1rem;
            height: 1.6rem;
            background: url('/static/icon/coupon/product_bg_grade.png') no-repeat center/cover;
            @include sc(1.2rem,$bgWhite);
            line-height: 1.6rem;
            padding-left: .2rem;
          }
        }
        .renz{
          float: right;
          width: 10%;
          margin: 1.5rem 3rem 0 0;
          img{
            @include wh(5rem,2rem);
            // margin-left: 1rem;
          }
          span{
            float: left;
            @include wh(4rem,1.8rem);
            @include sc(1.1rem,#000);
            background-color: #ffe500;
            text-align: center;
            line-height: 1.8rem;
            border-radius: 0.4rem;
            margin-top:0.5rem;
          }
        }
      }
      .score{
        padding: 3.1rem 2rem 0;
        li{
          float: left;
          width: 33.333%;
          text-align: center;
          @include sc(1.6rem,#000);
          p{
            @include sc(1.3rem,#000);
          }
        }
      }
    }
    /*服务时间和商圈和领券*/
    .severTime{
      background-color: #fff;
      .time{
        @include sc(1.2rem,#666);
        text-align: center;
        span{
          &:first-child{
            margin-right:1rem;
          }
        }
      }
    }
    .count{
      li{
        float: left;
        padding: 0 1.5rem;
        width: 100%;
        height: 3.5rem;
        margin:3.5rem 0;
        img{
          float: left;
          width: 3.4rem;
          height: 3.4rem;
        }
        i{
          float: right;
          margin-top: -2rem;
          img{
            transform: rotate(180deg);
            width: 3.2rem;
            height: 3.2rem;
            display: inline-block;
          }
        }
        p{
          float: left;
          width: 80%;
          @include sc(1.4rem,#000);
          margin: -0.2rem 0 0 1.5rem;
        }
        span{
          float: left;
          @include sc(1.1rem,#e65058);
          /*width: 9.3rem;*/
          width: 58%;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          margin: -0.1rem 0 0 1.5rem;
        }
        &:first-child{
          /*border-right: 0.05rem solid #999999;*/
        }
        &:last-child{
        }
      }
    }
    // 服务项目
    .look_item {
      float: left;
      padding: 2rem 0 1.6rem 0;
      border-bottom: 1px solid #ddd;
      width: 50%;
      text-align: center;
      a {
        display: block;
        .look_part {
          .item_img {
            display: inline-block;
            width: 100%;
            .img_box {
              width: calc(100% - 1rem);
              float: left;
              border-radius: 0.4rem;
              background-color: #f3f3f3;
              background-position: center;
              background-size: cover;
              .product_img {
                width: 100%;
                position: relative;
                display: block;
                overflow: hidden;
                border-radius: 0.4rem;
                img {
                  display: block;
                  width: 100%;
                  position: absolute;
                  top: 0;
                  left: 0;
                  @include borderRadius(0.4rem);
                  &.horizontal {
                    height: 100%;
                    width: auto;
                    left: 50%;
                    transform: translateX(-50%);
                  }
                  &.vertical {
                    width: 100%;
                    height: auto;
                    top: 50%;
                    transform: translateY(-50%);
                  }
                }
              }
            }
          }
          .pro_desc {
            // text-align: left;
            text-align: center;
            padding-right: 1rem;
            height: 3rem;
            line-height: 1.5rem;
            font-size: 1.4rem;
            color: #000;
            margin-top: 0.5rem;
          }
          .price {
            position: relative;
            @include wh(100%, 1.5rem);
            margin-top: 0.5rem;
            .discount_price {
              margin-right: 1rem;
              font-size: 1.4rem;
              color: $themeRed;
              line-height: 2rem;
              height: 3.8rem;
            }
            .original_price {
              font-size: 1.2rem;
              color: #999;
              text-decoration: line-through;
            }
            .follow{
              display: inline-block;
              margin-left: 1rem;
              padding-left: 2rem;
              @include bgi_2('../../assets/image/icon/home/product_icon_collect.png',1.1rem,1.1rem,6px,3px);
            }
          }
        }
      }
    }

    /*我的团队*/
    .team{
      background-color: #fff;
      h4{
        @include sc(1.6rem,#000);
        text-align: center;
        position: relative;
        &:before{
          content: "";
          position: absolute;
          width: 30%;
          left: 0;
          top: 0.6rem;
          height: 0.9rem;
          border-bottom: 0.05rem solid #999;
        }
        &:after{
          content: "";
          position: absolute;
          width: 30%;
          right: 0;
          top: 0.6rem;
          height: 0.9rem;
          border-bottom: 0.05rem solid #999;
        }
      }
      .line{
        @include wh(2rem,0.2rem);
        background-color: #000;
        margin: 1rem auto;
      }
      P{
        @include sc(1.6rem,#000);
        text-align: center;
      }
      .team_list{
        overflow-x: auto;
        ul{
          margin: 2.9rem 0 5rem 0;
          height: 10.7rem;
          li{
            float: left;
            margin-left:2.5rem;
            @include wh(7.4rem,7.4rem);
            &:last-child{
              margin-right:1rem;
            }
            img{
              display: block;
              @include wh(7.4rem,7.4rem);
            }
            p{
              @include sc(1.3rem,#000);
              margin-top:1rem;
            }
          }
        }
      }
    }
    /*服务项目、店铺简介、个人评价*/
    .bgcfff{
      background-color: #fff;
      padding-left: 1rem;
      .categary ul{
        display: flex;
        height: 4.5rem;
        li{
          flex: 1;
          text-align: center;
          line-height: 4.5rem;
          @include sc(1.3rem,#000);
          &.colorRed{
            color: $themeRed;
          }
        }
      }
    }
    .list{
      margin-top:1rem;
      .server_list{
        height: 4.45rem;
        border-bottom: 0.05rem solid #999;
        a{
          color: #999;
        }
      }
      .product_list{
        /*height: 4.4rem;*/
      }
    }

    #more {
      text-align: center;
      margin: 4rem auto;
    }
  }
</style>

