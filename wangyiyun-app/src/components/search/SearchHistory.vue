<script setup>
    import { useUserDetailStore } from '../../stores/userDetail.js'
    import { showConfirmDialog } from 'vant'
    import { onMounted,watch } from "vue"
    import { storeToRefs } from 'pinia'
    const store = useUserDetailStore()
    const { searchHistory,isSearchHis } =storeToRefs(store)
    onMounted(() => {
        store.showSearchHis()
    })
    function delHis(){
        showConfirmDialog({
            message:
                '确定清空全部历史记录?',
            closeOnClickOverlay: true,
            width: "6.5rem",
            'confirm-button-text': '清空',
        })
        .then(() => {
            // on confirm
            searchHistory.value = [];
			localStorage.setItem("keyWord",searchHistory.value);
            if(searchHistory.value.length == 0)
                isSearchHis.value = false
        })
        .catch(() => {
            // on cancel
        })
    }
</script>
<template>
    <div class="searcHis" v-show="isSearchHis">
        <div class="title">
            <span>搜索历史</span>
            <svg class="icon" aria-hidden="true" @click="delHis()">
                <use xlink:href="#icon-weibiaoti6"></use>
            </svg>
        </div>
        <div class="hisList">
            <span v-for="item in searchHistory" :key="item" class="hisSpan">{{ item }}</span>
        </div>
    </div>
</template>
<style scoped>
    .title{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.25rem;

    }
    .title span{
        font-size: 0.3rem;
        font-weight: 600;
    }
    .hisList{
        padding-top: 0.2rem;
    }
    .hisSpan{
        border-radius: 25%;
        background-color: #ccc;
        padding: 0.1rem 0.2rem;
    }
    .icon{
        width: 0.3rem;
        height: 0.3rem;
    }
</style>