<template>
  <div class="look_item clear" v-if="recommendList && recommendList.price">
    <!-- <a :href="`/detail/${recommendList.id}${from_class}`"> -->
    <a  @click="todetail(recommendList.id)">
      <div class="look_part">
        <div class="item_img">
          <div class="img_box" :style="{backgroundImage : 'url('+product_thumb+')'}">
            <!-- <a :href="`/detail/${recommendList.id}${from_class}`" @click="todetail()"> -->
            <a  @click="todetail(recommendList.id)">
              <img src="../../../../assets/image/icon/detail/square_default_bg.jpg">
            </a>
          </div>
        </div>
        <div class="pro_desc" :class="{'align_c': !recommend_route}">{{recommendList.name}}</div>
        <p class="price">
          <span class="discount_price">￥{{recommendList.price}}</span>
          <span class="original_price small_size">￥{{recommendList.market_price}}</span>
          <span class="follow small_size">{{recommendList.product_favorite_count ? recommendList.product_favorite_count : '0'}}</span>
        </p>
        <div class="beauty_man" v-show="recommend_route">
          <img class="user_img" :src="myimgs">
          <div class="people">
            <span class="name" v-if="(recommendList.type_user && recommendList.type_user == 1 && person_list.store_type && person_list.store_type ==1)">{{person_list.real_name ? person_list.real_name : ''}}</span>
            <span class="name" v-else-if="(recommendList.type_user && recommendList.type_user == 1 && person_list.store_type && person_list.store_type ==2)">{{person_list.store_name ? person_list.store_name : ''}}</span>
            <span class="name" v-else>俏猫</span>
            <span class="grade" v-show="(recommendList.type_user && recommendList.type_user == 1 && person_list.store_type && person_list.store_type ==1)">{{person_level}}</span>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  name: "recommendList", // 大家都在看、为你推荐
  data() {
    return {
      person_level: '', // 美业师级别
      person_list: '', // 美业师信息
      myimgs: '', // 头像
      product_thumb: '', // 产品缩略图
      from_class: '', // 产品缩略图的所属类（推荐，化妆，美睫，培训等）
      recommend_route: true, //当首页为“推荐”时，产品缩略图省略图像、昵称
    };
  },
  props: ["recommendList"],
  methods: {
  },
  created() {
    this.fromClass();

    if (this.recommendList.type_user && this.recommendList.type_user == 1) {
      this.person_list = this.recommendList.stylist ? this.recommendList.stylist : '';
    }

    /* 处理用户头像--相对路径问题 */
    if(!this.recommendList.type_user || this.recommendList.type_user !=1){ // 俏猫用户
      this.myimgs = "/static/icon/detail/photo_qiaocat.png";
    }else if (!this.person_list.user_img) {
      this.myimgs = (this.person_list.store_type && this.person_list.store_type == 2) ? "/static/icon/detail/details_photo_store60px.png" : '/static/icon/detail/photo_qiaocat.png';
    } else {
      if (this.person_list.user_img.indexOf("http") != -1) {
        this.myimgs = this.person_list.user_img;
      } else {
        this.myimgs = "http://pic.qiaocat.com/upload/" + this.person_list.user_img;
      }
    }
    /* 处理产品缩略图--相对路径问题 */
    if (!this.recommendList.thumb) {
      this.product_thumb = require("../../../../assets/image/icon/detail/square_default_bg.jpg");
    } else {
      if (this.recommendList.thumb.indexOf("http") != -1) {
        this.product_thumb = this.recommendList.thumb;
      } else {
        this.product_thumb = "http://pic.qiaocat.com/upload/" + this.recommendList.thumb;
      }
    }

  },
  mounted() {
    // 获取美业师级别
    this.getPersonLevel();
    // 产品---最后一行去边框
    if ($(".look_item").length % 2 == 0) {
      $(".look_item:last").css("border-bottom", "0");
      $(".look_item").eq($(".look_item").length - 2).css("border-bottom", "0");
    } else {
      $(".look_item:last").css("border-bottom", "0");
    }
  },
  methods: {
    /*产品缩略图的所属类（推荐，化妆，美睫，培训等）*/
    todetail(productId){
        let _this=this
        // if(_this.recommendList.id==1000370 || _this.recommendList.id==1000069 ||_this.recommendList.id==1000167 ){
        if(productId==1000370 || productId==1000069 ||productId==1000167 || productId==1001104){
            // _this.$router.push("/choosedetail/"+productId)
            _this.$router.push({
                path:'/choosedetail/'+productId,
                query:{
                    id:productId
                }
            })
        }else{
            _this.$router.push("/detail/"+productId+'?id='+productId)
        }
    },
    fromClass() {
      var url = window.location.search; //获取url中"?"符后的字串
      var path = window.location.pathname;
      if (url.indexOf("app=") != -1) { // 页面若为app调用时
        this.from_class = "?" + path.substring(6);
      }
      if (path.indexOf("recommend") != -1) {
        this.recommend_route = false;
      }
    },

    // 获取美业师级别
    getPersonLevel() {
      switch (this.person_list.level) {
        case 0:
          this.person_level = "见习";
          break;
        case 1:
          this.person_level = "新晋";
          break;
        case 2:
          this.person_level = "专业";
          break;
        case 3:
          this.person_level = "高级";
          break;
        case 4:
          this.person_level = "首席";
          break;
        case 5:
          this.person_level = "明星";
          break;
        default:
          this.person_level = "见习";
          break;
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import "../../../../assets/css/mixin.scss";
.look_item {
  float: left;
  padding: 2rem 0 1.6rem 0;
  border-bottom: 1px solid #ddd;
  width: 50%;
  text-align: center;
  .look_part {
    .item_img {
      display: inline-block;
      width: 100%;
      .img_box {
        width: calc(100% - 1rem);
        float: left;
        border-radius: 0.4rem;
        background-color: #f3f3f3;
        background-position: center;
        background-size: cover;
      }
      img {
        display: block;
        width: 100%;
        opacity: 0;
        @include borderRadius(0.4rem);
      }
    }
    .pro_desc {
      height: 3rem;
      line-height: 1.5rem;
      font-size: 1.4rem;
      color: #000;
      text-align: left;
      margin-top: 0.5rem;
      padding-right: 1rem;
    }
    .align_c {
      text-align: center;
    }
    .price {
      @include wh(100%, 2.2rem);
      margin-top: 0.5rem;
      text-align: left;
      .discount_price {
        margin-left: 0.2rem;
        margin-right: 0.2rem;
        font-size: 1.4rem;
        color: #e65058;
        font-weight: bold;
      }
      .small_size {
        font-size: 1.2rem;
        color: #999;
      }
      .original_price {
        text-decoration: line-through;
        margin-right: 0.7rem;
      }
      .follow {
        display: inline-block;
        padding-left: 1.5rem;
        line-height: 1.1rem;
        background-image: url("../../../../assets/image/icon/home/product_icon_collect.png");
        background-repeat: no-repeat;
        background-position: 0 0;
        background-size: contain;
      }
    }
    .beauty_man {
      position: relative;
      @include wh(100%,
      3rem);
      margin-top: 0.5rem;
      .user_img {
        position: absolute;
        top: 0;
        left: 0.8rem;
        @include wh(3rem,
        3rem);
        @include borderRadius(50%);
      }
      .people {
        @include wh(100%,
        100%);
        padding-left: 4.3rem;
        padding-top: 0.4rem;
        text-align: left;
      }
      span.name {
        @include sc(1.3rem,
        #000);
        margin-right: 0.5rem;
      }
      span.grade {
        display: inline-block;
        @include wh(4rem,
        1.6rem);
        @include sc(1.1rem,
        $bgWhite);
        box-sizing: border-box;
        padding-left: .2rem;
        line-height: 1.6rem;
        @include bis("../../../../assets/image/icon/home/product_bg_grade.png");
      }
    }
  }
}
</style>
