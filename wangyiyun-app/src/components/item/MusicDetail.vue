<script setup>
import { Vue3Marquee } from 'vue3-marquee'
import { onMounted } from 'vue';
import 'vue3-marquee/dist/style.css'
    components:{
        Vue3Marquee
    }
    const props =defineProps(['musiclist'])
    onMounted(() => {
        console.log(props.musiclist);
    })
    function getName(index,name,ar){
        if(index<ar.length-1)
            return name+"/"
        return name
    }
</script>
<template>
    <img :src="musiclist.al.picUrl" alt="" class="bgimg"/>
    <div class="mask"></div>
    <div>
        <div class="musicListTop">
            <div class="topLeft">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiangxiajiantou"></use>
                </svg>
                
            </div>
            <div class="topCenter">
                <Vue3Marquee class="ziti" duration="8">{{ musiclist.name }}</Vue3Marquee>
                <div class="arName">
                    <span v-for="(item, index) in musiclist.ar" :key="item">
                        {{ getName(index,item.name,musiclist.ar) }}
                    </span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xiangyoujiantou2-copy"></use>
                    </svg>
                </div>
            </div>
            <div class="topRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang1-copy"></use>
                </svg>
            </div>
        </div>
        <div class="musicListContent"></div>
    </div>
    <!-- <div class="mask"></div> -->
    
</template>
<style scoped>
    .mask{
        /* position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0; */
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.4);
        z-index: -1;
    }
    .ziti{
        color: white;
        height: 50%;
    }
    .bgimg{
        position: fixed;
        height: 100%;
        width: 100%;
        filter: blur(30px);
        z-index: -2;
    }
    .musicListTop{
        width: 100%;
        height: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.1rem 0;
    }
    .topLeft{
        padding-left: 0.15rem;
        width: 10%;
    }
    .topCenter{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 50%;
        height: 100%;
    }
    .arName{
        display: flex;
        justify-content: center;
        align-self: center;
    }
    .arName span{
        font-size: 0.2rem;
        color: #ccc;
        line-height: 0.3rem;
    }
    .arName .icon{
        width: 0.3rem;
        height: 0.3rem;
    }
    .topRight{
        padding-left: 0.1rem;
        width: 10%;
    }
    .icon{
        width: 0.5rem;
        height: 0.5rem;
    }
</style>
