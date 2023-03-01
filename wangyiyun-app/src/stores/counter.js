// import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { getMusicLyric } from "../components/request/api/item";
export const useCounterStore = defineStore("counter", {
	state: () => {
		return {
			playList: [
				{
					al: {
						id: 2922977,
						name: "Bae",
						pic: 109951167839114770,
						picUrl:
							"http://p3.music.126.net/e1QPdhDdU631YXMH_vnfDQ==/109951167839114773.jpg",
						pic_str: "109951167839114773",
					},
					id: 28916645,
				},
			], //歌单全部歌曲对象数组
			isbtnShow: true, //播放暂停按钮的显隐形
			playListIndex: 0, //歌单歌曲下标
			musicUrl: [{}], //歌曲的url
			showBottom: false, //是否显示歌曲播放界面
			currentTime: 0, //歌曲当前播放时间
			lyric: "", //获取的歌曲歌词字符串流
			lyricString: [], //处理后的歌词对象数组
		};
	},
	actions: {
		updateIsbtnShow(val) {
			this.isbtnShow = val;
		},
		updateMusicList(val) {
			this.playList = val;
		},
		updatePlayListIndex(index) {
			this.playListIndex = index;
		},
		setMusicUrl(index, url) {
			this.musicUrl[index] = url;
		},
		updatePopup() {
			this.showBottom = !this.showBottom;
		},
		updateTime(time) {
			this.currentTime = time;
		},
		// 获取歌词并存入仓库
		async setMusicLyric(id) {
			let res = await getMusicLyric(id);
			this.lyric = res.data.lrc.lyric;
		},
		setLyric(val) {
			this.lyricString = val;
		},
	},
});
