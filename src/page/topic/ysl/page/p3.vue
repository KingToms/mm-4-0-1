<template>
    <div class="double-eleven">
        <div class="banner">
            <p class="Congratulate">亲爱的{{info.nickname}}</p>
            <p class="desc">
                你当前的排名为
                <span>{{info.my_rank || 0}}</span>
            </p>
            <p class="desc">
                你与第
                <span>{{info.up_rank || 0}}</span>
                还差
                <span>{{info.cha || 0}}</span>
                武力值,
            </p>
            <p class="desc">快去号令你的人马!</p>
            <p class="desc">快号令你的人马,帮你抢YSL!</p>
        </div>
        <div class="ranking">
            <img class="title" src="/static/topic/ysl/ranking.png" alt="">
            <div class="list-wrap">
                <div class="list" v-for="(item,i) in items" :key="i">
                    <img class="icon_NO" :src="'/static/topic/ysl/icon_NO.'+(item.rank-1)+'.png'" alt="" v-if="item.rank<=3">
                    <span class="number style" v-else-if="i<20">{{item.rank}}</span>
                    <span class="number" v-else>{{i + 1}}</span>
                    <span class="portrait" :style="{'background-image': 'url('+item.avatar+')'}"></span>
                    <span class="name">{{item.nickname}}</span>
                    <span class="force">{{item.force_value}}</span>
                </div>
            </div>
        </div>
        <div style="height: 80px;"></div>
        <div class="footer-wrap">
            <router-link class="generate" to="/topic-ysl/p4" style="border-right: 3px solid #fff;">生成召集令</router-link>
            <router-link class="generate" to="/topic-ysl/p2" style="border: none;">查看总榜单</router-link>
        </div>
    </div>
</template>
<script>
    import {yslMyRank} from "@/service/getData";

    import Vue from 'vue'
    import {MessageBox} from 'mint-ui';
    import '../../../../../node_modules/mint-ui/lib/style.css';

    export default {
        name: "ysl",
        data () {
            return {
                items: [],
                info: {
                    cha: 0,
                    my_rank: 0,
                    up_rank: 0,
                },
                level: 2
            };
        },
        created () {
            this.funYslMyRank();
        },
        methods: {
            async funYslMyRank () {
                let res = await yslMyRank();
                console.log(res);
                if (res.status === 'ok') {
                    this.items = res.data;
                    this.info = res.info;
                } else {
                    MessageBox.alert(res.msg).then(action => {
                        if (res.code === 300) {
                            // 跳到参与活动页面
                            this.$router.push('/topic-ysl');
                        }
                    });
                }
            },
        },
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

    .banner {
        background-image: url("/static/topic/ysl/bg_small.jpg");
        text-align: center;
        padding-bottom: 30px;
        background-size: 100% 100%;
        span {
            font-size: 20px;
            color: #cb1f1f;
            font-weight: bold;
        }
        .Congratulate {
            color: #fee9a8;
            padding: 23px 0 15px 0;
            font-size: 30px;
            text-shadow: 0 3px 4px #000;
            font-weight: 500;
        }
        .desc {
            color: #fff;
            font-size: 18px;
            text-shadow: 0 3px 4px #000;
            font-weight: 500;
        }
    }

    .ranking {
        border: 1px solid #000;
        margin: 30px 20px 0 20px;
        .title {
            width: 220px;
            display: block;
            margin: 15px auto;
        }
    }

    .list-wrap {
        position: relative;
        .list {
            display: flex;
            align-items: center;
            position: relative;
            padding: 10px 0;
            &:after {
                position: absolute;
                display: block;
                content: '';
                height: 1px;
                left: 0;
                right: 0;
                bottom: 0;
                background: #ddd;
            }
        }
        .number {
            margin: 0 15px;
            font-size: 13px;
            display: inline-block;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 50%;
            color: #666;
            &.style {
                background: #eee;
                border: 1px solid #ccc;
            }
        }
        .icon_NO {
            display: block;
            width: 32px;
            margin: 0 15px;
        }
        .portrait {
            display: inline-block;
            width: 40px;
            height: 40px;
            margin-right: 10px;
            background: #ddd;
            border-radius: 50%;
            background-size: cover;
        }
        .name {
            font-size: 13px;
            flex: 1;
        }
        .force {
            margin-right: 15px;
            color: #d52121;
            font-size: 16px;
            font-weight: bold;
        }
    }

    .footer-wrap {
        position: fixed;
        display: flex;
        justify-content: center;
        width: 100%;
        bottom: 0;
        left: 0;
        background: #d52121;
        .generate {
            display: inline-block;
            width: 40%;
            color: #fff;
            height: 50px;
            line-height: 50px;
            font-size: 18px;
            text-align: center;
        }
    }
</style>