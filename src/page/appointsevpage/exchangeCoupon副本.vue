<template>
    <div class="exchangewrap">
        <div>
            <div class="header">
                <a  href="javascript:void(0);" @click="$router.go(-1)">&lt;</a>
                <p>兑换抵扣券</p>
            </div>
            <div class="content">
                <img src="../../../static/icon/appointment/coupon_card_03.png" alt="">
                <p>尊享卡位于体验卡反面的涂层处,如图所示.</p>
                <input v-model="sn" type="text" placeholder="请输入尊享吗">
                <button @click="getCoupon">兑换</button>
                <div v-if="ismsg">{{errorMsg}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '../../vuex/store';
import {qcsCouponSend,userIsLogin} from '../../service/getData'
import Vue from 'vue';
import keyConf from '../../common/keyConf'
export default {
    name:'exchangeCoupon',
    data(){
        return{
             coupon_id:'',
             sn:'',
             errorMsg:"",
             ismsg:false
        }
       
    },
    store,
    mounted(){
        this.$store.commit("changefoot","none");
        // $("input").blur(function(){
        //     if($(this).val()==""){
        //         $("button").attr("disabled","disabled")
        //         $("button").css('backgroundColor','#c9c9c9')
        //     }else{
        //         $("button").removeAttr("disabled")
        //         $("button").css("backgroundColor","red")
        //     }
        // })
        // if($("input").val()==""){
        //     $("button").attr("disabled","disabled")
        //     $("button").css('backgroundColor','#c9c9c9')
            
        // }else{
        //     $("button").removeAttr("disabled")
        //     $("button").attr("backgroundColor","red")
        // }
    },
    methods:{
        async getCoupon(){
            //判断是否登录
            let qm_cookie = $.cookie(keyConf.qm_cookie);
            let isLogin = await userIsLogin();
            if(!qm_cookie || isLogin.status == 'error'){
                // if (this.appOpen) { // APP中打开页面
                    window.location.href = `/login?action=login`;
                // }else {
                // alert('未登录');
                    // let baseUrl = stylist_id ? `/login?url=/detail/${this.productId}?stylist_id=${stylist_id}?plid=${this.plid}` : `/login?url=/detail/${this.productId}?plid=${this.plid}`;
                    // this.$router.push(baseUrl)
                // }
            }else{
                let baseUrl;
                if (this.appOpen) { // APP中打开页面
                    baseUrl = stylist_id ? `/order/${this.productId}?stylist_id=${stylist_id}&appOpen=true` : `/order/${this.productId}?appOpen=true`;
                }else {
                    baseUrl = stylist_id ? `/order/${this.productId}?stylist_id=${stylist_id}` : `/order/${this.productId}`;
                }
                this.$router.push(baseUrl);
            }




            let _this=this
            let obj={
                sn:this.sn
            }
            let res=await qcsCouponSend(obj)
            console.log(res)
            console.log(this.sn)
            if(res.status=="ok"){
                this.ismsg=false
                console.log("您获得一张优惠券请前往消费")

            }else{
                if(_this.sn==""){
                    _this.errorMsg="优惠码不能为空"
                }
                this.ismsg=true
                this.errorMsg=res.msg
                // this.$router.go(-1)
            }
            

        },
        getdata(){
            console.log(1)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';

.header{
    @include wh(100%,4rem);
    background-color: #fff;
    position: relative;
    p{
        line-height: 4rem;
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
        @include wh(100%,18.5rem);
        margin: 2.25rem 0 0;
    }
    p{
        line-height: 4rem;
        font-size: 1.5rem;
    }
    input{
        @include wh(95%,3rem);
        text-indent: 1rem;
    }
    button{
        @include wh(17rem,3.3rem);
        // background-color: #c9c9c9;
        background-color: red;
        margin-top: 2.2rem;
        margin-left: 6rem;
        color: #fff;
        border-radius: 1.6rem;
        font-size: 1.5rem;
    }
    div{
        line-height: 2rem;
        text-align: center;
        color: #f00;
    }
}

</style>


