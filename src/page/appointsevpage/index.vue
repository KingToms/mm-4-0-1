<template>
    <div class="appointsev">
        <div class="header">
            <a  href="javascript:void(0);" @click="$router.push(`/home/recommend`)" class="left"></a>
            <h2>到店约妆服务</h2>
        </div>
        <div class="adver-img">
            <!-- <img src="../../../../static/icon/appointment/goshop_02.png" alt=""> -->
            <img src="../../../static/icon/appointment/goshop_02.png" alt="">
            <div class="exclusiveVoucher"  @click="$router.push(`/appointsev/exchangeCoupon`)">
                <div class="voucher-icon">
                    <img src="../../../static/icon/appointment/voucher-icon_03.png" alt="">
                </div>
                <div class="member-vou" >
                    <div>
                        <p style="font-size:1.5rem">星会员专属抵扣券</p>
                        <span>*仅用于抵扣星会员私人造型化妆服务</span>
                    </div>
                </div>
                <p class="dashed"></p>
                <div class="gochange">
                    <span style="font-size:1.5rem">¥ &nbsp;298</span>
                    <div>去兑换</div>
                </div>
            </div>
        </div>
        <div class="service-item">
            <h2>
                <span>服务项目</span>
                <div>
                    <p></p>
                </div>
            </h2>
            <ul>
                <li v-for="item in prodlist" @click="$router.push(`/qcsgoshopdetail/${item.id}`)">
                    <div class="item-img">
                        <img :src="item.thumb" alt="">
                    </div>
                    <div class="item-info">
                        <b class="nowrap-1">{{item.name}} </b>
                        <p class="nowrap" style="-webkit-box-orient: vertical;">{{item.summary}}</p>
                        <div>
                            <span class="price">¥ {{item.price}}</span>
                            <span class="reservation">立即预约</span>    
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="service-des">
            <h2>
                <span>服务说明</span>
                <p></p>
            </h2>
            <p>1、活动面向于俏猫约妆会员，美星社星会员</p>
            <p>2、为您提供屈臣氏到店服务的所有美业师均为俏猫平台签约美业师</p>
            <p>3、298元抵扣券为星会员专享，需使用星会员体验卡兑换使用(单张卡不可重复使用)</p>
            <p>4、正常服务时间为：10:00-20:00(具体时间可在下单时选择对应门店查看)</p>
            <p>5、订单确认后，出示预约成功的订单信息在选择的时间段和门店享受服务并进行核销。预约成功后如需修改订单请提前3小时联系客服</p>
            <p>6、因消防安全问题部分门店将无法提供卷发造型服务，如需帮助可联系俏猫客服咨询</p>
            <p>7、联系俏猫客请致电: 400-833-5138</p>
        </div>
        <div class="interpretation">
            解释权归俏猫所有
        </div>
    </div>
</template>

<script>
import {qcsProList,qcsAddressList,qcsCouponSend} from '../../service/getData'
import store from '../../vuex/store'
export default {
    store,
    name:"",
    data(){
        return{
            hideFooterHeader:false,
            coupon:"",
            prodlist:[],
            service_from:3
        }
    },
    created(){
        this.getQCSpro()
    },
    methods:{
        async getQCSpro(){
            let obj={

            }
            let res=await qcsProList(obj)
            if(res.status=="ok"){
                this.prodlist=res.data
            }
        },
    },
    mounted(){
        this.$store.commit("changefoot","none")
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.header{
    @include wh(100%,4rem);
    line-height: 4rem;
    position: relative;
    a{
        position: absolute;
        left: 1rem;
        font-size: 2.5rem;
    }
    h2{
        text-align: center;
        font-size: 2rem;
    }
    .left {
        position: absolute;
        @include wh(3.2rem, 3.2rem);
        @include bis("../../../src/assets/image/icon/detail/details_btn_return02.png");
        left: 1.2rem;
        top: 0.3rem;
    }
}
.appointsev{
    background-color: #f5f5f5;
}
.nowrap{
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.nowrap-1{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.adver-img{
    width:100%;
    background-color: #ffffff;
    margin: 0 0 1.2rem;
    padding-bottom:1rem; 
    img{
        width: 100%;
    }
    .exclusiveVoucher{
        width: 90%;
        height: 7rem;
        margin: 1rem 5% .5rem;
        border: 1px solid #8a8a8c;
        border-radius: 5px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .voucher-icon{
            // width: 3.4rem;
            width: 14%;
            height: 50%;
            padding: 0 2%;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .member-vou{
            width: 60%;
            height: 57%;
            div{
                height: 100%;
                font-size: 16px;
                span{
                    letter-spacing: 0;
                    // font-size:.75em;
                    font-size: 1.1rem;
                    line-height: 3rem;
                }
                p{
                    letter-spacing: 0;
                    font-size: 1.2rem;
                }
            }
        }
        .dashed{
            width: 1px;
            border-right: 1px dashed #999;
            height: 100%;
            padding-left: 1rem;
        }
        .gochange{
            width: 20%;
            text-align: center;
            font-weight: bold;
            span{
                line-height: 3rem;
            }
            div{
                height: 2.2rem;
                width: 80%;
                margin-left: 10%;
                background-color: #e70032;
                color: #fff;
                border-radius: 5px;
                line-height: 2.2rem;
                font-weight: 500;
            }
        }
    }
}
.service-item{
    width: 100%;
    // background-color: #fff;
    h2{
        text-align: center;
        line-height: 3rem;
        position: relative;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        p{
            width: 2rem;
            height: 3px;
            background-color: #000
        }
        
    }
    li{
        width: 100%;
        padding: 0 5%;
        height: 13rem;
        margin-bottom: .75rem;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item-img{
            width: 11.6rem;
            height: 11.6rem;
            img{
                width: 100%;
                // height: 100%;
            }
        }
        .item-info{
            width: 55%;
            height: 10rem;;
            position: relative;
            b{
                display: inline-block;
                font-weight: 500;
                width: 100%;
                font-size: 1.5rem
            }
            p{
                font-size: 1.3rem
            }
            div{
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 2rem;
                display: flex;
                justify-content: space-between;
                .price{
                    font-size: 1.8rem;
                    color: #e65058;
                    line-height: 2rem;
                }
                .reservation{
                    height: 2.2rem;
                    padding: 0 .7rem;
                    font-size: 1rem;
                    color: #fff;
                    background-color: #e70032;
                    font-weight: bold;
                    border-radius: 4px;
                    line-height: 2.2rem;
                }
            }
        }
    }
}
.service-des{
    background-color: #fff;
    width: 100%;
    padding:1.3rem 5%;
    p{
        line-height: 2.3rem;
        font-size: 1.3rem;
        color: #666;
    }
    h2{
        text-align: center;
        line-height: 3rem;
        position: relative;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 1rem;

        p{
            width: 2rem;
            height: 3px;
            background-color: #000;
            line-height: 0;
        }
        
    }
}
.interpretation{
    height: 5rem;
    line-height: 5rem;
    color: #666;
    font-size: 1.3rem;
    text-align: center;
    z-index: 999;
}
</style>


