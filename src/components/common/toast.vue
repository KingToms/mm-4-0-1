<template>
  <div id="toast" style="display:none">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
          <i class="weui-icon-success-no-circle weui-icon_toast"></i>
          <p class="weui-toast__content">{{showText}}</p>
      </div>
  </div>
</template>
<script>
export default {
  name: 'toast',
  data () {
    return {
    }
  },
  props:['showText'],
  methods: {
    closeToast () {
      let $toast = $(this.$el)
      $toast.fadeIn(100)
      setTimeout(function () {
          $toast.fadeOut(100)
      }, 20000)
    }
  },
  created () {
    this.$on('closeToast', this.closeToast)
  }
}
</script>
<style lang="scss" scoped>
</style>