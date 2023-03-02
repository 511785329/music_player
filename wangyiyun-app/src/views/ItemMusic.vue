<template>
    <itemMusicTop :playlist = "state.playlist"/>
    <itemMusicList :itemlist = "state.itemlist" :subscribedCount = "state.playlist.subscribedCount"/>
</template>
<script setup>
import { onMounted, reactive } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import{getItemList, getMusicItemList,getMusicUrl} from "../components/request/api/item.js"
import itemMusicTop from "../components/item/itemMusicTop.vue"
import itemMusicList from "../components/item/itemMusicList.vue";
import { useCounterStore } from '../stores/counter.js';
    const state=reactive({
        playlist:{},
        itemlist:[],
    })
    onMounted(async ()=>{
        const store = useCounterStore()
        let id = useRoute().query.id
        let res = await getMusicItemList(id)
        let result =await getItemList(id)
        state.playlist = res.data.playlist;
        state.itemlist = result.data.songs;
        console.log(result);
        // 防止页面刷新，数据丢失，数据保存到sessionStorage中 
        sessionStorage.setItem('itemDetail',JSON.stringify(state))
        // 仓库存放歌单歌曲url
        for(let i=0;i<state.itemlist.length;i++){
            let url = await getMusicUrl(state.itemlist[i].id)
            store.setMusicUrl(i,url)
        }
    })
</script>