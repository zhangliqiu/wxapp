//引入请求方法
import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 左侧多菜单数据
        leftMenuList: [],
        // 右侧多商品数据
        rightContent: [],
        // 被点击的左侧的菜单
        currentIndex: 0,
        // 右侧类容的滚动条举例顶部的举例
        scroll_top:0
    },

    // 接口返回数据
    Cates: [],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const Cates=wx.getStorageSync("cates");
        if(!Cates){
            this.getCates();
        }else{
            // 有旧的数据
            // 过期时间 10s
            if(Date.now()-Cates.time > 1000*60*5){
                this.getCates();
            }else{
                // 可以使用久的数据
                this.Cates = Cates.data;
                let leftMenuList = this.Cates.map(v => v.cat_name)
                let rightContent = this.Cates[0].children
                this.setData({
                    leftMenuList,
                    rightContent
                })
            }

        }

    },
    // 获取分类数据
    async getCates() {
        // request({ url: "/categories" })
        //     .then(result => {
        //         this.Cates = result.data.message;
        //         // 把获取的cates 存入本地存储当中
        //         wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})

        //         // 构造左侧的大菜单数据
        //         let leftMenuList = this.Cates.map(v => v.cat_name)
        //         let rightContent = this.Cates[0].children
        //         this.setData({
        //             leftMenuList,
        //             rightContent
        //         })
        //     })

        // 1 使用es7的async await来发送请求
        const res=await request({url:"/categories"});
   
        this.Cates = res;
        // 把获取的cates 存入本地存储当中
        wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})

        // 构造左侧的大菜单数据
        let leftMenuList = this.Cates.map(v => v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
            leftMenuList,
            rightContent
        })
           

    },
    // 左侧菜单的点击事件
    handleItemTap(e){
        const {index} = e.currentTarget.dataset
        let rightContent = this.Cates[index].children
        this.setData({
            currentIndex:index,
            rightContent,
            scroll_top:0
        })

    }
})