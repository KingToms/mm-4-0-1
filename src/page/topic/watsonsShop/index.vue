<template>
    <div class="">
        <div class="header">
            <a  href="javascript:void(0);" @click="$router.go(-1)" class="left"></a>
            <p>屈臣氏工会美妆福利</p>
        </div>
        <!-- 顶部图片 -->
        <div class="labour-package">
            <img src="../../../../static/topic/watsons-part/toppic.png" alt="">
        </div>
            
        <div class="part">
            <!-- 活动一 -->
            <div class="part-1">
                <div style="padding:0 1rem;">
                    <img src="../../../../static/topic/watsons-part/part-1.png" alt="">
                </div>
                <!-- 标题 -->
                <h2 class="makeup-des">
                    <!-- <span>第一站</span>  -->
                    <span>精致妆容</span>
                    <span>闪耀蜕变</span>
                </h2>
                <!-- 图片 -->
                <div class="makeup-pic">
                    <img src="../../../../static/topic/watsons-part/partpic-1.png" alt="">
                </div>
                <p>屈臣氏工会会员专享</p>
                <p>免费到店美妆造型服务一次</p>
                <!-- <p>已预约到店美妆服务的旅客可下拉页面前往下一站旅程~</p> -->
                <!-- 预约 -->
                <div class="immed-appoint" @click="todetail()">立即预约</div>
                <!-- <div class="immed-appoint" @click="$router.push(`/qcsgoshopdetail/1001104`)">立即预约</div> -->
            </div>
            <!-- 活动二 -->
            <div class="part-2">
                <div style="padding:0 1rem;">
                    <img src="../../../../static/topic/watsons-part/part-2.png" alt="">
                </div>
                <!-- 标题 -->
                <h2 class="makeup-des">
                    <!-- <span>第二站</span> -->
                    <span>日常变美</span>
                    <span>精致护肤</span>
                </h2>
                <ul class="makeup-pro">
                    <li>
                        <div class="f-l makeup-cont">
                            <p class="coupon-name">1000元抵扣券</p>
                            <p class="qc">美星社</p>
                            <p class="project-name">星会员医疗美容体验卡</p>
                            <button @click="ShowService()">立即预约</button>
                        </div>
                        <div class="f-r makeup-pic">
                            <img src="../../../../static/topic/watsons-part/partpro-1.png" alt="">
                        </div>
                    </li>
                    <li>
                        <!-- <div @click="$router.push(`/home/makeup/128/半永久`)" class="f-l makeup-pic"> -->
                        <div @click="toover()" class="f-l makeup-pic">
                            <img src="../../../../static/topic/watsons-part/partpro-2.png" alt="">
                        </div>
                        <!-- <div @click="$router.push(`/home/makeup/128/半永久`)" class="f-r makeup-cont"> -->
                        <div @click="toover()" class="f-r makeup-cont">
                            <p class="coupon-name">500元抵扣券</p>
                            <p class="qc">俏猫</p>
                            <p class="project-name">半永久项目</p>
                            <button>立即预约</button>
                        </div>
                    </li>
                    <li>
                        <!-- <div @click="$router.push(`/home/makeup/64/美睫`)" class="f-l makeup-cont"> -->
                        <div @click="tomeijie()" class="f-l makeup-cont">
                            <p class="coupon-name">200元抵扣券</p>
                            <p class="qc">俏猫</p>
                            <p class="project-name">美睫项目</p>
                            <button>立即预约</button>
                        </div>
                        <!-- <div @click="$router.push(`/home/makeup/64/美睫`)" class="f-r makeup-pic"> -->
                        <div @click="tomeijie()" class="f-r makeup-pic">
                            <img src="../../../../static/topic/watsons-part/partpro-3.png" alt="">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bottomarrow">
            <img class="arrow" src="../../../../static/icon/search/list_btn_retract.png" alt="">
        </div>
        <!-- //工会活动页底服务说明 -->
        <div class="service-des">
            <h2>服务说明</h2>
            <ul>
                <li>1、服务对象：屈臣氏工会会员</li>
                <li>2、礼包说明：礼包含价值298元屈臣氏到店美妆造型福利卡1张，200元俏猫美睫项目抵用权益1次，500元俏猫半永久纹绣抵用权益1次，1000元美星社星会员医疗美容体验卡抵用权益1次。</li>
                <li>3、屈臣氏到店美妆造型福利权益使用完毕后，可登陆激活俏猫美睫、半永久及美星社医疗美容体验抵扣权益。</li>
                <li>4、礼包有效期：屈臣氏到店美妆福利卡有效期至2019年4月30日；其余抵扣权益有效期至2019年6月30日。</li>
                <li>5、预约方式：俏猫美妆、美睫、半永久服务可在俏猫平台直接下单，美星社星会员医疗美容体验卡抵扣权益请添加微信客服咨询预约。</li>
                <li>6、本礼包服务均由俏猫平台签约美业师/机构及美星社合作医疗美容机构提供服务。</li>
                <li>7、如需帮助，可联系俏猫客服咨询：4008-335138</li>
            </ul>
            <p>
                <i></i>
                <span>最终解释权归俏猫所有</span>
                <i></i>
            </p>
        </div>
        <div class="customer-service" v-if="isShowService">
            <p>请添加官方客服微信号</p>
            <p>进行预约到店服务</p>
            <img class="service-wx" src="../../../../static/topic/watsons-part/wx-service.png" alt="">
            <p></p>
            <img @click="back()" class="back" src="../../../../static/icon/wrong.png" alt="">
        </div>
        <div class="isShowPoint" v-if="isShowPoint">
            <!-- <li style="line-height:3rem;text-align:center;font-size:1.5rem;">{{baseurl}}</li> -->
            <p>尊敬的会员：</p>
            <p style="text-indent:2em;padding-bottom:.5rem;">您是否已经预约享受会员到店美妆福利？</p>
            <div>
                <button @click="back()">否</button>
                <button v-if="!meijie" @click="$router.push(`/home/makeup/128/半永久`)">是</button>
                <button v-if="meijie" @click="$router.push(`/home/makeup/64/美睫`)">是</button>
            </div>
        </div>
        <div class="mask-box" @click="back()" v-if="isShowBox"></div>
    </div>
