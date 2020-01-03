//引入请求方法
import { request } from "../../request/index.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 轮播图数据
        swiperList: [],
        // 导航数据
        catesList: [],
        // 楼层数据
        floorList: []

    },

    onLoad: function(options) {

        this.getSwiperList();
        this.getCatList();
        this.getFloorList();
    },

    //获取轮播图
    getSwiperList() {
        request({ url: "/home/swiperdata" })
            .then(result => {
                this.setData({
                    swiperList: result
                })
            })
    },
    //获取导航拦
    getCatList() {
        request({ url: "/home/catitems" })
            .then(result => {
                this.setData({
                    catesList: result
                })
            })
    },
    // 获取楼层数据
    getFloorList() {
        request({ url: "/home/floordata" })
            .then(result => {
                this.setData({
                    floorList: result
                })
            })
    }
})