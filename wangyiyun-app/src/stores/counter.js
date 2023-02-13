import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
	state: () => {
		// playList: [
		// 	{
		// 		al: {
		// 			id: 2922977,
		// 			name: "Bae",
		// 			pic: 109951167839114770,
		// 			picUrl:
		// 				"http://p3.music.126.net/e1QPdhDdU631YXMH_vnfDQ==/109951167839114773.jpg",
		// 			pic_str: "109951167839114773",
		// 		},
		// 		id: 28916645,
		// 	},
		// ];
		// playListIndex: 0;
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
	},
});
