<template>
    <div class="double-eleven">
        <div class="alter-wrap" v-if="overdue">
            <div class="alter">
                <p class="title">{{title}}</p>
                <p class="msg">{{msg}}</p>
                <img class="full" src="/static/topic/ysl/qr.jpg" alt="">
            </div>
            <div class="alert-mask"></div>
        </div>
        <img class="full" src="/static/topic/ysl/bg_poster1.jpg" alt="">
        <div class="form">
            <div v-if="showDom">
                <input type="text" class="border mobile" placeholder="请输入手机号码" v-model="params.mobile">
                <div class="clear get-code-wrap">
                    <input type="text" class="border code" placeholder="验证码" v-model="params.code">
                    <input id="sendCode" class="btn get-code" type="button" value="获取验证码" @click="funGetCode">
                </div>
            </div>
            <div class="participate" @click="funAuthLogin">参与</div>
            <img class="full rule" src="/static/topic/ysl/rule.png" alt="">
        </div>
    </div>
</template>
<script>
    import {getCode, authLogin, yslUserTake, yslUserInfo, getWechatCode} from "@/service/getData";
    import common from "../../../../common/common";
    import {setStore} from "../../../../common/store.js";
    import keyConf from "../../../../common/keyConf.js";

    export default {
        name: "ysl",
        data () {
            return {
                title: '',
                msg: '',
                overdue: false,
                params: {
                    mobile: '',
                    code: '',
                    inviter_id: '',
                    from: this.$route.query.from || '',
                    plid: '93'
                },
                wxLoginParams: {
                    code: ''
                },
                showDom: true
            };
        },
        created () {
            let info = JSON.parse(localStorage.getItem('QRInfo'));
            if (info) {
                this.params.inviter_id = info.id;
                this.params.from = info.from;
            }
            this.funYslUserInfo();
            this.wxLoginParams.code = this.$route.query.code || '';
            this.funGetWechatCode();
        },
        methods: {
            async funYslUserInfo () {
                // 用户信息
                let res = await yslUserInfo();
                console.log(res);
                if (res.code == 100) {
                    this.$router.push('/topic-ysl/p3');
                } else if (res.code == 200) {
                    this.showDom = false;
                } else {
                    if (res.msg == '活动尚未开始') {
                        this.title = res.msg;
                        this.msg = '更多请关注俏猫';
                        this.overdue = true;
                    } else if (res.msg == '活动已经结束') {
                        this.title = res.msg;
                        this.msg = '长按二维码，输入关键字【ysl】，可查看获奖名单';
                        this.overdue = true;
                    }
                }
            },
            async funGetCode () {
                // 发送验证码
                if (this.params.mobile.length != 11) {
                    alert("手机格式不正确");
                    return;
                }
                let countdown = 120;
                this.settime($(this.$el.querySelector("#sendCode")), countdown);
                let res = await getCode({mobile: this.params.mobile, type: 1});
                console.log(res);
                if (res.status === 'ok') {

                } else {
                    alert(res.msg);
                }
            },
            async funAuthLogin () {
                if (this.showDom) {
                    // 登录
                    if (!/^((1[0-9]{1})+\d{9})$/.test(this.params.mobile)) {
                        alert("请输入正确的电话号码");
                        return false;
                    } else if (!/^\d{6}$/.test(this.params.code)) {
                        alert("请输入正确的验证码");
                        return false;
                    }

                    let result = await authLogin(this.params);
                    if (result.status == "ok") {
                        $.cookie(keyConf.qm_cookie, this.mobile, {expires: 1, path: "/"});
                        setStore(keyConf.userMoile, this.mobile);
                        // TODO
                        this.funYslUserTake();
                    } else {
                        alert(result.msg);
                    }
                } else {
                    this.funYslUserTake();
                }
            },
            async funYslUserTake () {
                // 参与
                let res = await yslUserTake(this.wxLoginParams);
                console.log(res);
                if (res.status === 'ok') {
                    this.$router.push('/topic-ysl/p2');
                } else {
                    alert(res.msg);
                    if (res.code === 100) {
                        // 跳到自己排行榜
                        this.$router.push('/topic-ysl/p3');
                    }
                }
            },
            async funGetWechatCode () {
                // 获取微信code
                let res = await getWechatCode({redirectURI: 'http://mm.qiaocat.com/topic-ysl'});
                console.log(res);
                if (res.status === 'ok') {
                    let code = this.$route.query.code || '';
                    if (!code)
                        location.href = res.url;
                }
            },
            settime ($el, countdown) {
                let _this = this;
                if (countdown === 0) {
                    $el.removeAttr("disabled");
                    $el.val('发送验证码');//.css('backgroundColor', '#000');
                } else {
                    $el.attr('disabled', 'true');//.css('backgroundColor', '#000');
                    $el.val(`${countdown}s`);
                    countdown--;
                    setTimeout(function () {
                        _this.settime($el, countdown);
                    }, 1000);
                }
            }
        },
        components: {}
    }
</script>
<style lang="scss" scoped>
    .clear:after {
        content: '';
        display: block;
        clear: both;
    }

    img.full {
        width: 100%;
    }

    input.border {
        border: 1px solid #000;
        height: 44px;
        text-indent: 15px;
        font-size: 16px;
        color: #999;
    }

    .alter-wrap {
        .alter {
            position: fixed;
            padding: 20px;
            width: 80%;
            left: 10%;
            top: 25%;
            z-index: 1;
            text-align: center;
            background: #fff;
            .title {
                font-size: 1.7rem;
            }
            .msg {
                font-size: 2rem;
            }
        }
        .alert-mask {
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            position: fixed;
            background: rgba(0, 0, 0, 0.5);
        }
    }

    .form {
        margin: 20px;

        .mobile {
            width: 100%;
        }
        .get-code-wrap {
            padding-top: 10px;
            .code {
                width: 60%;
                float: left;
            }
            .get-code {
                width: 35%;
                float: right;
                background: #000;
                height: 44px;
                line-height: 44px;
                font-size: 16px;
                color: #ccc;
                text-align: center;
            }
        }
        .participate {
            margin-top: 10px;
            height: 44px;
            text-align: center;
            line-height: 44px;
            color: #fee9a8;
            font-size: 18px;
            background: #000;
        }
        img.rule {
            margin: 30px 0 45px 0;
        }
    }

</style>