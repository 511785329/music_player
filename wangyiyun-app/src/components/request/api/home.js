import service from "..";
// 获取首页轮播图
export function getBanner() {
	return service({
		method: "GET",
		url: "/banner?type=2&realIP=116.25.146.177",
	});
}
// 获取推荐歌单
export function getMusicList() {
	return service({
		method: "GET",
		url: "/personalized?limit=5&realIP=116.25.146.177",
	});
}
