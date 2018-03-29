// pages/scrollview/scrollview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      listLi:[],
      theView:'',
      page:0,
      scrollTop:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log('onLoad')
      var that = this;
      try{
          this.initData();
      }catch(e){console.log(e.message)}
      console.log(this.data.listLi);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
//初始化数据
    initData:function(){
        var _lis = [];
        console.log(9);
        for(var i=0;i<20;i++){
            _lis.push("text-" + i);
        }
        this.setData({
            listLi:_lis,
            page:1
        })
    },
})