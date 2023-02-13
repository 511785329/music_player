
<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">推荐歌单 ></div>
        </div>
        <div class="musicContent">
            <van-swipe
            class="my-swipe" 
            :loop="false" 
            :show-indicators="false"
            :width="125"
            >
                <van-swipe-item v-for="item in state.musicList" :key="item" >
                    <router-link :to="{path:'/ItemMusic',query:{id:item.id}}">
                    <img :src="item.picUrl" />
                    <span class="playCount">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-bofang1"></use>
                        </svg>
                        {{ changeCount(item.playCount) }}
                    </span>
                    <span class="musicName">{{ item.name }}</span>
                    </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>
<script setup>
    import {reactive,onMounted} from 'vue'
    import {getMusicList} from '../request/api/home.js'
    // import axios from 'axios'
    const state = reactive({
        musicList:[]
    });
    onMounted(async ()=>{
        let res =await getMusicList()
        state.musicList=res.data.result
    })
    function changeCount(num){
        if(num>=100000000){
           return (num/100000000).toFixed(1) + "亿"
        }
       if(num>=10000 || num<=100000000){
            return (num/10000).toFixed(0) + "万"
        }
        return num
    function changeMusic(item){
        this.$router.push({ path: '/ItemMusic', query: { id:item.id } })
    }        
    }
</script>
<style scoped>
    .musicList{
        width: 100%;
        height: 5rem;
        padding: 0.2rem;
    }
    .musicTop{
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.2rem;
    }
    .title{
        font-size: 0.4rem;
        font-weight: 700;
    }
    .musicContent{
        width: 100%;
        height: 4rem;
    }
    .van-swipe{
        height: 100%;
        width: 100%;
    }
    .van-swipe-item{
        height: 100%;
        /* width: 20%; */
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: center;
    }
    .van-swipe_track{
        width: 100%;
    }
    .van-swipe-item img{
        width:2.3rem;
        height: 2.3rem;
        margin-right: 0;
        border-radius: 0.2rem;
    }
    .playCount{
        position: absolute;
        top: 0;
        right: 0;
        color: white;
        margin-right: 0.3rem;
        margin-top: 0.1rem;
        font-size: 0.2rem;
    }
    .icon{
        height: 0.17rem;
        width: 0.17rem;
    }
    .musicName{
        padding: 0;
        /* 宽度被router-link的a标签class覆盖掉了 */
        /* width: 2.3rem; */
        font-size: 0.1rem;
    }
    a{
        color: black;
        line-height: 1;
        width: 2.3rem;
    }
</style>