</template>

<script>
export default {
    name:'watsonspart',
    data(){
        return{
            isShowService:false,
            isShowPoint:false,
            isShowBox:false,
            baseurl:'',//当前域名
            meijie:false,
        }
    },
    created(){
        this.baseurl=window.location.host
        console.log(this.baseurl);
    },
    methods:{
        ShowService(){
            this.isShowBox=true;
            this.isShowService=true;

        },
        showservice(){
            this.isShowPoint=false;
            this.isShowService=true;
        },
        back(){
            this.isShowBox=false;
            this.isShowService=false;
            this.isShowPoint=false;
        },
        save(){
            var img = document.getElementById("img");
            var alink = document.createElement("a");
            alink.href = img.src;
            console.log(img.src)
            alink.click();
        },
        todetail(){
            let _this=this
            if(_this.baseurl.indexOf('mm.qiaocat.com')!=-1){
                this.$router.push('/qcsgoshopdetail/1001104')
            }else{
                this.$router.push('/qcsgoshopdetail/1000663')
            }
        },
        tomeijie(){
            this.isShowBox=true;
            this.isShowPoint=true;
            this.meijie=true;
        },
        toover(){
            this.isShowBox=true;
            this.isShowPoint=true;
            this.meijie=false;
        }
        
    }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.isShowPoint{
    animation: fadeIn .1s;
    width: 90%;
    position: fixed;
    top: 25%;
    left: 5%;
    height: 15rem;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 12;
    border-radius: 5px;
    padding-top: 2rem;
    li{
        padding-top: .5rem;
    }
    p{
        line-height: 2.5rem;
        padding:0 2rem;
        font-size: 1.6rem;
    }
    div{
        display:flex;
        justify-content: space-around;
        height: 3rem;
        border-top: .5px solid #ccc;
        padding-top: .7rem;
        button{
            width: 40%;
            background-color: rgba(255, 255, 255, 0);
            font-size: 1.7rem;
            line-height: 3rem;
        }
    }
}
.mask-box {
    animation: fadeIn .1s;
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 11;
}
.customer-service{
    animation: fadeIn .1s;
    position: fixed;
    top: 20%;
    width: 60%;
    left: 20%;
    height: 30rem;
    // background: #fff;
    z-index: 12;
    text-align: center;
    p{
        text-align: center;
        color: #fff;
        font-size: 1.3rem;
        font-weight: bold;
    }
    .service-wx{
        margin: 2rem auto;
        width: 80%;
    }
    .back{
        width: 10%
    }
}
.f-l{
    float: left
}
.f-r{
    float: right
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
.labour-package{
    width: 100%;
    img{
        width: 100%;
    }
}
.service-des{
    width: 100%;
    padding: 1.3rem 5%;
    background-color: #fff;
    h2{
        margin: 0 auto;
        text-align: center;
        line-height: 3rem;
        font-weight: bold;
        font-size: 1.5rem;
        color: #fff;
        width: 10rem;;
        background-color: #e70034;
    }
    ul{
        padding: 1.3rem 0;
        li{
            font-size: 1.3rem;
            color: #666;
            line-height: 2.3rem;
        }
    }
    p{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 25% ;
        i{
            width: 1rem;
            height: 1px;
            background-color: #666;
        }
        span{
            font-size: 1.3rem;
        }
    }
}
.part{
    margin-top: 2rem;
    .part-1{
        width: 100%;
        text-align: center;
        img{
            width: 100%;
        }
        h2{
            padding: 0 25%;
            font-size: 2rem;
            font-weight: bold;
            display: flex;
            justify-content: space-around;
        }
        .makeup-pic{
            width: 100%;
            padding:1rem;
        }
        .immed-appoint{
            width: 32%;
            height: 3.5rem;
            line-height: 3.5rem;
            margin: 1.5rem auto 1.8rem;
            background-color: #000;
            color: #fff;
            font-weight: bold;
            font-size: 1.6rem;
            border-radius: 5px;
        }
        p{
            font-size: 1.4rem;
            // font-weight: bold;
            line-height: 2.3rem;
        }

    }
    .part-2{
        width: 100%;
        text-align: center;
        img{
            width: 100%;
        }
        h2{
            padding: 0 25%;
            font-size: 2rem;
            font-weight: bold;
            display: flex;
            justify-content: space-around;
        }
        .makeup-pro{
            padding-top: 3rem;
            li{
                width: 100%;
                padding: 0 3% 2.5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .makeup-cont{
                    width: 45%;
                    .coupon-name{
                        color: #666;
                        font-size: 2rem;
                        line-height: 4.3rem;
                    }
                    .project-name{
                        line-height: 2.5rem;
                        font-size: 1.2rem;
                    }
                    .qc{
                        font-size: 1.3rem;
                        font-weight: bold
                    }
                    button{
                        width: 64%;
                        height: 3rem;
                        color: #fff;
                        background-color: #000;
                        font-weight: bold;
                        border-radius: 5px;
                    }
                }
                .makeup-pic{
                    width: 52%;
                }
            }
        }
    }
}
.bottomarrow{
    width: 96%;
    margin:0 2%;
    text-align: center;
    border-bottom: 1px solid #000;
    img{
        width: 2.5rem;
    }
}
</style>


