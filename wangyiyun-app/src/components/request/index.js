import axios from "axios";
let service = axios.create({
	baseURL: "http://198.23.248.190:3000",
	timeout: 3000,
});
export default service;
