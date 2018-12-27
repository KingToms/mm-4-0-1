<template>
    <div class="serviceshop-module">
        <section class="shop-info">
            <div class="location-position" @click="isshowarea=true">
                <img src="../../../../static/icon/ucenter/my_icon_address.png" alt="">
                <span>{{choosecity}}</span>
                <span>{{choosearea}}</span>
                <i style="float:right;font-size:2rem" class="icon"></i>
            </div>
            <ul class="choose-shop">
                <li v-for="(item,index) in shoplist" @click="showpic(index)">
                    <div class="choosed">
                        <img v-show="index==num" src="../../../../static/icon/search/list_icom_select.png" alt="">
                        <!-- <input type="radio" :value="item.id"> -->
                    </div>
                    <label :for="item.id" class="name-address">
                        <h1 class="shop-name">{{storeName[index]}}</h1>
                        <p class="shop-address">{{item.store_add}}</p>
                    </label>
                </li>
            </ul>
            <!-- <div class="tipsinfo" v-if="isshowlist">---  {{tipsinfo}}  ---</div> -->
            <!-- <div class="istrue" @click="trueaddress">确定</div> -->
        </section>
        <!-- 隐藏地址 -->
        <section class="showArea" v-if="isshowarea">
            <div class="servicearea">
                <h2>门店所在地区</h2>
                <span @click="isshowarea=false" v-if="!ishowtrue">取消</span>
                <span @click="isshowarea=false" v-if="ishowtrue">确定</span>
                <ul class="choose">
                    <li class="choose_city active">{{choosecity}}</li>
                    <li class="choose_area active">{{choosearea}}</li>
                </ul>
                <div class="pro_city_area">
                    <ul class="city">
                        <li @click="getarea(item.city_id,index)" v-for="(item,index) in cityarr">
                            <b>{{item.name}}</b> 
                            <i v-show="index==citynum" class="icon"></i>
                        </li>
                    </ul>
                    <ul class="area">
                        <li v-for="(item,index) in areaarr" @click="getaddress(item.city_id,item.area_id,index)">
                            <b>{{item.name}}</b> 
                            <i v-show="index==areanum" class="icon"></i>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import {getProv,getCity,getArea,qcsAddressList,productList} from '../../../service/getData'
