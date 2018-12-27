<template>
  <div class="mycoupon" :class="{'none': !show}">
    <div class="coupon-header">
      <div class="header">
        <div class="title">
          <h2>{{title}}</h2>
        </div>
        <a class="back" href="javascript:void(0);" @click="$router.go(-1)" ></a>
        <ul class="clear">
          <li class="left" @click="selUnused">
            <!-- <p :class="{'choose': choose === 1}">未使用({{coupons.unused.length}})</p> -->
            <p :class="{'choose': choose === 1}">未使用({{unusednum}})</p>
          </li>
          <li class="left" @click="selUsed">
            <!-- <p :class="{'choose': choose === 2}">使用记录({{coupons.used.length}})</p> -->
            <p :class="{'choose': choose === 2}">使用记录({{usednum}})</p>
          </li>
          <li class="left" @click="selOver">
            <!-- <p :class="{'choose': choose === 3}">已过期({{coupons.over.length}})</p> -->
            <p :class="{'choose': choose === 3}">已过期({{overnum}})</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="content" v-show="show">
      <!-- <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"> -->
        <div class="coupon-detail clear" v-for="(item,index) in renderCoupons" :key="index">
            <div class="left" :class="{'choose_1':choose===1,'choose_2':choose===2 || choose===3}">
              <p>满{{item.base_amount}}可用</p>
              <p>￥<span>{{item.amount}}</span></p>
            </div>
            <div class="right">
              <div class="coupon-info">
                <p>{{item.note}}</p>
                <p>{{item.des }}</p>
                <div class="dashed"></div>
                <div class="coupon-date">
                  <p>有效期至{{ splitTime(item.end_time)}}
                    <router-link v-if="choose===1" to="/" class="to-use"><span>去使用</span></router-link>
                    <span class="out-date" v-if="choose===3">已过期</span>
                  </p>
                </div>
                <i class="icon" v-show="item.store_id>0"></i>
              </div>
              <span v-if="choose===2" class="used"></span>
            </div>
        </div>
      <!-- </mt-loadmore> -->
    </div>
    <div class="content" v-show="!show">
      <div class="tip">
        <img src="/static/icon/order/coupon_icon_null.png">
        <p>您没有相关的优惠券</p>
        <router-link to="/coupon">
          <div>去领券</div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Loadmore } from 'mint-ui'

import {getCouponList} from '../../service/getData'

