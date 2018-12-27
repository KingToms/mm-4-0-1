// import fetch from '@/common/fetch'
import fetch from '@/config/axios'

// es6 箭头函数
export const accountLogin = (mobile, pwd) => fetch(`/user/mobile`, {mobile: mobile, password: pwd}, 'POST')

//发送验证码
export const getCode = (data) => fetch(`/mon/mon_send`, data,'POST')
//验证手机号码是否存在(弃)
export const authMobile = (mobile) => fetch(``, {mobile: mobile})

// 验证用户是否已经登录
export const userIsLogin = () => fetch(`/qiaomao/qm_user_is_login`)
//注册
export const register = (data) => fetch(`/mon/mon_pass_reg`, data, 'POST')
// 密码登录
export const pwdlogin = (data) => fetch(`/mon/mon_pass_login`, data, 'POST')
// 验证码登录
export const authLogin = (data) => fetch (`/mon/mon_quick_login`, data, 'POST')
// 重置密码
export const resetPwd = (data) => fetch(`/mon/mon_forget_pass`, data, 'POST')
// 验证验证码是否正确
export const authCode = (data) => fetch(`/mon/mon_yan_code`,data,'POST')
// 退出登录
export const logout = (data) => fetch(`/mon/mon_logout`, data, 'POST')

/* 首页 */
// 首页签到
export const getHomeSign = (data) => fetch(`/qiaomao/qm_user_income_check_in`, data, 'POST')
// 首页推荐
export const getHomeRecommend = (data) => fetch(`/qiaomao/qm_index_recommende_list`, data, 'POST')
// 显示服务产品的列表
export const getProductList = (data) => fetch(`/qiaomao/qm_product_list`, data, 'POST')
// 显示服务分类
export const categoryList = (data) => fetch(`/qiaomao/qm_category_get_list`, data, 'POST')
// 获取人气最高 or 新店开张美业师
export const getStylistFans = (data) => fetch(`/qiaomao/qm_user_stylist_list`, data, 'POST')

/*首页底部--导航栏图标*/
export const getNavIcon = (data) => fetch(`/mon/mon_config_daohanglan`, data, 'POST')

export const getUserInfo = (data) => fetch(`/qiaomao/qm_profile_get`, data, 'POST')
// 用户修改资料
export const saveInfo = (data) => fetch(`/qiaomao/qm_user_modify_base`, data, 'POST')
// 用户意见反馈
export const feedback = (data) => fetch(`/qiaomao/qm_user_feedback_submit`, data, 'POST')
// 用户投诉美业师
export const complaint = (data) => fetch(`/qiaomao/qm_user_complaint_submit`, data, 'POST')
// 获取美业师（投诉）
export const getStylist = (data) => fetch(`/qiaomao/qm_user_complaint_stylist`, data, 'POST')
// 用户足迹
export const getFootList = (data) => fetch(`/qiaomao/qm_user_footprint_list`, data, 'POST')
// 帮助反馈--用户常见问题
export const getFaqProblem = (data) => fetch(`/mon/mon_config_faq_problem`, data, 'POST')


export const getInfo = () => fetch(`/dresser/dr_add_data`,{},'POST')

export const search = (data) => fetch(`/qiaomao/qm_product_fuzzy_search`, data, 'POST')

export const getDistrict = (data) => fetch(`/mon/mon_city_street`, data, 'POST')

//获取产品详情
export const productList =(data) => fetch(`/qiaomao/qm_product_info`, data, 'POST')
// 获取产品详情的服务承诺
export const commitmentList =(data) => fetch(`/mon/mon_config_service_commitment`, data, 'POST')
// 获取用户优惠券列表
export const getCouponList = (data) => fetch(`/qiaomao/qm_coupon_list`, data, 'POST')
// 获取产品评论列表
export const getEvaluateList = (data) => fetch(`/qiaomao/qm_product_get_comments`, data, 'POST')

// 领券中心所有优惠券
export const getCoupons = (data) => fetch(`/qiaomao/qm_coupon_center`, data, 'POST')

// 下单
export const createOrder = (data) => fetch(`/qiaomao/qm_order_create`, data, 'POST')
// 订单查询
export const getOrderList = (data) => fetch(`/qiaomao/qm_order_find`,data,'POST')
// 获取订单详情
export const getOrder = (data) => fetch(`/qiaomao/qm_order_detail`,data,'POST')
// 取消订单
export const cancelOrder = (data) => fetch(`/qiaomao/qm_order_cancel`,data,'POST')
// 删除订单
export const delOrder = (data) => fetch(`/qiaomao/qm_order_cancel_delect`,data,'POST')
// 订单评价
export const commentOrder = (data) => fetch(`/qiaomao/qm_order_comment`,data,'POST')
// 顾客确认开始服务
export const startService = (data) => fetch(`/qiaomao/qm_order_confirm_by_buyer`,data,'POST')
// 顾客结束服务
export const endService = (data) => fetch(`/qiaomao/qm_order_product_finish_confirm`,data,'POST')
  // 下单--获取用户地址列表
