<template>
  <div class="order-item">
      <!-- <div @click="toorderdetail">1111</div> -->
      <div class="item" v-for="(item,index) in orderList" :key="index" @click="$router.push({name: 'orderDetail', params: {ordersn: item.sn,orderid:item.id}})">
        <div class="shop-info">
          <div class="info">
            <img :src=" funInstanceof(item.seller) ? item.seller.user_img:require('../../../assets/image/icon/detail/details_photo_store60px.png')" alt="美业师" title="美业师">
            <span>{{ funInstanceof(item.seller) ? item.seller.store_name:'俏猫'}}</span>
            <!-- <span>1111</span> -->
            <a href="###" class="icon"></a>
          </div>
          <!-- <span class="order-status">{{ (item.order_status === 1000 || item.order_status === 1200) && item.comments_num === 2 ? '服务结束' : orderStatus[item.order_status == 1000 ? item.order_status + '_'+ item.comments_num : item.order_status].USER_S}}</span> -->
          <span class="order-status">{{ (item.order_status === 1000 || item.order_status === 1200) && item.comments_num === 2 ? '服务结束' : orderStatus[item.order_status]}}</span>
        </div>
        <div class="product-info">
          <div class="info">
            <p class="name">{{(item.products[0]).name}}</p>
            <p class="price"><span>￥ {{(item.products[0]).price}} <del>￥ {{(item.products[0]).market_price}}</del></span><span class="sum"><span>X </span> {{item.products | getProductsCounts}}</span></p>
          </div>
          <img :src="(item.products[0]).thumb" alt="">
          <div class="refund" v-if="item.order_status === 10000">
            <span>退款中</span>
          </div>
        </div>
        <div class="order-opt">
          <ul>
            <li class="clear">
              <span v-if="item.order_status > 0" class="right">已支付: <span>￥{{item.already_paid}}</span></span>
              <span v-else class="right">需支付: <span>￥{{item.need_to_pay}}</span></span>
            </li>
            <li class="clear">
              <!-- $router.push({name: 'payment', params: {orderid: item.sn}}) -->
              <a v-if="item.order_status===0" href="javascript:void(0);" @click.stop="payment(item)" class="right pay">去支付</a>
              <a v-if="item.order_status===201 || item.order_status===202 || item.order_status===300 || item.order_status===0 || item.order_status===302 || item.order_status===1" class="right cancel" href="javascript:void(0)" @click.stop="cancelOrder(item.sn,item.order_status)">取消订单</a>
              <a v-if="(item.order_status===1000 || item.order_status===1200) && item.comments_num === 0" class="right evaluate" href="javascript:void(0)" @click.stop="$router.push({name:'evaluate',params:{sn: item.sn}})">去评价</a>
              <!-- <a v-if="item.order_status===11000 || item.order_status===1000 || item.order_status===1200 || item.order_status===11000 || item.order_status===10000" class="right closed" href="javascript:void(0)" @click.stop="$router.push({name:'order',params:{id:(item.products[0]).id}})">再次购买</a> -->
              <a v-if="item.order_status===11000 || item.order_status===1000 || item.order_status===1200 || item.order_status===11000 || item.order_status===10000" class="right closed" href="javascript:void(0)" @click.stop="biginGuy(item.products[0].id)">再次购买</a>
              <a v-if="item.order_status===301" class="right Conduct" href="javascript:void(0)" @click.stop="orderCompleted(item.sn,item.order_status)">服务完成</a>
              <a v-if="item.order_status===300" class="right startService" href="javascript:void(0)" @click.stop="orderStart(item.sn,item.order_status,item.contact.send_time)">开始服务</a>
              <a v-if="item.order_status===11000" class="right cancel" href="javascript:void(0)" @click.stop="orderDelete(item.sn,item.order_status)">删除订单</a>
              <!-- 追加评价的状态判断？？ -->
              <a v-if="(item.order_status===1200 || item.order_status===1000) && item.comments_num == 1" class="right cancel" href="javascript:void(0)" @click.stop="$router.push({name:'evaluate',params:{sn: item.sn}})">追加评价</a>  
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex';
import common from '../../../common/common';
import {startService, endService, cancelOrder, getConfigData, getOrder} from '../../../service/getData';
import {storage_custom} from '../../../common/store';
import keyConf from '../../../common/keyConf';
import { get } from 'http';
export default {
  name: 'orderItem',
  data () {
    return {
      orders:[],
      baseUrl:'',
      orderStatus:{
        0:'待付款',
        1: '待服务',
        201: '待接单',
        202: '待接单',
        300: '待服务',
        301: '进行中',
        302: '待接单',
        1000: '待评价',
        1200: '待评价',
        10000: '退款中',
        11000: '已取消',
        // 11000: '已取消'
      }
      // orderStatus: {}
    }
  },
  created(){
    // 从api调用接口展示订单状态
    //  if(storage_custom.isExpire(keyConf.orderStatus)){
    //   this.getConfigData();
    // }else{
    //   this.orderStatus = storage_custom.get(keyConf.orderStatus);
    // } 
    this.baseUrl=this.$route.query.baseUrl;
  },
  computed:{
    ...mapState(['orderList','bgShow','ordermanage'])
  },
  methods: {
    ...mapMutations(['SET_ORDERMANAGE','SET_BGSHOWHIDE']),
    biginGuy(pro_id){
        let _this=this
        if(pro_id===1000167 || pro_id===1000370 ){
            _this.$router.push({
                name:'chooseorder',
                params:{
                    id:pro_id
                }
            })
        }else if(pro_id===1000069 || pro_id===1001099||pro_id===1000663||pro_id===1001104){
            _this.$router.push({
                name:'qcsgoshoporder',
                params:{
                    id:pro_id
                }
            })
        }else{
            
            _this.$router.push({
                name:"order",
                params:{
                    id:pro_id
                }
            })
        }
    },
    funInstanceof(obj){
      return Object.prototype.toString.call(obj) === "[object Object]"
    },
    // 取消订单
    cancelOrder (ordersn,orderStatus){
      // if(orderStatus === 0){
        this.orderCURD({content: 0,serviceStart: 0,orderStatus:0,ordersn:ordersn,sendTime:''})
      // }else{
      //   this.$router.push({name:'cancelOrder',params:{ordersn:ordersn}})
      //  }
    },
    // 开始服务
    async orderStart(ordersn,orderStatus,send_time){
      let date = common.getDate(send_time)
      if( date > new Date() ){
        this.orderCURD({
          content: 1,
          serviceStart: 1,
          orderStatus:orderStatus,
          ordersn:ordersn
        })
      }else{
        let res = await startService({order_sn:ordersn})
        if(res.status === 'ok'){
          this.$emit('getOrderList',{page:1,orders:[]})
        }else{
          alert(res.msg)
        }
      }
    },
    // 结束服务
    async orderCompleted (ordersn,orderStatus){
      this.orderCURD({content: orderStatus,serviceStart: 0,orderStatus:orderStatus,ordersn:ordersn,sendTime:''})
      /* let res = await endService({order_sn: ordersn})
      if(res.status === 'ok'){
        this.$emit('getOrderList',{page:1,orders:[]})
      }else{
        alert(res.msg)
      } */
    },
    // 删除订单
    orderDelete (ordersn,orderStatus){
      this.orderCURD({content: orderStatus,serviceStart: 0,orderStatus:orderStatus,ordersn:ordersn,sendTime:''})
    },
    orderCURD(obj){
      let ordermanage = {
        content: obj.content,
        serviceStart: obj.serviceStart,
        orderStatus:obj.orderStatus,
        ordersn:obj.ordersn
      }
      this.SET_ORDERMANAGE(ordermanage)
      this.SET_BGSHOWHIDE(true)
    },
     async toorderdetail(){
        let _this=this
        let obj={
            order_id:512973,
            order_sn:"201811191009259505"
        }
        let res=await getOrder(obj)

    },
    async payment(item){
      let createTime = common.getDate(item.created_at)
      createTime.setMinutes(createTime.getMinutes()+30)
      let now = new Date()

      if(now > createTime){
        alert('订单已过期')
        let res = await cancelOrder({order_sn: item.sn, type: 'user', reason: '订单已过期'})
        if(res.status == 'ok')
          this.$emit('getOrderList',{page:1,orders:[]})
      }else{
        this.$router.push({name: 'payment', params: {orderid: item.sn}})
      }
    },
    async getConfigData(){
      let configData = await getConfigData();
      this.orderStatus = configData.status === 'ok' ?  configData.data : {};
      storage_custom.set(keyConf.orderStatus, this.orderStatus);
    }
  },
  filters:{
    getProductsCounts(products){
      let num = 0;
      products.forEach(item => {
        num += item.product_number - 0;
      });
      return num;
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.order-item{
  // @include wh(100%,100%);
  @include bgColor(#f3f3f3);
  padding-top: 8.4rem;
  overflow: scroll;
  .item{
    margin-top: 1rem;
    @include bgColor(#fff);
    .shop-info{
      position: relative;
      margin-left: 1.5rem;
      @include average(#ccc);
      .info{
        position: relative;
        @include wh(100%,5rem);
        line-height: 5rem;
        img{
          @include wh(3rem,3rem);
          vertical-align: middle;
          border-radius: 50%;
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
          padding: 1.1rem;
          @include wh(1.1rem,1.1rem);
          @include bgi_2('/static/icon/order/indent_icon_name.png',1.1rem,1.1rem,center,center,no-repeat);
        }
      }
      span.order-status{
        position: absolute;
        // @include wh(4.5rem,5rem);
        top: 30%;
        right: 1.7rem;
        @include sc(1.4rem,#666);
      }
    }
    .product-info{
      position: relative;
      // height: 11.3rem;
      @include average(#ccc);
      margin-left: 1.5rem;
      div.info{
        margin-left: 10.5rem;
        padding: 2.8rem 0 2.8rem 1.2rem;
        p{
          @include sc(1.4rem,#000);
          &:last-child{
            position: relative;
            width: 100%;
            @include sc(1.6rem,#000);
            padding-top: 1.8rem;
            del{
              @include sc(1.2rem,#999);
            }
            span.sum{
              position: absolute;
              @include wh(3.6rem,1.5rem);
              @include sc(1.4rem,#999);
              right: 1.5rem;
              top: 50%;
              span{
                @include sc(1rem,#999);
              }
            }
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
    .refund{
      position: relative;
      @include wh(100%,3.2rem);
      span{
        position: absolute;
        @include wh(5.5rem,2rem);
        @include bgColor($themeRed);
        right: 1.5rem;
        text-align: center;
        line-height: 2rem;
        border-radius: .5rem;
        color: $bgWhite;
      }
    }
    .order-opt{
      @include wh(100%,9.1rem);
      ul{
        li:first-child{
          span.right{
            margin-top: 1rem;
            margin-right:1.5rem;
            padding-bottom: 1rem;
            @include sc(1.2rem,#666);
            span{
              @include sc(1.6rem,#e65058);
            }
          }
        }
        li:last-child{
          // padding-top: 1rem;
          // box-sizing: border-box;
          a.right{
            margin-right: 1.5rem;
            @include wh(10rem,3.4rem);
            border-radius: .4rem;
            text-align: center;
            line-height: 3.4rem;
            &.cancel,&.closed{
              @include sc(1.4rem,#666);
              border: 1px solid #999;
            }
            &.pay,&.evaluate,&.Conduct,&.startService{
              @include sc(1.4rem,$bgWhite);
              @include bgColor($themeRed);
            }
          }
        }
      }
    }
  }
}
</style>