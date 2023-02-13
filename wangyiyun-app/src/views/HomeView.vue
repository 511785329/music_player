<script setup>
import TopNav from "../components/home/TopNav.vue"
import SwipeTop from "../components/home/SwipeTop.vue";
import IconList from "../components/home/IconList.vue";
import MusicList from "../components/home/MusicList.vue";
components: {
    TopNav
    SwipeTop
    IconList
    MusicList
  }
</script>

<template>
    <div>
        <TopNav/>
        <SwipeTop/>
        <IconList/>
        <MusicList/>
    </div>
</template>
<style scoped>
</style>