export const getAddress = (data) => fetch(`qiaomao/qm_user_address_list`, data, 'POST')
  // 下单--保存用户地址
export const saveAddress = (data) => fetch(`qiaomao/qm_user_save_address`, data, 'POST')
  // 下单--删除用户地址
export const delateAddress = (data) => fetch(`qiaomao/qm_user_delete_address`, data, 'POST')
  // 服务地址--区、城市商圈
export const streetList = (data) => fetch(`mon/mon_city_street`, data, 'POST')

// 图片上传
export const upLoadImage = (data) => fetch(`/mon/mon_uploads`, data, 'POST')
// 为你推荐
export const Reccommend = (data) => fetch(`/qiaomao/qm_product_commend`, data, 'POST')
//服务产品关注
export const productFollow = (data) => fetch(`/qiaomao/qm_product_collect`, data, 'POST')
//服务产品取消关注
export const productUnfollow = (data) => fetch(`/qiaomao/qm_product_cancel_collect`, data, 'POST')
// 服务产品关注列表
export const followProduct = (data) => fetch(`/qiaomao/qm_product_collect_list`, data, 'POST')
// 美业师/店铺关注列表
export const followShop = (data) => fetch(`/qiaomao/qm_attention_get_attent`, data, 'POST')
// 用户猫粮积分列表
export const catfoodIntegral = (data) => fetch(`/qiaomao/qm_user_points_list`, data, 'POST')

//店铺关注
export const follow = (data) => fetch(`/qiaomao/qm_attention_add_attention`, data, 'POST')
//店铺取消关注
export const unfollow = (data) => fetch(`/qiaomao/qm_attention_cancel_attention`, data, 'POST')
//获取该用户的关注店铺
export const follow_list = (data) => fetch(`/qiaomao/qm_attention_get_attent`, data, 'POST')
//获取该店铺的详情
export const store_detail = (data) => fetch(`/qiaomao/qm_store_detail`, data, 'POST')
//服务列表
export const sever_list = (data) => fetch(`/qiaomao/qm_service_show`, data, 'POST')
//店铺简介
export const introduction = (data) => fetch(`/qiaomao/qm_store_Introduction`, data, 'POST')
//顾客评价
export const store_ment = (data) => fetch(`/qiaomao/qm_store_ment`, data, 'POST')
//服务商圈
export const address = (data) => fetch(`/qiaomao/qm_get_street`, data, 'POST')



// 用户钱包收支列表
export const walletBalanceList = (data) => fetch(`/qiaomao/qm_user_balance_list`, data, 'POST')
// 首页的城市获取
export const getCities = (data) => fetch(`/mon/mon_service_cities`, data, 'POST')

// 首页的消息中心
export const getMsgCenter = (data) => fetch(`/news/news_index`, data, 'POST')
// 消息中心--活动消息
export const getActivityMsg = (data) => fetch(`/news/news_topic`, data, 'POST')
// 消息中心--系统消息
export const getSystemMsg = (data) => fetch(`/news/news_system`, data, 'POST')
// 消息中心--设置已读(1为活动消息设置已读，2为系统消息设置已读)
export const setMsgReaded = (data) => fetch(`/news/news_set_read`, data, 'POST')

// 优惠券中心领券
export const getCenterCoupons = (data) => fetch(`/qiaomao/qm_coupon_fetch`, data, 'POST')

/* 发现页 */
export const getFoundList = (data) => fetch(`/qiaomao/qm_index_found_list`, data, 'POST')
// 发现页点赞评论
export const foundDzpl = (data) => fetch(`/qiaomao/qm_index_found_dzpl`, data, 'POST')
// 获取专题列表
export const getTopics = (data) => fetch(`/qiaomao/qm_index_found_list_ad`, data, 'POST')

// 支付成功，调用推送消息
export const orderJPush = (data) => fetch (`/mon/mon_order_jpush`, data, 'POST')
// 获取微信code(专题)
export const getWechatCode = (data) => fetch (`/wechat/code_url?API_VERSION=topic`, data, 'POST')
// 获取微信code
export const WechatCode = (data) => fetch (`/mon/mon_wechat_code_url`, data, 'POST')
// 微信code绑定
export const WechatLogin = (data) => fetch (`/mon/mon_user_wechat_login`, data, 'POST')

