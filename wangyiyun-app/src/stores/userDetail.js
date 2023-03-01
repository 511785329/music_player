import { defineStore } from "pinia";
import { List } from "vant";
export const useUserDetailStore = defineStore("userDetail", {
	state: () => {
		return {
			isSearchHis: true,
			searchHistory: [],
			keyword: "",
			searchList: [],
		};
	},
	actions: {
		updateSearchHis(val) {
			this.searchHistory.unshift(val);
			localStorage.setItem("keyWord", this.searchHistory);
		},
		showSearchHis() {
			this.searchHistory = [];
			this.searchHistory = localStorage.getItem("keyWord").split(",");
		},
		updateKeyWord(val) {
			this.keyword = val;
		},
		delSearchHis() {
			this.searchHistory.pop();
			localStorage.setItem("keyWord", this.searchHistory);
		},
	},
});
