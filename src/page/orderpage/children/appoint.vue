<template>
  <div class="appoint-module">
    <section class="appoint-info">
      <ul>
        <li><input type="text" class="appoint-name" v-model="appoint" placeholder="预约人"><i class="icon"></i></li>
        <li><input type="tel" class="mobile" v-model="mobile" placeholder="电话号码"><i class="icon"></i></li>
      </ul>
    </section>
    <section class="confirm-btn">
      <div><input type="button" value="确认" @click="confirm"></div>
    </section>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name: ' appoint',
  data () {
    return {
      appoint: '',
      mobile: '',
    }
  },
  created(){
    this.appoint = this.confirmOrder ? this.confirmOrder.appoint : ''
    this.mobile = this.confirmOrder ? this.confirmOrder.mobile : ''
    let id=this.$route.params.id
  },
  computed:{
    ...mapState(['confirmOrder'])
  },
  components: {
  },
  methods: {
    ...mapMutations(['SET_CONFIRMORDER']),
    confirm () {
      if( !this.appoint || this.appoint.length === 0 ){
        alert('请填写预约人')
        return
      }
      if(!(/^1[34578]\d{9}$/.test(this.mobile))){
        alert('手机号码有误')
        return
      }

      this.confirmOrder.appoint = this.appoint;
      this.confirmOrder.mobile = this.mobile;
      this.SET_CONFIRMORDER(this.confirmOrder)
      this.$emit('closeAppoint')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.appoint-module{
  @include bgColor(#fff);
  .appoint-info{
    ul{
      padding-left: 1.5rem;
      li{
        position: relative;
        padding-top: 1rem;
        box-sizing: border-box;
        @include wh(100%, 6rem);
        @include average(#ccc);
        input{
          @include wh(100%, 5rem);
          @include sc(1.6rem, #000);
          line-height: 5rem;
          padding-left: 3.6rem;
        }
        i.icon{
          position: absolute;
          @include wh(2rem,2rem);
          top: 2.2rem;
          left: 0px;
        }
        &:first-child{
          i.icon{
            @include bgi_2('/static/icon/order/user_icon_name.png'
          , 2rem, 2rem, center, center, no-repeat);
          }
        }
        &:last-child{
          i.icon{
            @include bgi_2('/static/icon/order/user_icon_phone.png'
          , 2rem, 2rem, center, center, no-repeat);
          }
        }
      }
    }
  }
  .confirm-btn{
    margin-top: 12rem;
    div{
      @include wh(100%,4.4rem);
      padding: 0 1.4rem 0 1.5rem;
      input{
        @include wh(100%,4.4rem);
        @include bgColor(#e70034);
        @include sc(1.8rem,$bgWhite);
        border-radius: .2rem;
      }
    }
  }
}
</style>