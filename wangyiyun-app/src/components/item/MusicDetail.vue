<script setup>
import { Vue3Marquee } from 'vue3-marquee'
import { useCounterStore } from '../../stores/counter';
import { storeToRefs } from 'pinia';
// import { onMounted } from 'vue';
import 'vue3-marquee/dist/style.css'
import { ref,reactive,watch } from 'vue';
    // const lyricObjArr = reactive([
    // ])
    const musicLyricScroll = ref()
    const isLyricShow = ref(false)
    const store = useCounterStore()
    const {isbtnShow,currentTime,lyric,lyricString} = storeToRefs(store)
    let currentRow
    components:{
        Vue3Marquee
    }
    const props = defineProps(['musiclist','audioDuration',"play",'showBottom'])
    // watch(audioCurrentTime,()=>{

    // })
    watch(currentTime,()=>{
            lyricString.value.forEach((item,index)=>{
                // console.log(currentTime,item.time);
                if(currentTime.value>= item.time-0.3 && currentTime.value<= item.time+0.3){
                    // console.log(currentTime.value,item.time);
                    currentRow = index
                    musicLyricScroll.value.scrollTop = index*34
                }
            }) 
    })
    // 将当前歌曲时间处理为进度百分比
    function progrss(time,duration){
        if(time == 0)
            return 0
        let timeProgress = ((time/duration)*100).toFixed(2)
        return timeProgress
    }
    // 对作者名字用'/'分隔处理
    function getName(index,name,ar){
        if(index<ar.length-1)
            return name+"/"
        return name
    }
    // 将秒处理为mm:ss格式
    function musicTime(val){
        let second
        second = parseInt(val)
        if(second<60){
            if(second<10){
                return "00:0" + second
            }
            else{
                return "00:"+second
            }
        }
        else{
            let min = Math.floor(second/60)
            let sec = Math.floor(second%60)
            if(min<10){
                if (sec < 10) {
                    return "0" + min + ":0" + sec;
                } 
                else {
                    return "0" + min + ":" + sec;
                }
            }
            else{
                if (sec < 10) {
                    return min + ":0" + sec;
                } 
                else {
                    return min + ":" + sec;
                }
            }
        }
    }
    // 解析歌词 拿到时间和歌词存放在对象数组里
    // function formatLyric(lyric){
    //     console.log(lyric);
    //     const regNewLine = /\n/
    //     const lineArr = lyric.split(regNewLine)
    //     const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/
    //     lineArr.forEach(item => {
    //         if(item === '') return
    //         const obj = {}
    //         const time = item.match(regTime)
    //         // console.log(item.split(']')[1]);
    //         obj.lyric = item.split(']')[1] ? item.split(']')[1].trim() : ""
    //         obj.time = time ? formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0
    //         lyricObjArr.push(obj)
    //     });
    //     console.log(lyricObjArr);
    // }
    //传入初始歌词文本text
    function formatLyric(text) {
        const lyricArry = []
        let arr = text.split("\n"); //原歌词文本已经换好行了方便很多，我们直接通过换行符“\n”进行切割
        let row = arr.length; //获取歌词行数
        for (let i = 0; i < row; i++) {
            let temp_row = arr[i]; //现在每一行格式大概就是这样"[00:04.302][02:10.00]hello world";
            let temp_arr = temp_row.split("]");//我们可以通过“]”对时间和文本进行分离
            let text = temp_arr.pop(); //把歌词文本从数组中剔除出来，获取到歌词文本了！
            //再对剩下的歌词时间进行处理
            temp_arr.forEach(element => {
                let obj = {};
                let time_arr = element.substr(1, element.length - 1).split(":");//先把多余的“[”去掉，再分离出分、秒
                let s = parseInt(time_arr[0]) * 60 + Number(time_arr[1]); //把时间转换成与currentTime相同的类型，方便待会实现滚动效果
                obj.time = s;
                obj.text = text;
                lyricArry.push(obj); //每一行歌词对象存到组件的lyric歌词属性里
            });
        }
        lyricArry.sort(sortRule); //由于不同时间的相同歌词我们给排到一起了，所以这里要以时间顺序重新排列一下
        store.setLyric(lyricArry) //把歌词提交到store里，为了重新进入该组件时还能再次渲染
    }
    function sortRule(a, b) { //设置一下排序规则
      return a.time - b.time;
    }
    // function formatLyricTime(time){ 
    //     const regMin = /.*:/
    //     const regSec = /:.*\./
    //     const regMs = /\./

    //     const min = parseInt(time.match(regMin)[0].slice(0, 2))
    //     let sec = parseInt(time.match(regSec)[0].slice(1, 3))
    //     const ms = time.slice(time.match(regMs).index + 1, time.match(regMs).index + 3)
    //     if (min !== 0) {
    //         sec += min * 60
    //     }
    //     return Number(sec + '.' + ms)
    // }
