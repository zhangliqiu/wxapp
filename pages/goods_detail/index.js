import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{

    }
  },
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options;
    this.getGoodsDetail(goods_id);
  },
  // 获取商品详情数据
  async getGoodsDetail(goods_id){
    const goodsObj = await request({url:"/goods/detail",data:{goods_id}});
    this.GoodsInfo = goodsObj;
    this.setData({
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        goods_introduce:goodsObj.goods_introduce,
        pics:goodsObj.pics,
      }
    })
  },
  // 点击轮播图放大预览
  handlePrevewImage(e){
    // 1 先构造要预览的数组
    const urls = this.GoodsInfo.pics.map(v=>v.pics_mid)
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },
  // 点击 加入购物车
  handleCartAdd(){
    let cart = wx.getStorageSync("cart")||[];
    let index=cart.findIndex(v=>v.goods_id === this.GoodsInfo.goods_id)
    if(index === -1){
      // 不存在
      this.GoodsInfo.num = 1;
      cart.push(this.GoodsInfo);
    }else{
      // 已存在 num++
      cart[index].num++;
    }
  wx.setStorageSync("cart", cart);
  wx.showToast({
    title: '添加成功',
    icon: 'success',
    mask: true
  });
  }
})