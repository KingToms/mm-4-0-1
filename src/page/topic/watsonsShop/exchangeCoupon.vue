<template>
    <div class="exchangewrap">
        <div class="coupon-cont">
            <div class="header">
                <a  href="javascript:void(0);" @click="$router.go(-1)" class="left"></a>
                <p>福利卡兑换</p>
            </div>
            <div class="content">
                <img id="img" src="../../../../static/icon/appointment/newcouponcard_04.png" alt="">
                <p>尊享码位于福利卡反面的涂层处，请刮开获取。</p>
                <input v-model="sn" type="text" placeholder="请输入尊享码">
                <div style="width:100%">
                    <button @click="getCoupon">激活</button>
                </div>
                <div class="" style="text-align:center;margin:0 auto;height:2rem;color:#6e8feb;font-size:1.5rem;" @click="$router.push('/topic-watsons/index')">如果您已激活福利卡，请前往预约>></div>
                <!-- <div style="height:4rem;margin:0;">
                    <div class="tips_msg" style="margin:0 auto;line-height:4.4rem;height:4rem" v-if="ismsg">{{errorMsg}}</div>
                </div> -->
            </div>
            
        </div>
        <div id="hot-tip" >
            <p class="tip-icon" style="color:#fff;">
                <img src="../../../../static/icon/hot-tip.png" alt="">
                温馨提示
            </p> 
            <div class="card-power">
                <p>本卡权益包括：</p>
                <p>1.免费享受工会美妆造型项目，价值268元；请直接在上框输入卡片背面的尊享码，在线预约。</p>
                <p>2.抵用权益：200元美睫抵用券、500元半永久纹绣抵用券、880元享受4800元的医疗美容套卡项目。具体可添加微信客服<span style="color:#e70034">mxs666956</span>咨询。</p>
            </div>
            <p style="color:#e70034;text-align:center;font-size:1.3rem">福利卡尊享码一旦激活，即视为已使用</p>
        </div>
        <!-- <div class="msg-box" v-if="isshowmsg"> -->
        <div class="msg-box" >
            <img src="../../../../static/icon/tip.png" alt="">
            <p class="msg-cont">{{errorMsg}}</p>
            <!-- <div class="msg-cont">激活码已被使用,请勿重复提交</div> -->
        </div>
    </div>
</template>

<script>
import store from '../../../vuex/store';
import {qcsGhCouponSend,userIsLogin} from '../../../service/getData'
import Vue from 'vue';
import keyConf from '../../../common/keyConf'
import common from "../../../common/common"
export default {
    name:'exchangeCoupon',
    data(){
        return{
            isshowmsg:false,
             coupon_id:'',
             sn:'',
             errorMsg:"",
             ismsg:false,
             appOpen:false,
            //  showText:'',
            show:false,
        }
    },
    created(){
        /*判断是否在APP打开*/
        if (common.getQueryString("app") == "ios" || common.getQueryString("app") == "android") {
            this.appOpen = true; // 页面是在APP中打开
        }
    },
    store,
    mounted(){
        this.$store.commit("changefoot","none");
    },
    methods:{
        async getCoupon(){
            let qm_cookie = $.cookie(keyConf.qm_cookie);
            let isLogin = await userIsLogin();
            let _this=this
            if(!qm_cookie || isLogin.status == 'error'){
                let baseurl='/login?url=/topic-watsons/coupon';
                // window.location.href = `/login?action=login`;
                window.location.href = baseurl;
                this.$router.push(baseurl)
            }else{
                let obj={
                    sn:_this.sn
                }
                let res=await qcsGhCouponSend(obj);
                if(res.status=="ok"){
                    _this.ismsg=false;
                    alert("您已成功激活美妆福利礼包");
                    window.location.href='/topic-watsons/index';
                }else{
                    _this.errorMsg=res.msg;
                    _this.ismsg=true;
                    $ ('.msg-box').fadeIn ().delay (1000).fadeOut ();

                }
                if(_this.sn==""){
                    _this.ismsg=true;
                    _this.errorMsg="尊享码不能为空";
                }
            }
        },
        closeTip () {
            this.show = false
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.exchangewrap{
    position: relative;
}
.weui-toast{
    width: 10rem;
    .weui-toast__content{
        color: #fff;
    }
    
}
#hot-tip{
    width: 90%;
    margin: 2rem auto;
    border: 1px solid #ccc;
    padding: 4%;
    overflow: hidden;
    border-radius: 5px;
    .tip-icon{
        display: inline-block;
        background-color: #e70034;
        padding:0 1rem;
        font-weight: bold;
        margin-left: 30%;
        font-size: 1.3rem;
        line-height: 2.5rem;
        img{
            width: 1.8rem;
            vertical-align: middle;
            // margin-right: .3rem;
        }
    }
    .card-power{
        line-height: 2.2rem;
        margin: 1rem 0 .5rem; 
        font-size: 1.3rem;
    }
    
    
}
.mask-box {
    animation: fadeIn .1s;
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0);
    z-index: 11;
}
.msg-box {
    display: none;
    position: absolute;
    height: 10rem;
    width: 85%;
    top:8rem;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 50;
    transform: translateY(-50%);
    border-radius: 5px;
    background-color:rgba(0, 0, 0, 0.5);
    text-align: center;
    padding-top: 1rem;
    img{
        width: 4rem;
        line-height: 5rem;
    }
    .msg-cont{
        text-align: center;
        line-height: 4rem;
        font-size: 2rem;
        color: #fff;
    }
}
.left {
    position: absolute;
    @include wh(3.2rem, 3.2rem);
    @include bis("../../../../src/assets/image/icon/detail/details_btn_return02.png");
    left: 1.2rem;
    top: 0.3rem;
}
.header{
    @include wh(100%,4.9rem);
    background-color: #fff;
    position: relative;
    p{
        line-height: 4.9rem;
        font-weight: bold;
        font-size: 2rem;
        text-align: center;
    }
    a{
        position: absolute;
        font-size: 3rem;
        left: .5rem;
    }
}
.content{
    width: 100%;
    padding:0 1rem;
    img{
        width: 100%;
        margin: .25rem 0 0;
    }
    p{
        line-height: 4rem;
        font-size: 1.5rem;
    }
    input{
        outline: none;
        appearance: none;
        -webkit-appearance: none; 
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        @include wh(95%,4rem);
        text-indent: 1rem;
        border: 1px solid #ccc;
        font-size: 1.5rem;
        border-radius: 3px;
    }
    button{
        @include wh(100%,100%);
        // background-color: #c9c9c9;
        background-color: #e70034 ;
        color: #fff;
        font-size: 1.5rem;
        border-radius: .4rem;
        letter-spacing: 2px;
    }
    div{
        width: 100%;
        height: 4.4rem;
        padding: 0 2.5rem;
        margin-top: 3rem;
        margin-bottom: 1.5rem;
    }
    .tips_msg{
        height: 4rem;
       font-size: 1.7rem; 
       text-align: center;

    }
}

</style>