/*专题接口*/
// 万圣节‘鬼混夜’专题---获取下单成功排队序号
export const getTopicNum = (data) => fetch (`/qiaomao/qm_topic_dressparty_count`, data, 'POST')
// 双十一邀好友专题---领取免费礼品
export const getFreeGift = (data) => fetch (`/qiaomao/qm_topic_get_gift`, data, 'POST')
// 邀新领礼专题--领免费礼品、热销推荐
export const getTopicGift = (data) => fetch('/topic/topic_free_get_gifts', data, 'POST')
export const getTopicRecommend = (data) => fetch('/topic/qm_topic_free_gifts', data, 'POST')
// YSL微信登陆
export const yslUserTake = (data) => fetch (`/Ysl/ysl_user_take?API_VERSION=topic`, data, 'POST')
// 用户信息
export const yslUserInfo = (data) => fetch (`/Ysl/ysl_user_info?API_VERSION=topic`, data, 'POST')
// 列表
//export const yslIndex = () => fetch (`/Ysl/ysl_index?API_VERSION=topic`, {}, 'POST')
export const yslIndex = (data) => fetch (`/Ysl/ysl_all_rank?API_VERSION=topic`, data, 'POST')
// 我的排名
export const yslMyRank = () => fetch (`/Ysl/ysl_my_rank?API_VERSION=topic`, {}, 'POST')
// 生成二维码
export const yslSetQrcode = () => fetch (`/Ysl/ysl_set_qrcode?API_VERSION=topic`, {}, 'POST')
// 帮好友助力
export const yslSupport = (data) => fetch (`/Ysl/ysl_support?API_VERSION=topic`, data, 'POST')
// 获取名称
export const yslGetNick = (data) => fetch (`/Ysl/ysl_get_nick?API_VERSION=topic`, data, 'POST')
// 20171129俏猫大转盘抽奖
  // 20171129转盘礼品列表
export const getListPrize = (data) => fetch (`/plate/list_prize?API_VERSION=topic`, data, 'POST')
  // 20171129转盘抽奖
export const setPlate = (data) => fetch (`/plate/set_plate?API_VERSION=topic`, data, 'POST')
// 20171230俏猫大转盘抽奖
  // 20171230转盘礼品列表
export const getPrize = (data) => fetch (`/PhoneData/list_prize?API_VERSION=topic`, data, 'POST')
  // 20171230转盘抽奖
export const setDraw = (data) => fetch (`/PhoneData/draw_data?API_VERSION=topic`, data, 'POST')
// 俏猫3周年--美丽小城
// 俏猫-专题三周获奖用户列表
export const topicThreeYearAquser = () => fetch (`/topic/topic_three_year_zquser`, {}, 'POST')
// 俏猫-专题三周年金币领取
export const topicThreeGetGold = (data) => fetch (`/topic/topic_three_jb_lq`, data, 'POST')
// 俏猫-专题三周年金币列表
export const topicThreeGoldList = (data) => fetch (`/topic/topic_three_jb_list`, data, 'POST')
  // 3周年--调查问卷答案提交
export const setQuestionnaire = (data) => fetch (`/topic/topic_three_question`, data, 'POST')
  // 3周年--抽奖奖品列表
export const getPrizeList = (data) => fetch (`/topic/qcat3_list_prize`, data, 'POST')
  // 3周年--抽奖
export const getLuckDraw = (data) => fetch (`/topic/topic_draw3`, data, 'POST')
  // 3周年--增加抽奖次数
export const getMoreDraw = (data) => fetch (`/topic/set_qcat3_num`, data, 'POST')
  // 3周年-- 完善收货地址
export const setAddData = (data) => fetch (`/topic/add_data`, data, 'POST')
// 俏猫-专题寻找最美美业师
  // 俏猫美业师投票-列表
export const mysTpList = (data) => fetch (`/topic/mystp_index_list`, data, 'POST')
  // 俏猫美业师投票-投票
export const mysTpTp = (data) => fetch (`/topic/mystp_index_tp`, data, 'POST')
  // 俏猫美业师投票-报名
export const mysTpBm = (data) => fetch (`/topic/mystp_index_bm`, data, 'POST')
  // 俏猫美业师投票-搜索
export const mysTpSs = (data) => fetch (`/topic/mystp_index_ss`, data, 'POST')
  // 俏猫美业师投票-是否已报名
export const mysTpIs = (data) => fetch (`/topic/mystp_index_is`, data, 'POST')

// 获取订单状态数据
export const getConfigData = (data) => fetch(`/mon/mon_config_order_status`, data, 'POST')

export const getjson = () => fetch(`/mon/mon_config_product`, {}, 'POST')

export const authToken = (data) => fetch(`/mon/mon_token_login`, data, 'POST')
export const authCRMToken = (data) => fetch(`/mon/mon_crm_token`, data, 'POST')

//屈臣氏激活优惠吗   
export const qcsCouponSend = (data) => fetch(`/wechat_qcs/qcs_coupon_send`, data, 'POST')
//屈臣氏工会激活优惠码
export const qcsGhCouponSend = (data) => fetch(`/wechat_qcs/qcs_gh_coupon_send`, data, 'POST')
//屈臣氏首页产品列表
export const qcsProList= (data) => fetch(`/wechat_qcs/qcs_product_index_list`, data, 'POST')
//根据地区选择门店地址
export const qcsAddressList = (data) => fetch(`/wechat_qcs/qcs_address_list_return`, data, 'POST')
//
export const getArea = (data) => fetch(`/mon/mon_get_area`, data, 'POST')
//
export const getCity = (data) => fetch(`/mon/mon_get_city`, data, 'POST')

export const getProv = (data) => fetch(`/mon/mon_get_province`, data, 'POST')