Vue.component(Loadmore.name, Loadmore)
export default {
  name: 'mycoupon',
  data () {
    return {
      title: '优惠券',
      choose: 1,
      coupons: {},
      show: false, // 判断是否有优惠券
      renderCoupons: [],
      page: 0,
      page_size: 100,
      unusednum:null,
      usednum:null,
      overnum:null,
    }
  },
  created(){
    this.getCouponList(this.selUnused)
  },
  methods: {
    async getCouponList(callback){
      let res = await getCouponList({page: this.page, page_size: this.page_size})
      if(res.status === 'ok'){
        this.coupons = res.data
        if(callback)
          callback()
      }
      else
        alert('网络异常，请重试')
        this.unusednum=this.coupons.unused.length;
        this.usednum=this.coupons.used.length;
        this.overnum=this.coupons.over.length;
    },
    selUnused(){
      this.choose=1
      this.renderCoupons = this.coupons.unused
      this.show = this.renderCoupons.length === 0 ? false : true
    },
    selUsed(){
      this.choose = 2
      this.renderCoupons = this.coupons.used
      this.show = this.renderCoupons.length === 0 ? false : true
    },
    selOver(){
      this.choose = 3
      this.renderCoupons = this.coupons.over
      this.show = this.renderCoupons.length === 0 ? false : true
    },
    splitTime(time){
      let str = time.substr(0,time.indexOf(' '))
      return str
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.mycoupon{
  @include wh(100%,100%);
  @include bgColor(#f3f3f3);
  &.none{
    @include bgColor(#fff);
  }
  .coupon-header{
    @include wh(100%,8.4rem);
    @include bgColor(#fff);
    .header{
      position: fixed !important;
      z-index: 1;
      @include bgColor(#fff);
      @include wh(100%,8.4rem);
      @include average(#999);
      .title{
        @include wh(100%,4rem);
        line-height:4rem;
        text-align: center;
        h2{
          font-size: 1.8rem;
          color: #000;
          letter-spacing: 1px;
        }
      }
      a{
        position: absolute;
        top: .7rem;
      }
      .back{
        left: .7rem;
        @include wh(2.4rem,2.4rem);
        background-image: url('../../assets/image/icon/login/nav_btn_return.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 2.2rem 2.2rem;
      }
      ul.clear{
        li.left{
          @include wh(33%,4.4rem);
          padding: 0 1.5rem;
          line-height: 4.4rem;
          @include sc(1.4rem,#000);
          text-align: center;
          p{
            @include wh(100%,4.4rem);
          }
          p.choose{
            border-bottom: .3rem solid $themeRed;
            color: $themeRed;
          }
        }
      }
    }
  }
  .content{
    @include bgColor(#f3f3f3);
    .coupon-detail{
         margin: 1.5rem 1.5rem 0 1.5rem;
        .left{
          position: relative;
          @include wh(32%,11rem);
          &.choose_1{
            @include bgi_2('/static/icon/order/coupon_bg_number01.png'
          ,11rem,11rem,center,center,no-repeat);
          }
          &.choose_2{
            @include bgi_2('/static/icon/order/coupon_bg_number02.png'
          ,11rem,11rem,center,center,no-repeat);
          }
          line-height: 5rem;
          text-align: center;
          p:last-child{
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%,-50%);
            @include sc(2rem,#fff);
            span{
              @include sc(3.5rem,#fff);
            }
          }
          p:first-child{
            margin-top: 6rem;
            line-height: 2.5rem;
            @include sc(1.1rem,#fff);
          }
        }
        .right{
          position: relative;
          padding-left: 1.5rem;
          background-color: #fff;
          @include wh(68%,11rem);
          span.used{
            position: absolute;
            @include wh(5.04rem,5.04rem);
            @include bgi_2('/static/icon/ucenter/coupon_icon_finish.png',5.04rem,5.04rem);
            bottom: 0;
            right: 0;
          }
          .coupon-info{
            position: relative;
            letter-spacing: 1px;
            .dashed{
              height: 2rem;
              line-height: 2rem;
              border-bottom: .05rem dashed #ccc;
            }
            p:first-child{
              height: 4rem;
              line-height: 5rem;
              @include sc(1.6rem,#000);
            }
            p:nth-of-type(2){
              height: 2rem;
              line-height: 2rem;
              @include sc(1.2rem,#666);
            }
            div.coupon-date{
              position: relative;
              p{
                position: relative;
                line-height: 1rem;
                padding-top: 1rem;
                @include sc(1.1rem,#999);
                .to-use,.out-date{
                  position: absolute;
                  right: 1.5rem;
                  top: 50%;
                  transform: translateY(-70%);
                  @include wh(6rem,2rem);
                  text-align: center;
                  border-radius: .4rem;
                  line-height: 2rem;
                }
                .to-use{
                  @include sc(1.2rem,$themeRed);
                  span{
                    color: $themeRed;
                  }
                  // @include bgColor(#ffe500);
                  border: .05rem solid $themeRed;
                }
                .out-date{
                  @include sc(1.2rem,#999);
                  @include bgColor(#f3f3fe);
                }
              }
              i.icon{
                position: absolute;
                top: 1rem;
                right: .8rem;
                @include wh(2.2rem,2.2rem);
                @include bgi_2('/static/icon/order/btn_choose_sel.png',2.2rem,2.2rem);
              }
            }
            i.icon{
              position: absolute;
              @include wh(5.9rem,2rem);
              top: 0px;
              right: 0px;
              @include bgi_2('/static/icon/order/coupon_icon_label.png',5.9rem,2rem);
            }
          }
        }
      }
  }
  .tip{
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    text-align: center;
    padding: 0 1.5rem;
    img{
      @include wh(12rem,12rem);
    }
    p{
      @include sc(1.4rem,#666);
      text-align: center;
    }
    a{
      div{
        margin-top: 4rem;
        @include wh(100%,4.4rem);
        @include bgColor($themeRed);
        @include sc(1.4rem,$bgWhite);
        line-height: 4.4rem;
        border-radius: .4rem;
      }
      
    }
  }
}
</style>