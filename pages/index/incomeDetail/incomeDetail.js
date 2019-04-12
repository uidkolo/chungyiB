// pages/works/myWorks/incomeDetail/incomeDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    flows: [],
    pageNo: 1,
    totalPage: 1,
    end: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFlow()
  },
  //tab
  tab(e) {
    this.setData({
      type: e.currentTarget.dataset.type,
      flows: [],
      pageNo: 1,
      totalPage: 1,
      end: false
    })
    this.getFlow()
  },
  // 获取流水
  getFlow() {
    if (this.data.pageNo <= this.data.totalPage) {
      wx.showLoading({
        title: '正在加载',
      })
      let url = '/distribution/center/flowDetails'
      getApp().post(url, {
        token: wx.getStorageSync('token'),
        type: this.data.type,
        page: this.data.pageNo
      }).then(data => {
        wx.hideLoading()
        let flows = data.list
        flows.forEach(item => {
          item.money = parseFloat(item.money / 100).toFixed(2)
          item.account_balance = parseFloat(item.account_balance / 100).toFixed(2)
        })
        this.data.flows = this.data.flows.concat(flows)
        this.setData({
          flows: this.data.flows,
          pageNo: this.data.pageNo + 1,
          totalPage: data.total
        })
        if (this.data.pageNo - 1 == this.data.totalPage || data.total == 0) {
          this.setData({
            end: true
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
    this.getFlow()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: wx.getStorageSync('shareInfo').word,
      path: '/pages/index/apply/apply?invite=' + wx.getStorageSync('invite'),
      imageUrl: wx.getStorageSync('shareInfo').cover
    }
  }
})