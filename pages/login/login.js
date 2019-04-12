// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let token = wx.getStorageSync('token')
    if (token != '') {
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }else{
      this.checkBind()
    }
  },
  input(e) {
    this.setData({
      [e.currentTarget.dataset.key]: e.detail.value
    })
  },
  // 检测是否绑定微信
  checkBind() {
    wx.login({
      success: res => {
        let url = '/distribution/login/miniProgram'
        getApp().post(url, {
          code: res.code
        }).then(data => {
          if(data.bind==1){
            let token = data.token
            wx.setStorageSync('token', token)
            wx.setStorageSync('bindStatus', 1)
            wx.reLaunch({
              url: '/pages/index/index',
            })
          }
        })
      }
    })
  },
  // 登录
  login() {
    if (!this.data.name) {
      wx.showToast({
        title: '请输入用户名',
        image: '/images/common/tip.png'
      })
    } else if (!this.data.password) {
      wx.showToast({
        title: '请输入密码',
        image: '/images/common/tip.png'
      })
    } else {
      let url = '/distribution/login/doLogin'
      getApp().post(url, {
        login_name: this.data.name,
        password: this.data.password
      }).then(data => {
        let token = data.token
        wx.setStorageSync('token', token)
        wx.reLaunch({
          url: '/pages/index/index',
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