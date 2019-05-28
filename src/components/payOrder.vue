<template>
    <div class="app_myDonate">
        <div class="myDonate_bar">
            <goback class="go"></goback>
            <div class="myDonate_name">我的订单</div>
        </div>
        <div class="empty_order" v-if="count == 0">
            <span class="iconfont icon-kong"></span>
            <span>—— 暂无订单 ——</span>
        </div>
        <div class="order_item" v-for="(order,key) in orderList" :key="key" v-else>
            <div class="helper"></div>
            <div class="order_item_content">
                <div class="status_bar">
                    <div class="data_activity">
                        <span class="iconfont icon-simiao"></span>
                        <span class="activity_name" style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;">
                            {{order.title}}
                        </span>
                        <span class="iconfont icon-myIcon_right"></span>
                    </div>
                    <span class="activity_status">订单已完成</span>
                </div>
                <div class="goods_info">
                    <img :src="order.img_url" alt="">
                    <div class="goods_order_info">
                        <div class="info1">
                            <span class="goods_name">{{order.number}} 份</span>
                            <span class="goods_unit">{{order.unit_price}} 元 / 份</span>
                        </div>
                        <div class="info2">合计：<span>￥{{order.price}}</span></div>
                    </div>
                </div>
                <div class="btns">
                    <div>
                        <span class="iconfont icon-13"></span>
                        <span class="create_date">{{order.create_time}}</span>
                    </div>
                    <router-link :to="{path:'/donateDetail',query:{id:order.id}}">
                        <button class="go_detail">查看详情</button>
                    </router-link>
                </div>
            </div>
        </div>
        <span class="load_more" v-if="page < Math.ceil(count/10)" @click="loadMore(page)">点击加载更多</span>
        <span class="load_more"  v-else>没有更多了</span>
        <alert v-if="show" :message="alertMsg" @close-alert="closeAlert"></alert>
        <musicControl></musicControl>
    </div>
