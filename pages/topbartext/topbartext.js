// pages/topbartext/topbartext.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      inputText: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
    inputChange: function (e) {
        this.data.inputText = e.detail.value;
    },
    setTopbarText: function (e) {
        var text = this.data.inputText;
        wx.setTopBarText({
            text: text
        })
    },
    setNavigationBarTitle: function () {
        var text = this.data.inputText;
        wx.setNavigationBarTitle({
            title: text
        })
    }
})