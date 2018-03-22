// pages/linkage/linkage.js
import initAreaPicker, { getSelectedAreaData } from '../../template/index';

Page({
  data:{
      showArea: false
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
    }
})