</template>
<script>
import musicControl from './musicControl.vue';
import api from '../api/Api.js';
import alert from './alert.vue'
import goback from './goback.vue'
export default {
    data() {
        return {
            count:'',
            page:'',
            orderList:[],
            show:false,
            alertMsg:''
        }
    },
    components: { 
        musicControl,alert,goback
    },
    beforeMount(){
        var that = this;
        let params = {
            token:localStorage.getItem('token'),
            pageSize:1
        }
        api('/interface.php/V1/User/myOrder',params)
        .then(res => {
             if(res.success == 200){
                that.count = res.data.count
                that.page = res.data.page
                that.orderList = res.data.data
            }
            if(res.success == 300){
                that.show = true;
                that.alertMsg =  res.message
            }
            if(res.success == 400){
                that.show = true;
                that.alertMsg = res.message
            }
        })
    },
    methods: {
        loadMore(page){
            var orderId = parseInt(this.id)
            var that = this;
            var page = Number(page) + Number(1);
            let params = {
                token:localStorage.getItem('token'),
                pageSize:page
            }
            api('/interface.php/V1/User/myOrder',params)
            .then(res => {
                if(res.success == 200){
                    that.count = res.data.count
                    that.page = res.data.page
                    that.orderList.push.apply(that.orderList,res.data.data)
                }
                 if(res.success == 300){
                    that.show = true;
                    that.alertMsg = res.message
                }
                if(res.success == 400){
                    that.show = true;
                    that.alertMsg = res.message
                }
            })
        },
        closeAlert(){
            this.show = false;
            if(this.alertMsg == '登录已失效，请重新登录'){
                localStorage.clear();
                this.$router.push('/login');
            }
        }
    },
}
</script>
<style lang="scss">
    @import '../../static/assets/iconfont/font.css';
    .app_myDonate{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow: auto;
        position: relative;
        z-index: 100;
        background: #F9EEDA url("../../static/assets/images/texture.png") repeat repeat;
        .myDonate_bar{
            width: 100%;
            display: flex;
            padding-top: 8px;
            box-sizing: border-box;
            position: relative;
            .go{
                position: absolute;
            }
            .myDonate_name{
                color: #A41522;
                font-size: 16px;
                font-weight: bold;
                position: relative;
                margin: 0 auto;
                &::before,&::after{
                    background: url("../../static/assets/images/poem.png");
                }
                &::before{
                    content: '';
                    position: absolute;
                    width: 55px;
                    height: 19px;
                    left: -60px;
                    top: 0px;
                    background-size: 55px 19px;
                }
                &::after{
                    content: '';
                    position: absolute;
                    width: 55px;
                    height: 19px;
                    right: -60px;
                    top: 0px;
                    background-size: 55px 19px;
                    transform: scale(-1, 1);
                }
            }
        }
        .empty_order{
            position: absolute;
            width: 100%;
            left: 50%;
            top: 40%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: #382F30;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .iconfont{
                font-size: 34px;
                margin-bottom: 16px;
            }
        }
        .order_item{
            width: calc(100% - 64rpx);
            position: relative;
            border: 1px solid #8B623E;
            padding: 14px;
            margin:  20px;
            box-sizing: border-box;
            &::before{
                left: 0;
                top: 0;
            }
            &::after{
                 right: 0;
                top: 0;
                transform: rotate(90deg);
            }
        }
        .order_item::before,.order_item::after,.helper::before,.helper::after{
            background: url("../../static/assets/images/border.png") repeat repeat;
            width: 20px;
            height: 20px;
            background-size: 20px 20px;
            position: absolute;
            content: '';
        }
        .helper{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: -1;
            &::before{
                left: 0;
                bottom: 0;
                transform: rotate(-90deg);
            }
            &::after{
                right: 0;
                bottom: 0;
                transform: rotate(180deg);
            }
        }
        .status_bar{
            width: 100%;
            display: flex;
            justify-content: space-between;
            color: #8B623E;
            font-size: 14px;
            .data_activity{
                display: flex;
                flex: 0.75;
                align-items: center;
                span{
                    margin-right: 12px; 
                }
            }
            .activity_status{
                flex: 0.25;
                color: #A41522;
            }
        }
        .goods_info{
            margin-top: 16px;
            display: flex;
            justify-content: flex-start;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(139, 98, 62, .6);
            img{
                 width: 50px;
                height: 50px;
                border: 1px solid #fff;
                border-radius: 6px;
                margin-right: 15px;
            }
            .goods_order_info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                flex: 1 1 auto;
                .info1{
                    display: flex;
                    justify-content: space-between;
                    .goods_name{
                          color: #3C160F;
                        font-size: 14px;
                        font-weight: bold;
                    }
                    .goods_unit{
                        color: #8B623E;
                        font-size: 14px;
                    }
                }
                .info2{
                    display: flex;
                    justify-content: flex-end;
                    color: #8B623E;
                    font-size: 14px;
                    span{
                        color: #3C160F;
                        font-size: 16px;
                        font-weight: bold;
                    }
                }
            }
        }
        .btns{
            display: flex;
            margin-top: 10px;
            justify-content: space-between;
            align-items: center;
            .icon-13{
                color: #8B623E;
                font-size: 22px;
                vertical-align: middle; 
            }
            .create_date{
                color: #8B623E;
                font-size: 15px;
                vertical-align: middle; 
            }
            button{
                margin: 0;
                margin-left: 16px;
                color: #8B623E;
                font-size: 14px;
                width: 90px;
                height: 30px;
                line-height: 27px;
                border-radius: 6px;
                border: 1px solid #8B623E;
                background: none;
                &::after{
                    border-radius: 6px;
                }
            }
            .go_detail{
                color: #A41522;
                border-color: #A41522;
            }
        }
        .load_more{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #8B623E;
            margin-bottom: 15px;
        }
    }
</style>
