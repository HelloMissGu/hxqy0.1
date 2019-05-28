<template>
    <div class="app_newsDetail">
        <div class="newsDetail_box">
            <goback class="go"></goback>
            <div class="newsDetail_name">法讯详情</div>
        </div>
        <img class="title_img" :src='cover' alt="">
        <div class="newsDetail_content" >
            <span class="title">{{title}}</span>
            <div class="newsDetail_html">
                <div class="content" v-html="content">{{content}}</div>
            </div>
        </div>
         <alert  v-if="show" :message="alertMsg" @close-alert="closeAlert"></alert> 
        <musicControl></musicControl>
    </div>
</template>
<script>
import api from '../api/Api.js';
import musicControl from './musicControl.vue';
import alert from './alert.vue';
import goback from './goback.vue';
export default {
    name:'newsDetail',
    components:{musicControl,alert,goback},
    data() {
        return {
            id:this.$route.query.id,
            cover:'',
            title:'',
            content:'',
            show:false,
            alertMsg:''
        }
    },
    beforeMount() {
        var newsId = parseInt(this.id)
        var that = this;
        let params = {
            token:localStorage.getItem('token'),
            id:newsId
        }
        api('/interface.php/V1/News/detail',params)
           .then(res =>{
                if(res.success == 200){
                    that.cover = res.data.cover
                    that.title = res.data.title
                    that.content =  res.data.content 
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
  .app_newsDetail{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  position: relative;
  z-index: 99;
  background: #F9EEDA url("../../static/assets/images/texture.png") repeat repeat;
  .newsDetail_box{
        width: 100%;
        display: flex;
        padding-top: 8px;
        box-sizing: border-box;
        position: relative;
        margin-bottom: 20px;
        .go{
            position: absolute;
        }
        .newsDetail_name{
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
    span{
        display: block;
    }
    .title_img{
        width: 100%;
        height: 160px;
    }
    .newsDetail_content{
        box-sizing: border-box;
        // padding: 0 16px 32px 16px;
        .title{
            color: #3C160F;
            font-size: 18px;
            font-weight: bold;
            margin-top: 16px;
            margin-bottom:20px;
        }
        .newsDetail_html{
            width: 100%;
            height: 100%;
            color: #382F30;
            .content{
                width: 100%;
                height: 100%;
                img{
                    width: 100%;
                }
            }
        }
    }
}

</style>
