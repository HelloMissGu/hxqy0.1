<template>
    <div class="back" @click="back">
        <span  class="iconfont icon-myIcon_right"></span>
    </div>
</template>
<script>
export default {
    methods: {
        back(){
            this.$router.go(-1)
        }
    },
}
</script>
<style lang="scss">
    .back{
        width: 50px;
        height: 40px;
        .icon-myIcon_right{
            display: block;
            transform: rotate(180deg);
            color: #8b623e;
            text-align: center;
            font-size: 19px;
        }
    }
</style>
