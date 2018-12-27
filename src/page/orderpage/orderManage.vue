<template>
<div class="order-manage">
  <div class="bg" v-if="bgShow">
    <div class="alert">
      <h2 class="title">喵喵提示</h2>
      <div class='p'>{{alercontent[ordermanage.content]}}</div>
      <div class="relative">
        <div class="btn clear" v-if="ordermanage.orderStatus === 0 || ordermanage.orderStatus === 201 || ordermanage.orderStatus === 202 || ordermanage.orderStatus === 302 || ordermanage.orderStatus === 1">
          <div class="left" @click="cancelOrder">确定取消</div>
          <div class="left" @click="cancelBg">暂不取消</div>
        </div>
        <div class="btn clear" v-if="ordermanage.serviceStart === 1 && ordermanage.orderStatus === 300">
          <div class="left" @click="serviceStart">确定开始</div>
          <div class="left" @click="cancelBg">取消</div>
        </div>
        <div class="btn clear" v-if="ordermanage.orderStatus === 11000 || ordermanage.orderStatus === 301">
          <div class="left" @click="cancelBg">取消</div>
          <div class="left" @click="deleteOrder">确定</div>
        </div>
      </div>
    </div>
  </div>
  <div class="fixed">
    <div class="header">
      <div class="title">
        <span>{{title}}</span>
      </div>
      <a class="back" href="javascript:void(0);" @click="$router.go(-1)" ></a>
    </div>
    <div class="nav">
      <ul class="clear">
        <li class="left" @click="changeType([-1],-1)"><p :class="{'active': tab === -1}">全部</p></li>
        <li class="left" @click="changeType([0],0)"><p :class="{'active': tab === 0}">待付款</p></li>
        <li class="left" @click="changeType([1,201,202,300,302],201)"><p :class="{'active': tab === 201}">待服务</p></li>
        <li class="left" @click="changeType([301],301)"><p :class="{'active': tab === 301}">进行中</p></li>
        <li class="left" @click="changeType([1000,1200],1000)"><p :class="{'active': tab === 1000}">待评价</p></li>
        <li class="left" @click="changeType([10000,11000],10000)"><p :class="{'active': tab === 10000}">已取消</p></li>
      </ul>
    </div>
  </div>
  <div v-if="hasOrder" class="orderlist page-loadmore-wrapper" id="orderList">
    <order-item @getOrderList="getOrderList" :orders="orderList"></order-item>
  </div>
  <no-order v-if="!hasOrder"></no-order>
  <div class="tuijian" v-if="!hasOrder">
    <p><span>为你推荐</span></p>
    <i></i>
    <h4>RECOMMND</h4>
    <div class="pro_box">
      <listItem v-for="(item,index) in commend" :key="index" :list="item"></listItem>
    </div>
  </div>
  <first-order-tip @closeFirstOrder="closeFirstOrder" v-show="isShowFirstOrder" :jfk="jfk"></first-order-tip>