import {mapState,mapMutations} from 'vuex'
import { setTimeout } from 'timers';
export default {
    data(){
        return{
            ischoosed:false,
            isshowpic:false,
            ishowtrue:false,
            isshowarea:false,
            cityarr:[],
            areaarr:[],
            shoplist:[],
            city_id:[],
            choosecity:"请选择城市",
            choosearea:"请选择地区",
            isshowlist:true,
            // tipsinfo:"请选择服务门店",
            num:-1,
            citynum:-1,
            areanum:-1,
            storeName:[],
            store_name:'',
            storeInfo:[],
            store_info:{},//门店信息
            store_id:'',//门店id
            store_address:'',//门店地址
            product_info: {
                product_id: '', //产品id
                service_form: '', // 服务方式
                name: '', // 商品名称
                thumb: '', // 商品缩略图
                seo_title: '', // 服务商家名字
                score: '', // 分数
                price: '', //价格
                market_price: '', // 市场价格
                coupon: {
                    useCoupon: [], //可用优惠券
                    unUseCoupon: [] // 不可用优惠券
                }
            },
        }
    },
    created(){
        this.store_name = this.confirmOrder ? this.confirmOrder.store_name : ''
        this.store_id = this.confirmOrder ? this.confirmOrder.store_id : ''
        this.store_address = this.confirmOrder ? this.confirmOrder.store_address : ''
        // this.getData()
    },
    computed:{
    ...mapState(['confirmOrder'])
    },
    mounted(){
        this.cityarr=[{"city_id":"110100","name":"北京市"},{"city_id":"440100","name":"广州市"}]
        this.product_info.product_id = this.$route.params.id
        // console.log(id)
    },
    props:{
        // sendproid:string,
        // required:true
    },
    methods:{
        ...mapMutations(['SET_CONFIRMORDER']),
        choosearea_shop(){
            this.isshowarea=true;

        },
        //
        async getarea(aaa,index){
            this.choosearea="请选择地区"
            this.areanum=-1
            this.citynum=index
            this.ishowtrue=true
            let obj={
                city_id:aaa
            }
            let res=await getArea(obj)
            if(res.status=="ok"){
                this.areaarr=res.data
            }
            if(aaa==110100){
                this.choosecity="北京市"
            }else{
                this.choosecity="广州市"
            }
        },
        async getaddress(city,area,index){
            this.areanum=index
            this.storeName=[]
            let _this=this
            let obj={
                city_id:city,
                area_id:area
            }
            let res=await qcsAddressList(obj)
            if(res.status=="ok"){
                this.shoplist=res.data
                // console.log(res.data)
                for(let i in res.data){
                    _this.storeName=_this.storeName.concat(res.data[i].store_name)
                    _this.storeInfo=_this.storeInfo.concat(res.data[i])
                }
                if(res.data==false){
                    _this.isshowlist=true
                    // _this.tipsinfo="该区域内没有服务门店"
                }else{
                    _this.isshowlist=false
                }
            }
            // console.log($(".area li b").html())
            this.choosearea=$(".area li b").eq(index).html()
            // this.isshowarea=false
        },
        async getData() {
            let _this=this
        let id = this.product_info.product_id
        // console.log(id)
        // stylist_id=this.stylist_id
        let res = await productList({ product_id: id, is_order: true, stylist_id: _this.store_id }) // , API_VERSION: 'V5.0.0' 
        // console.log(this.store_id)
        if (res.status === 'ok') {
            // console.log(res)
            // this.setData(res);
            // this.calCatfood();
            // this.setServiceForm();
            // this.defaultAddress(); // 显示默认服务地址
        } else {
            alert(res.msg);
            this.$router.push('/search/start');
        }
        },
        setData(res) {
            let { } = {}
            
            this.product_info.service_form = res.data.service_form  // 服务方式
            this.product_info.name = res.data.name // 产品名称
            this.product_info.thumb = res.data.thumb // 缩略图
            this.product_info.seo_title = res.data.seo_title
            this.product_info.score = res.data.score
            this.product_info.price = res.data.price
            this.product_info.market_price = res.data.market_price
            this.product_info.cate_id = res.data.cate_id
            this.product_info.later_hours = res.data.later_hours
            this.total = this.product_info.price
            this.userInfo = res.data.user_info
            // this.setCoupon(res.data.user_coupon)
            this.user_address = res.data.user_address
            this.address_length = res.data.user_address.length
            this.stylists = res.data.stylists
            this.user_image = this.stylists.length > 0 ? this.stylists[0].user_img : ''; // 用户头像
            this.server_street = this.stylists.length > 0 ? this.stylists[0].server_street : ''
            let appoint = res.data.user_old_shipping ? res.data.user_old_shipping : {}
            // console.log(this.confirmOrder)
            let orderAppoint = {
                appoint: appoint.consignee ? appoint.consignee : '', // 预约人
                mobile: appoint.mobile ? appoint.mobile : '', // 预约电话
                date: '', // 预约日期
                time: '', //预约时间
                address: '', // 预约地址
                amount: 0, //优惠券优惠金额
                sn: 0 //使用的优惠券id
            }
            this.SET_CONFIRMORDER(orderAppoint)
            },
        showpic(index){
            let _this=this
            this.num=index
            
            this.store_name=this.storeName[index];
            this.store_info=this.storeInfo[index];
            this.store_id=this.store_info.id;
            this.store_address=this.store_info.store_add;
            this.confirmOrder.store_name = _this.store_name;
            this.confirmOrder.store_id = _this.store_id;
            // console.log(this.confirmOrder.store_id)
            // if(this.confirmOrder.store_id>0){
                // this.getData()
                // alert(this.getData())
                // setTimeout(() => {
                    // console.log(this.getData())
                // }, 10000);
            // }else{
                // alert(2)
            // }
            
            this.confirmOrder.store_address = _this.store_address;
            this.SET_CONFIRMORDER(this.confirmOrder);
            // console.log(this.confirmOrder.store_id);
            // this.$router.push('/shopserviceorder/'+this.$route.params.id+'?stylist_id='+_this.store_id)
            _this.$emit("closeAppoint");
            

        },
        //进入预约时间页面
        trueaddress(){
            let _this=this
            // this.$router.go()
            // this.confirmOrder.store_name = _this.store_name;
            // this.confirmOrder.store_id = _this.store_id;
            // this.confirmOrder.store_address = _this.store_address;
            // this.SET_CONFIRMORDER(this.confirmOrder);
            // this.$emit("closeAppoint")
        }
    }
    
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.app{
    background-color: #f5f5f5;
}

.location-position{
    padding: 0 1rem;
    @include wh(100%,4rem);
    background-color: #fff;
    font-size: 1.7rem;
    line-height: 4rem;
    position: relative;
    img{
        margin-right: .5rem;
        @include wh(1rem,1.2rem);
        vertical-align: middle;
    }
    i.icon {
        position: absolute;
        right: 1.5rem;
        top: 50%;
        transform: translateY(-50%);
        @include wh(.7rem,
        1.3rem);
        @include bgi_2('/static/icon/order/icon_next.png',
        .7rem,
        1.3rem,
        center,
        center,
        no-repeat);
    }
}
.choose-shop{
    width: 100%;
    li{
        width: 100%;
        padding: 0 1rem;
        background-color: #fff;
        border-top: 1px solid #ccc;
        height: 6rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .choosed{
            @include wh(1.7rem,1.7rem);
            border-radius: 50%;
            border: 2px solid #ccc;
            img{
                @include wh(2rem,2rem);
                position: relative;
                left: -.21rem;
                bottom: .25rem;
            }
        }
        .name-address{
            width: 90%;
        }
    }
}
.istrue{
    position: fixed;
    left: 0;
    bottom: 0;
    @include wh(100%,5rem);
    color: #ffffff;
    background-color: #e70034;
    line-height: 5rem;
    text-align: center;
    font-size: 1.8rem;
}
// .tipsinfo{
//     text-align: center;
//     font-size: 1.5rem;
//     line-height: 3rem;
//     background-color: #fff;
//     color: #aaa;
// }
.showArea{
    position: fixed;
    top: 0;
    left: 0%;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba($color: #000000, $alpha: .2);
    .servicearea{
        @include wh(100%,35rem);
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #fff;
        h2{
            line-height: 4rem;
            text-align: center;
            // padding: 0 1rem;
            
        }
        span{
            position: absolute;
            right: 1rem;
            top: 1rem;
            font-size: 1.6rem;
            color: #999;
        }
        .choose{
            @include wh(100%,4rem);
            li{
                @include wh(33%,4rem);
                float: left;
                padding: 0 1.5rem;
                font-size: 1.3rem;
                text-align: center;
                line-height: 4rem; 
            }
            li.active::after{
                @include wh(100%, .3rem);
                content: "";
                display: block;
                background-color: #e70034;
            }
        }
        .pro_city_area{
            width: 100%;
            ul{
                width: 33%;
                height: 27rem;
                padding: 0 1.5rem;
                float: left;
                overflow: scroll;
                li{
                    line-height: 3rem;
                    padding: .5rem 0 0 1rem;
                    font-size: 1.4rem;
                    color: #999;
                    b{
                        font-weight: 100;
                    }
                    .icon{
                        display: inline-block;
                        transform: translateY(20%);
                        width: 1.7rem;
                        height: 1.7rem;
                        background-image: url(/static/icon/order/address_icon_choose.png);
                        background-size: 1.7rem, 1.7rem;
                        background-position: center center;
                        background-repeat: no-repeat;
                    }
                }
            }
        }
        
    }
}
</style>



