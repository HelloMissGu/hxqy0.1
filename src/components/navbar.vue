<template>
    <nav class="app_navbar">
        <div class="nav_item" v-for="(item,index) in navData" @click="selectNav(index)" :key="index">
            <router-link :to="item.url" class="a">
                <div class="bar">
                    <img :src="navIndex === index ? item.image1 : item.image" class="img"></img>
                    <span :class="navIndex === index ? 'red' : 'a' ">{{item.title}}</span>
                </div>
            </router-link>
        </div>
    </nav>
</template>
<script>
import $ from 'jquery';
export default {
    name:'navbar',
    props:['title'],
    data(){
        return{
           navData:[
               {title:'首页',url:'/home',image:'../../static/assets/images/icon-temple.png',image1:'../../static/assets/images/icon-temple-active.png'},
               {title:'法讯',url:'/news',image:'../../static/assets/images/icon-woodfish.png',image1:'../../static/assets/images/icon-woodfish-active.png'},
               {title:'活动',url:'/donate',image:'../../static/assets/images/icon-woodfish.png',image1:'../../static/assets/images/icon-woodfish-active.png'},
               {title:'我的',url:'/my',image:'../../static/assets/images/icon-my.png',image1:'../../static/assets/images/icon-my-active.png'},
           ],
            navIndex:0,
        }
    },
    methods: {
       selectNav(index){
           this.navIndex = index
       },
       checkRouter(url){
           this.navIndex = this.navData.findIndex(item => item.url === url);
       }
    },
    watch:{
        "$route"(){
            let url = this.$route.path;
            this.checkRouter(url);
        }
    }
}
</script>
<style lang="scss">
@import '../../static/sass/navbar.scss';
@import '../assets/base.css';
.a{
    text-decoration: none;
    color: #8b623e;
}
.red{
    color: #A41522;
}
</style>
