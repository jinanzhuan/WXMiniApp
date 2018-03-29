// pages/date/date.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      bindAddDay: 0,
      bindAddMonth: 0,
      bindGetDayByAddDay: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
    formatTime: function () {
        var time = util.formatTime(new Date());
        this.setData({
            formatTime: time
        })
    },
    formatDate: function () {
        var time = util.formatDate(new Date());
        this.setData({
            formatDate: time
        })
    },
    formatDateByH: function () {
        var time = util.formatDateByH(new Date());
        this.setData({
            formatDateByH: time
        })
    },
    formatDateToSimple: function () {
        var time = util.formatDateToSimple(Date());
        this.setData({
            formatDateToSimple: time
        })
    },
    formatDateToWeek: function () {
        var time = util.formatDateToWeek(new Date());
        this.setData({
            formatDateToWeek: time
        })
    },
    addDay: function () {
        var time = util.addDay(this.data.bindAddDay);
        this.setData({
            addDay: time
        })
    },
    addMonth: function () {
        var time = util.addMonth(this.data.bindAddMonth);
        this.setData({
            addMonth: time
        })
    },
    getDayByAddDay: function () {
        var time = util.getDayByAddDay(this.data.bindGetDayByAddDay);
        this.setData({
            getDayByAddDay: time
        })
    },
    clear: function () {
        this.setData({
            formatTime: "",
            formatDate: "",
            formatDateByH: "",
            formatDateToSimple: "",
            formatDateToWeek: "",
            addDay: "",
            addMonth: "",
            getDayByAddDay: "",
            bindAddDay: 0,
            bindAddMonth: 0,
            bindGetDayByAddDay: 0
        })
    },
    bindAddDay: function (e) {
        this.data.bindAddDay = e.detail.value;
    },
    bindAddMonth: function (e) {
        this.data.bindAddMonth = e.detail.value;
    },
    bindGetDayByAddDay: function (e) {
        this.data.bindGetDayByAddDay = e.detail.value;
    }

})