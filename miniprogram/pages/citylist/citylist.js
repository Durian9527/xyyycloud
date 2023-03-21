// pages/citylist/citylist.js
const map = require('../../libs/map')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    map: map,
    letter: 'A',
    cityname: '未选择',
    locSuccess: false
  },

  /**
   * 点击定位城市，修改首页城市显示
   */
  handleTapLocCity(e) {
    if (this.data.locSuccess) {
      getApp().globalData.cityname = this.data.cityname
      wx.navigateBack()
    } else {
      this.showAuthDialog()
    }
  },

  /**
   * 重新弹出获取位置权限弹窗
   */
  showAuthDialog() {
    wx.showModal({
      title: '提示',
      content: '当前没有授权小程序获取定位权限，是否授权？',
      success: (res)=> {
        if(res.confirm) {
          wx.openSetting({
            success: (settingRes) => {
              if(settingRes.authSetting["scope.userLocation"]) {
                this.loadCurrentCity()
              }
            }
          })
        } else {return}
      }
    })
  },

  /**
   * 点击字母滚动事件
   */
  handleTapLetter (e) {
    let l = e.target.dataset.l
    this.setData({letter: l})
  },

  handleTapCity(e) {
    let name = e.target.dataset.c
    let app = getApp()
    app.globalData.cityname = name
    wx.navigateBack()
  },

    /**
   * 加载当前城市信息
   */
  loadCurrentCity() {
    let QQMapWX = require('../../libs/qqmap-wx-jssdk')
    let qqmapsdk = new QQMapWX({
      key: 'UTQBZ-NLW35-OQTIJ-IOO27-5BE5E-FIFNS'
    })
    qqmapsdk.reverseGeocoder({
      success: (res) => {
        let cityname = res.result.address_component.city
        this.setData({cityname, locSuccess: true})
        console.log('逆地址解析结果：', cityname);
      },
      fail: (err) => {
      console.warn(err)
      if(err.status == 1000) {
        this.setData({
          cityname: '定位失败，点击重试'
        })
      }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(map);
    this.loadCurrentCity()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})