<template>
<div class="stylist">
  <header>
    <div class="height">
      <div class="fixed">
        <div class="input">
          <form @submit.prevent="funSearch">
            <input type="search" placeholder="请输入要搜索的关键字" v-model="searchSty">
          </form>
        </div>
        <a href="javascript:void(0);" @click="$router.go(-1)"></a>
      </div>
      <ul class="tab">
        <li @click="changeType('fans')"><span :class="{'active': tab == 'fans'}">人气美妆师</span></li>
        <li @click="changeshop">
            <img src="../../../static/icon/appointment/shoplogo_03.png" alt="">
            <span :class="{'active': tab == 'new'}">小屈到店</span>
        </li>
        <!-- <li @click="changeshop"><span class="active">小屈到店</span></li> -->
      </ul>
      <ul class="beautyartist_tab" v-if="isShowArtist">
          <li @click="fansRankings(fans)">人气旺</li>
          <li @click="necome(work_years)">新入驻</li>
      </ul>
        <div v-if="!isShowArtist" class="shop_area">
            <span>门店区域:</span>
            <div>
                <select v-model="city_id" class="city" name="" id="city" @change="getarea($event)">
                    <option value="0">请选择</option>
                    <option :value="item.city_id" v-for="item in cityarr">{{item.city_name}}</option>
                </select>
            </div>
            <div>
                <select v-model="area_id" class="area" name="" id="area" @change="getAraeaShop($event)">
                    <option value="0">请选择</option>
                    <option :value="item.area_id" v-for="item in areaarr">{{item.name}}</option>
                </select>
            </div>    
        </div>
    </div>
  </header>
  <content>
        <div class="list">
            <ul class="beauty_artist" v-if="isShowArtist">
                <li class="shop_info" :data-fans="item.fans" v-for="(item,index) in stylist" :key="index" @click="$router.push(`/detail/shopping/${item.id}`)">   <!--@click="$router.push(`/detail/shopping/${item.id}`)-->
                    <div class="beauty_img">
                        <img v-lazy=" item.user_img.indexOf('http') > -1 ? item.user_img : `${baseUrl}${item.user_img}`" >
                    </div>
                    <div class="beauty_info">
                        <div class="beauty_name">
                            <span class="name">{{item.store_name}}</span> 
                            <span class="level">{{item.level_name}}</span>
                        </div>
                        <div class="rate"> 
                            <p>好评率:<span class="praise_rate">{{item.Agency_rate}}</span></p>
                            <p>接单率:<span class="mono_rate">{{item.Order_rate}}</span></p>
                        </div>
                        <!-- <span class="level">{{item.level_name}}</span> -->
                    </div>
                </li>
            </ul>
            <ul class="beauty_artist" v-if="!isShowArtist">
                <li class="shop_info" v-for="(i,index) in shoplist" :key="index" @click="$router.push(`/detail/qcsshopping/${i.id}`)">   <!--@click="$router.push(`/detail/shopping/${item.id}`)-->
                    <div class="beauty_img">
                        <!-- <img v-lazy=" i.user_img.indexOf('http') > -1 ? i.user_img : `${shopbaseUrl}${i.user_img}`" > -->
                        <img :src="i.user_img" >
                    </div>
                    <div class="beauty_info">
                        <p class="beauty_name nowrap">{{i.store_name}}</p>
                        <!-- <div class="rate"> 
                            <div>好评率:<span class="praise_rate">{{i.Agency_rate}}</span></div>
                            <div>接单率:<span class="mono_rate">{{i.Order_rate}}</span></div>
                        </div> -->
                        <!-- <div class="store_add">{{i.store_add}} </div> -->
                        <!-- 服务时间 -->
                        <div class="service_time" style="line-height:2rem;">
                            <span style="color:#000;font-size:1.4rem;">服务时间</span>
                            {{i.business_start}} -{{i.business_end}}
                         </div>
                        <!-- <span class="level">{{i.level_name}}</span> -->
                    </div>
                </li>
                
            </ul>
        </div>
    <!-- ----之前代码---- -->
    <!-- <div class="list"> -->
      <!-- <ul class="clear"> -->
        <!-- <li class="left" v-if="recommend != null"> -->
        
          <!-- <a :href="`/detail/shopping/${recommend.id}`"> -->
          <!-- :src=" item.user_img.indexOf('http://') > -1 ? item.user_img : `${baseUrl}${item.user_img}`" -->
            <!--<img v-lazy=" recommend.user_img.indexOf('http') > -1 ? recommend.user_img : `${baseUrl}${recommend.user_img}`" >--> <!-- @error="defaultSrc(this)" -->
            <!-- <p class="nick">{{recommend.real_name}}</p> -->
            <!-- <span>{{recommend.level_name}}</span> -->
            <!-- <span>{{level[recommend.level]}}</span> -->
          <!-- </a> -->

        <!-- </li> -->
        <!-- <li class="left" v-for="(item,index) in stylist" :key="index"> -->
          <!-- <a :href="`/detail/shopping/${item.id}`"> -->
          <!-- :src=" item.user_img.indexOf('http://') > -1 ? item.user_img : `${baseUrl}${item.user_img}`" -->
            <!-- <img v-lazy=" item.user_img.indexOf('http') > -1 ? item.user_img : `${baseUrl}${item.user_img}`" > @error="defaultSrc(this)" -->
            <!-- <p>{{item.real_name}}</p> -->
            <!-- <span>{{item.level_name}}</span> -->
            <!-- <span>{{level[item.level]}}</span> -->
          <!-- </a> -->
        <!-- </li> -->
      <!-- </ul> -->
    <!-- </div> -->
  </content>
