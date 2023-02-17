
<script setup>
import { useCounterStore } from '../../stores/counter';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { watch } from 'vue';
import MusicDetail from './MusicDetail.vue'
    components: {
        MusicDetail
    }
    const store=useCounterStore()
    const {playList,playListIndex,isbtnShow,musicUrl} = storeToRefs(store)
    const audio = ref(null)
    const showBottom = ref(false)
    var play_music = ""
    function play(){
        if(audio.value.paused){
            store.updateIsbtnShow(false)
            audio.value.play()
        }
        else{
            store.updateIsbtnShow(true)
            audio.value.pause()
        } 
    }
    // 监听歌单歌曲并点击播放
    watch([playListIndex,playList], ()=>{
        // console.log(playList);
        play_music = musicUrl.value[playListIndex.value].data.data[0].url
        audio.value.load();
        audio.value.autoplay = true;
    })
    function musicDetail() {
        showBottom.value = true
    }
    function closePopup(){
        showBottom.value = false
    }
    // watch(, ()=>{   //切换列表的时候确保第一首歌能播放
    //     play_music = musicUrl.value[playListIndex.value].data.data[0].url
    //     audio.value.load();
    //     audio.value.autoplay = true;
    // })
</script>
<template>
    <div class="FooterMusic">
        <div class="footerLeft" @click="musicDetail()">
            <img :src="playList[playListIndex].al.picUrl" alt=""> <!--专辑封面al.picUrl-->
            <div>
                <span class="musicName">{{ playList[playListIndex].name }}</span>
                <span>横滑可以切换上下首</span>
            </div>
        </div>
        <div class="footerRight">
            <svg class="icon" aria-hidden="true" @click="play()" v-if="isbtnShow">
                <use xlink:href="#icon-bofang"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="play()" v-else>
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true" >
                <use xlink:href="#icon-24gf-playlist"></use>
            </svg>
        </div>
        <audio ref="audio">
            <!-- :src="musicUrl[playListIndex].data.data[0].url" -->
            <source :src="play_music"> 
        </audio>
        <van-popup
            v-model:show="showBottom"
            position="bottom"
            :style="{ height: '100%' }"
            @click="closePopup()"
        >
            <MusicDetail :musiclist="playList[playListIndex]"/>
        </van-popup>
    </div>
</template>
<style scoped>
    .FooterMusic{
        width: 100%;
        height: 1.4rem;
        bottom: 0;
        background-color: white;
        border-top: 0.01rem solid #ccc;
        position: fixed;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .footerLeft{
        padding-left: 0.15rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 55%;
    }
    .footerLeft div{
        padding-left: 0.2rem;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    .musicName{
        font-size: 0.35rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    img{
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
    }
    .footerRight{
        padding-right: 0.2rem;
        width: 25%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .footerRight .icon{
        width: 0.6rem;
        height: 0.6rem;
    }
</style>