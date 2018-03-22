// pages/linkage/linkage.js
import initAreaPicker, { getSelectedAreaData } from '../../template/index';

Page({
  data:{
      showModalStatus: true
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
        var currentStatu = e.currentTarget.dataset.statu;
        this.util(currentStatu)
    },
    cancel(e){
        console.log("cancel");
        var currentStatu = e.currentTarget.dataset.statu;
        this.util(currentStatu)
    },
    sure(e){
        console.log("make sure");
        var currentStatu = e.currentTarget.dataset.statu;
        this.util(currentStatu)
    },
    util: function(currentStatu){
        /* 动画部分 */
        // 第1步：创建动画实例
        var animation = wx.createAnimation({
            duration: 200,  //动画时长
            timingFunction: "linear", //线性
            delay: 0  //0则不延迟
        });

        // 第2步：这个动画实例赋给当前的动画实例
        this.animation = animation;

        // 第3步：执行第一组动画
        animation.opacity(0).rotateX(-100).step();

        // 第4步：导出动画对象赋给数据对象储存
        this.setData({
            animationData: animation.export()
        })

        // 第5步：设置定时器到指定时候后，执行第二组动画
        setTimeout(function () {
            // 执行第二组动画
            animation.opacity(1).rotateX(0).step();
            // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
            this.setData({
                animationData: animation
            })

            //关闭
            if (currentStatu == "close") {
                this.setData(
                    {
                        showModalStatus: false
                    }
                );
                wx.showToast({
                    title: '预约失败',
                    icon: "none"
                })
            }
        }.bind(this), 200)

        // 显示
        if (currentStatu == "open") {
            this.setData(
                {
                    showModalStatus: true
                }
            );
        }
    }
})