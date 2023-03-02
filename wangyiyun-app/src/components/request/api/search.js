import service from "..";

export function getSearch(data) {
	return service({
		method: "GET",
		url: `/cloudsearch?keywords=${data}`,
	});
}
