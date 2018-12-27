<template>
    <div class="topic-box">
        <div class="img-box">
            <img src="../../../../static/topic/20180502/graduate_1.jpg" alt="">
        </div>
        <div class="img-box">
            <a href="/detail/1000358" style="width: 40%; height: 15%; top: 78%; left: 5%;"></a>
            <img src="../../../../static/topic/20180502/graduate_2.jpg" alt="">
        </div>
        <div class="img-box">
            <a href="/detail/1001052" style="width: 40%; height: 15%;top: 70%; left: 54%;"></a>
            <img src="../../../../static/topic/20180502/graduate_3.jpg" alt="">
        </div>
        <div class="img-box">
            <a href="/detail/1001053" style="width: 40%; height: 15%; top: 78%; left: 5%;"></a>
            <img src="../../../../static/topic/20180502/graduate_4.jpg" alt="">
        </div>
        <div class="img-box">
            <img src="../../../../static/topic/20180502/graduate_5.jpg" alt="">
        </div>
        <div class="img-box">
            <a href="/detail/1000359" style="width: 40%; height: 15%; top: 78%; left: 5%;"></a>
            <img src="../../../../static/topic/20180502/graduate_6.jpg" alt="">
        </div>
        <div class="img-box">
            <a href="/detail/1000054" style="width: 40%; height: 15%;top: 57%; left: 54%;"></a>
            <img src="../../../../static/topic/20180502/graduate_7.jpg" alt="">
        </div>
        <div class="img-box">
            <a href="/detail/1000349" style="width: 40%; height: 15%; top: 83%; left: 4%;"></a>
            <a href="/detail/1000199" style="width: 40%; height: 15%; top: 83%; left: 55%;"></a>
            <img src="../../../../static/topic/20180502/graduate_8.jpg" alt="">
        </div>
        <div class="img-box">
            <img src="../../../../static/topic/20180502/graduate_9.jpg" alt="">
        </div>
    </div>
</template>
<script>
    import shoppingCart from "../children/shoppingCart.1";
    import {userIsLogin, authToken} from "@/service/getData";
    import {halloweenData} from "../data.config";
    import common from "../../../common/common";

    export default {
        name: "halloween",
        data () {
            return {};
        },
        created () {},
        components: {
            shoppingCart
        },
        methods: {}
    };
</script>
<style lang="scss" scoped>
    .img-box {
        position: relative;
        img {
            display: block;
            width: 100%;
        }
        a {
            position: absolute;
            /*border: 1px solid red;*/
        }
    }
</style>