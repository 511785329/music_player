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
			],
			isbtnShow: true,
			playListIndex: 0,
			musicUrl: [{}],
			showBottom: false,
			currentTime: 0,
			lyric: "",
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
	},
});
