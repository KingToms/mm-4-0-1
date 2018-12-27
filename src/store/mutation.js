import {
  GET_SEARCHHIS,
  SET_SEARCHHIS,
  CLEAR_SEARCHHIS,
  HAS_HISTORY,
  SET_CURRENTSEARCH,
  SET_CURRENTCITY,
  SET_CONFIRMORDER,
  SET_BGSHOWHIDE,
  SET_ORDERLIST,
  SET_ORDERMANAGE
} from './mutation-type.js'
import {setStore,getStore} from '@/common/store'
import keyConf from '@/common/keyConf'

export default {
  // 获取搜索历史
  [GET_SEARCHHIS] (state) {
    let searchHis = !!getStore(keyConf.search_text) ? getStore(keyConf.search_text).split('|') : []
    state.searchHis = searchHis
  },
  // 设置搜索历史
  [SET_SEARCHHIS] (state, searchText) {
    let searchHis = !!getStore(keyConf.search_text) ? getStore(keyConf.search_text).split('|') : []
    let tempArr = []
    searchHis.forEach(item => {
      if(item !== searchText)
        tempArr.push(item)
    })
    tempArr.unshift(searchText)
    state.searchHis = tempArr
    setStore(keyConf.search_text, state.searchHis.join('|')) 
    /* let res = Array.includes(searchHis, searchText)
    if(res) return
    state.searchHis = searchHis
    state.searchHis.unshift(searchText)
    setStore(keyConf.search_text, state.searchHis.join('|')) */
  },
  // 清空搜索历史
  [CLEAR_SEARCHHIS] (state) {
    state.searchHis = []
    setStore(keyConf.search_text, state.searchHis.join('|'))
  },
  [HAS_HISTORY] (state) {
    state.hasHistory = state.searchHis.length === 0 ? false : true
  },
  // 当前搜索记录
  [SET_CURRENTSEARCH] (state, searchText) {
    state.currentSearch = searchText
    setStore(keyConf.currentSearch, searchText)
  },
  // 当前城市
  [SET_CURRENTCITY] (state, city){
    state.currentCity = city
  },
  // 确认订单
  [SET_CONFIRMORDER] (state,order) {
    // appoint: '', // 预约人
    // mobile: '', // 预约电话
    // date: '', // 预约日期
    // time: '', //预约时间
    // address: '', // 预约地址
    // amount: 0, //优惠券优惠金额
    // sn: 0 //使用的优惠券id
    // province_id：省
    // city_id 市
    // district_id 区
    // street_address 详细街道
    //storeName  门店名字
    //shop_id    门店id
    //store_address  门店地址
    state.confirmOrder.store_address = order.store_address && order.store_address.length >0 ? order.store_address : state.confirmOrder.store_address;
    state.confirmOrder.store_id = order.store_id && order.store_id.length >0 ? order.store_id : state.confirmOrder.store_id;
    state.confirmOrder.appoint = order.appoint && order.appoint.length >0 ? order.appoint : state.confirmOrder.appoint;
    state.confirmOrder.store_name = order.store_name && order.store_name.length >0 ? order.store_name : state.confirmOrder.store_name;
    state.confirmOrder.mobile = order.mobile && order.mobile.length >0 ? order.mobile : state.confirmOrder.mobile;
    state.confirmOrder.date = order.date && order.date.length >0 ? order.date : state.confirmOrder.date;
    state.confirmOrder.time = order.time && order.time.length >0 ? order.time : state.confirmOrder.time;
    state.confirmOrder.address = order.address && order.address.length >0 ? order.address : state.confirmOrder.address;
    state.confirmOrder.amount = order.amount && order.amount.length >0 ? order.amount : state.confirmOrder.amount;
    state.confirmOrder.sn = order.sn && order.sn.length >0 ? order.sn : state.confirmOrder.sn;
    state.confirmOrder.province_id = order.province_id  >0 ? order.province_id : state.confirmOrder.province_id;
    state.confirmOrder.city_id = order.city_id  >0 ? order.city_id : state.confirmOrder.city_id;
    state.confirmOrder.district_id = order.district_id  >0 ? order.district_id : state.confirmOrder.district_id;
    state.confirmOrder.street_address = order.street_address  >0 ? order.street_address : state.confirmOrder.street_address;
  },
  [SET_BGSHOWHIDE] (state,isShow){
    state.bgShow = isShow
  },
  [SET_ORDERLIST] (state,orders) {
    state.orderList = orders
  },
  [SET_ORDERMANAGE] (state, status){
    state.ordermanage = status
  }

}