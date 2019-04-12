// pages/index/team/team.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    team: 0,
    page: 1,
    maxPage: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getTeams()
  },
  // tab
  tab(e) {
    this.setData({
      team: e.currentTarget.dataset.index,
      list: [],
      page: 1,
      maxPage: 1
    })
    this.getTeams()
  },
  // 获取我的团队
  getTeams() {
    if (this.data.page <= this.data.maxPage) {
      wx.showLoading({
        title: '正在加载',
      })
      let url = '/distribution/center/myTeam'
      getApp().post(url, {
        token: wx.getStorageSync('token'),
        team: this.data.team,
        page: this.data.page
      }).then(data => {
        wx.hideLoading()
        this.setData({
          newUserNum: data.seven_day_add_user,
          newShopNum: data.seven_day_add_shop,
          newList: data.seven_data,
          list: this.data.list.concat(data.list),
          page: this.data.page + 1,
          maxPage: data.total
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getTeams()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: wx.getStorageSync('shareInfo').word,
      path: '/pages/index/apply/apply?invite=' + wx.getStorageSync('invite'),
      imageUrl: wx.getStorageSync('shareInfo').cover
    }
  }
})