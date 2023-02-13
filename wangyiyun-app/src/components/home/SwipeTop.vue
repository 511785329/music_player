<script setup>
    import {reactive,onMounted} from 'vue'
    import {getBanner} from '../request/api/home.js'
    // import axios from 'axios'
    const state = reactive({
        images:[
        ]
    });
    onMounted(async ()=>{
        // axios.get('/banner?type=2').then((res)=>{
        //     console.log(res)
        //     state.images=res.date.banners
        // })
        let res =await getBanner()
        state.images=res.data.banners
        
    })
</script>

<template>
    <div id="swipeTop">
        <van-swipe :autoplay="3000" lazy-render indicator-color="white">
            <van-swipe-item v-for="image in state.images" :key="image">
                <img :src="image.pic" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<style scoped>
    #swipeTop .van-swipe{
        width: 100%;
        height: 3rem;
    }
    #swipeTop .van-swipe-item{
        padding: 0 0.2rem;
    }
    #swipeTop .van-swipe-item img{
        width: 100%;
        height:100%;
        border-radius: 0.2rem;
    }
</style>