</div>
</template>
<script>
import Vue from 'vue';
import { Loadmore, Spinner } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);
Vue.component(Spinner.name, Spinner);
import firstOrderTip from './children/firstOrderTip';
import {mapState,mapMutations} from 'vuex';
import orderItem from './children/orderItem';
import noOrder from './children/noOrder';
import listItem from '../../page/detailpage/children/listItem';
import {getOrderList,cancelOrder,startService,endService,Reccommend,delOrder} from '../../service/getData';
import common from '../../common/common';
export default {
  name: 'orderManage',
  data () {
    return {
      title: '我的订单',
      tab: -1,
      alercontent:{
        0:'美业师正精心准备为您服务，真的要取消吗？',
        11000: '确定要删除订单吗？',
        300: '距离约定服务时间不足24小时，取消订单会扣除相应违约金，详情看退款规则',
        301: '确定服务已经结束，请给美业师做出评价吧',
        1: '亲，还没有到约定服务时间，请确认美业师是否到达为你服务',
      },
      // serviceStart: 0,
      // orderStatus: 0,
      // isRecommend: false,
      hasOrder: true, //是否有相对应状态的订单
      wrapperHeight: 0,
      allUseLoad: false,
      bottomText: '上拉加载更多',
      orders: [],
      commend:[],
      status:'',
      pageNo: 0,
      page_size: 10,
      totalCount: 0,
      currentLength: 0,
      flag: true,
      // orderStatus:{
      //   0:{type:'0',msg:'待付款'},
      //   1:{type:'1',msg:'等待美业师接单'},
      //   201:{type:'201',msg:'等待美业师接单'},
      //   202:{type:'202',msg:'等待美业师接单'}, // (针对美业师端)
      //   300:{type:'300',msg:'等待服务'},
      //   301:{type:'301',msg:'服务进行中'},
      //   1000:{type:'1000',msg:'服务完成未结算'},
      //   1200:{type:'1200',msg:'服务完成并已结算'},
      //   10000:{type:'10000',msg:'退款中'},
      //   11000:{type:'11000',msg:'退款成功'},
      //   11000:{type:'11000',msg:'服务关闭'},
      // },
      isScroll: true,
      isShowFirstOrder: false,
      jfk: {}
    }
  },
  computed:{
    ...mapState(['orderList','ordermanage','bgShow'])
  },
  components: {
    orderItem,
    noOrder,
    listItem,
    firstOrderTip
  },
  created(){
    this.getOrderList()
    this.getReccommend()
    this.scroll()
  },
  mounted (){
    if(document.getElementById("orderList"))
      this.wrapperHeight = document.documentElement.clientHeight - document.getElementById("orderList").getBoundingClientRect().top
  },
  methods: {
    ...mapMutations(['SET_ORDERLIST','SET_BGSHOWHIDE']),
    changeType (statusArr,choose){
      this.pageNo = 0
      this.status = statusArr.includes(-1) ? '' : statusArr.join(',')
      this.tab = statusArr.includes(choose) ? choose : -1
      this.orders = []
      this.totalCount = 0
      this.SET_ORDERLIST(this.orders)
      this.getOrderList()
      $(window).scrollTop(0)
    },
    async getOrderList (data){
      // && data.status
      let _this=this
      this.isScroll = false
      // this.flag = false
      this.pageNo = data ? data.page : ++this.pageNo;
      this.orders = data ? data.orders : this.orders
      let res = await getOrderList({status:this.status,page:this.pageNo,page_size:this.page_size});
      if(res.status === 'ok'){
        this.totalCount = res.data.count
        let tempArr = res.data.result
        if(this.status === '1000,1200') tempArr = this.judgeOrdersType(tempArr)
        this.orders = this.orders.concat(tempArr)
        // _this.$set(_this.data,'orders','_this.orders.concat(tempArr)')
        // debugger
        this.SET_ORDERLIST(this.orders)
        // this.flag = true
        this.hasOrder = tempArr.length > 0? true : false
        this.isScroll = true
        if (this.orders.length === this.totalCount || res.data.result.length<this.page_size)
          this.isScroll = false
          // this.setLoadMore()
      }
    },
    async getReccommend(){
      let res = await Reccommend({})
      if(res.status === 'ok')
        this.commend = res.data
    },
    scroll(){
      let _this = this
      if(_this.$route.path === '/orderlist'){
        common.scroll(()=>{
          if(_this.isScroll){
            _this.getOrderList()
          }
        })
      }
    },
    cancelBg(){
      this.SET_BGSHOWHIDE(false)
    },
    async serviceStart(){
      let res = await startService({order_sn: this.ordermanage.ordersn})
      if(res.status === 'ok'){
        this.isShowFirstOrder = res.data.jfk && res.data.jfk.amount > 0 ? true : false;
        this.jfk = res.data.jfk;
        // this.$emit('getOrderList',{page: 1, orders: []})
        this.pageNo = 0
        this.orders = []
        this.getOrderList()
        alert('请尽情享受服务')
        this.cancelBg();
        
      }else{
        alert(res.msg)
      }
    },
    judgeOrdersType (orders){
      let ordersArr =[]
      orders.forEach( item => {
        if( item.comments_num < 2 )
          ordersArr.push(item)
      })
      return ordersArr
    },
    cancelOrder(){
      this.cancelBg()
      this.$router.push({name:'cancelOrder',params:{ordersn:this.ordermanage.ordersn}})
    },
    async deleteOrder(){
      if(this.ordermanage.orderStatus==301){
        let res = await endService({order_sn: this.ordermanage.ordersn})
        if(res.status === 'ok'){
          this.cancelBg()
          this.$router.push(`/order/evaluate/${this.ordermanage.ordersn}`)
          // this.pageNo = 0
          // this.orders = []
          // this.getOrderList()
          // alert('订单删除成功')
          
        }else{
          alert(res.msg)
        }
      }else{
        let res = await delOrder({order_sn: this.ordermanage.ordersn})
        if(res.status === 'ok'){
          this.pageNo = 0
          this.orders = []
          this.getOrderList()
          alert('订单删除成功')
          this.cancelBg()
        }else{
          alert(res.msg)
        }
      }
    },
    getOrderListAndShowFirst(data){
      this.getOrderList(data);
    },
    closeFirstOrder(){
      this.isShowFirstOrder = false;
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.order-manage{
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
    @include bgColor(#fff);
    z-index: 1;
    width: 100%;
  }
  .header{
    @include bgColor(#fff);
    position: relative;
    width: 100%;
    .title{
      @include wh(100%,4rem);
      // border-bottom: 1px solid #999;
      @include average(#999);
      line-height:4rem;
      text-align: center;
      span{
        position: absolute;
        // left: 40%;
        transform: translateX(-50%);
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
  }
  div.nav{
    border-bottom: .05rem solid #ccc;
    overflow-x: auto;
    ul{
      width: 100%;
      // padding-left: 1.3rem;
      // @include wh(43.5rem,4.4rem);
      display: flex;
      li{
        position: relative;
        flex: 1;
        // @include wh(14%,4.4rem);
        height: 4.4rem;
        &:first-child{
          padding-left: 1rem;
          // @include wh(10%,4.4rem);
        }
        // padding: 0 .85rem;
        box-sizing: border-box;
        // text-align: center;
        line-height: 4.4rem;
        p{
          position: absolute;
          @include sc(1.4rem,#000);
          height: 4.4rem;
          padding: 0 .5rem;
          &.active{
            border-bottom: .4rem solid $themeRed;
            color: $themeRed;
          }
        }
        
      }
    }
  }
  .orderlist{
    padding-bottom: 5rem;
  }
  // .orderlist{
  //   padding-top: 8.4rem;
  // }
  /*为你推荐*/
    .tuijian{
      text-align: center;
      background-color: #fff;
      margin-top:1rem;
      padding: 2.4rem 0;
      div{
        background-color: #fff;
        overflow: hidden;
        padding-bottom:2rem;
      }
      h4{
        @include sc(1.6rem,#000)
      }
      i{
        display: block;
        width: 2rem;
        height: 0.3rem;
        background-color: #000;
        margin:1rem auto;
      }
      p{
        margin-bottom:1.5rem ;
        span{
          position: relative;
          @include sc(1.6rem,#000);
          &:before,&:after{
            content: "";
            position: absolute;
            width: 13.7rem;
            border-bottom: 1px solid #000;
            top: 1.1rem;
          }
          &:before{
            left: -15.5rem;
          }
          &:after{
            right: -15.5rem;
          }
        }
      }
      .product{
        margin-bottom:1rem;
      }
      img{
        width: 100%;
      }
      /*推荐产品列表*/
      .pro_box{
        padding-left: 1rem;
      }
    }
}
</style>