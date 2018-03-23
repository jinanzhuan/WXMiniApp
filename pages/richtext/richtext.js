// pages/richtext/richtext.js

var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      wx.request({
          url: 'https://api.edreamtree.com/agreements/doctor',
          method: 'GET',
          header: {
              'content-type': 'application/json'
          },
          success: function(res) {
            console.log("请求的数据=",res.data);
              var article = res.data;
              WxParse.wxParse('article', 'html', article, that,5);
          }
      })


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  }
})