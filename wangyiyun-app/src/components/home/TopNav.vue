<script setup>
import { useRouter } from 'vue-router';
    const router = useRouter()
    function searchMusic(){
        router.push('/search')
    }
</script>
<template>
    <div class="topNav">
        <div class="topLeft">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao2"></use>
            </svg>
        </div>
        <div class="topContent">
            <span>我的</span>
            <span class="active">发现</span>
            <span>云村</span>
            <span>视频</span>
        </div>
        <div class="topRight">
            <svg class="icon" aria-hidden="true" @click="searchMusic()">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>
    </div>
</template>
<style scoped>
    .icon{
        width: 0.5rem;
        height: 0.5rem;
    }
    .topNav{
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        padding: 0.2rem;
    }
    .topContent{
        width: 65%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        /* align-items: center; */
        font-size: 0.35rem;
    }
    .topLeft{
        display: flex;
        align-items: center;
    }
    .topRight{
        display: flex;
        align-items: center;
    }
    .active{
        font-weight: 900;
    }
</style>