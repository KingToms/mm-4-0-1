<template>
  <div class="authLogin">
    <div class="title-box">
      <p class="title">手机快捷登录</p>
      <p class="tips">未注册的手机号码将自动注册俏猫账号</p>
    </div>
    <div class="mobile">
      <div class="input-mobile">
        <input type="tel" name="mobile" class="tel" maxlength="11" v-model="mobile" placeholder="请输入手机号" autocomplete="off" @focus="setIconShow('tel')" @blur="setIconHide">
        <i class="icon-delete" v-show="iconShow=='tel'" @click="resetText('tel')"></i>
         <!--@focus="isDelete=!isDelete" @blur="isDelete=!isDelete" :class="{'delete':isDelete}"-->
      </div>
      <!--数据验证-->
      <!-- v-validate="'required|mobile'" :class="{'input': true, 'is-danger': errors.has('mobile') }" 
      <span v-show="errors.has('mobile')" class="help is-danger">{{ errors.first('mobile') }}</span>-->
      <div class="btn">
        <input type="button" value="获取验证码" @click="sendCode" id="sendCode">
      </div>
    </div>
    <div class="code">
      <input type="number" v-model="code" class="number" name="code" placeholder="请输入验证码" autocomplete="off" @focus="setIconShow('number')"  @blur="setIconHide">
      <i class="icon-delete" v-show="iconShow=='number'" @click="resetText('number')"></i> 
    </div>
    <!-- <alert-tip :alertText="alertText" v-if="alertShow"  @closeTip="closeTip"></alert-tip> -->
  </div>
</template>
<script>
import alertTip from '../../../components/common/alertTip'
import {getCode,authLogin} from '../../../service/getData.js'
import common from '../../../common/common.js'
import {setStore} from '../../../common/store.js'
import keyConf from '../../../common/keyConf.js'
export default {
  name: 'authLogin',
  data () {
    return {
      countdown: 60,
      mobile: '',
      code: '',
      plid: '', //推广链接表ID
      iconShow: '',
      _self: this,
      alertShow: false,
      alertText: ''
    }
  },
  props:['channel'],
  components: {
    alertTip
  },
  methods: {
    async sendCode () {
      if(this.mobile.length<11){
        alert('手机格式不正确')
        return
      }
      this.countdown = 60
      common.settime($(this.$el.querySelector("#sendCode")),this.countdown)
      let res = await getCode({mobile: this.mobile, type: 1})
      if(res.status != 'ok'){
        alert(res.msg)
      }
      // this.alertText = res.msg
      // this.alertShow = true
    },
    async codeLogin () {
      console.log(this.channel)
      // this.plid = common.getQueryString("plid") ? common.getQueryString("plid") : "";
      let result = await authLogin({mobile: this.mobile,code: this.code, plid: this.channel})
      if(result.status == 'ok'){
        $.removeCookie('shopping_plid', {path: '/'})
        $.cookie(keyConf.qm_cookie, this.mobile, {expires:1, path: '/'})
        setStore(keyConf.userMoile, this.mobile)
        if(this.$route.query.url){
          this.$router.push(this.$route.query.url)
        }else{
          this.$router.push('/usercenter')
        }
      }else{
        alert(result.msg)
        // this.alertShow = true
        // this.alertText = result.msg
      }
    },
    resetText (_self) {
      let $input = $(this.$el.querySelector('.'+_self))
      $input.val('')
       if($input.prop('type')==='tel'){
         this.mobile=''
       }else{
         this.code=''
       }
    },
    closeTip () {
      this.alertShow = false
    },
    setIconShow(choose){
      let self = this
      setTimeout(function() {
        self.iconShow = choose
      }, 300)
    },
    setIconHide () {
      let self = this;
      setTimeout(function() {
        self.iconShow = ''
      }, 300)
    }
  },
  created() {
    this.$on('codeLogin', this.codeLogin)
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.authLogin{
  width: 100%;
  overflow: hidden;
  // margin-top: 3rem;
  .title-box {
    margin-top: 2rem;
    padding: 0 2.5rem;
    .title {
      line-height: 2.4rem;
      font-size: 2.4rem;
      color: #000;
      padding-bottom: 1.5rem;
    }
    .tips {
      line-height: 1.5rem;
      font-size: 1.5rem;
      color: #999;
    }
  }
  .mobile{
    position: relative;
    padding: 0 2.5rem;
    .help.is-danger{
      font-size:.75rem;
      color: #f00;
    }
    .input-mobile{
      // padding-right: 40%;
      input.tel {
        padding-right: 40%;
      }
      .icon-delete{
        top: 1.2rem;
        right: 40%;
      }
    }
    
    input[type=tel],input[type=tel]:-webkit-autofill{
      @include wh(100%, 5rem);
      // background-image: url('../../../assets/image/icon/login/icon_user.png');
    }
    input[type=button]{
      position: absolute;
      top: 0;
      right: 2.5rem;
      @include wh(30%, 5rem);
      background-color: transparent;
      text-align: center;
      font-size: 1.5rem;
      font-weight: 300;
      letter-spacing: 1px;
      border-radius: 0.4rem;
      color: #666;
    }
  }
  .code{
    padding: 0 2.5rem;
    input[type=number]{
      @include wh(100%, 5rem);
      // background-image: url('../../../assets/image/icon/login/icon_code.png');
    }
    .icon-delete{
      top: 1.2rem;
      right: 2.5rem;
    }
    
  }
  .mobile,.code{
    width: 100%;
    box-sizing: border-box;
    margin-top: 1.2rem;
    input[type=tel],input[type=number]{
      box-sizing: border-box;
      // padding-left: 3.75rem;
      font-size: 1.5rem;
      letter-spacing: 1px;
      color: #000;
      border-bottom: 1px solid #999;
      background-size: 1.7rem 1.9rem;
      background-position:1.2rem 1.25rem;
      background-repeat: no-repeat;
    }
  }
  .input-mobile,.code{
    position: relative;
    box-sizing: border-box;
    .icon-delete{
      position: absolute;
      @include wh(0.8rem,0.8rem);
      margin: 0.7rem;
      background-image: url('../../../assets/image/icon/login/icon_delete_new.png');
      background-size: 0.8rem 0.8rem;
    }
  }
}
</style>