<template>
    <div class="serviceshop-module">
        <section class="shop-info">
            <div class="location-position" @click="isshowarea=true">
                <img src="../../../../static/icon/ucenter/my_icon_address.png" alt="">
                <span>{{choosecity}}</span>
                <span>{{choosearea}}</span>
                <span style="float:right;font-size:2rem">&gt;</span>
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
            <div class="tipsinfo" v-if="isshowlist">---  {{tipsinfo}}  ---</div>
            <div class="istrue" @click="trueaddress">确定</div>
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
                        <li @click="getarea(item.city_id)" v-for="item in cityarr">{{item.name}}</li>
                    </ul>
                    <ul class="area">
                        <li v-for="item in areaarr" @click="getaddress(item.city_id,item.area_id)">{{item.name}}</li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import {getProv,getCity,getArea,qcsAddressList} from '../../../service/getData'
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return{
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
            tipsinfo:"请选择服务门店",
            num:1,
            storeName:[],
            store_name:'',
            storeInfo:{
                storeName:"",
                address:"",
                stylist_id:""
            }
        }
    },
    created(){
        this.store_name = this.confirmOrder ? this.confirmOrder.store_name : ''
    },
    computed:{
    ...mapState(['confirmOrder'])
    },
    mounted(){
        this.cityarr=[{"city_id":"110100","name":"北京市"},{"city_id":"440100","name":"广州市"}]
    },
    methods:{
        ...mapMutations(['SET_CONFIRMORDER']),
        async getarea(aaa){
            this.ishowtrue=true
            let obj={
                city_id:aaa
            }
            let res=await getArea(obj)
            if(res.status=="ok"){
                this.areaarr=res.data
            }
            console.log(res.data)
            if(aaa==110100){
                this.choosecity="北京市"
            }else{
                this.choosecity="广州市"
            }
        },
        async getaddress(city,area){
            this.storeName=[]
            let _this=this
            let obj={
                city_id:city,
                area_id:area
            }
            let res=await qcsAddressList(obj)
            if(res.status=="ok"){
                this.shoplist=res.data
                console.log(res.data)
                for(let i in res.data){
                    _this.storeName=_this.storeName.concat(res.data[i].store_name)
                    _this.storeInfo=_this.storeInfo.concat(res.data[i])
                }
                console.log(this.storeInfo)
                console.log(this.storeName)
                if(res.data==false){
                    _this.isshowlist=true
                    _this.tipsinfo="该区域内没有服务门店"
                }else{
                    _this.isshowlist=false
                }
            }
        },
        showpic(index){
            this.num=index
            this.store_name=this.storeName[index]
            console.log(this.storeInfo)
        },
        trueaddress(){
            let _this=this
            // this.$router.go()
            this.confirmOrder.store_name = _this.store_name;
            this.SET_CONFIRMORDER(this.confirmOrder)
            this.$emit("sendstorename",this.store_name)
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
    font-size: 1.3rem;
    line-height: 4rem;
    img{
        margin-right: .5rem;
        @include wh(1rem,1.2rem);
        vertical-align: middle;
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
        overflow: hidden;
        .choosed{
            @include wh(1.8rem,1.8rem);
            border-radius: 50%;
            border: 2px solid #ccc;
            text-align: center;
            margin-top: 1.8rem;
            float: left;
            img{
                @include wh(2rem,2rem);
                float: left;
                position: relative;
                left: -.25rem;
                bottom: .3rem;
            }
        }
        .name-address{
            width: 26rem;
            float: left;
            padding: 1rem 0 0 1rem;
        }
    }
}
.istrue{
    position: fixed;
    left: 0;
    bottom: 0;
    @include wh(100%,4rem);
    color: #ffffff;
    background-color: #e70034;
    line-height: 4rem;
    text-align: center;
    font-size: 1.8rem;
}
.tipsinfo{
    text-align: center;
    font-size: 1.5rem;
    line-height: 3rem;
    background-color: #fff;
    color: #aaa;
}
.showArea{
    width: 100%;
    height: 55.5rem;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    background-color: rgba($color: #000000, $alpha: .1);
    .servicearea{
        @include wh(100%,20rem);
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
            font-size: 1.5rem
        }
        .choose{
            @include wh(100%,4rem);
            li{
                @include wh(10rem,4rem);
                float: left;
                padding: 0 1.5rem;
                font-size: 1.5rem;
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
                width: 10rem;
                height: 12rem;
                padding: 0 1.5rem;
                float: left;
                overflow: scroll;
                li{
                    line-height: 2rem;
                }
            }
        }
        
    }
}
</style>



