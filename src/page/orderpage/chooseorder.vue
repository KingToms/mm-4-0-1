<template>
  <div class="order" :class="{'bgColor': page === 'coupon'}">
    <div class="bg" :class="{'show':bgShow || isCatFoodBg}"></div>
    <div class="header">
      <div class="title">
        <h2>{{title}}</h2>
      </div>
      <a class="back" href="javascript:void(0);" @click="back"></a>
      <span class="edit" @click="editAddress" v-if="this.page == 'address' && address_length" v-show="addressEditing">编辑</span>
    </div>
    <!-- 预约人 -->
    <div class="main appoint-person" v-if="this.page === 'appoint'">
      <appoint @closeAppoint="chooseAppoint('order','确认订单')"></appoint>
    </div>
    <!-- 预约人 -->
    <!-- 预约地址 -->
    <div class="main appoint-address" v-if="this.page === 'address'">
      <v-address ref="detailAddress" @linkBack="back" @addNewAdd="addNew" @noAddress="noAddressState" :userInfomation="userInfo" :server-street="server_street"></v-address>
    </div>
    <!-- 预约地址 -->
    <!-- 预约时间 -->
    <div class="main appoint-time" v-if="this.page === 'time'">
      <!-- <v-date :busyTime="busyTime" @closeAppoint="chooseAppoint('order','确认订单')"></v-date> -->
      <v-date :productCate="product_info.later_hours" :busyTime="stylists" @closeAppoint="chooseAppoint('order','确认订单')"></v-date>
    </div>
    <!-- 预约时间 -->
    <!-- 服务门店 -->
    <div class="main appoint-shop" v-if="this.page==='serviceshop'">
        <serviceshop @closeAppoint="chooseAppoint('order','确认订单')"></serviceshop>
        <!-- <a @sendstorename="sendstorename"></a> -->
    </div>
    <!-- 服务门店 -->
    <!-- 优惠券 -->
    <div class="main coupon" v-if="this.page === 'coupon'">
      <v-coupon @closeAppoint="chooseAppoint('order','确认订单')" :coupon="product_info.coupon"></v-coupon>
    </div>
    <!-- 优惠券 -->
    <!-- <date-sel></date-sel>  -->
    <!-- 服务方式 -->
    <div class="main order-info" v-if="this.page === 'order'">
      <section class="service bgwhite">
        <div :class="shopClassName" @click="shopService" >
            <img src="../../../static/icon/appointment/shoplogo_03.png" alt="">
            到店服务
        </div>
        <div :class="doorClassName" @click="doorService" >
            上门服务
        </div>
      </section>
      <div class="red-solid">
          <p :class="shopClassName"></p>
          <p :class="doorClassName"></p>
      </div>
      <!-- 服务方式 -->
      <!-- 预约人，预约时间，地址 -->
      <section class="appoint bgwhite">
        <ul class="appoint-info" v-if="showDoor">
          <li @click="chooseAppoint('appoint','预约人')">
            <span>预约人</span>
            <!--<div href="javascript:void(0);" :class="{'color-black':confirmOrder.appoint || confirmOrder.mobile}">{{confirmOrder.appoint || confirmOrder.mobile ? `${confirmOrder.appoint} ${confirmOrder.mobile}` :"请选择"}}</div>-->
            <div href="javascript:void(0);">
              <i :class="{'color-black':confirmOrder.appoint}">{{confirmOrder.appoint ? confirmOrder.appoint : "请填写预约人"}}</i>&nbsp;&nbsp;
              <i :class="{'color-black':confirmOrder.mobile}">{{confirmOrder.mobile ? confirmOrder.mobile : "请填写预约电话"}}</i>
            </div>
            <i class="icon" v-show="inDoor!=2"></i>
          </li>
          <li @click="chooseAppoint('time','选择服务时间')">
            <span>服务时间</span>
            <div href="javascript:void(0);" :class="{'color-black':confirmOrder.date}">{{confirmOrder.date?`${confirmOrder.date} ${confirmOrder.time?confirmOrder.time:''}`:"请选择"}}</div>
            <i class="icon"></i>
          </li>
          <li @click="chooseAppoint('address','选择服务地址')" class="last-child">
            <span>服务地址</span>
            <div href="javascript:void(0);" :class="{'color-black': confirmOrder.address}">{{confirmOrder.address ? confirmOrder.address :"请选择"}}</div>
            <i class="icon"></i>
          </li>
        </ul>
        <!-- 预约人，预约时间，地址 -->
        <!-- 服务门店   服务时间   预约人 -->
        <ul class="appoint-info" v-if="!showDoor">
            <li @click="chooseAppoint('serviceshop','选择门店服务')" class="last-child">
                <span>服务门店</span>
                <!-- <div href="javascript:void(0);" :class="{'color-black': confirmOrder.serviceshop}">{{confirmOrder.serviceshop ? confirmOrder.serviceshop :"请选择 (现仅开通北京、广州门店服务)"}}</div> -->
                <div href="javascript:void(0);" :class="{'color-black':confirmOrder.store_name}">{{confirmOrder.store_name ? confirmOrder.store_name : "请选择 (现仅开通北京、广州门店服务)"}}</div>
                <i class="icon" v-show="inDoor != 1"></i>
            </li>
            <li @click="chooseAppoint('time','选择服务时间')">
                <span>服务时间</span>
                <div href="javascript:void(0);" :class="{'color-black':confirmOrder.date}">{{confirmOrder.date?`${confirmOrder.date} ${confirmOrder.time?confirmOrder.time:''}`:"请选择"}}</div>
                <i class="icon"></i>
            </li>
            <li @click="chooseAppoint('appoint','预约人')">
                <span>预约人</span>
                <!--<div href="javascript:void(0);" :class="{'color-black':confirmOrder.appoint || confirmOrder.mobile}">{{confirmOrder.appoint || confirmOrder.mobile ? `${confirmOrder.appoint} ${confirmOrder.mobile}` :"请选择"}}</div>-->
                <div href="javascript:void(0);">
                <i :class="{'color-black':confirmOrder.appoint}">{{confirmOrder.appoint ? confirmOrder.appoint : "请填写您的姓名"}}</i>&nbsp;&nbsp;
                <i :class="{'color-black':confirmOrder.mobile}">{{confirmOrder.mobile ? confirmOrder.mobile : "联系电话"}}</i>
                </div>
                <i class="icon"></i>
            </li>
        </ul>
      </section>
      <!-- 服务门店   服务时间   预约人 -->
      <!-- 商品信息，留言 -->
      <section class="product bgwhite mgt">
        <div class="shop-info">
          <img :src="user_image | userImg">
          <!-- <img :src="stylists.length>0?stylists[0].user_img:require('../../assets/image/icon/detail/details_photo_store60px.png')" alt=""> -->
          <span>{{confirmOrder.store_name}}</span>
          <div class="star">
            <i class="icon" v-for="item in product_info.score" :key="item"></i>
            <!-- <i class="icon"></i>
                    <i class="icon"></i> -->
          </div>
        </div>
        <div class="product-info clear">
          <div class="img left">
            <img :src="product_info.thumb" alt="">
          </div>
          <div class="info left">
            <p>{{product_info.name}}</p>
            <!-- <p>模特礼仪妆</p> -->
            <p class="price">
              <span class="currentPrice">￥ {{product_info.price}}</span>
              <del class="oldPrice">￥ {{product_info.market_price}}</del>
            </p>
          </div>
        </div>
        <div class="message">
          <span>留言</span>
          <input type="text" v-model="postscript" placeholder="选填" @focus="isBlur = !isBlur" @blur="isBlur = !isBlur">
        </div>
      </section>
      <!-- 商品信息，留言 -->
      <!-- 优惠券，可用余额-->
      <section class="coupon bgwhite mgt">
        <ul>
          <li class="clear" @click="chooseAppoint('coupon','优惠券')">
            <div class="left">
              <i class="icon"></i>
              <span class="span">优惠券</span>
            </div>
            <div class="right">
              <i :class="{icon:!confirmOrder.amount}"></i>
              <span class="span">{{ confirmOrder.amount ? `-￥${confirmOrder.amount}` : `${product_info.coupon.useCoupon.length}张可用` }}</span>
            </div>
          </li>
          <li class="last-child clear">
            <div class="left">
              <i class="icon"></i>
              <span class="span">可用余额</span>
              <span>￥ {{userInfo.balance}}</span>
            </div>
            <div class="right">
              <mt-switch v-model="isBalance" class="select" @change="changeTotal"></mt-switch>
            </div>
          </li>
          <!-- 猫粮 -->
          <li class="clear">
            <div class="left">
              <i class="icon cat-food"></i>
              <span class="span">可用{{useCatFood}}猫粮抵用{{useCatFood/50}}元</span>
              <span class="icon cat-foot-desc" @click="isCatFoodBg=true"></span>
            </div>
            <div class="right">
              <mt-switch v-model="isCatFood" class="select" @change="changeTotal"></mt-switch>
            </div>
          </li>
        </ul>
      </section>
      <!-- 优惠券，可用余额 -->
      <section class="pay bgwhite mgt clear" :class="{'fixed': !isBlur}">
        <div class="total left">合计：
          <span class="payment">￥{{total}}</span>
        </div>
        <div class="btn right" @click="payment">立即支付</div>
      </section>
    </div>
    <div class="catFoodDesc" v-show="isCatFoodBg">
      <div class="content">
        <h1>猫粮使用规则</h1>
        <div class="constraint">
          <h2>使用条件</h2>
          <ul>
            <li>1.订单金额大于198;</li>
            <li>2.猫粮支付不得超过每笔订单应付金额的5%;</li>
            <li>3.可与优惠券同时使用;</li>
          </ul>
        </div>
        <div class="constraint">
          <h2>使用数量</h2>
          <ul>
            <li>1.使用猫粮为50的整倍数;</li>
            <li>2.50猫粮抵1元;</li>
          </ul>
        </div>
        <div class="catFoodDescClose" @click="isCatFoodBg=false">我知道了</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import Vue from 'vue'
