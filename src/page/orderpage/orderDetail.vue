<template>
  <div class="order-detail">
    <div class="bg" v-show="showTip">
      <div class="alert">
        <h2 class="title">喵喵提示</h2>
         <div class='p'>{{alercontent[showStatus]}}</div> 
        <div class="relative">
           <div class="btn clear" v-if="this.showStatus === 0 || this.showStatus === 201 || this.showStatus === 202"> 
            <div class="left" @click="$router.push({name:'cancelOrder',params:{ordersn:order.sn}})">确定取消</div>
            <div class="left" @click="cancelBg">暂不取消</div>
          </div>
           <div class="btn clear" v-if="this.showStatus === 300"> 
            <div class="left" @click="serviceStart">确定开始</div>
            <div class="left" @click="cancelBg">取消</div>
          </div>
           <div class="btn clear" v-if="this.showStatus === 11000 || this.showStatus === 301"> 
            <div class="left" @click="cancelBg">取消</div>
            <div class="left" @click="confirm">确定</div>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed">
      <div class="header">
        <div class="title">
          <h2>{{title}}</h2>
        </div>
        <a class="back" href="javascript:void(0);" @click="$router.go(-1)" ></a>
      </div>
    </div>
    <!-- 订单状态 -->
    <div class="order-status clear">
      <div class="left">
        <p class="waitPay">{{ this.title_desc.title}}</p>
        <span>{{ this.title_desc.desc}}</span>
      </div>
      <div class="right" v-show="timeServer > 0">
        <i class="icon"></i>
        <span class="time">{{timeDown}}</span>
      </div>
    </div>
    <!-- 订单状态 -->
    <!-- 订单内容 -->
    <div class="order-content">
      <div class="info" v-if="order.stylist && order.stylist.length > 0 && order.order_product.length > 0">
        <img :src="(order.stylist && order.stylist.length > 0 && order.stylist[0].user_img ? order.stylist[0].user_img:require('../../assets/image/icon/detail/details_photo_store60px.png'))" alt="">
        <!-- <span>{{(order.stylist && order.stylist.length > 0 ? order.stylist[0]:{}).nick}}</span> -->
        <span>{{(order.stylist && order.stylist.length > 0 ? order.stylist[0]:{}).store_name}}</span>
        <a class="icon" :href="(order.order_product[0]).seller_id"></a>
      </div>
      <div class="product" v-for="(item,index) in order.order_product" :key="index">
        <div class="info">
          <p class="name">{{item.product_name}}</p>
          <p class="price">
            <span>￥{{item.product_price}}</span>
            <del>￥{{item.market_price}}</del>
            <span><small>x</small> {{item.product_number}}</span>
          </p>
        </div>
        <img :src="item.thumb | productImg" alt="">
      </div>
      <div class="price">
        <p class="clear" v-if="order.coupon_paid && order.coupon_paid != 0">
          <span class="left">优惠券</span>
          <span class="right">-￥{{order.coupon_paid}}</span>
        </p>
        <p class="clear" v-if="order.balance_paid && order.balance_paid != 0">
          <span class="blance">余额</span>
          <span class="right">-￥{{order.balance_paid}}</span>
        </p>
        <p class="clear" v-if="order.points_paid && order.points_paid != 0">
          <span class="blance">猫粮</span>
          <span class="right">-￥{{order.points_paid}}</span>
        </p>
        <p class="clear">
          <span class="pay">需支付</span>
          <span class="right">￥{{order.need_to_pay}}</span>
        </p>
      </div>
       <div class="contact">
        <ul class="clear">
          <!--<li class="left">
            <a :href="`tel:${(order.stylist && order.stylist.length > 0 && order.stylist[0].mobile.length > 0? order.stylist[0].mobile :'4008335138')}`">
              <span>商家客服</span>
              <icon></icon>
            </a>
          </li> -->
          <!-- <li class="left"><div class="center"></div></li> -->
          <li class="left">
            <a href="tel:4008335138">
              <span>俏猫客服</span>
              <icon></icon>
            </a>
          </li>
        </ul>
      </div> 
    </div>
    <!-- 订单内容 -->
    <!-- 服务方式 -->
    <div class="service-type">
      <p>
        <span>{{(order.service_form && order.service_form == 1) ? "上门服务" : "到店服务"}}</span>
        <icon></icon>
      </p>
      <p>
        <span>{{(order.contact && order.contact.consignee) ? order.contact.consignee : ''}} {{(order.contact && order.contact.mobile) ? order.contact.mobile : ''}}</span>
        <icon></icon>
      </p>
      <p>
        <span>{{order.send_time}}</span>
        <icon></icon>
      </p>
      <p>
        <span>{{order.address}}</span>
        <icon></icon>
      </p>
    </div>
    <!-- 服务方式 -->
    <!-- 订单信息 -->
    <div class="order-info">
      <p><span>订单编号：{{order.sn}}</span> <a href="javascript:void(0);" class="copy" v-clipboard="order.sn" @success="handleSuccess" @click="handleSuccess" @error="handleError">复制</a></p>
      <p>下单时间：{{order.created_at}}</p>
    </div>
    <!-- 订单信息 -->
    <div class="btn">
        <a class="back-btn" @click="$router.push('/home/recommend')">返回首页</a>
      <a v-if="order.order_status===0 && timeServer >= 0" href="javascript:void(0);" @click.stop="payment" class="right pay bgYellow">去支付</a>
      <a v-if="order.order_status===300" class="right startService bgYellow" href="javascript:void(0)" @click.stop="orderStart">开始服务</a>
      <a v-if="order.order_status===201 || order.order_status===202 || order.order_status===300 || order.order_status===302 || order.order_status===1 || (order.order_status === 0 && timeServer > 0)" class="right cancel normal" href="javascript:void(0)" @click.stop="cancelOrder">取消订单</a>
      <a v-if="(order.order_status===1000 || order.order_status===1200) && order.comments_num === 0" class="right evaluate bgYellow" href="javascript:void(0)" @click.stop="$router.push({name:'evaluate',params:{sn: order.sn}})">去评价</a>
      <!-- <a v-if="order.order_status===11000 || order.order_status===1000 || order.order_status===1200 || order.order_status===11000 || order.order_status===10000" class="right closed normal" href="javascript:void(0)" @click.stop="$router.push({name:'order',params:{id:(order.order_product[0]).id}})">再次购买</a> -->
      <a v-if="order.order_status===11000 || order.order_status===1000 || order.order_status===1200 || order.order_status===11000 || order.order_status===10000" class="right closed normal" href="javascript:void(0)" @click.stop="biginGuy(order.order_product[0].id)">再次购买</a>
      <a v-if="order.order_status===301" class="right Conduct bgYellow" href="javascript:void(0)" @click.stop="orderCompleted">服务完成</a>
      
      <a v-if="order.order_status===11000 || (timeServer<=0 && order.order_status===0)" class="right cancel normal" href="javascript:void(0)" @click.stop="orderDelete">删除订单</a>
      <a v-if="(order.order_status===1200 || order.order_status===1000) && order.comments_num == 1" class="right cancel normal" href="javascript:void(0)" @click.stop="$router.push({name:'evaluate',params:{sn: order.sn}})">追加评价</a>  

    </div>
    <first-order-tip @closeFirstOrder="closeFirstOrder" v-show="isShowFirstOrder" :jfk = "jfk"></first-order-tip>
  </div>
