// index.js
Page({
  data: {
    cid: 1,
    movies: [],
    cityname: ''
  },

  /**
   * 封装异步请求
   * @param {*} cid
   * @param {*} offset
   * @return 返回电影列表数据
   */
  loadData(cid, offset) {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: "加载中...",
      });
      wx.request({
        url: "https://api.tedu.cn/index.php",
        method: "GET",
        data: { cid, offset },
        success: (res) => {
          console.log("列表数据加载完成", res)
          resolve(res.data)
        },
        fail: (err) => {
          reject(err)
        },
        complete: () => {
          wx.hideLoading();
        },
      });
    });
  },

  /**
   * 点击导航时触发
   * @param {*} e
   */
  handleChangeNav(e) {
    let id = e.target.dataset.id;
    this.setData({ cid: id });
    wx.getStorage({
      key: id,
      success: (res) => {
        console.log('找到了', res);
        this.setData({movies: res.data})
      },
      fail: (err) => {
        console.warn('找不到', err);
        this.loadData(id, 0).then((data) => {
          this.setData({ movies: data });
          wx.setStorage({
            key: id,
            data: data
          })
        });
      }
    })
  },

  /**
   * 监听下拉刷新
   */
  onPullDownRefresh() {
    let cid = this.data.cid
    this.loadData(cid, 0).then(data => {
      this.setData({movies: data})
      wx.stopPullDownRefresh()
      wx.setStorage({
        key: cid+'',
        data: data
      })
    })
  },

  /**
   * 触底加载新数据
   */
  onReachBottom() {
    let cid = this.data.cid;
    let offset = this.data.movies.length;
    this.loadData(cid, offset).then((data) => {
      this.setData({ movies: this.data.movies.concat(data) });
    });
  },

  onLoad() {
    // 加载当前城市
    this.loadCurrentCity()
    this.loadData(1, 0).then((data) => {
      this.setData({ movies: data });
    });
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
        this.setData({cityname})
        console.log('逆地址解析结果：', cityname);
      },
      fail: (err) => {
      console.warn(err)
      }
    })
  }
});
