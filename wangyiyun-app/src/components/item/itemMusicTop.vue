<template>
    <div class="itemMusicTop">
        <img :src="playlist.coverImgUrl" alt="" class="bgimg">
        <div class="itemLeft">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="itemRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo4-copy"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao3-copy"></use>
            </svg>
        </div>
    </div>
    <div class="itemTopContent">
        <div class="contentLeft">
            <img :src="playlist.coverImgUrl" alt="">
            <div class="playCount">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang1"></use>
                </svg>
                <span>{{ changeCount(playlist.playCount) }}</span>
            </div>
        </div>
        <div class="contentRight">
            <span class="right_span1">{{ playlist.name }}</span>
            <div class="right_img">
                <img :src="playlist.creator.backgroundUrl" alt="">
                <span>{{ playlist.creator.nickname }}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiangyoujiantou2-copy"></use>
                </svg>
            </div>
            <span class="right_span2">
                <span>{{ playlist.description }}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiangyoujiantou2-copy"></use>
                </svg>
            </span>
        </div>
    </div>
    <div class="itemTopFooter">
        <!-- 评论 -->
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jianyi"></use>
            </svg>
            <span>{{ playlist.commentCount }}</span>
        </div>
        <!-- 分享 -->
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang2-copy"></use>
            </svg>
            <span>{{ playlist.shareCount }}</span>
        </div>
        <!-- 下载 -->
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai2-copy"></use>
            </svg>
            <span>下载</span>
        </div>
        <!-- 多选 -->
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-show_duoxuan2-copy"></use>
            </svg>
            <span>多选</span>
        </div>
    </div>
</template>
<script setup>
    const props = defineProps(['playlist'])    
    if(props.playlist.creator=""){
        props.playlist.creator=JSON.parse(sessionStorage.getItem().playlist).creator
    }
    // console.log(props);
    function changeCount(num){
        if(num>=100000000){
           return (num/100000000).toFixed(1) + "亿"
        }
       if(num>=10000 || num<=100000000){
            return (num/10000).toFixed(0) + "万"
        }
        return num
    }
</script>
<style scoped>
    .itemMusicTop{
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* padding: 0.2rem; */
        position: relative;
    }
    .itemLeft,.itemRight{
        width: 23%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 0.2rem;
    }
    .itemLeft span{
        font-size: .4rem;
        color: white;
    }
    .bgimg{
        width: 100%;
        height: 12rem;
        position: absolute;
        filter: blur(30px);
        z-index: -1;
    }
    .itemMusicTop .icon{
        width: 0.5rem;
        height: 0.5rem;
        fill: #fff;
    }
    .itemTopContent {
        width: 100%;
        height: 3rem;
        padding: 0.2rem;
        margin-top: 0.4rem;
        display: flex;
        justify-content: space-between;
    }
    .contentLeft {
        width: 36%;
        height: 2.6rem;
        position: relative;
    }
    .contentLeft img {
        width: 2.6rem;
        height: 2.6rem;
        border-radius: 0.2rem;
        position: absolute;
        z-index: -1;
    }
    .playCount {
        position: absolute;
        right: 0.1rem;
        margin-top: 0.1rem;
    }
    .playCount .icon {
        width: 0.26rem;
        height: 0.26rem;
        margin-top: -0.02rem;
        vertical-align: middle;
    }
    .playCount span {
        font-size: 0.26rem;
        color: #fff;
    }
    .contentRight {
        width: 60%;
        height: 2.6rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .right_span1 {
        font-size: 0.3rem;
        font-weight: 900;
        color: #fff;
        font-family: "微软雅黑";
    }
    .right_img {
        width: 100%;
        height: 0.6rem;
        line-height: 0.6rem;
        color: #ccc;
    }
    .right_img img {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        vertical-align: middle;
    }
    .right_img span {
        margin-left: 0.1rem;
    }
    .right_img .icon {
        width: 0.26rem;
        height: 0.26rem;
        margin-top: -0.08rem;
        vertical-align: middle;
    }
    .right_span2 {
        width: 100%;
        height: 0.6rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .right_span2 span {
        /* display: inline-block; */
        width: 95%;
        height: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 0.6rem;
        font-size: 0.24rem;
        color: #ccc;
    }
    .right_span2 .icon {
        width: 0.24rem;
        height: 0.24rem;
    }
    .itemTopFooter{
        width: 100%;
        height: 1.4rem;
        display: flex;
        justify-content: space-around;
        margin-top: .2rem;
    }
    .footerItem{
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
    }
    .footerItem .icon{
        width: 0.5rem;
        height: 0.5rem;
        fill: #fff;
    }
    .footerItem span{
        margin-top: .1rem;
    }
</style>