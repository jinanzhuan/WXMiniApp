// pages/linkage/linkage.js
import initAreaPicker, { getSelectedAreaData } from '../../template/index';

Page({
  data:{
      showModalStatus: true,
      hidePop: false,
      addressModel: ""
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      initAreaPicker({
          hideDistrict: true // 是否隐藏区县选择栏，默认显示
      });
  },
    getSelecedData() {
        console.table(getSelectedAreaData());
    },
    showAreaPicker(e){
        this.showMoreSelect();
    },
    closePop(){
        console.log("close");
        this.closePopupTap();
    },
    cancel(e){
        console.log("cancel");
        this.closePopupTap();
    },
    sure(e){
        console.log("make sure");
        this.setData({
            addressModel: this.data.areaPicker.address
        })
        this.closePopupTap();
    },
    showMoreSelect: function () {
        this.setData({
            showModalStatus: true
        })
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: 'ease',
            delay: 0  //0则不延迟
        })
        this.animation = animation;
        animation.translateY(0).step()
        this.setData({
            animationPopup: animation.export(),
        })
        setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
                animationPopup: animation,
                hidePop: false
            })
        }.bind(this), 200)
    },
    /**
     * 规格选择弹出框隐藏
     **/
    closePopupTap: function () {
        this.setData({
            showModalStatus: false
        })
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: 'ease',
            delay: 0  //0则不延迟
        })
        animation.translateY(500).step()
        this.animation = animation
        this.setData({
            animationPopup: animation.export(),
        })
        setTimeout(function () {
            this.setData({
                showModalStatus: false,
                hidePop: true
            })
        }.bind(this), 200)
    }
})