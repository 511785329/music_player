<template>
    <div class="iconList">
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiangsituijian"></use>
            </svg>
            <span>每日推荐</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yinle"></use>
            </svg>
            <span>私人FM</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yinlegedan-"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-paihangbang-"></use>
            </svg>
            <span>排行榜</span>
        </div>
    </div>
</template>
<style scoped>
    .iconList{
        width: 100%;
        height: 1.7rem;
        margin-top: 0.2rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .iconItem{
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .icon{
        width: 1rem;
        height: 1rem;
    }
</style>