</template>
<script>
import {getOrder,cancelOrder,startService,endService,delOrder} from '../../service/getData';
import common from '../../common/common';
import Vue from 'vue';
const VueClipboards = require('vue2-clipboards');
Vue.use(VueClipboards);
import firstOrderTip from './children/firstOrderTip';
export default {
  name: 'orderDetail',
  data () {
    return {
      title: '订单详情',
      alercontent:{
        0:'美业师正精心准备为您服务，真的要取消吗？',
        11000: '确定要删除订单吗？',
        300: '亲，还没有到约定服务时间，请确认美业师是否到达为你服务',
        201:'距离约定服务时间不足24小时，取消订单会扣除相应违约金，详情看退款规则',
        301:'确定服务已经结束请给美业师做出评价吧'
      },
      // serviceStart: 0,
      ordersn: '',
      orderid:null,
      order: {},
      timeDown: '00:00',
      timeServer: 0,
      showTip: false,
      title_desc:{},
      desc_Status: 0,
      showStatus: -1,
      orderStatus:{
        0:{title: '等待付款', desc: '请在30分钟内付款'},
        1:{title: '等待商家接单', desc: '请耐心等候'},
        201: {title: '等待商家接单', desc: '请耐心等候'},
        202: {title: '等待商家接单', desc: '请耐心等候'},
        300: {title: '等待商家服务', desc: '商家将与您联系，请耐心等待'},
        301: {title: '服务进行中', desc: '请尽情享受服务'},
        302: {title: '等待商家接单', desc: '请耐心等候'},
        1000: {title: '等待买家评价', desc: '请为服务体验做出评价'},
        1200: {title: '服务已完成', desc: '请为服务体验做出评价'},
        1300:{title: '服务结束', desc: '欢迎进行再次购买'},
        10000: {title: '退款中', desc: '退款将于3个工作日返回原账户'},
        11000: {title: '订单已取消', desc: '用户取消订单成功'},
        12000: {title: '交易关闭', desc: '未付款，订单已取消'}
      },
      isShowFirstOrder: false,
      jfk: {}
    }
  },
  components:{
    firstOrderTip
  },
  created () {
    this.ordersn = this.$route.params.ordersn
    this.orderid = this.$route.params.orderid
    this.getOrder()
  },
  methods: {
      biginGuy(pro_id){
        let _this=this
        if(pro_id===1000167 || pro_id===1000370){

            _this.$router.push({
                name:'chooseorder',
                params:{
                    id:pro_id
                }
            })
        }else if(pro_id===1000069||pro_id===1000663||pro_id===1001104){
            _this.$router.push({
                name:'qcsgoshoporder',
                params:{
                    id:pro_id
                }
            })
        }
        else{
            _this.$router.push({
                name:"order",
                params:{
                    id:pro_id
                }
            })
        }
    },
    async getOrder(){
      let res = await getOrder({order_sn:this.ordersn,order_id:this.orderid})
      if(res.status == 'ok'){
        this.order = res.data[0];
        if(this.order.order_status === 0){
          this.countDown(); // 订单倒计时
          this.cancelOrderAPI(this.order); // 取消订单
          // this.setOrderType()
        }
        this.setTitle_desc()
      }else{
        alert(res.msg);
        this.$router.go(-1);
      }
    },
    // 删除订单
    confirm(){
      // alert('删除成功')
      if(this.order.order_status === 301){
        this.orderEnd()
      }else{
        this.orderDel()
      }
    },
    // 开始服务
    async serviceStart(){
      let res = await startService({order_sn:this.order.sn});
      if(res.status == 'ok'){
        this.showTip = false;
        this.order.order_status = 301;
        this.isShowFirstOrder = res.data.jfk && res.data.jfk.amount > 0 ? true : false;
        this.jfk = res.data.jfk;
      }else{
        this.showTip = false;
        alert(res.msg);
      }
    },
    async orderEnd(){
      let res = await endService({order_sn: this.order.sn})
      if(res.status === 'ok')
      {
        this.order.order_status = 1000
        this.showTip = false
      }else{
        alert(res.msg)
      }
    },
    async orderDel(){
      let res = await delOrder({order_sn: this.order.sn})
      if(res.status === 'ok')
      {
        this.showTip = false
        alert('删除订单成功')
        this.$router.push('/orderlist')
      }else{
        alert(`${res.msg}！请刷新重试！`)
      }
    },
    async cancelOrderAPI(order){
      let createTime = common.getDate(order.created_at)
      createTime.setMinutes(createTime.getMinutes()+30)
      let now = new Date()
      if(now > createTime){
        let res = await cancelOrder({order_sn: order.sn, type: 'user', reason: '订单已过期'})
      }
    },
    countDown () {
      let now = 0
      let time_server = 0
      let createTime = new Date()
      createTime = common.getDate(this.order.created_at)
      createTime.setMinutes(createTime.getMinutes()+30)
      now = (new Date()).getTime()
      time_server = createTime - now
      this.timeServer = time_server
      if(time_server<=0)
        return;
      common.countDown(time_server,(munite,second) => {
        this.timeDown = `${munite}:${second}`
      })
    },
    setOrderType(){
      this.order.order_status = this.order.order_status === 0 && this.timeServer <= 0 ? 11000 : this.order.order_status
      this.desc_Status = this.order.order_status === 0 && this.timeServer <= 0 ? 12000 : this.order.order_status
    },
    handleSuccess (){
      alert('复制成功')
    },
    handleError () {
      alert('复制异常，刷新重试')
    },
    setTitle_desc(){
        //0--等待付款(30分钟内完成)
      if(this.order.order_status === 0 && this.timeServer <= 0){
        this.order.order_status = 11000
        this.title_desc = this.orderStatus[12000]
        return
      }
        //11000--订单已取消(用户订单取消成功)
      if(this.order.order_status===11000 && this.order.three_paid>0){
        this.title_desc = this.orderStatus[12000]
        return
      }
        //1000--等待评价 1200--服务完成
      if((this.order.order_status===1000 || this.order.order_status===1200) && this.order.comments_num === 2)
      {
        this.title_desc = this.orderStatus[1300]//服务结束
        return
      }

      this.title_desc = this.orderStatus[this.order.order_status]
    },
    payment () {
      if(this.timeServer <= 0){
        alert('未付款，订单已取消')
        return
      }
      this.$router.push({name: 'payment', params: {orderid: this.order.sn}})
    },
    cancelOrder (){
      this.showStatus = 0
      this.showTip = true
    },
    cancelService (){
      this.$router.push({})
    },
    orderDelete(){
      this.showStatus = 11000
      this.showTip = true
    },
    orderStart(){
      this.showStatus = 300
      this.showTip = common.getDate(this.order.contact.send_time) > new Date('2017-06-19 11:00:00') ? true : false
    },
    orderCompleted(){
      this.showStatus = 301
      this.showTip = true
    },
    cancelBg () {
      this.showTip = false
    },
    closeFirstOrder(){
      this.isShowFirstOrder = false;
    }
  },
  filters: {
    productImg(imgUrl){
      if(!imgUrl){
        return require('../../assets/image/img/detail/square_default_bg.jpg');
      }else if(imgUrl.indexOf("http") > -1){
        return imgUrl;
      }else {
        return "http://pic.qiaocat.com/upload/"+imgUrl;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.order-detail{
  @include bgColor(#f3f3f3);
  .bg{
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.4);
    @include wh(100%,100%);
    z-index: 2;
    .alert{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      @include bgColor(#fff);
      // @include wh(27rem,17.25rem);
      width: 27rem;
      border-radius: 1.3rem;
      text-align: center;
      .title{
        padding-top: 2rem;
        @include sc(1.8rem,#000);
      }
      .p{
        padding:1.5rem 2.4rem 1.5rem;
        @include sc(1.6rem,#000);
      }
      .relative{
        position: relative;
        .btn{
          // position: absolute !important;
          // bottom: 0;
          @include average_before(#999);
          @include wh(100%,4.4rem);
          @include sc(1.8rem,#000);
          text-align: center;
          line-height: 4.4rem;
          button{
              
          }
          .left:first-child{
            color: #999;
            border-right: .05rem solid #999;
          }
          .left:first-child,.left:last-child{
            @include wh(50%,4.4rem);
          }
        }
      }
    }
  }
  .fixed{
    position: fixed;
    @include wh(100%,4rem);
    @include bgColor(#fff);
    z-index: 1;
  }
  .header{
    @include bgColor(#fff);
    position: relative;
    .title{
      @include wh(100%,4rem);
      // border-bottom: 1px solid #999;
      @include average(#999);
      line-height:4rem;
      text-align: center;
      h2{
        font-size: 1.8rem;
        color: #000;
        letter-spacing: 1px;
      }
    }
    .back{
      position: absolute;
      top: .7rem;
      left: .7rem;
      @include wh(2.4rem,2.4rem);
      background-image: url('../../assets/image/icon/login/nav_btn_return.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 2.2rem 2.2rem;
    }
    .edit{
      position: absolute;
      top: .8rem;
      right: 1.5rem;
      @include sc(1.6rem,#000);
    }
  }
  .order-status{
    @include bgColor(#fff);
    @include wh(100%,7.8rem);
    padding-top: 4rem;
    box-sizing: content-box;
    div.left{
      padding-left: 1.5rem;
      p.waitPay{
        letter-spacing: 1px;
        line-height: 5rem;
        height: 4rem;
        @include sc(1.6rem,#000);
      }
      span{
        letter-spacing: 1px;
        @include sc(1.2rem,#666);
      }
    }
    div.right{
      position: relative;
      i.icon{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -2rem;
        @include wh(1.7rem,1.7rem);
        @include bgi_2('/static/icon/order/indent_icon_userinfo03.png',1.7rem,1.7rem);
      }
      span.time{
        padding-right: 1.5rem;
        @include sc(1.5rem,#000);
        line-height: 6rem;
        letter-spacing: 1px;
      }
    }
  }
  .order-content{
    @include bgColor(#fff);
    margin-top: 1rem;
    padding-left: 1.5rem;
    // @include wh(100%,10rem);
    >.info{
      position: relative;
      @include wh(100%,5rem);
      line-height: 5rem;
      @include average(#999);
      img{
        @include wh(3rem,3rem);
        border-radius: 50%;
        vertical-align: middle;
      }
      span{
        padding-left: 1rem;
        @include sc(1.4rem,#000);
        letter-spacing: 1px;
      }
      a{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        @include wh(1.1rem,1.1rem);
        @include bgi_2('/static/icon/order/indent_icon_name.png',1.1rem,1.1rem);
        padding: 1.1rem;
      } 
    }
    .product{
      position: relative;
      @include wh(100%,11rem);
      @include average(#999);
      .info{
        height: 11rem;
        padding:2.7rem 0 2.7rem 1.5rem;
        padding-left: 10.5rem;
        p:first-child{
          line-height: 1.4rem;
          @include sc(1.4rem,#000);
        }
        p:last-child{
          position: relative;
          line-height: 6.5rem;
          span:first-child{
            @include sc(1.6rem,#000);
          }
          del{
            padding-left: 1rem;
            @include sc(1.2rem,#999);
          }
          span:last-child{
            position: absolute;
            right: 1.5rem;
            @include sc(1.4rem,#999);
          }
        }
      }
      img{
        position: absolute;
        @include wh(8rem,8rem);
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    >.price{
      padding: 1.6rem 0;
      @include average(#999);
      p{
        line-height: 2.3rem;
        span{
          @include sc(1.2rem, #000);
          &.right{
            margin-right: 1.5rem;
          }
        }
        &:last-child{
          span.right{
            color: #e65058;
          }
        }
      }
    }
    .contact{
      position: relative;
      @include wh(100%,4.4rem);
      // @include average(#999);
      // text-align: center;
      line-height: 4.4rem;
      div.center{
        margin-top: .7rem;
        display: inline-block;
        height: 3rem;
        border-left: .05rem solid #ccc;
      }
      li:first-child,li:last-child{
        width: 48%;
        text-align: center;
      }
      a{
        position: relative;
      }
      span{
        @include sc(1.2rem,#000);
      }
      icon{
        position: absolute;
        @include wh(2.4rem,2.4rem);
        
        left: -50%;
        top: 50%;
        transform: translate(-50%,-50%);

      }
      li:last-child{
        icon{
          @include bgi_2('/static/icon/order/indent_icon_qiaocat.png',2.4rem,2.4rem);
        }
      }
      li:first-child{
        icon{
          @include bgi_2('/static/icon/order/indent_icon_merchant.png',2.4rem,2.4rem);
        }
      }
    }
  }
  .service-type{
    margin-top: 1rem;
    // @include wh(100%,10rem);
    @include bgColor(#fff);
    padding: 2rem 0;
    padding-left: 1.5rem;
    p{
      // @include wh(100%,2.7rem);
      position: relative;
      icon{
        position: absolute;
        left: 0;
        top: 0.5rem;
        @include wh(1.7rem,1.7rem);
      }
      span{
        // padding-left: 2.5rem;
        display: block;
        padding: .5rem 0 .5rem 2.5rem;
        @include sc(1.3rem,#000);
      }
    }
    p:first-child{
      icon{
        @include bgi_2('/static/icon/order/indent_icon_userinfo01.png',1.7rem,1.7rem);
      }
    }
    p:nth-of-type(2){
      icon{
        @include bgi_2('/static/icon/order/indent_icon_userinfo02.png',1.7rem,1.7rem);
      }
    }
    p:nth-of-type(3){
      icon{
        @include bgi_2('/static/icon/order/indent_icon_userinfo03.png',1.7rem,1.7rem);
      }
    }
    p:last-child{
      icon{
        @include bgi_2('/static/icon/order/indent_icon_userinfo04.png',1.7rem,1.7rem);
      }
    }
  }
  .order-info{
    padding: 3rem 0rem 8rem 1.5rem;
    // @include average(#999);
    p{
      @include sc(1.2rem,#999);
      line-height: 2rem;
      span{
        @include sc(1.2rem,#999);
        padding-right: 1.5rem;
      }
      a#copy{
        @include sc(1.2rem,#000);
        padding:.5rem 1.5rem;
        border-radius: .4rem;
        @include bgColor(#fff);
      }
    }
  }
  .btn{
    position: fixed;
    bottom: 0;
    @include wh(100%,5rem);
    @include bgColor(#fff);
    z-index: 2;
    display: flex;
    justify-content: space-between;
    // line-height: 5rem;
    align-items: center;
    a{
    //   margin-right: 1.5rem;
      @include wh(30%,3.4rem);
    //   margin-top: .8rem;
      text-align: center;
      line-height: 3.4rem;
      
    }
    a.back-btn{
        // display: inline-block;
        margin-right: 0;
        background-color: #999;
        border: 1px solid #666;
        color: #fff;
        border-radius: .4rem;
    }
    a.bgYellow{
      border-radius: .4rem;
      @include bgColor($themeRed);
      @include sc(1.4rem, #fff);
     }
     a.normal{
      border-radius: .4rem;
      border: .05rem solid #ccc;
      @include sc(1.4rem, #666);
     }
     a.gray{
       @include bgColor(#e3dfdf);
       color: #666;
     }
  }
}
</style>