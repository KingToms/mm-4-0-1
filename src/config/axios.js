import axios from 'axios'
import keyConf from '../common/keyConf'
import { Indicator } from 'mint-ui';

var Promise = require('es6-promise').Promise

let hostname = window.location.origin;
let protocol = window.location.protocol;
// console.log('hostname', window.location);
let baseUrl
if (hostname.indexOf('tmp-mm.qiaocat.com') > -1 && protocol == 'http:'){
  baseUrl = keyConf.baseUrl.tmp
} else if (hostname.indexOf('mm.qiaocat.com') > -1 && protocol == 'http:'){
  baseUrl = keyConf.baseUrl.master
} else if (hostname.indexOf('mm.qiaocat.com') > -1 && protocol == 'https:'){
  baseUrl = keyConf.baseUrl.masters
} else{
  baseUrl = keyConf.baseUrl.test
}
// let baseUrl = hostname.indexOf('mm.qiaocat.com') > -1 ? keyConf.baseUrl.master : keyConf.baseUrl.test

axios.defaults.timeout = 60000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers.post['cookie'] = 'qm_cookie=NaTbAcwdMeDfAgwhMiDjAk5l'
// 原始版本
axios.defaults.baseURL = baseUrl
// 版本4.0.0
// axios.defaults.baseURL = keyConf.baseUrl + '?API_VERSION=V4.0.0'
axios.defaults.withCredentials = true
axios.interceptors.request.use((config) => {
  if(config.method.toLocaleUpperCase() === 'GET'){
    config.data = JSON.stringify(config.data)
  }else{
    let formData = new FormData()
    let data = config.data
    if(config.method.toLocaleUpperCase() == 'POST'){
      for(var va in data){
        formData.append(va, data[va])
      }
    }
    config.data = formData
  }
  return config
},(error) =>{
  return Promise.reject(error)
})


export default async (url = '', params = {}, type = 'GET') => {
  // 版本控制

  // url = url + '?API_VERSION=V4.0.0';
  if(url.indexOf('API_VERSION') < 0)
    url = url + '?API_VERSION=V4.0.1';

  return new Promise((resolve, reject) => {
    /*axios({
        method: type,
        async: false,
        url: keyConf.baseUrl + url,
        params: params
    }).then(function (response) {
        resolve(response.data)
    }).catch(function (err) {
        reject(err)
    })*/
    Indicator.open();
    // url = url + '?API_VERSION=V4.0.0';
    if(type.toLocaleUpperCase() === 'GET'){
      axios.get(url, params).then(res =>{
        resolve(res.data)
        Indicator.close();
      },err => {
        reject(err)
        Indicator.close();
      }).catch((error) => {
        // console.log(error)
        resolve(error)
        Indicator.close();
      })
    }else{
      axios.post(url, params).then((res) =>{
        resolve(res.data)
        Indicator.close();
      }, (err) => {
        reject(err)
        Indicator.close();
      }).catch((error) => {
        resolve(error)
        Indicator.close();
      })
    }
  })
}

