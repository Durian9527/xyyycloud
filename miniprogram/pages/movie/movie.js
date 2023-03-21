// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieInfo: [],
    isOpen: false,
    comments: []
  },

  /**
   * 监控是否显示完整简介
   */
  handleTapIntro() {
    this.setData({isOpen: !this.data.isOpen})
  },

  /**
   * 图片点击预览
   */
  handlePreviewImage(e) {
    let i = e.target.dataset.i
    if(i===undefined) {
      return
    }
    let thumb = this.data.movieInfo.thumb
    let urls = []
    thumb.forEach(url => {
      urls.push(url.substring(0, url.lastIndexOf('@')))
    })
    wx.previewImage({
      current: urls[i],
      urls,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    wx.request({
      url: 'https://api.tedu.cn/detail.php',
      method: 'GET',
      data: {id: options.id},
      success: (res) => {
        console.log(res);
        this.setData({movieInfo: res.data})
      }
    })
    // 获取评论列表数据
    this.loadComments(options.id)
  },  

  /**
   * 加载评论信息
   */
  loadComments(id) {
    let db = wx.cloud.database()
    db.collection('comments').where({
      movieid: id
    }).get().then(res => {
      console.log('查询结果:', res);
      this.setData({
        comments: res.data
      })
    })
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