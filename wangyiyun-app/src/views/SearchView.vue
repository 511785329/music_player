<script setup>
import SearchHistory from '@/components/search/SearchHistory.vue'
import { ref } from 'vue';
import { showToast } from 'vant';
import { useUserDetailStore } from '../stores/userDetail';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
    const router = useRouter()
    const keyword = ref(null)
    const store = useUserDetailStore()
    const { searchHistory,isSearchHis } = storeToRefs(store)
    const searchKeyWord = (val) =>{
        if(keyword.value == ''){
            showToast({message:'输入不能为空!'});
            return
        }
        for(let i=0;i<searchHistory.value.length;i++){
            if(keyword.value == searchHistory.value[i]){
                router.push({path: '/searchList',query:{id:keyword.value}})
                isSearchHis.value = true
                return
            }
        }
        if(searchHistory.value.length == 10)
            store.delSearchHis()
        store.updateKeyWord(keyword.value)
        store.updateSearchHis(keyword.value)
        router.push({path: '/searchList',query:{id:keyword.value}})
        isSearchHis.value = true
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
    <SearchHistory />
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
    .icon{
        width: 0.5rem;
        height: 0.5rem;
    }
</style>