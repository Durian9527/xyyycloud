// pages/theatre/theatre.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityname: '未选择',
    theatreList: []
  },

  handleTapItem(e){
    // let i = e.target.dataset.i
    let i = e.currentTarget.dataset.i
    console.log(i);
    let t = this.data.theatreList[i]
    wx.openLocation({
      latitude: t.location.lat,
      longitude: t.location.lng,
      scale: 15,
      name: t.title,
      address: t.address
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },

  onShow(){
    let cityname =  getApp().globalData.cityname
    this.setData({cityname})
    let QQMapWX = require('../../libs/qqmap-wx-jssdk')
    let qqmapsdk = new QQMapWX({
      key: 'UTQBZ-NLW35-OQTIJ-IOO27-5BE5E-FIFNS'
    })
    qqmapsdk.search({
      keyword: '电影院',
      region: cityname,
      page_size: 20,
      success: (res) => {
        console.log('加载影院列表', res);
        res.data.forEach(item => {
          item._dis = (item._distance/1000).toFixed(2)
        })
        this.setData({theatreList: res.data}) 
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})