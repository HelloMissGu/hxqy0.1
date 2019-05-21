<template>
    <div class="app_newsDetail">
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
import exit from '../api/exit.js'
export default {
    name:'newsDetail',
    components:{musicControl},
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
                    exit();
                }
           })
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