</div>
</template>
<script>
import { getStylistFans ,store_detail, getStylist,yslGetNick,qcsAddressList,getArea,getCity,userIsLogin} from '../../service/getData'
import keyConf from '../../common/keyConf'
import { getStore } from '../../common/store'
import common from '../../common/common'
import { get } from 'http';
import { compare } from 'semver';
import { error } from 'util';
export default {
  name: 'stylist',
  data () {
    return {
        searchSty: '',  // 要搜索的店铺
        isShowArtist:true,//美妆师切换
        // pageNo: 1, // 要获取的页数
        // page_size: 10, // 单页记录数
        total_count: 0, // 总记录数
        city: {}, // 当前所在城市
        tab: 'fans', // 选择的tab
        sourceTab:'', // 存原tab
        id: 0, // 推荐的id
        flag: true, // 标识服务端是否已经响应
        stylist: [], // 美业师列表
        recommend:null, // 推荐
        baseUrl: 'http://pic.qiaocat.com/upload/',
        shopbaseUrl: 'http://crm.qiaocat.com/upload/',
        level:['见习','新晋','专业','高级','首席','明星'],// 美业师等级
        fans:[],
        cityoption:[],//门店所在的区域
        cityarr:[],//
        areaarr:[],//
        city_id:0,
        area_id:'0',
        shoplist:[],
        active:"",
        link:'',//
        appOpen:false,//
    }
  },
  created(){
    this.city = JSON.parse(getStore('current_city'))
    this.tab = this.$route.params.tabName
    this.link=this.$route.query.link
    this.sourceTab = this.tab
    // this.id = this.$route.params.id
    $(window).scrollTop(0);
    this.scroll(this.$route.query)
    this.Initiali_stylist()
    this.getStylist()
    console.log(this.city)
  },
  beforecreate(){

  },
  mounted(){
      this.cityarr=[{"city_id":"110100","city_name":'北京市'},{"city_id":"440100","city_name":'广州市'}]
      console.log(this.$route.query.link)
  },
  methods: {
      Initiali_stylist(){
            let _this=this
            if(_this.link=="watsons"){
                _this.tab='new'
                _this.isShowArtist=false
                _this.getAraeaShop()
            }else{
                _this.isShowArtist=true
            }
      },
      //选择区
    async getarea(event){
        //判断是否登录
        let qm_cookie=$.cookie(keyConf.qm_cookie)
        let isLogin=await userIsLogin()
        if(!qm_cookie || isLogin.status=="error"){
            // if(this.appOpen){
                let baseUrl=`/stylist/fans?link=watsons`
                this.$router.push(baseUrl)
                alert("未登录")
                window.location.href=`/login?action=login`
            // }else{
                
                
            // }
        }else{
            let baseUrl=`/stylist/fans?link=watsons`
            this.$router.push(baseUrl)
        }

        this.city=event.target.value
        let obj={
            city_id:this.city_id
        }
        let res=await getArea(obj)
        console.log(res)
        if(res.status=="ok"){
            this.areaarr=res.data
            console.log(this.areaarr)
        }
    },
    //选择区域内门店
    async getAraeaShop(){
        this.stylist=[]
        let obj={
            city_id:this.city_id,
            area_id:this.area_id
        }
        let res=await qcsAddressList(obj)
        if(res.status=="ok"){
            this.shoplist=res.data
        }
        console.log(res)
    },
    funSearch(){
      this.pageNo = 1
      this.stylist = []
      this.id = 0
      $(window).scrollTop(0)
      this.getStylist()
    },
    async changeshop(){
        this.isShowArtist=false
        this.tab="new"
        this.stylist=[]
        let obj={
            city_id:this.city_id,
            area_id:this.area_id
        }
        let res=await qcsAddressList(obj)
        if(res.status=="ok"){
            this.shoplist=res.data
            console.log(this.shoplist)
        }
    },
    changeType(tab){

      $(window).scrollTop(0)
      this.tab = tab
      // this.id = this.tab == this.sourceTab ? this.$route.params.id : 0
      this.id = 0
      this.pageNo = 1
      this.searchSty = ''
      this.stylist = []
      this.recommend = null
      this.getStylist()
      if(tab=="fans"){
          this.isShowArtist=true
      }else{
          this.isShowArtist=false
      }
    },
    //人气排行
    async fansRankings(key){
        this.store_id=[]
        this.ratedetail=[]
        this.stylist=[]
        let _this=this
        let obj={
            sort_by: this.tab,
            recommend_sid: this.id,
            sort_rule: 'desc',
            name: this.searchSty,
            province_id: '',
            city_id: this.city.city_id,
            area_id: '',
            page: this.pageNo,
            page_size: this.page_size
        }
        let res=await getStylistFans(obj)
        console.log(res)
        if(res.status=="ok"){
            console.log(res.data.result)
            _this.total_count = res.data.count
            _this.recommend = res.data.recommend
            this.stylist=res.data.result
            let compare=function(a,b){
                let x=a.fans
                let y=b.fans
                if(x>y){
                    return -1
                }else if(x<y){
                    return 1
                }else{
                    return 0
                }
            }
            return res.data.result.sort(compare)
        }
    },
    //新入驻
    async necome(key){
        this.store_id=[]
        this.ratedetail=[]
        this.stylist=[]
        let _this=this
        let obj={
            sort_by: this.tab,
            recommend_sid: this.id,
            sort_rule: 'desc',
            name: this.searchSty,
            province_id: '',
            city_id: this.city.city_id,
            area_id: '',
            page: this.pageNo,
            page_size: this.page_size
        }
        let res=await getStylistFans(obj)
        console.log(res)
        if(res.status=="ok"){
            console.log(res.data.result)
            _this.total_count = res.data.count
            _this.recommend = res.data.recommend
            this.stylist=res.data.result
            let compare=function(a,b){
                let x=a.work_years
                let y=b.work_years
                if(x>y){
                    return -1
                }else if(x<y){
                    return 1
                }else{
                    return 0
                }
            }
            return res.data.result.sort(compare)
        }
    },
    async getStylist(){
      this.flag = false
      let obj = {
        sort_by: this.tab,
        recommend_sid: this.id,
        sort_rule: 'desc',
        name: this.searchSty,
        province_id: '',
        city_id: this.city.city_id,
        area_id: '',
        page: this.pageNo,
        page_size: this.page_size
      }
      let res = await getStylistFans(obj)
      if(res.status == 'ok'){
        this.stylist = this.stylist.concat(res.data.result)
        this.total_count = res.data.count
        this.recommend = res.data.recommend
      }
      this.flag = true
      
    },
    scroll(){
      let _this = this
      if(this.$route.path.indexOf('/stylist') > -1 ){
        common.scroll(()=>{
          if(_this.flag){
              _this.pageNo++
              _this.getStylist()
            }
        })
      }
    },
    defaultSrc(_this){
      $(_this).attr('src','/static/icon/search/data_photo_default.png')
    }
  }

}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.nowrap{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; 
}
.stylist{
  header{
    // @include wh(100%,4.4rem);
    height: 11.8rem;
    .height{
      position: fixed !important;
      @include bgColor(#fff);
      @include average(#ccc);
      width: 100%;
      z-index: 1;
    }
    .fixed{
      @include wh(100%,4.4rem);
      .input{
        padding: 0 1.5rem 0 4.2rem;
        line-height: 4.4rem;
        input{
          @include wh(100%,2.8rem);
          @include bgColor(#EEE);
          @include bgi_2('../../assets/image/icon/city/home_icon_search.png',1.4rem,1.4rem,.4rem);
          border-radius: .4rem;
          padding-left: 2.2rem;
          line-height: 2.8rem;
        }
      }
      a{
        position: absolute;
        @include wh(4.4rem,4rem);
        @include bgi_2('../../assets/image/icon/city/nav_btn_return.png',2.2rem,2.2rem);
        top: 0;
        // left: 1.5rem;
        // padding: 1rem;
      }
    }
    .tab{
      display: flex;
      @include wh(100%,4.4rem);
      li{
        flex: 1;
        @include sc(1.4rem,#000);
        height: 4.4rem;
        line-height: 4.4rem;
        text-align: center;
        img{
            position: relative;
            top: .3rem;
            left: 1rem;
            width: 1.5rem;
        }
        span{
          display: inline-block;
          height: 4.4rem;
          box-sizing: border-box;
          padding: 0 1rem;
          font-size: 1.6rem;
          &.active{
            border-bottom: .3rem solid $themeRed;
            color: $themeRed;
          }
        }
      }
    }
    .beautyartist_tab{
        width: 100%;
        height: 3rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-top: 1px solid #eee;
        li{
            color: #737373;
            font-size: 1.4rem;
        }
    }
    .shop_area{
        width: 100%;
        padding:.8rem 0 0 1.7rem;
        height: 4rem;
        // line-height: 4rem;
        span{
            margin-right: 1rem;
            float: left;
            margin-top:.5rem; 
        }
        div{
            width: 10rem;
            height: 2.3rem;
            float: left;
            padding-left: 1rem;
            position: relative;
        }
        select{
            border: 1px solid #ccc;
            width: 100%;
            height: 100%;
            color: #666;
            appearance: none;
            float: left;
            -moz-appearance:none;
            -webkit-appearance:none;
            padding-right: 14px;
            background-color: #fff;
            text-indent: 1rem;
        }
       div:after{
           content: "";
           position: absolute;
           width: 2rem;
           height: 2.3rem;
           right: 0rem;
        //    top: 1rem;
           border-left: 1px solid #ccc;
           background: url(../../../static/icon/all/selecticon.png) no-repeat center center;
           background-size: 1rem .7rem;
           z-index: 9;
       } 
    }
  }
  content{
    .list{
        width: 100%;
        .beauty_artist{
            width: 100%;
            padding-top: 1rem;
            li{
                width: 100%;
                height: 10.6rem;
                border-bottom: 1px solid #eee;
                padding: 0 1.7rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .beauty_img{
                    width: 8rem;
                    height: 8rem;
                    border-radius: 50%;
                    overflow: hidden;
                }
                img{
                    @include wh(100%,100%)
                }
                .beauty_info{
                    width: 70%;
                    padding: 0 1rem;
                    line-height: 2.2rem;
                    color: #000;
                    .beauty_name{
                        height: 3rem;
                        font-size: 1.5rem; 
                        color: #000;
                    }
                    .rate{
                        display: inline-block;
                        font-size: 1.3rem;
                    }
                    .mono_rate,.praise_rate{
                        padding: 0 1rem 0 .5rem;
                    }
                }
                .level{
                    display: inline-block;
                    @include wh(4rem,2.1rem);
                    @include bgi_2('/static/icon/coupon/product_bg_grade.png',4rem,2.1rem);
                    @include sc(1rem,$bgWhite);
                    line-height: 2.3rem;
                    text-align: left;
                    padding-left: .2rem
                }
            }
        }
    //   padding: 0 1.5rem;
    //   li.popula_new{
    //       width: 100%;
    //       height: 3rem;
    //       display: flex;
    //       justify-content: space-around;
    //       align-items: center;
    //     //   border-top:1px solid #333; 
    //       border-bottom:1px solid #ccc; 
    //   }
    //   li.left{
    //     width: 50%;
    //     text-align: center;
    //     padding-top: 2rem;
    //     img{
    //       @include wh(12rem,12rem);
    //       border-radius: 50%;
    //     }
    //     p{
    //       @include sc(1.4rem,#000);
    //       overflow: hidden;
    //       text-overflow: ellipsis;
    //       white-space: nowrap;
    //     }
    //     span{
    //       display: inline-block;
    //       @include wh(4rem,2.1rem);
    //       @include bgi_2('/static/icon/coupon/product_bg_grade.png',4rem,2.1rem);
    //       @include sc(1rem,$bgWhite);
    //       line-height: 2.3rem;
    //       text-align: left;
    //       padding-left: .2rem
    //     }
    //   }
    }
  }
}
</style>