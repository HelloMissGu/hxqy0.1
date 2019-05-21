import $ from 'jquery';

// const baseUrl = 'http://huaxiaqy.com';
const baseUrl = 'http://huaxiaqy.com';

// @param {string} url 接口地址
// @param {string} param 请求参数
// @param {string} method 请求类型

let ajax = (url,param,method) => {
  let result = new Promise((reslove,reject) => {
    $.ajax({
      url:`${baseUrl}${url}`,
      data:param ? param : '',
      method:method ? method:'POST',
      success:(res) => {
        reslove(res);
      },
      fail:(res) => {
        reject(res);
      }
    })
  });
  return result;
}

export default ajax;