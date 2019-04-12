// pages/mine/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    end: false,
    tabIndex: '',
    orders: [],
    pageNo: 1,
    totalPage: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tabIndex: options.index
    })
    this.getOrders()
  },
  // tab
  tab(event) {
    this.setData({
      tabIndex: event.currentTarget.dataset.index,
      orders: [],
      pageNo: 1,
      totalPage: 1,
      end: false
    })
    this.getOrders()
  },
  // 获取订单
  getOrders() {
    if (this.data.pageNo <= this.data.totalPage) {
      let url = '/distribution/center/orders'
      getApp().post(url, {
        token: wx.getStorageSync('token'),
        page: this.data.pageNo,
        filter: this.data.tabIndex
      }).then(data => {
        wx.hideLoading()
        let orders = data.orders
        orders.forEach(item => {
          item.all_goods_price = parseFloat(item.all_goods_price / 100).toFixed(2)
          item.goods.forEach(item2 => {
            item2.price = parseFloat(item2.price / 100).toFixed(2)
          })
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
    this.getOrders()
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