// pages/mine/afterSaleList/afterSaleList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNo: 1,
    totalPage: 1,
    orders: [],
    end: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoods()
  },
  // 获取商品列表
  getGoods() {
    if (this.data.pageNo <= this.data.totalPage) {
      wx.showLoading({
        title: '正在加载',
      })
      let url = '/distribution/center/goodsReturnList'
      getApp().post(url, {
        token: wx.getStorageSync('token'),
        page: this.data.pageNo
      }).then(data => {
        wx.hideLoading()
        let orders = data.list
        orders.forEach(item => {
          item.goods.price = parseFloat(item.goods.price / 100).toFixed(2)
        })
        this.data.orders = this.data.orders.concat(orders)
        this.setData({
          orders: this.data.orders,
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
  // 撤销申请
  cancelApply(e) {
    let url = '/api/goods_return/cancelApply'
    getApp().post(url, {
      token: wx.getStorageSync('auth_token'),
      return_id: e.currentTarget.dataset.id
    }).then(() => {
      wx.showToast({
        title: '撤销成功',
        success: () => {
          this.setData({
            pageNo: 1,
            totalPage: 1,
            orders: [],
            end: false
          })
          this.getGoods()
        }
      })
    })
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
    this.getGoods()
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