</script>
<template>
    <img :src="musiclist.al.picUrl" alt="" class="bgimg"/>
    <div class="mask"></div>
    <div>
        <div class="musicListTop">
            <div class="topLeft">
                <svg class="icon" aria-hidden="true" @click="store.updatePopup()">
                    <use xlink:href="#icon-xiangxiajiantou"></use>
                </svg>
            </div>
            <div class="topCenter">
                <Vue3Marquee class = "ziti" :currentTime = 8>{{ musiclist.name }}</Vue3Marquee>
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
        <div class="musicListContent" v-show="!isLyricShow" @click="isLyricShow=true,formatLyric(lyric)">
            <img  class="img_recode" src="../../assets/record.png"  alt=""/>
            <img class="img_needle" src="../../assets/needle.png" :class="{img_needle_active:isbtnShow}" alt=""/>
            <img class="img_al" :src="musiclist.al.picUrl" :class="{img_al_play:!isbtnShow,img_al_pasue:isbtnShow}" alt=""/>
        </div>
        <div class="musicLyric" ref="musicLyricScroll" v-show="isLyricShow" @click="isLyricShow=false">
            <span v-for="(item,index) in lyricString" 
            :key="item"
            :class="{'musicLyric-active' : currentRow == index}"
            >
                {{ item.text }}
            </span>
        </div>
        <div class="detailFooter">
            <div class="footerTop">
                <!-- 收藏 -->
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jushoucang"></use>
                </svg>
                <!-- 下载 -->
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai_hui-copy"></use>
                </svg>
                <!-- 唱一唱 -->
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-changpian"></use>
                </svg>
                <!-- 评论 -->
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jianyi_hui-copy"></use>
                </svg>
                <!-- 更多 -->
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gengduo-shuxiang2_hui-copy"></use>
                </svg>
            </div>
            <div class="footerContent">
                <span>{{ musicTime(currentTime) }}</span>
                <van-progress 
                :percentage="progrss(currentTime,audioDuration)"
                stroke-width="2" 
                pivot-text=" " 
                color="rgba(255,255,255,0.4)"
                track-color="rgba(204,204,204,0.2)"
                pivot-color="#FFFFFF"
                />
                <span>{{ musicTime(audioDuration) }}</span>
            </div>
            <div class="footer">
                <!-- 循环种类 -->
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xunhuan"></use>
                </svg>
                <!-- 上一首 -->
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shangyishoushangyige"></use>
                </svg>
                <!-- 播放 -->
                <svg class="icon bigIcon" aria-hidden="true" @click="play" v-if="isbtnShow">
                    <use xlink:href="#icon-bofang_bai-copy"></use>
                </svg>
                <!-- 暂停 -->
                <svg class="icon bigIcon" aria-hidden="true" @click="play" v-else>
                    <use xlink:href="#icon-zanting_bai-copy"></use>
                </svg>
                <!-- 下一首 -->
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiayigexiayishou"></use>
                </svg>
                <!-- 列表 -->
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-playlistMusic"></use>
                </svg>
            </div>
        </div>
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
    .musicListContent{
        width: 100%;
        height: 9rem;
        position: relative;
    }
    .img_al{
        position: absolute;
        border-radius: 50%;
        height: 3.2rem;
        width: 3.2rem;
        margin: auto;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        animation: rotate_al 20s linear infinite;
    }
    .img_al_play{
        animation-play-state: running;
    }
    .img_al_pasue{
        animation-play-state: paused;
    }
    .img_recode{
        width: 5rem;
        height: 5rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        
    }
    .img_needle{
        transform-origin: 0 0;
        transform: rotate(-13deg);
        position: absolute;
        left: 46%;
        width: 2rem;
        height: 3rem;
        transition: all 1s;
    }
    .img_needle_active{
        transform-origin: 0 0;
        transform: rotate(0deg);
        position: absolute;
        left: 46%;
        width: 2rem;
        height: 3rem;
        transition: all 1s;
    }
    @keyframes rotate_al{
        from {transform: rotate(0deg);}
        to {transform: rotate(360deg);}
    }
    .detailFooter{
        height: 2.8rem;
        width: 100%;
        position: fixed;
        display: flex;
        bottom: 0;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    .footerTop{
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0 0.4rem;
    }
    .footerTop svg{
        width: 0.5rem;
        height: 0.5rem;
    }
    .footerContent{
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 0.2rem;
    }
    .footerContent span{
        color: #ccc;
        font-size: 0.2rem;
        width: 10%;
        text-align: center;
    }
    .van-progress{
        width: 80%;
    }
    .footer{
        width: 100%;
        height: 1.7rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0 0.4rem;
    }
    .bigIcon{
        width: 1rem;
        height: 1rem;
    }
    .musicLyric{
        width: 100%;
        height: 8.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: scroll;
        position: relative;
        padding: 3.5rem 0;
        color: rgba(255,255,255,0.3);;
    }
    .musicLyric span{
        text-align: center;
        margin-top: 0.2rem; 
    }
    .musicLyric-active{
        color: rgba(255,255,255,1);
    }
</style>
