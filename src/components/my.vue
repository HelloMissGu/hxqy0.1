<template>
    <div class="app_my">
        <div class="my_info">
            <img :src="headimg" alt="">
            <div class="my_name">
                <div class="name">{{user_name}}</div>
                <div class="merit">
                    <span class="iconfont icon-xianglu"></span>
                    <span>{{score}}功德值</span>
                </div>
            </div>
        </div>
        <div class="my_menu">
            <div class="menu_list">
                <div class="helper"></div>
                <router-link to="/payOrder">
                    <div class="menu_item">
                        <span>我的订单</span>
                        <span class="iconfont icon-myIcon_right"></span>
                    </div>
                </router-link>
                <router-link to="/myaccount">
                    <div class="menu_item">
                        <span>个人信息</span>
                        <span class="iconfont icon-myIcon_right"></span>
                    </div>
                </router-link>
                <router-link to="/changePass">
                    <div class="menu_item">
                        <span>修改密码</span>
                        <span class="iconfont icon-myIcon_right"></span>
                    </div>
                </router-link>
                <router-link to="/feedback">
                    <div class="menu_item">
                        <span>反馈中心</span>
                        <span class="iconfont icon-myIcon_right"></span>
                    </div>
                </router-link>
                <div class="menu_item" @click="logout">
                    <span>退出登录</span>
                    <span class="iconfont icon-myIcon_right"></span>
                </div>
            </div>
        </div>
        <alert  v-if="show" :message="alertMsg" @close-alert="closeAlert"></alert> 
        <musicControl></musicControl>
    </div>
</template>
<script>
import musicControl from './musicControl.vue';
import api from '../api/Api.js';
import exit from '../api/exit.js';
import alert from './alert.vue';
export default {
    components:{musicControl},
    data(){
        return{
            user_name:'',
            score:'',
            headimg:'',
            show:false,
            alertMsg:''
        }
    },
    beforeMount() {
        var that = this;
        let params = {
            token:localStorage.getItem('token')
        }
        api('/interface.php/V1/User/index',params)
        .then(res => {
            //  console.log(res.data)
            if(res.success == 200){
                that.user_name = res.data.user_name
                that.score = res.data.score
                if(res.data.headimg === ""){
                    that.headimg = require('../../static/assets/images/timg.jpg')
                }else{
                    that.headimg = res.data.headimg
                }
                if(res.data.nick_name === ""){
                    that.user_name = res.data.user_name
                }else{
                    that.user_name = res.data.nick_name
                }
            }  
            if(res.success == 300){
                that.show = true;
                that.alertMsg =  res.message
            }
            if(res.success == 400){
                that.show = true;
                that.alertMsg = res.message
                exit();
            }
         })
    },
    methods: {
        logout(){
            localStorage.clear();
            this.$router.push('/login');
        }
    },
}
</script>
<style lang="scss">
    @import '../../static/assets/iconfont/font.css';
    .app_my{
    background: #F3EFEB;
    height: 100%;
    .my_info{
        width: 100%;
        height: 160px;
        background-image: url("../../static/assets/images/my.png");
        background-color: #F9EEDA;
        background-repeat: no-repeat no-repeat;
        background-size: 100% 160px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        img{
            width: 75px;
            height: 75px;
            border-radius: 75px;
            border: 2px solid #8B623E;
        }
        .my_name{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            .name{
                font-weight: bold;
                font-size: 16px;
                color: #3C160F;
                margin-bottom: 3px;
            }
            .merit{
                color: #8B623E;
                font-size: 14px;
            }
        }
    }
    .my_menu{
        width: 100%;
        margin-top: 4px;
        height: calc(100% - 164px);
        box-sizing: border-box;
        padding: 20px 16px 12px 16px;
        background: #F9EEDA url("../../static/assets/images/texture.png") repeat repeat;  
        .menu_list{
            width: 100%;
            border: 1px solid #8B623E;
            position: relative;
            box-sizing: border-box;
            padding: 25px 16px;
            &::before,&::after,.helper::before,.helper::after{
                background: url("../../static/assets/images/border.png");
            }
            &::before{
                content: '';
                position: absolute;
                width: 20px;
                height: 20px;
                left: 0;
                top: 0;
                background-size: 20px 20px; 
            }
            &::after{
                content: '';
                position: absolute;
                width: 20px;
                height: 20px;
                right: 0;
                top: 0;
                transform: rotate(90deg);
                background-size: 20px 20px;
            }
            .helper{
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                z-index: 0;
                &::before{
                    content: '';
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    left: 0;
                    bottom: 0;
                    transform: rotate(-90deg);
                    background-size: 20px 20px;
                }
                &::after{
                    content: '';
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    right: 0;
                    bottom: 0;
                    transform: rotate(180deg);
                    background-size: 20px 20px;
                }
            }
            .menu_item{
                display: flex;
                position: relative;
                justify-content: space-between;
                align-items: center;
                color: #8B623E;
                font-size: 16px;
                box-sizing: border-box;
                padding: 14px 0;
                border-bottom: 1px solid rgba(139, 98, 62, .6);
                z-index: 2;
                .iconfont{
                    color: #A41522;
                }
               
            }
        }
    }
}
</style>
