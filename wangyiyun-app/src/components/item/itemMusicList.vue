<template>
    <div class="itemContent">
        <div class="contentTop">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gf-playCircle23"></use>
            </svg>
            <div class="playmMsic">
                <span>播放全部</span>
                <span>({{ itemlist.length }})</span>
            </div>
            <button>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-tianjia1"></use>
                </svg>
                收藏({{ changeCount(subscribedCount)}})
            </button>
        </div>
        <div class="itemList">
            <div class="item" v-for="(item,index) in itemlist" :key="item">
                <div class="itemLeft" @click="updateMusic(index)">
                    <span class="leftSpan">{{ index+1 }}</span>
                    <div class="ar">
                        <span>{{ item.name }}</span>
                        <span v-for="(item1,index) in item.ar" :key=item1 class="arName">
                            {{ getName(index,item1.name,item.ar) }}
                        </span>
                    </div>
                </div>
                <div class="itemRight">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-gengduo-shuxiang2"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useCounterStore } from '../../stores/counter';
    const props = defineProps(['itemlist','subscribedCount'])
    const store = useCounterStore()
    const { playList,playListIndex,musicUrl} = storeToRefs(store)
    function changeCount(num){
            if(num>=100000000){
                return (num/100000000).toFixed(1) + "亿"
            }
            if(num>=10000 || num<=100000000){
                return (num/10000).toFixed(0) + "万"
            }
            return num
    }
    // 作者分组
    function getName(index,name,ar){
        if(index<ar.length-1)
            return name+"/"
        return name
    }
    // 点击歌单音乐并更新
    function updateMusic(index){
        store.updateMusicList(props.itemlist)
        store.updatePlayListIndex(index)
        // store.updateMusicList(props.itemlist)
        store.updateIsbtnShow(false)
        // for(let i=0;i<props.itemlist.length-1;i++){
        //     let res =  getMusicItemList(props.itemlist[i].id)
        //     store.setMusicUrl(res,i)
        //     console.log(musicUrl[i]);
        // } 
    }
</script>
<style scoped>
    .itemContent{
        width: 100%;
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
        background-color: white;
    }
    .contentTop{
        width: 100%;
        height: 1.3rem;
        display: flex;
        align-items: center;
        padding: 0 0.2rem;
    }
    .contentTop .icon{
        width: 0.5rem;
        height: 0.5rem;
        width: 10%;
    }
    .playmMsic{
        width: 55%;
    }
    .playmMsic > span:nth-child(1) {
        font-size: 0.35rem;
        font-weight: 600;
        color: black;
    }
    .playmMsic > span:nth-child(2){
        color: #cccccc;
        margin-left: 0.15rem;
    }
    .contentTop button{
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.5rem;
        border: none;
        height: 0.8rem;
        width: 35%;
        background-color: #ff0000;
        color: white;
        font-size: 0.3rem;
    }
    .itemList{
        width: 100%;
        margin-bottom: 1.4rem;
    }
    .item{
        width: 100%;
        height: 1.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .itemLeft{
        width: 85%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .leftSpan{
        display: inline-block;
        text-align: center;
        width: 0.2rem;
        margin-left: 0.2rem;
    }
    .ar{
        margin-left: 0.3rem;
    }
    .ar > span:nth-child(1){
        display: block;
        width: 4.54rem;
        height: .4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 700;
    }
    .ar .arName{
        font-weight: 400;
        font-size: .24rem;
        color: #999;
    }
    .itemRight{
        width: 20%;
        height: 100%;
        display: flex;
        /* justify-content: space-between; */
        align-items: center;
        position: relative;
    }
    .itemRight .icon{
        width: 0.5rem;
        height: 0.5rem;
        position: absolute;
        right: 0;
    }
</style>