import { Switch, MessageBox } from 'mint-ui'
Vue.component(Switch.name, Switch)
import serviceType from './children/serviceType'
import serviceshop from './children/serviceshop'
import appoint from './children/appoint'
import vAddress from './children/address'
import vDate from './children/timeSel'
import vCoupon from './children/coupon'
import keyConf from '../../common/keyConf'

import { productList, createOrder } from '../../service/getData'
// import dateSel from './children/dateSel'
export default {
  name: 'order',
  data() {
    return {
        showDoor:false,
        // showShop:false,
        shopClassName:'active',
        doorClassName:'',
      title: '提交订单',
      serviceImg: '', //服务方式  图片
      stylist_id: null,
      serviceTitle: '', // 服务方式 名称
      inDoor: 2,
      isBlur: false,
      page: 'order',
      isBalance: false,
      isCatFood: false,
      isCatFoodBg: false,
      useCatFood: 0, // 可用猫粮
      total: 0, //合计
      user_image: '', // 用户头像
      // balance: 130, //余额
      // price: 368, //价格
      addressEditing: true,
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
      userInfo: {},
      user_address: [], // 服务地址列表
      address_length: '', // 服务地址列表长度
      server_street: '', // 美业师服务商圈
      stylists: [], // 商家信息
      busyTime: {}, // 忙时设置
      postscript: '', // 留言
        storeName:"",
      appOpen: false, // 下单前页面(产品详情)是否是在app打开
      storeInfo:{}
    }
  },
  created() {
    // this.SET_CONFIRMORDER({})
    // this.setServiceForm()
    this.confirmOrder.store_name=null;
    this.confirmOrder.date=null;
    this.confirmOrder.time=null;
    this.confirmOrder.amount=null;
    this.confirmOrder.address=null;
    this.confirmOrder.appoint=null;
    this.confirmOrder.mobile=null;
    this.$on('bgIsShow', this.bgIsShow);
    this.product_info.product_id = this.$route.params.id;
    this.stylist_id = this.$route.query.stylist_id;
    this.appOpen = this.$route.query.appOpen;
    // this.getData();
    this.inDoor=2
  },
  computed: {
    ...mapState(['confirmOrder', 'bgShow'])
  },
  components: {
    serviceType,
    appoint,
    vAddress,
    vDate,
    serviceshop,
    vCoupon
  },
  watch:{
      stylist_id(val,oldval){
            this.changeTimeData()
        }
  },
  mounted(){
      
  },
  methods: {
      
    shopService(){
        this.showDoor=false;
        this.shopClassName="active";
        this.doorClassName="";
        this.inDoor=2
    },
    doorService(){
        this.showDoor=true;
        this.shopClassName="";
        this.doorClassName="active";
        this.inDoor=1
    },
    ...mapMutations(['SET_CONFIRMORDER']),
    // 使用余额时进行需付款金额计算
    changeTotal() {
      if(this.isBalance && this.isCatFood){
        this.total = this.product_info.price - (this.confirmOrder.amount ? this.confirmOrder.amount : 0) - (this.useCatFood / 50) - this.userInfo.balance;
      }else if(this.isBalance){
        this.total = this.product_info.price - (this.confirmOrder.amount ? this.confirmOrder.amount : 0) - this.userInfo.balance;
      }else if(this.isCatFood){
        this.total = this.product_info.price - (this.confirmOrder.amount ? this.confirmOrder.amount : 0) - (this.useCatFood / 50);
      }else{
        this.total = this.product_info.price - (this.confirmOrder.amount ? this.confirmOrder.amount : 0);
      }
      // this.total = this.isBalance ? this.product_info.price - (this.confirmOrder.amount ? this.confirmOrder.amount : 0) - this.userInfo.balance : this.product_info.price - (this.confirmOrder.amount ? this.confirmOrder.amount : 0)
      this.total = this.total < 0 ? 0 : this.total
    },
    // 选择服务方式
    chooseService(index) {
      this.inDoor = index

      this.confirmOrder.address = index == 2 ? (this.stylists.length > 0 ? this.stylists[0].store_add : '') : '';
    },
    calCatfood() {
      if (this.product_info.price < 198) {
        return;
      }
      let useCount = Math.floor(this.product_info.price * 5 / 100);
      let needCF = useCount * 50;
      if (needCF <= this.userInfo.points)
        this.useCatFood = needCF;
      else {
        while (useCount) {
          if (useCount * 50 <= this.userInfo.points) {
            needCF = useCount * 50;
            break;
          } else {
            useCount--;
          }
        }
        this.useCatFood = useCount * 50;
      }
    },
    // 显示猫粮使用规则
    // showDesc() {
    //   this.isCatFoodBg = true;
    // },
    // 切换展示的组件
    chooseAppoint(page, title) {
      if (page === 'address' && this.inDoor === 2)
        return
      this.page = page;
      this.title = title;
      let _this=this
      this.stylist_id=_this.confirmOrder.store_id
        
      if (this.isBalance && this.confirmOrder.amount) {
        this.total = this.product_info.price - this.confirmOrder.amount - this.userInfo.balance;
        this.total = this.total < 0 ? 0 : this.total;
      } else {
        if (this.confirmOrder.amount);
        this.total = this.product_info.price - this.confirmOrder.amount;
      }
    },
    back() {
      if (this.page === 'order') {
        // this.$router.go(-1)
        let product_id = this.$route.params.id;
        // this.$router.push(`/detail/${product_id}`)
        this.$router.go(-1);
        return
      } else if (this.title === '常用地址管理') {
        this.$refs.detailAddress.newAddState = false; // 隐藏地址编辑页面
        this.$refs.detailAddress.bottomText = "添加新地址";

        this.title = '选择服务地址';
        this.addressEditing = true;
        this.$refs.detailAddress.editState = true; // 服务地址非编辑状态
        return
      } else if (this.title === '添加新地址') {
        this.title = '选择服务地址';
        this.addressEditing = true;
        this.$refs.detailAddress.newAddState = false;
        this.$refs.detailAddress.bottomText = "添加新地址";
      } else {
        this.title = '确认订单';
        this.page = 'order';
      }

    },
    // 显示默认地址(若匹配美业师服务商圈，则显示默认地址。否则显示“请选择”)
    defaultAddress() {
      for (var i = 0; i < this.user_address.length; i++) {
        if (this.server_street) {
          if (this.user_address[i].is_default == "1" && this.server_street.indexOf(this.user_address[i].street) != '-1') {
            this.confirmOrder.address = this.user_address[i].province_name + this.user_address[i].city_name + this.user_address[i].district_name + this.user_address[i].street_name + this.user_address[i].address;
            this.confirmOrder.province_id = this.user_address[i].province; // 默认地址--省份ID
            this.confirmOrder.city_id = this.user_address[i].city; // 默认地址--城市ID
            this.confirmOrder.district_id = this.user_address[i].district;// 默认地址--区ID
          }
        }
      };
    },
    //获取门店名字
    sendstorename(store_info){
        this.storeInfo=store_info
    },
    // 编辑服务地址
    editAddress() {
      this.title = "常用地址管理";
      this.addressEditing = false;
      this.$refs.detailAddress.edit();
    },
    // 添加新服务地址
    addNew(add_length) {
      if (this.$refs.detailAddress.bottomText == "添加新地址") { // 新增地址
        this.title = "添加新地址";
        this.addressEditing = false;
      } else { // 保存地址
        this.title = "选择服务地址";
        this.address_length = add_length;
        this.addressEditing = true; // 显示右上角编辑按钮
        this.$refs.detailAddress.editState = true;
      }
    },
    // 无地址时状态
    noAddressState() {
      this.title = '选择服务地址';
      this.addressEditing = false; // 隐藏地址编辑按钮
    },
    bgIsShow(isShow) {
      this.bgshow = isShow
    },
    // 获取商品详情
    async getData() {
        let _this=this
      let id = this.product_info.product_id
      let res = await productList({ product_id: id, is_order: true, stylist_id: this.stylist_id }) // , API_VERSION: 'V5.0.0' 
      if (res.status === 'ok') {
        this.setData(res);
        this.calCatfood();
        // this.setServiceForm();
        this.defaultAddress(); // 显示默认服务地址
      } else {
        alert(res.msg);
        this.$router.push('/search/start');
      }
    },
    // 立即支付
    async payment() {
        let _this=this
      if (!this.confirmOrder.appoint) {
        alert('请填写预约人信息')
        return
      }

      if (!this.confirmOrder.date || !this.confirmOrder.time) {
        alert('请选择预约时间')
        return
      }

      if(this.inDoor == 1 && !this.confirmOrder.address){
        alert('请填写预约地址')
        return
      }
      if(this.inDoor == 2 && !this.confirmOrder.store_name){
        alert('请填写预约门店')
        return
      }
        // 判断上门还是到店
        let id,address;
      if(this.inDoor==1){
        address=_this.confirmOrder.address
        console.log(id,address)
      }else{
        address=_this.confirmOrder.store_address
        console.log(id,address)
      }
      let obj = {
        items: [
          {
            id: this.product_info.product_id,
            // id: goshop.store_id,
            number: 1
          }
        ],
        service_form: this.inDoor,
        use_points: this.isCatFood,
        use_balance: this.isBalance,
        contact: {
          consignee: this.confirmOrder.appoint,
        //   address: this.confirmOrder.address,
          address: address,
          mobile: this.confirmOrder.mobile,
          send_time: `${this.confirmOrder.date} ${this.confirmOrder.time}`,
          province_id: this.confirmOrder.province_id,
          city_id: this.confirmOrder.city_id,
          district_id: this.confirmOrder.district_id,
          postscript: this.postscript
        },
        coupon_sn: this.confirmOrder.sn,
        stylist_id: this.stylist_id ? this.stylist_id : (this.stylists.length > 0 ? this.stylists[0].stylist_id : 0),
        from_ad: "m站"
      }
      let data = JSON.stringify(obj)
      let res = await createOrder({ data: data })
      if (res.status == 'ok') {
        // 已支付
        if (res.data.pay_status == 2) {
          if(this.appOpen){
            // this.$router.push({name: 'paySuccess', params:{ordersn: res.data.sn}, query:{action: `pay_${res.data.sn}`}});
            let baseUrl = `/payresult/success/${res.data.sn}?action=pay_${res.data.sn}`;
            window.location.href = baseUrl;
          }else {
            this.$router.push({name: 'paySuccess', params:{ordersn: res.data.sn}});
          }
          return
        }

        // 未支付
        if(this.appOpen){
          // this.$router.push({ name: 'payment', params: { orderid: res.data.sn }, query:{action: `pay_${res.data.sn}`} });
          let baseUrl = `/pay/${res.data.sn}?action=pay_${res.data.sn}`;
          window.location.href = baseUrl;
        }else{
          this.$router.push({ name: 'payment', params: { orderid: res.data.sn } })
        }
      } else {
        alert(res.msg)
      }
    },
    //店铺服务时间
        async changeTimeData() {
            let _this=this
            let id = _this.product_info.product_id
            let res = await productList({ product_id: id, is_order: true, stylist_id: this.stylist_id }) // , API_VERSION: 'V5.0.0' 
            if (res.status === 'ok') {
                //   console.log(res)
                this.serviceTimeData(res);
                // this.calCatfood();
                // this.setServiceForm();
                // this.defaultAddress(); // 显示默认服务地址
            } else {
                alert(res.msg);
                this.$router.push('/search/start');
            }
        },
        serviceTimeData(res) {
            let { } = {}
            console.log(res)
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
    // 这坨？？？优化方式？？
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
      this.setCoupon(res.data.user_coupon)
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
    // 服务方式数据处理
    setServiceForm() {
      let serviceForm = this.product_info.service_form.split(',')
      if (serviceForm.length === 2) {
        this.product_info.service_form = serviceForm
      }
      if (this.product_info.service_form.length === 1) {
        this.inDoor = this.product_info.service_form
        switch (this.product_info.service_form) {
          case '1':
            this.serviceImg = '/static/icon/order/pay_icon_service_sel01.png'
            this.serviceTitle = '上门服务'
            break;
          case '2':
            this.serviceImg = '/static/icon/order/pay_icon_service_sel02.png'
            this.serviceTitle = '顾客到店'
            this.chooseService(2)
            break;
        }
      }
    },
    // 优惠券数据处理
    setCoupon(coupons) {
      coupons.forEach((item, index) => {
        this.product_info.price >= item.base_amount ? this.product_info.coupon.useCoupon.push(item) : this.product_info.coupon.unUseCoupon.push(item)
      })

    }

  },
  filters: {
    userImg(n) {
      if (!n) {
        return require("../../assets/image/icon/detail/details_photo_store60px.png");
      } else {
        if (n.indexOf("http") != -1) {
          return n;
        } else {
          return "http://pic.qiaocat.com/upload/" + n;
        }
      }
    }
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.order {
  position: relative;
  @include bgColor(#f3f3f3);
  &.bgColor {
    height: 100%;
    @include bgColor(#f3f3f3);
  }
  .bg {
    position: fixed;
    z-index: 1;
    @include wh(100%, 100%);
    background: rgba(0, 0, 0, .4);
    display: none;
    &.show {
      display: block;
    }
  }
  .header {
    @include bgColor(#fff);
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    .title {
      @include wh(100%, 4rem); // border-bottom: 1px solid #999;
      @include average(#999);
      line-height: 4rem;
      text-align: center;
      h2 {
        font-size: 1.8rem;
        color: #000;
        letter-spacing: 1px;
      }
    }
    .back {
      position: absolute;
      top: .7rem;
      left: .7rem;
      @include wh(2.4rem, 2.4rem);
      background-image: url('../../assets/image/icon/login/nav_btn_return.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 2.2rem 2.2rem;
    }
    .edit {
      position: absolute;
      top: .8rem;
      right: 1.5rem;
      @include sc(1.6rem,
      #000);
    }
  }
  .main {
    padding-top: 4rem;
  }
  .service {
        @include wh(100%,4rem);
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 1.5rem;
        img{
            width: 1.5rem;
            height: 1.2rem;
        }
        .active{
            color:#e70034;
        }
  }
    .red-solid{
        display: flex;
        justify-content: space-around;
        padding-left: 1.7rem;
        p{
            width: 2.5rem;
            height: 3px;
        }
        .active{
            background-color: #e70034;
        }
    }
  .appoint {
    .appoint-info {
      padding-left: 1.5rem;
      li {
        position: relative;
        @include wh(100%,
        4.4rem);
        line-height: 4.4rem;
        @include sc(1.4rem,
        #000);
        span {
          position: absolute;
          left: 0;
          width: 7.5rem;
          text-align: left;
        }
        div {
          // @include wh(100%, 4.4rem);
          width: 100%;
          min-height: 4.4rem;
          padding-left: 7.5rem;
          padding-right: 2.4rem;
          @include sc(1.4rem,
          #ccc);
          &.color-black {
            color: #000;
          }
          i {
            font-style: normal;
            color: #ccc;
          }
          i.color-black {
            color: #000;
          }
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
      li:not(:last-child) {
        @include average(#ccc);
      }
      li:last-child {
        height: auto;
        div {
          padding-top: 1.2rem;
          line-height: 2rem;
        }
      }
    }
  }
  .product {
    padding-left: 1.5rem;
    .shop-info {
      @include wh(100%,
      4.5rem);
      box-sizing: border-box;
      @include average(#ccc);
      line-height: 4.5rem;
      img {
        @include wh(3rem,
        3rem);
        vertical-align: middle;
        border-radius: 50%;
      }
      span {
        padding-left: 1rem;
        @include sc(1.4rem,
        #000);
      }
      div.star {
        position: absolute;
        top: .2rem;
        left: 9.2rem;
        i.icon {
          display: inline-block;
          @include wh(1.2rem,
          1.2rem);
          @include bgi_2('/static/icon/search/icon_star.png',
          1.2rem,
          1.2rem,
          center,
          center,
          no-repeat);
        }
      }
    }
    .product-info {
      @include wh(100%,
      11rem);
      line-height: 11rem;
      .img {
        line-height: 11rem;
        img {
          @include wh(8rem,
          8rem);
          vertical-align: middle;
        }
      }
      .info {
        padding: 2.1rem 0 0 1.6rem;
        width: 70%;
        p {
          @include sc(1.4rem,
          #000);
          line-height: 2.3rem;
          word-wrap: break-word;
          &.price {
            .currentPrice {
              @include sc(1.6rem,
              #e65058)
            }
            .oldPrice {
              @include sc(1.2rem,
              #999);
            }
          }
        }
      }
    }
    .message {
      position: relative;
      @include wh(100%,
      4.4rem);
      @include sc(1.4rem,
      #000);
      span {
        position: absolute;
        line-height: 4.4rem;
      }
      input {
        @include wh(100%,
        4.4rem);
        padding-left: 3.8rem;
        @include sc(1.4rem,
        #000);
      }
    }
  }
  .coupon {
    &.main {
      @include bgColor(#f3f3f3);
    }
    padding-bottom: 6rem;
    ul {
      padding-left: 1.5rem;
      li {
        @include wh(100%,
        5rem);
        &:not(:last-child) {
          @include average(#ccc);
        }
      }
      li.clear {
        .span {
          line-height: 5rem;
        }
        .left {
          position: relative;
          height: 5rem;
          i.icon {
            position: absolute;
            @include wh(1.9rem,
            1.9rem);
            top: 50%;
            transform: translateY(-50%);
          }
          span {
            padding-left: 2.9rem;
            @include sc(1.4rem,
            #000);
          }
        }
        .right {
          position: relative;
          height: 5rem;
          box-sizing: border-box;
          i.icon {
            position: absolute;
            right: 1.5rem;
            top: 50%;
            transform: translateY(-50%);
            @include wh(.7rem,
            1.3rem);
          }
          span {
            padding-right: 3.2rem;
            @include sc(1.4rem,
            #e65058);
          }
        }
      }
      li:first-child {
        .left {
          i.icon {
            @include bgi_2('/static/icon/order/pay_icon_coupon.png',
            1.9rem,
            1.9rem,
            center,
            center,
            no-repeat);
          }
        }
        .right {
          i.icon {
            @include bgi_2('/static/icon/order/icon_next.png',
            .7rem,
            1.3rem,
            center,
            center,
            no-repeat);
          }
        }
      }
      li:nth-of-type(2),
      li:nth-of-type(3) {
        .left {
          i.icon {
            @include bgi_2('/static/icon/order/pay_icon_money.png',
            1.9rem,
            1.9rem,
            center,
            center,
            no-repeat);
          }
          span:last-child {
            padding-left: 1rem;
          }
        }
        .right {
          .select {
            position: relative;
            top: 1.1rem;
            right: 1.5rem;
          }
        }
      }
      li:nth-of-type(3) {
        .left {
          // line-height: 5rem;
          i.icon {
            @include bgi_2('/static/icon/order/pay_icon_catmoney.png',
            1.9rem,
            1.9rem,
            center,
            center,
            no-repeat);
          }
          span:last-child {
            display: inline-block;
            @include wh(1.4rem,
            1.4rem);
            vertical-align: sub; // padding: 1rem;
            @include bgi_2('/static/icon/order/pay_icon_note.png',
            1.2rem,
            1.2rem,
            center,
            center,
            no-repeat);
          }
        }
      }
    }
  }
  .pay {
    &.fixed {
      position: fixed;
      bottom: 0;
    }
    padding-left: 1.5rem;
    @include wh(100%,
    5rem);
    border-top: .05rem solid #ccc;
    .total {
      line-height: 5rem;
      @include sc(1.4,
      #999);
      span.payment {
        @include sc(1.8rem,
        #e65058);
      }
    }
    .btn {
      @include wh(13rem,
      5rem);
      @include bgColor(#e70034);
      @include sc(1.8rem,
      $bgWhite);
      @include font(1.8rem,
      5rem);
      text-align: center;
    }
  }
  .bgwhite {
    background-color: #fff;
  }
  .mgt {
    margin-top: 1rem;
  }
  .catFoodDesc {
    position: fixed;
    z-index: 2;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    padding: 0 3rem;
    // height: 22rem;
    .content {
      @include bgColor(#fff);
      // height: 22rem;
      border-radius: 10px;
      h1 {
        @include sc(1.6rem,
        $bgBlack);
        text-align: center;
        padding: 1rem 0 .6rem;
      }
      .constraint {
        padding-left: 2rem;
        h2 {
          @include sc(1.4rem,
          $bgBlack);
        }
        ul li {
          @include sc(1.3rem,
          #666); // padding-top: 1rem;
        }
      }
      .constraint:nth-of-type(2){
        padding-bottom: 1.4rem;
      }
      .catFoodDescClose{
        text-align: center;
        height: 4.4rem;
        line-height: 4.4rem;
        @include sc(1.8rem,#666);
        @include average_before(#666);
      }
    }
  }
}
</style>