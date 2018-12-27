<template>
  <div class="search-result-all">
    <div class="search-result-all-header">
      <div class="header">
        <div class="input">
          <input type="search" v-model="searchText" placeholder="请输入要搜索的内容" @click="btnSearchStart()">
        </div>
        <a href="javascript:void(0);" @click="$router.go(-1)" class="back"></a>
        <a href="javascript:void(0)" @click="btnSearch" class="btn-search">搜索</a>
        <div class="filter">
          <ul class="clear">
            <li class="left" @click="orderByField(`orderByComp`, `.Integrated-field`, `.filter-field,.trading-area`)">
              <div class="filter-Integrated">
                <p :class="{'color-yellow':orderField === 'orderByComp'}">{{integratedSel}}</p>
                <i class="icon" :class="{'icon-sel':orderField === 'orderByComp'}"></i>
              </div>
              
            </li>
            <li class="left"  @click="orderByPrice">
              <div class="filter-price">
                <!--:class="{'color-yellow':orderField === 'orderByPrice'}"-->
                <p :class="{'color-yellow':orderField === 'orderByPrice'}">价格</p>
                <i class="icon" :class="{'icon-sel':orderField === 'orderByPrice'}"></i>
              </div>
            </li>
            <li class="left" @click="orderByField(`orderByDistrict`, `.trading-area`, `.filter-field,.Integrated-field`)">
              <div class="filter-busDistrict">
                <p :class="{'color-yellow':orderField === 'orderByDistrict'}">商圈</p>
                <i class="icon" :class="{'icon-sel':orderField === 'orderByDistrict'}"></i>
              </div>
            </li>
            <li class="left" @click="orderByField(`orderByFilter`, `.filter-field`, `.trading-area,.Integrated-field`)">
              <div class="filter-filter">
                <p :class="{'color-yellow':orderField === 'orderByFilter'}">筛选</p>
                <i class="icon" :class="{'icon-filter':orderField === 'orderByFilter'}"></i>
              </div>
            </li>
          </ul>
          <!--综合排序-->
          <div class="Integrated-field">
            <div class="Integrated">
              <ul>
                <li v-for="item in integratedArr" :key="item" @click="integratedChange(item)">
                  <p :class="{'color-yellow': integratedSel === item.substr(0,2)}">{{item}}</p>
                  <i :class="{'icon': integratedSel === item.substr(0,2)}"></i>
                </li>
              </ul>
            </div>
          </div>
          <!--筛选-->
          <div class="filter-field">
            <div class="filters">
              <p class="sort-title price" :class="{'color-yellow': priceType !== -1}">价格</p>
              <div class="filter-field-list">
                <ul class="clear">
                  <li class="left" :class="{'filter-bgc': priceType === 0}" @click="priceSel(0,0,0)">不限</li>
                  <li class="left" :class="{'filter-bgc': priceType === 1}" @click="priceSel(1,0,100)">￥100以下</li>
                  <li class="left" :class="{'filter-bgc': priceType === 2}" @click="priceSel(2,100,500)">￥100-500</li>
                  <li class="left" :class="{'filter-bgc': priceType === 3}" @click="priceSel(3,500,1000)">￥500-1000</li>
                  <li class="left" :class="{'filter-bgc': priceType === 4}" @click="priceSel(4,1000,5000)">￥1000-5000</li>
                  <li class="left" :class="{'filter-bgc': priceType === 5}" @click="priceSel(5,5000,0)">￥5000以上</li>
                </ul>
              </div>
              <p class="sort-title gender" :class="{'color-yellow': gender !== -1}">性别</p>
              <div class="filter-field-list">
                <ul class="clear">
                  <li class="left" :class="{'filter-bgc': gender === 1}" @click="genderSel(1)">男</li>
                  <li class="left" :class="{'filter-bgc': gender === 2}" @click="genderSel(2)">女</li>
                </ul>
              </div>
              <p class="sort-title level" :class="{'color-yellow': star !== -2}">等级</p>
              <div class="filter-field-list">
                <ul class="clear">
                  <li class="left" :class="{'filter-bgc': star === -1}" @click="starSel(-1)">不限</li>
                  <!-- <li class="left" :class="{'filter-bgc': star === 0}" @click="starSel(0)">见习</li> -->
                  <li class="left" :class="{'filter-bgc': star === 1}" @click="starSel(1)">新晋</li>
                  <li class="left" :class="{'filter-bgc': star === 2}" @click="starSel(2)">专业</li>
                  <li class="left" :class="{'filter-bgc': star === 3}" @click="starSel(3)">高级</li>
                  <li class="left" :class="{'filter-bgc': star === 4}" @click="starSel(4)">首席</li>
                  <li class="left" :class="{'filter-bgc': star === 5}" @click="starSel(5)">明星</li>
                </ul>
              </div>
              <p class="sort-title level" :class="{'color-yellow': serviceType !== -1}">服务方式</p>
              <div class="filter-field-list">
                <ul class="clear">
                  <li class="left" :class="{'filter-bgc': serviceType === 0}" @click="serviceSel(0)">不限</li>
                  <li class="left" :class="{'filter-bgc': serviceType === 1}" @click="serviceSel(1)">上门服务</li>
                  <li class="left" :class="{'filter-bgc': serviceType === 2}" @click="serviceSel(2)">顾客到店</li>
                </ul>
              </div>
              <div class="btn clear">
                <div class="reset left" @click="reset">重置</div>
                <div class="determine right" @click="confirm">确定</div>
              </div>
            </div>
          </div>
          <!--商圈-->
          <div class="trading-area">
            <div class="district">
              <div class="district-detail" v-show="detailShow">
                <ul class="detail">
                  <li v-for="(item, index) in detail" :key="index" @click.prevent="detailSel(`detail${index}`,item)"><span :class="{'color-yellow': `detail${index}` === selDetail}">{{item.name}}</span><i :class="{'icon':  `detail${index}` === selDetail}"></i></li>
                </ul>
              </div>
              <div class="district-sort scroll">
                <ul class="sort">
                  <li @click.prevent="sortSel(`sort${index}`,index,item)" v-for="(item, index) in district" :key="index" :data-areaid="item.areaid" :data-code="item.code" :class="{'color-yellow': `sort${index}` === selSort}">{{item.name}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg"></div>
    <div class="search-result" v-if="hasResult === 1 && !showHistory">
      <div class="list">
          <ul class="page-loadmore-list">
            <li v-for="item in searchList" :key="item.id" @click="todetail(item.id)">
              <!-- <router-link :to="{name: 'detail', params:{id:item.id}}" class="clear"> -->
              <div class="img left">
                <img :src="item.thumb" alt="">
              </div>
              <div class="info left">
                <p class="title">{{item.name}}</p>
                <p class="name">
                  <span v-if="item.type_user == '2'">俏猫</span>
                  <span v-else>{{item.store_name}}</span>
                  <span class="star" v-if="item.type_user == '1' && item.store_type == '1'">{{level[item.level?item.level:0]}}</span>
                </p>
                <p class="price">
                  <span class="current-price">￥{{item.price}}</span>
                  <del class="old-price">￥{{item.market_price}}</del>
                  <span class="collect">
                    <i class="icon"></i>
                    <span>{{item.product_favorite_count ? item.product_favorite_count : '0'}}</span>
                  </span>
                </p>
                <p class="pay_more" v-if="item.cate_id && item.cate_id == 2048">
                  到店再付: {{item.shop_price ? item.shop_price : ""}}元
                </p>
              </div>
              <!-- </router-link> -->
            </li>
          </ul>
        <!-- </mt-loadmore>  -->
      </div>
      <!-- <div class="nomore" v-if="hasResult === 2">一一 没有更多了 一一</div> -->
    </div>
    <no-result v-if="hasResult === 0"></no-result>
  </div>
</template>
<script>
import Vue from 'vue'
import {mapState, mapMutations} from 'vuex'
import {getStore} from '../../common/store'
import keyConf from '../../common/keyConf'
import {search, getDistrict} from '../../service/getData'
import noResult from './children/noResult'
import searchHistory from './children/search'
import { Loadmore, Spinner } from 'mint-ui'
import common from '../../common/common'

Vue.component(Loadmore.name, Loadmore)
Vue.component(Spinner.name, Spinner)
export default {
  name: 'result',
  data () {
    return {
      fileds:'id,name,price,market_price,promotion_price,click_count,sell_count', // 需要的数据字段
      level:['见习','新晋','专业','高级','首席','明星'], // 
      selArea: {}, // 选中的区域
      isScroll: true,
      detailShow: false, // 设置商圈隐藏
      showHistory: '', // 是否显示搜索记录
      searchText: '', // 搜索关键字
      orderField: '', // 默认排序字段 默认后台返回id
      integratedArr: ['综合排序', '销量从高到低', '好评从高到低'],
      integratedSel: '综合', //综合排序默认选项
      district:[], // 模拟商圈区域数据
      detail:[], // 模拟商圈街道数据
      selDetail: 'detail0', //商圈街道筛选
      selSort: 'sort0', //商圈区域筛选
      priceType: -1, // 价格筛选   价格阶段记录
      gender: -1, // 性别筛选  记录性别
      star: -2, // 星段筛选  记录星星
      serviceType: -1, // 服务筛选 记录服务类型
      searchList: [],
      hotWord: [], // 搜索热词
      hasResult: -1, //判断是否有数据返回
      // allUseLoad: false, 
      totalCount: 0,
      // bottomStatus: '',
      // wrapperHeight: 0,
      // mtop: false,
      pageNo: 1, // 当前页数
      page_size: 10, // 单页数据记录
      order_by: 'id', // 排序字段选填默认id |好评：score|价格：price|最新:created_at|人气/销量:sell_count|
      sortBy: 'asc', //价格排序 升降序 |降序:desc|升序:asc|
      price_start: '', // 最小价格
      price_end: '', // 最大价格
      server_street: '' // 商圈
    }
  },
  computed: {
     ...mapState([
      'currentSearch','searchHis','hasHistory','currenrCity'
    ])
  },
  created () {
    //获取搜索结果
    this.getData();
    // 判断是否有搜索记录
    this.HAS_HISTORY();
    // 获取搜索记录
    this.GET_SEARCHHIS();
    
    // 获取商圈
    this.getDistrict();
    $(window).scrollTop(0);
    this.scroll();
  },
  components: {
    noResult,
    searchHistory
  },
  methods: {
    ...mapMutations([
      'CLEAR_SEARCHHIS','HAS_HISTORY','GET_SEARCHHIS','SET_CURRENTSEARCH','SET_SEARCHHIS'
    ]),
    todetail(productId){
        let _this=this
        // if(_this.recommendList.id==1000370 || _this.recommendList.id==1000069 ||_this.recommendList.id==1000167 ){
        if(productId==1000370 || productId==1000069 ||productId==1000167 ){
            _this.$router.push("/choosedetail/"+productId)
        }else{
            _this.$router.push("/detail/"+productId)
        }
    },
    detail(){
        
    },
    btnSearchStart (){
      this.SET_CURRENTSEARCH(this.searchText)
      this.$router.push('/search/start')
    },
    btnSearch (item){
      // 初始化所有的搜索条件（除了关键字）
      // 隐藏筛选条件
      this.hideFilter();
      // 重置筛选条件
      this.orderField = '';
      this.selDetail = 'detail0';
      this.selSort = 'sort0';
      this.priceType = -1
      this.gender = -1
      this.star = -2
      this.serviceType = -1
      // this.allUseLoad = false
      this.pageNo = 1
      this.order_by = 'id'
      this.sortBy = 'asc'
      this.price_start = ''
      this.price_end = ''
      this.server_street =''
      this.searchList = []
      this.showHistory = false
      if(item.length > 0 && typeof(item) === 'string' && item !== '' && item !==undefined){
        this.searchText = item
        // 设置搜索历史
        this.SET_SEARCHHIS(item)
        this.HAS_HISTORY()
        this.SET_CURRENTSEARCH(item)
      }

      this.getData()
      return false
    },
    async getData () {
      if(this.searchText === ''){
        this.searchText = getStore(keyConf.currentSearch)
      } else {
        this.SET_CURRENTSEARCH(this.searchText)
      }
      this.currentSearch = this.currentSearch && this.currentSearch.length > 0 ? this.currentSearch : ''
      this.searchText = this.searchText && this.searchText.length > 0 ? this.searchText : ''
      let searchTest = this.searchText.length > 0 ? this.searchText : this.currentSearch
      let obj = {
        Keyword: searchTest,
        fileds: this.fileds,
        order_by: this.order_by,
        order_rule: this.sortBy,
        price_start: this.price_start,
        price_end: this.price_end,
        sex: this.gender === -1 ? 0 : this.gender,
        level: this.star === -1 || this.star === -2 ? 'all' : this.star,
        server_street: this.server_street,
        service_form: this.serviceType,
        page: this.pageNo,
        page_size: this.page_size
      }
      this.isScroll = false
      let res = await search(obj)
      if(res.status === 'ok'){
        if(res.data.result.length === 0)
          this.isScroll = false
        else
          this.isScroll = true
      
        let data = res.data.result
        this.searchList = this.searchList.concat(data)
        this.totalCount = res.data.count

        if(this.totalCount == this.searchList.length)
          this.isScroll = false
        
        if(this.totalCount === 0)
          this.hasResult = 0
        else
          this.hasResult = 1
      }
    },
    async getDistrict () {
      // {id: this.currentCity}
      let res = await getDistrict()
      res.area.unshift({name:'不限',city_id: 0, areaid: 0, code: 0})
      this.district = res.area
    },
    async getHot () {
      let res = await search()
      this.hotWord = res.data.hot_search
    },
    focusHandle () {
      this.showHistory = true
      this.hasResult = -1
    },
    blurHandle () {
      // this.showHistory = false
    },
    /* handleBottomChange(status) {
      this.bottomStatus = status;
    },
    // 加载更多
    loadBottom() {
        this.pageNo += 1;
        if (this.searchList.length == this.totalCount) {
          this.allUseLoad = true
          this.$refs.loadmore.onBottomLoaded();
        }else{
          this.getData()
        }
    }, */
    scroll(){
      let _this = this
      if(_this.$route.path=='/search/result'){
        common.scroll(()=>{
          if(_this.isScroll){
            _this.pageNo ++ 
            _this.getData()
          }
        })
      }
    },
    confirm () {
      $('.bg').hide()
      this.orderField = ''
      this.hidePanel('.filter-field')

      //重置搜索条件
      this.pageNo = 1
      this.order_by = ''
      this.searchList = []
      this.getData()
    },
    // 改变筛选条件
    orderByField (orderField, showPanel, hidePanel) {
      this.orderField == orderField ? $('.bg').toggle() : $('.bg').show();
      this.orderField = orderField;
      $(showPanel).slideToggle();
      this.hidePanel(hidePanel);
    },
    // 按价格排序
    orderByPrice () {
      this.orderField = this.orderField === 'orderByPrice' ? '' : 'orderByPrice'
      this.sortBy = this.orderField === 'orderByPrice' ? 'asc' : 'desc'
      this.pageNo = 1
      this.order_by = 'price'
      this.getData()
      this.searchList = []
      $('.Integrated-field,.filter-field,.trading-area').slideUp()
      $('.bg').hide()
    },
    integratedChange (item){
      item = item.substr(0,2)
      this.integratedSel = item
      $('.Integrated-field').slideToggle()
      $('.bg').hide()
      this.orderField=''
      this.sortBy = 'asc'
      // 重置搜索条件
      switch (item) {
        case '销量':
          this.order_by = 'sell_count'
          break;
        case '好评':
          this.order_by = 'score'
          break;
        default:
          this.order_by = 'id'
          break;
      }
      this.pageNo = 1
      this.getData()
      this.searchList = []
    },
    hidePanel(sel){
      $(sel).slideUp()
    },
    hideFilter (){
      $(".bg").hide()
      $(".Integrated-field,.filter-field,.trading-area").slideUp()
    },
    // 重置筛选
    reset(){
      this.priceType = -1
      this.gender = -1
      this.star = -2
      this.serviceType = -1
      this.price_start = ''
      this.price_end = ''
      this.priceType = -1
    },
    // 价格筛选
    priceSel(type,start,end){
      this.price_start = ''
      this.price_end = ''
      if(this.priceType === type){
        this.priceType = -1
        return
      }
      this.priceType = type
      if(start === 0 && end === 0)
        return
      //开始价格为0
      if(start === 0){
        this.price_end = end
        return
      }
      // 结束价格为0
      if(end === 0){
        this.price_start = start
        return
      }
      
      if(start !==0 && end !== 0){
        this.price_start = start
        this.price_end = end
      }
    },
    genderSel(gender){
      this.gender = -1
      if(this.gender === gender){
        this.gender = -1
        return
      }
      this.gender = gender
    },
    starSel(star){
      this.star = -1
      if(this.star === star){
        this.star = -1
        return
      }
      this.star = star
    },
    serviceSel(serviceType){
      if(this.serviceType === serviceType){
        this.serviceType = -1
        return
      }
      this.serviceType = serviceType
    },
    // 商圈选择
    detailSel(selDetail, street){
      this.hideFilter ()
      this.server_street = street.street_id == 0 ? this.selArea.code : street.street_id
      this.selDetail = selDetail
      this.searchList = []
      this.orderField =''
      this.getData()
    },
    sortSel(selSort,index, item){
      this.searchList = []
      this.selArea = item
      if(item.code == 0){
        this.server_street = ''
        this.getData()
        this.hideFilter ()
      }
      if(index === 0){
        this.detailShow = false
      } else {
        let street = this.district[index].street.slice(0)
        if(street.length === this.district[index].street.length)
          street.unshift({street_id: '0', name: '不限', area_id: item.area_id, longitude: '0', latitude: '0'})
        this.detail = street
        this.detailShow = true
        this.server_street = item.code
      }
      // this.getData()
      this.selSort = selSort
      this.selDetail = 'detail0'
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.search-result-all{
  // position: relative;
  .bg{
    position: fixed;
    display: none;
    @include wh(100%,100%);
    top: 8.8rem;
    left: 0;
    background: rgba(0,0,0,.2);
  }
}

.search-result-all-header{
  height: 8.8rem;
}
.header{
    position: fixed !important;
    z-index: 1;
    background-color: #fff;
    width: 100%;
    line-height: 4.4rem;
    @include average(#ccc);
    .input{
      // @include wh(100%, 2.8rem);
      width: 100%;
      padding: 0 5.4rem 0 5rem;
      box-sizing: border-box;
      input[type=search]{
        @include wh(100%, 2.8rem);
        border-radius: .5rem;
        background-color: #eaebed;
        padding-left: 3rem;
        background-image: url('../../assets/image/icon/home/search01.png');
        background-size: 1.5rem 1.4rem;
        background-repeat: no-repeat;
        background-position: 1.2rem .8rem;
      }
    }
    a.back{
      position: absolute;
        position: absolute;
        top: .8rem;
        left: 1.3rem;
        @include wh(2.4rem,2.4rem);
        background-image: url('../../assets/image/icon/login/nav_btn_return.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size:2.2rem 2.2rem;
    }
    a.btn-search{
      position: absolute;
      height: 2.4rem;
      top: .8rem;
      right: 1rem;
      line-height: 2.4rem;
      color: #000;
      font-size: 1.6rem;
      letter-spacing: 0;
    }
}
.search-child{
  background-color: #fff;
  letter-spacing: 1px;
  .search-hot{
    @include wh(100%, 4.4rem);
    line-height: 4.4rem;
    padding-left: 1rem;
    font-size: 1.4rem;
    color: #999;
  }
  .search-hotword{
    overflow: auto;
    margin: 1rem 0 2.3rem;
    ul.clear{
      padding-left: .8rem;
      li{
        height: 3.5rem;
        margin: 0 .7rem 1.2rem;
        line-height: 3.5rem;
        padding: 0 1.3rem;
        background-color: #eaebed;
        border-radius: .5rem;
        font-size: 1.3rem;
        color: #666;
      }
    }
  }
  .search-history{
    border-top: .05rem solid #ddd;
    .serach-history-header{
      @include wh(100%, .9rem);
      background-color: #f3f3f3;
    }
    .serach-history-title,.search-noresult{
      position: relative;
      height: 4.3rem;
      line-height: 4.3rem;
      border-bottom: .05rem solid #ddd;
      padding-left: 1rem;
      font-size: 1.4rem;
      color: #999;
      .delete-history{
        position: absolute;
        top: .8rem;
        right: 1.5rem;
        @include wh(2.4rem, 2.4rem);
        background-image: url('/static/icon/search/search_icon_delete.png');
        background-size: 2.2rem 2.2rem;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
    .search-noresult{
      color: #000;
      text-align: center;
    }
    .search-history-result{
      border-bottom: .05rem solid #ddd;
      ul{
        padding-left: 2rem;
        li{
          width: 100%;
          border-bottom: .05rem solid #ddd;
          a{
            height: 4.3rem;
            line-height: 4.3rem;
            padding-left: 1rem;
            font-size: 1.4rem;
          }
          &:last-child{
            border: none;
          }
        }
      }
    }
  }
}
.filter{
  position: relative;
  @include wh(100%, 4.4rem);
  line-height: 4.4rem;
  font-size: 1.3rem;
  color: #000;
  >ul.clear{
    padding: 0 1.6rem;
    li.left{
      position: relative;
      padding: 0 2.8rem 0 1.8rem;
      i{
        position: absolute;
        @include wh(2.2rem,2.2rem);
        top: 50%;
        transform: translateY(-50%);
        right: 1.0rem;
        background-image: url('/static/icon/search/list_btn_retract.png');
        background-size: 2.2rem 2.2rem;
        background-repeat: no-repeat;
        background-position: center center;
      }
      &:last-child{
        i{
          background-image: url('/static/icon/search/list_btn_Filter.png');
        }
        .icon-filter{
          background-image: url('/static/icon/search/list_btn_Filter_sel.png');
        }
      }
      .icon-sel{
        background-image: url('/static/icon/search/list_btn_retract_sel.png');
      }
      &:nth-of-type(2){
        .icon-sel{
          background-image: url('/static/icon/search/list_btn_retract_up.png');
        }
      }
    }
  }
  .Integrated-field,.filter-field,.trading-area{
    position: absolute;
    z-index: 2;
    top: 4.4rem;
    left: 0px;
    display: none;
    width: 100%;
    background-color: #fff;
  }
  .Integrated-field{
    // display: none;
    .Integrated{
      margin-left: 1.5rem;
      li{
        position: relative;
        @include average(#ddd);
        &:last-child{
          border: none;
        }
        i.icon{
          position: absolute;
          top: 1rem;
          right: 2.2rem;
          @include wh(2.2rem, 2.2rem);
          background-image: url('/static/icon/search/list_icom_select.png');
          background-size: 2.2rem 2.2rem;
          background-position: center center;
          background-repeat: no-repeat;
        }
      }
    }
  }
  .filter-field{
    // display: none;
    .filters{
      p.sort-title{
        margin-left: 1.5rem;
        height: 4rem;
        line-height: 4rem;
        font-size: 1.4rem;
      }
      div.filter-field-list{
        box-sizing: border-box;
        @include average(#ccc);
        .clear{
          margin-left: 1.5rem;
          li{
            @include wh(8rem,3rem);
            @include borderRadius(.4rem);
            box-sizing: border-box;
            text-align: center;
            border: 1px solid #ccc;
            margin:0 .45rem 1.2rem .45rem;
            line-height: 3rem;
            font-size: 1.2rem;
            color: #999;
            letter-spacing: 0;
            &:nth-of-type(5){
              font-size: 1.2rem;
            }
          }
          .filter-bgc{
            // background-color: $themeRed;
            border: 1px solid $themeRed;
            color: $themeRed;
          }
        }
      }
      div.btn{
        .reset,.determine{
          height: 4.7rem;
          font-size: 1.4rem;
          color: #000;
          line-height: 4.7rem;
          text-align: center;
          letter-spacing: 1px;
        }
        .reset{
          width: 44%;
        }
        .determine{
          width: 54%;
          background-color: $themeRed;
          color: $bgWhite;
        }
      }
    }
  }
  .trading-area{
    height: 46.9rem;
    .district{
      position: relative;
      .district-detail{
        width: 100%;
        height: 46.9rem;
        overflow-y: auto;
        ul.detail{
          margin-left: 12rem;
          background-color: #f3f3f3;
          li{
            position: relative;
            padding-left: 3.3rem;
            span{
              font-size: 1.4rem;
              color: #666;
            }
            i.icon{
              position: absolute;
              top: .6rem;
              left: .6rem;
              @include wh(2.2rem, 2.2rem);
              @include bgi_2('/static/icon/search/list_icom_select.png', 2.2rem, 2.2rem, center, center, no-repeat);
            }
            .color-yellow{
              color: $themeRed;
            }
          }
        }
      }
      div.district-sort{
        @include wh(12rem, 46.9rem);
        position: absolute;
        top: 0;
        left: 0;
        overflow: auto;
        ul.sort{
          border-right: .05rem solid #ccc;
          li{
            padding-left: 1.5rem;
            font-size: 1.4rem;
          }
        }
      }
      li{
        @include wh(100%,4.4rem);
        line-height: 4.4rem;
        box-sizing: border-box;
        @include average(#ccc);
      }
    }
  }
  .color-yellow{
    color: $themeRed;
  }
}
.search-result{
  
  .list{
    overflow: scroll;
    &.mtop{
      // margin-top: 4.4rem;
      padding-top: 4.4rem;
    }
    ul{
      li{
        @include wh(100%, 12.4rem);
        line-height: 12.4rem;
        padding-left:1.5rem;
        @include average(#ccc);
        // border: .05rem solid #ddd;
        box-sizing: border-box;
        .img{
          height: 12.3rem;
          img{
            @include wh(10.5rem, 11rem);
            vertical-align: middle;
          }
        }
        .info{
          width: 60%;
          height: 12.3rem;
          padding-top: .6rem;
          letter-spacing: 1px;
          box-sizing: border-box;
          p{
            width: 100%;
            padding-left: 1.2rem;
            font-size: 1.4rem;
            color: #000;
          }
          .title{
            height: 4.6rem;
            max-height: 4.6rem;
            line-height: 4.6rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &.titleMax_10{
              line-height: 2.3rem;
            }
          }
          .name{
            position: relative;
            height: 3.5rem;
            line-height: 4rem;
            span.star{
              position: absolute;
              line-height: 2rem;
              padding-left: 1.3rem;
              @include wh(6.4rem, 2rem);
              @include bgi_2('/static/icon/coupon/product_bg_grade.png',5rem,1.6rem);
              @include sc(1rem,$bgWhite);
              top: 50%;
              transform: translateY(-50%);
              
              // left: 6.2rem;
            }
          }
          .price{
            position: relative;
            line-height: 1.4rem;
            .current-price{
              font-size: 1.4rem;
              color: #e65058;
            }
            .old-price{
              font-size: 1.2rem;
              color: #999;
            }
            .collect{
              display: block;
              position: absolute;
              right: 1.5rem;
              top: 0;
              line-height: 1.4rem;
              .icon{
                display: inline-block;
                @include wh(1.4rem,1.4rem);
                background-image: url('/static/icon/search/list_btn_collect.png');
                background-size: 2.2rem 2.2rem;
                background-repeat: no-repeat;
                background-position: center center;
              }
              span{
                display: inline-block;
                vertical-align: top;
                font-size: 1.2rem;
                color: #999;
              }
            }
          }
          .pay_more{
            @include sc(1.1rem,#999);
            text-align: left;
            line-height: 1.2rem;
            margin: 0.6rem 0 0.8rem;
            padding-right: 1rem;
          }
        }
      }
    }
  }
  .nomore{
    padding-top: .9rem;
    text-align: center;
    background-color:#F5F5F5;
    font-size: 1.2rem;
    color: #999;
  }
  
}
</style>