// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeIndex: 0,
    bindStatus: 0,
    selectData:[
      {
        label: '今日收益',
        key: 'day'
      },
      {
        label: '本周收益',
        key: 'week'
      },
      {
        label: '本月收益',
        key: 'month'
      },
      {
        label: '本年收益',
        key: 'year'
      }
    ],
    selectValue: 'day',
    selectLabel:'今日收益'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      bindStatus: wx.getStorageSync('bindStatus')==1?1:0
    })
    this.getInfo()
    this.getIncome()
  },
  // 获取商家数据
  getInfo() {
    wx.showLoading({
      title: '正在加载',
    })
    let url = '/distribution/center/shopData'
    getApp().post(url, {
      token: wx.getStorageSync('token')
    }).then(data => {
      wx.hideLoading()
      this.setData({
        info: data,
        shopCode: 'https://cy.nulizhe.com/api/Qrcode/makeShopQrcode?shop=' + data.shop_id,
        spredCode: 'https://cy.nulizhe.com/api/Qrcode/makeSpreadQrcode?shop=' + data.shop_id,
        extraData: {
          shop: data.shop_id
        }
      })
      wx.setStorageSync('invite', data.shop_id)
    })
  },
  // 获取收益
  getIncome(){
    let url = '/distribution/center/statisticsByTime'
    getApp().post(url, {
      token: wx.getStorageSync('token'),
      time: this.data.selectValue
    }).then(data=>{
      this.setData({
        income: data
      })
    })
  },
  // 选择收益类型
  select(e){
    this.setData({
      selectLabel:this.data.selectData[e.detail.value].label,
      selectValue: this.data.selectData[e.detail.value].key
    })
    this.getIncome()
  },
  showCode(e) {
    this.setData({
      codeIndex: e.currentTarget.dataset.index
    })
  },
  closeMask() {
    this.setData({
      codeIndex: 0
    })
  },
  saveCode() {
    wx.getImageInfo({
      src: this.data.codeIndex == 1 ? this.data.shopCode : this.data.spredCode,
      success: res => {
        wx.saveImageToPhotosAlbum({
          filePath: res.path,
          success: res => {
            wx.showToast({
              title: '保存成功！',
            })
            this.setData({
              codeIndex: 0
            })
          }
        })
      }
    })
  },
  // 绑定微信
  bindWechat() {
    let url = '/distribution/center/bindWechat'
    wx.login({
      success: res => {
        getApp().post(url, {
          token: wx.getStorageSync('token'),
          code: res.code
        }).then(res => {
          this.setData({
            bindStatus: 1
          })
          wx.showToast({
            title: '绑定成功！',
          })
        })
      }
    })
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
    this.onLoad()
    wx.stopPullDownRefresh()
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