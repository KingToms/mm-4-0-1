<template>
  <div class="time-sel">
    <div class="date-scroll">
      <!-- <ul class="clear" id="dateScroll" :style="{transform:`translateX(${X}px)`}" >
          <li class="left span" v-for="(item,index) in allDate" :key="index" :class="{'border-bottom': chooseDate === `${item.year}-${item.month}-${item.day}`}" @click="scrollChooseDay(item,index)" :id = "`dateScroll${item.index}`">
            <span :class="{'color-black':chooseDate === `${item.year}-${item.month}-${item.day}`}" class="color" v-if="index==0">今天</span>
            <span :class="{'color-black':chooseDate === `${item.year}-${item.month}-${item.day}`}" class="color" v-if="index==1">明天</span>
            <span :class="{'color-black':chooseDate === `${item.year}-${item.month}-${item.day}`}" class="color" v-if="index==2">后天</span>
            <span :class="{'color-black':chooseDate === `${item.year}-${item.month}-${item.day}`}" class="color" v-if="index!=2 && index!=1 && index!=0">{{`星期${week[item.week]}`}}</span>
            <p :class="{'color-black':chooseDate === `${item.year}-${item.month}-${item.day}`}" class="color">{{item.month}}月{{item.day}}日</p>
          </li>
        </ul> -->
      <div id="dateScroll">
        <span v-for="(item,index) in allDate" @click="scrollChooseDay(item,index)" :key="index" :id="`dateScroll${item.index}`">
          <div :style="{width:`${wStyle}px`}" :class="{on: chooseDate === `${item.year}-${item.month}-${item.day}`}">
            <p class="cn f12 color" :class="{'color-black':chooseDate === `${item.year}-${item.month}-${item.day}`}" v-if="index==0">今天</p>
            <p class="cn f12 color" :class="{'color-black':chooseDate === `${item.year}-${item.month}-${item.day}`}" v-if="index==1">明天</p>
            <p class="cn f12 color" :class="{'color-black':chooseDate === `${item.year}-${item.month}-${item.day}`}" v-if="index==2">后天</p>
            <p class="cn f12 color" :class="{'color-black':chooseDate === `${item.year}-${item.month}-${item.day}`}" v-if="index!=2 && index!=1 && index!=0">{{`星期${week[item.week]}`}}</p>
            <p class="en f15">{{item.month}}月{{item.day}}日</p>
          </div>
        </span>
        <!-- <div class="month-wrap" :style="{width:`${wStyle}px`}">
            <p>30天</p>
            <p>30天</p>
          </div> -->
      </div>
      <div class="calendar" @click="showCalendar"></div>
    </div>
    <section class="time-panel">
      <div class="choose-demo">
        <ul class="clear">
          <li class="left">
            <span class="icon"></span>
            <span class="text">不可选</span>
          </li>
          <li class="left">
            <span class="icon"></span>
            <span class="text">可选</span>
          </li>
          <li class="left">
            <span class="icon"></span>
            <span class="text">已选</span>
          </li>
        </ul>
      </div>
      <div class="time-slot">
        <ul class="clear">
          <li class="left" v-for="(item,index) in timeSolt" :key="index" :class="{'unChoose': item.type === 1 || item.type === 2,'bgColor':chooseBg === index || item.time === confirmOrder.time}" @click="cTime(item,index)">
            <span class="solt">{{item.time}}</span>
            <icon v-if="item.type === 2"></icon>
          </li>
        </ul>
      </div>
    </section>
    <section class="bottom">
      <div class="appoint-time clear">
        <div class="left">
          <span>服务时间</span>
          <span>{{confirmOrder.date}} {{confirmOrder.time}}</span>
        </div>
        <div class="right">
          <a href="javascript:void(0);" @click="confirm">确定</a>
        </div>
      </div>
    </section>
    <section class="date-panel">
      <div class="date-title">
        <div class="title">选择服务日期</div>
        <span class="close" @click="close">取消</span>
      </div>
      <div class="date-week-title">
        <ul class="clear">
          <li class="left" v-for="(item,index) in week" :key="index">{{item}}</li>
        </ul>
      </div>
      <div class="date-week">
        <div class="render-week" v-for="(item,index) in calendar" :key="index">
          <div class="date-month">
            {{index}}
          </div>

          <div class="date-day-week">
            <ul class="clear">
              <!-- (dayIndex === key && day.month === chooseMonth) ||  -->
              <li class="left" v-for="(day,key) in item" :key="key" @click="chooseDay(day,key)" :class="{'choose': chooseDate=== `${day.year}-${day.month}-${day.day}`}" :data-id="day.index">
                <p class="tip" v-if="day.index === 0">今天</p>
                <p class="tip" v-if="day.index === 1">明天</p>
                <p class="tip" v-if="day.index === 2">后天</p>
                <p :class="{'pday':day.index === 0 || day.index === 1 || day.index === 2}">{{day.day}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import common from "../../../common/common";
export default {
  name: "timeSel",
  data() {
    return {
      X: 0,
      wStyle: 0,
      startDate: "",
      endDate: "",
      allDate: [],
      calendar: [],
      dateIndex: 0, //选中日期的下标
      timeSolt: [], // 需要渲染的时间，包括忙时，不可选，可选
      timeShowSolt: [], // 初始化所有的时间
      week: ["日", "一", "二", "三", "四", "五", "六"],
      chooseMonth: -1, // 选中的月份
      // dayIndex: -1, // 选中日期的下标
      chooseDate: "", // 选中的日期
      chooseTime: "", // 选中时间段
      timeNow: "", // 当前日期
      busyTimeO: [],
      chooseBg: -1,
      business_start: "",
      business_end: "",
      busy_time: {},// 记录选中日期的忙时
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
    };
  },
  props: {
    busyTime: {
      type: Array
    },
    productCate: {
      type: Number
    }
  },
  mounted() {
    this.wStyle = window.innerWidth / 5;
    // let i = 0;
    // for (let index = 0; index < this.allDate.length; index++) {
    //   if(this.chooseDate === `${this.allDate[index].year}-${this.allDate[index].month}-${this.allDate[index].day}`){
    //     i = index;
    //     break;
    //   }
    // }
    // if(i>0)
    //   // document.getElementById('dateScroll').scrollLeft = this.wStyle * i;
    //   document.getElementById('dateScroll').scrollLeft = 500;
    //   // this.ScrollLeft(i);
    // // console.log(i);
    // this.$el.querySelector('#dateScroll').scrollLeft = 500;
    // console.log(this.$el.querySelector('#dateScroll').scrollLeft);
  },
  computed: {
    ...mapState(["confirmOrder"])
  },
  created() {
    this.confirmOrder.date=null;
    this.confirmOrder.time=null;
    this.InitTime();
    this.startDate = new Date();
    this.timeNow = this.startDate;
    this.endDate = common.getDate(common.addDate(new Date(), 89));
    this.calendar = common.eachDate(this.startDate, this.endDate);
    this.appendAllDate();
    this.initDatenow();
    this.setBusyTime(this.allDate[0]);
  },
  methods: {
    ...mapMutations(["SET_BGSHOWHIDE", "SET_CONFIRMORDER"]),
    confirm() {
      this.SET_CONFIRMORDER(this.confirmOrder);
      this.$emit("closeAppoint");
    },
    // 初始化当前日期为选中日期
    initDatenow() {
      // this.chooseDate = `${(new Date()).getFullYear()}-${(new Date()).getMonth() + 1}-${(new Date()).getDate()}`
      // this.confirmOrder.date = this.chooseDate
      // 初始化选择日期为上一次选择的，如果没有则为目前的日期
      this.chooseDate = this.confirmOrder.date
        ? this.confirmOrder.date
        : `${new Date().getFullYear()}-${new Date().getMonth() +
            1}-${new Date().getDate()}`;
      this.confirmOrder.date = this.chooseDate;
    },
    // 初始化营业时间
    InitTime() {
      this.business_start =
        this.busyTime && this.busyTime.length > 0
          ? this.busyTime[0].business_start
          : "09:00"; // 没有设置开始营业时间默认为9:00
      this.business_end =
        this.busyTime && this.busyTime.length > 0
          ? this.busyTime[0].business_end
          : "22:00"; // 没有设置结束营业时间默认为22:00
      // this.busy_time = this.busyTime && this.busyTime.length > 0 && this.busyTime[0].busy_time && this.busyTime[0].busy_time ? this.busyTime[0].busy_time : {} // 获取忙时
      // startHours 开始营业时间小时 
      // startMinutes 开始营业时间分钟
      // endHours 结束营业时间小时
      // endMinutes 结束营业时间分钟
      let startHours = Number(this.business_start.substr(0, 2));
      let startMinutes = Number(this.business_start.substr(3,2));
      let endHours = Number(this.business_end.substr(0, 2));
      let endMinutes = Number(this.business_end.substr(3,2));
      let i = startHours;
      if(startMinutes > 30){
        i++;
      }else if(startMinutes == 30){
        let tmpHour = startHours >= 10 ? startHours : `0${startHours}`;
        this.timeShowSolt.push({ type: 0, time: `${tmpHour}:30` });
        i++;
      }
      // 根据营业开始时间结束时间生成可预约时间点
      for (i; i < endHours; i++) {
        let h = i >= 10 ? i : `0${i}`;
        this.timeShowSolt.push({ type: 0, time: `${h}:00` });
        this.timeShowSolt.push({ type: 0, time: `${h}:30` });
      }
      this.timeShowSolt.push({ type: 0, time: `${endHours}:00` });
      if(endMinutes > 30){
        this.timeShowSolt.push({ type: 0, time: `${endHours}:30` });
      }
    },
    showCalendar() {
      $(".date-panel").slideDown();
      this.SET_BGSHOWHIDE(true);
    },
    close() {
      $(".date-panel").slideUp();
      this.SET_BGSHOWHIDE(false);
    },
    // 初始化可预约的天数 (90天)
    appendAllDate() {
      for (let key in this.calendar) {
        let date = this.calendar[key];
        for (let subKey in date) {
          if (date[subKey].day !== "") {
            this.allDate.push(date[subKey]);
          }
        }
      }
    },
    // 日历改变日期
    chooseDay(day, index) {
      this.scrollChooseDay(day, index);
      this.ScrollLeft(day.index);
      this.close();
    },
    ScrollLeft(i) {
      // 滚动位置
      document.getElementById("dateScroll").scrollLeft = this.wStyle * i;
    },
    // 选择预约时间
    cTime(item, index) {
      // || !this.isChoose(item)
      if (item.type === 1 || item.type === 2) {
        this.chooseBg = -1;
        return 0;
      }
      this.chooseBg = index;
      this.confirmOrder.time = item.time;
    },
    scrollChooseDay(date, index) {
      // 改变日期之后重置预约时间
      this.chooseBg = -1;
      this.confirmOrder.time = "";

      this.initSoltTime(0);
      this.chooseDate = `${date.year}-${date.month}-${date.day}`;
      this.confirmOrder.date = this.chooseDate;
      this.setBusyTime(date);
    },
    initSoltTime(type) {
      let timeTemp = [];
      this.timeSolt.forEach(item => {
        item.type = type;
        timeTemp.push(item);
      });
      this.timeSolt = timeTemp;
    },
    setBusyTime(date) {
      // 日期改变，重新初始化要展示的数据
      let month_day = "";
      this.timeSolt = [];
      // 初始化为都是可选状态
      this.initSoltTime(0);
      // debugger
      // 营业时间
      month_day = date.month < 10 ? `0${date.month}` : date.month;
      month_day += date.day < 10 ? `-0${date.day}` : `-${date.day}`;

      // 此处获取值的可以抽成一个方法，放在created中，执行一次就可以了
      // 如果没有设置营业时间  则默认为9:00~22:00
      // this.business_start = this.busyTime && this.busyTime.length > 0 ? this.busyTime[0].business_start :'09:00'  // 9:00
      // this.business_end = this.busyTime && this.busyTime.length > 0 ? this.busyTime[0].business_end :'22:00'  // 22:00

      // 如果busytime没有设置而且是null   则默认为[]
      this.busyTimeO =
        this.busyTime &&
        this.busyTime.length > 0 &&
        this.busyTime[0].busy_time &&
        this.busyTime[0].busy_time
          ? this.busyTime[0].busy_time[[month_day]]
          : [];
      // this.busyTimeO = this.busy_time ? this.busyTime[0].busy_time[month_day] : []
      this.busyTimeO = this.busyTimeO ? this.busyTimeO : [];
      // 非营业日期设置为忙时
      let workDate =
        this.busyTime.length > 0 ? this.busyTime[0].business_week : "";
      let workDateArr = workDate.length > 0 ? workDate.split(",") : [];

      // 筛选出营业时间
      /* this.timeShowSolt.forEach(item =>{
        if(this.compareTime(item.time,this.business_start)  && this.compareTime(this.business_end,item.time))
          this.timeSolt.push(item)
      }) */
      this.timeSolt = this.timeShowSolt;

      // 设置非营业日期（星期计算）
      if (workDateArr.length > 0 && !workDateArr.includes("" + date.week)) {
        // 设置为不可点
        this.initSoltTime(1);
        // 设置为忙时
        this.filterTime(2);
        return 0;
      }

      // 选中日期大于当前日期
      if (!this.compareDate()) {
        // this.busyTimeO.length===0 说明没有忙时可设置
        if (this.busyTimeO.length === 0) {
          // 筛选设置不可选时间
          this.filterTime(0);
        } else {
          // 设置忙时
          let timeTemp = [];
          // 遍历所有的营业时间   设置忙时与不可选
          this.timeSolt.forEach(item => {
            
            item.type = this.busyTimeO.includes(item.time) ? 2 : item.type;
            timeTemp.push(item);
          });
          this.timeSolt = timeTemp;
        }
      } else {
        let timeTemp = [];
        this.timeSolt.forEach(item => {
          // debugger
          item.type = this.isChoose(item) ? 1 : item.type;
          item.type = this.busyTimeO.includes(item.time) ? 2 : item.type;
          timeTemp.push(item);
        });
        this.timeSolt = timeTemp;
      }
    },
    // 改变时间可选状态  type字段
    filterTime(type) {
      let timeTemp = [];
      this.timeSolt.forEach(item => {
        if (type === 2) item.type = type;
        else item.type = this.isChoose(item) ? type : item.type;
        timeTemp.push(item);
      });

      this.timeSolt = timeTemp;
    },
    // 判断时间是否可选
    isChoose(date) {
      let time = common.getDate(`${this.chooseDate} ${date.time}:00`);
      let hours = this.timeNow.getHours();
      let minute = this.timeNow.getMinutes();
      // 如果选择的日期小于当前日期 则不可选
      if (time.getDate() < this.timeNow.getDate()) {
        return true;
      }
      // 如果选中日期大于当前日期  可选
      if (time.getDate() > this.timeNow.getDate()) return false;
      if (date.time.substr(0, 2) < hours) return true;
      else if (
        Number(date.time.substr(0, 2)) === hours &&
        date.time.substr(3, 2) <= minute
      )
        return true;
      return false;
    },
    // 日期比较 比较用户选中的时间和当前时间，选中日期大于当前日期返回true，否则false
    compareDate() {
      let day = common.getDate(this.chooseDate);
      this.timeNow = new Date();
      // 判断不同的产品可预约时间不一样
      this.timeNow.setHours(this.timeNow.getHours() + this.productCate);
      if (day.getFullYear() > this.timeNow.getFullYear()) return false;
      if (day.getFullYear() <= this.timeNow.getFullYear()) {
        if (day.getMonth() > this.timeNow.getMonth()) return false;
        else {
          if (day.getDate() > this.timeNow.getDate()) return false;
          return true;
        }
      }
    },
    // 时间比较  前面大于后面返回true，否则返回false
    compareTime(time_1, time_2) {
      let indexOf_1 = time_1.indexOf(":");
      let indexOf_2 = time_2.indexOf(":");

      let hour_1 = Number(time_1.substr(0, indexOf_1));
      let hour_2 = Number(time_2.substr(0, indexOf_2));

      if (hour_1 > hour_2) return true;

      if (hour_1 === hour_2)
        return (
          time_1.substr(indexOf_1 + 1, time_1.length - indexOf_1 - 1) >=
          time_2.substr(indexOf_2 + 1, time_2.length - indexOf_1 - 1)
        );
      return false;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/css/mixin.scss";
.time-sel {
  position: relative;
  @include bgColor(#fff);
  .date-scroll {
    border-bottom: 0.05rem solid #ccc;
    overflow-x: auto;
    ul.clear {
      width: 720rem;
      overflow: scroll;
      white-space: nowrap;
      padding-left: 5px;
      li.left {
        @include wh(7.8rem, 5.5rem);
        text-align: center;
        box-sizing: border-box;
        &.border-bottom {
          border-bottom: 0.4rem solid #e70034;
        }
        &.span {
          padding-top: 0.9rem;
        }
        &.p {
          padding-top: 26px;
        }
        span {
          font-size: 1.1rem;
        }
        p {
          font-size: 1.4rem;
        }
        .color {
          color: #999;
        }
        .color-black {
          color: #000;
        }
      }
    }
    .calendar {
      position: absolute;
      @include wh(8rem, 5.5rem);
      top: 0;
      right: 0px;
      background-color: #f3f3f3;
      @include bgi_2("/static/icon/order/pay_btn_date.png", 2.3rem, 2.3rem, center, center, no-repeat);
    }
  }
  #dateScroll {
    height: 55px;
    overflow: hidden;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
    background: #fff;
    span {
      position: relative;
      display: inline-block;
      div {
        @include fj(center);
        @include lineHeight(55px);
        flex-direction: column;
        text-align: center;
        p {
          padding: 4px 0;
        }
        .f12 {
          font-size: 12px;
          line-height: 12px;
        }
        .f15 {
          font-size: 12px;
          line-height: 12px;
        }
      }
      .on {
        p {
          color: #e70034;
        }
      }
      .on:after {
        position: absolute;
        display: block;
        content: "";
        width: 100%;
        height: 3px;
        left: 0;
        bottom: 0;
        z-index: 12;
        background: #e70034;
      }
    }
  }
  .time-panel {
    .choose-demo {
      margin: 3.6rem 0 3.2rem;
      ul.clear {
        padding-left: 6rem;
        li.left {
          padding: 0 1.5rem;
          span.icon {
            display: inline-block;
            @include wh(2rem, 1.3rem);
          }
          span.text {
            padding-left: 1rem;
            @include sc(1.3rem, #000);
          }
          &:first-child {
            span.icon {
              border: 0.05rem solid #ccc;
            }
          }
          &:nth-of-type(2) {
            span.icon {
              border: 0.05rem solid #000;
            }
          }
          &:last-child {
            span.icon {
              @include bgColor(#e70034);
              border: 0.05rem solid #e70034;
            }
          }
        }
      }
    }
    .time-slot {
      padding-bottom: 5rem;
      ul.clear {
        padding: 0 0 0 1.5rem;
        li.left {
          position: relative; // @include wh(7.3rem,3.6rem);
          @include wh(19.28%, 3.6rem);
          margin: 0.6rem;
          border: 0.05rem solid #000;
          box-sizing: border-box;
          @include sc(1.6rem, #000);
          text-align: center;
          line-height: 3.6rem;
          icon {
            position: absolute;
            right: 0;
            top: 0;
            @include wh(2.4rem, 2.4rem);
            @include bgi_2("/static/icon/order/pay_icon_busy.png", 2.4rem, 2.4rem);
          }
          &.unChoose {
            border: 0.05rem solid #ccc;
            span {
              @include sc(1.6rem, #ccc);
            }
          }
          &.bgColor {
            @include bgColor(#e70034);
            border: 0.05rem solid #e70034;
            span {
              color: #fff;
            }
          }
        }
      }
    }
  }
  .bottom {
    .appoint-time {
      position: fixed;
      bottom: 0;
      @include wh(100%, 5rem);
      border-top: 0.05rem solid #ccc;
      background-color: #fff;
      div.left {
        padding-left: 1.5rem;
        line-height: 5rem;
        span:first-child {
          @include sc(1.4rem, #666);
        }
        span:last-child {
          padding-left: 1.4rem;
          @include sc(1.4rem, #000);
        }
      }
      div.right {
        position: relative;
        @include wh(12rem, 5rem);
        a {
          position: absolute;
          @include wh(12rem, 5rem);
          @include bgColor(#e70034);
          @include sc(1.8rem, #fff);
          text-align: center;
          line-height: 5rem;
        }
      }
    }
  }
  .date-panel {
    @include wh(100%, 44rem);
    background-color: #fff; // overflow: auto;
    position: fixed;
    bottom: 0;
    display: none;
    z-index: 2;
    .date-title {
      position: relative;
      .title {
        @include wh(100%, 6.1rem);
        text-align: center;
        line-height: 6.1rem;
        @include sc(1.6rem, #000);
      }
      .close {
        position: absolute;
        right: 1.5rem;
        top: 50%;
        transform: translateY(-50%);
        @include sc(1.6rem, #999);
      }
    }
    .date-week-title {
      @include wh(100%, 3.4rem);
      line-height: 3.4rem; // @include average(#ccc);
      ul.clear {
        margin-left: 0.7rem;
        border-bottom: 0.05rem solid #ccc; // padding-left: .8rem;
        li.left {
          @include wh(14.2%, 3.4rem);
          @include sc(1.4rem, #999);
          text-align: center; // padding-left: 1.5rem;
        }
      }
    }
    .date-week {
      @include wh(100%, 35rem);
      overflow: auto;
      ul.clear {
        margin-left: 0.7rem;
        border-bottom: 0.05rem solid #ccc;
        li.left {
          @include wh(14.2%, 5rem);
          @include sc(1.4rem, #999);
          text-align: center;
          line-height: 6.3rem;
          border-bottom: 0.05rem solid #ccc;
          &.choose {
            @include bgColor(#e70034);
            p {
              color: #fff !important;
            }
          } // padding-left: 1.5rem;
        }
      }
      .render-week {
        .date-month {
          height: 4.5rem;
          margin-left: 0.7rem;
          @include sc(1.4rem, #000);
          text-align: center;
          line-height: 4.5rem;
          border-bottom: 0.05rem solid #ccc;
        }
        .date-day-week {
          ul.clear {
            li.left {
              color: #000;
              p.tip {
                line-height: 2rem;
                font-size: 1.1rem;
              }
              p.pday {
                line-height: 2.5rem;
              }
            }
          }
        }
      }
    }
  }
  .hide {
    display: none;
  }
}
</style>