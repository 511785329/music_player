<script setup>
    import { showToast } from 'vant';
    import { ref,onMounted,reactive } from 'vue';
    import { useRoute } from "vue-router";
    import { getSearch } from '../request/api/search.js'
    import { useCounterStore } from '../../stores/counter';
    import{ getMusicUrl } from "../request/api/item.js"
    const keyword = ref(null)
    const store = useCounterStore()
    const state = reactive({
        list: []
    })
    const searchKeyWord = (val) =>{
    }
    onMounted( async () => {
        let id = useRoute().query.id
        let res = await getSearch(id)
        state.list = res.data.result.songs
        sessionStorage.setItem('searchItemDetail',JSON.stringify(state))
        for(let i=0;i<state.list.length;i++){
            let url = await getMusicUrl(state.list[i].id)
            store.setMusicUrl(i,url)
        }
    })
    // 作者分组
    function getName(index,name,ar){
        if(index<ar.length-1)
            return name+"/"
        return name
    }
    function updateMusic(index){
        store.updateMusicList(state.list)
        store.updatePlayListIndex(index)
        store.updateIsbtnShow(false)
    }
</script>
<template>
    <div class="searchTop">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <van-search
            v-model="keyword"  
            placeholder="请输入搜索关键词" 
            shape="round"
            @search="searchKeyWord"
        />
        <span @click="searchKeyWord">搜索</span>
    </div>
    <div class="itemContent">
        <div class="itemTop">
            <div class="topLeft">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gf-playCircle23"></use>
                </svg>
                <span>播放全部</span>
            </div>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-show_duoxuan"></use>
            </svg>
        </div>
        <div class="itemList">
            <div class="item" v-for="(item,index) in state.list" :key="item">
                <div class="itemLeft"  @click="updateMusic(index)">
                    <span>{{ item.name }}</span>
                    <div class="span2">
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
<style scoped>
    .searchTop{
        width: 100%;
        height: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.2rem;
    }
    .van-search{
        width: 83%;
    }
    .itemList{
        width: 100%;
        margin-bottom: 1.4rem;
    }
    .itemTop{
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.2rem;
    }
    .topLeft{
        display: flex;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .topLeft span{
        /* line-height: 1rem; */
        font-weight: 700;
        margin-left: 0.2rem;
    }
    .item{
        width: 100%;
        height: 1.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.2rem;
    }
    .itemLeft{
        width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .span2{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #ccc;
    }
    .arName{
        font-size: 0.2rem;
        color: #ccc;
        display:inline-block;
    }
    .icon{
        width: 0.5rem;
        height: 0.5rem;
    }
</style>