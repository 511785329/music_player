import service from "..";
// 获取歌单详情
export function getMusicItemList(data) {
	return service({
		method: "GET",
		url: `/playlist/detail?id=${data}&realIP=116.25.146.177`,
	});
}
// 获取歌单歌曲
export function getItemList(data) {
	return service({
		method: "GET",
		url: `/playlist/track/all?id=${data}&limit=20&offset=0&realIP=116.25.146.177`,
	});
}
// 获取歌单歌曲url
export function getMusicUrl(data) {
	return service({
		method: "GET",
		url: `/song/url/v1?id=${data}&level=standard&realIP=116.25.146.177`,
	});
}
// 获取歌词
export function getMusicLyric(data) {
	return service({
		method: "GET",
		url: `/lyric?id=${data}&realIP=116.25.146.177`,
	});
}
