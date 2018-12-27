<template>
  <div class="footer" :style="footstyle">
    <div class="weui-tab">
      <div class="weui-tab__panel">

      </div>
      <div class="weui-tabbar" id="tabbar">
         <!--:class="{'weui-bar__item_on':active('/home')}"-->
          <router-link to="/" class="weui-tabbar__item" @click.native="changeStatus('#home',nav_icon.sy_1)">
              <img id="home" :data-src='nav_icon.sy_0' v-bind:src="path=='/' || path.toLowerCase().indexOf('home')<0 ? nav_icon.sy_0 : nav_icon.sy_1" alt="" class="weui-tabbar__icon">
              <p class="weui-tabbar__label">首页</p>
          </router-link>
           <!--:class="{'weui-bar__item_on':active('/categary')}"-->
          <!-- <router-link to="/categary" class="weui-tabbar__item" @click.native="changeStatus('#categary','/static/icon/footer/2_sel.png')">
              <img id="categary" v-bind:src="path.toLowerCase().indexOf('categary')<0 ? '/static/icon/footer/2_nor.png' : '/static/icon/footer/2_sel.png'" alt="" class="weui-tabbar__icon">
              <p class="weui-tabbar__label">分类</p>
          </router-link> -->
          <!--:class="{'weui-bar__item_on':active('/find')}"-->
          <router-link to="/discovery" class="weui-tabbar__item" @click.native="changeStatus('#find',nav_icon.fx_1)">
              <img id="find" :data-src='nav_icon.fx_0' v-bind:src="path.toLowerCase().indexOf('discovery')<0 ? nav_icon.fx_0 : nav_icon.fx_1" alt="" class="weui-tabbar__icon">
              <p class="weui-tabbar__label">发现</p>
          </router-link>
           <!--:class="{'weui-bar__item_on':active('/order')}"-->
          <router-link to="/orderlist" class="weui-tabbar__item" @click.native="changeStatus('#order',nav_icon.dd_1)">
              <img id="order" :data-src='nav_icon.dd_0' v-bind:src="path.toLowerCase().indexOf('order')<0 ? nav_icon.dd_0 : nav_icon.dd_1" alt="" class="weui-tabbar__icon">
              <p class="weui-tabbar__label">订单</p>
          </router-link>
           <!--:class="{'weui-bar__item_on':active('/userCenter')}"-->
          <router-link to="/usercenter" class="weui-tabbar__item" @click.native="changeStatus('#usercenter',nav_icon.wd_1)">
              <img id="usercenter" :data-src='nav_icon.wd_0' v-bind:src="path.toLowerCase().indexOf('usercenter')<0 ? nav_icon.wd_0 : nav_icon.wd_1" alt="" class="weui-tabbar__icon">
              <p class="weui-tabbar__label">我的</p>
          </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { getNavIcon } from '@/service/getData';
import store from '../../vuex/store'
export default {
    store,
  name: 'footer',
  data () {
    return {
      path: '',
      tabbar: Object,

      nav_icon: {},
    }
  },
  created (){
    this.path = this.$route.path;

    this.getFooterNavIcon();
  },
  mounted () {
    this.tabbar = this.$el.querySelector("#tabbar")
  },
  methods: {
    // 获取后端的底部导航栏图标icon
    async getFooterNavIcon(){
      let res = await getNavIcon();
      if(res.status == 'ok'){
        this.nav_icon = res.data;
      }
    },

    linkTo (url) {
      this.$router.push(url)
    },
    active (url) {
      return this.path.includes(url)
    },
    changeStatus (selector, iconUrl){
      $(this.tabbar).find("img").each(function(index, item){
        let imgUrl = $(this).attr('data-src');
        $(this).prop('src', imgUrl);
      })
      this.$el.querySelector(selector).src = iconUrl;
    }
  },
  watch: {
    selected: function (val, oldVal) {
    }
  },
    computed:{
        footstyle(){
            return this.$store.state.footstate;
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.footer{
  @include wh(100%,50px);
  position: fixed;
  bottom: 0px;
  left: 0px;
}
.weui-tabbar__item .weui-tabbar__label{
  color: #000;
}
</style>
