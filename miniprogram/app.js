// app.js
App({
  /**
   * 小程序启动时，自动调用该生命周期方法
   */
  onLaunch(){
    wx.cloud.init({
      env: 'cloud-xyyy-0gzfrl0g5a3ac7c8'
    })
  }
})
