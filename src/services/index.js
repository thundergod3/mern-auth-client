import axios from "axios";

class HTTPMethod {
	constructor() {
		this.axios = axios;
		this.axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
		this.axios.defaults.headers["Content-Type"] = "application/json";
		this.axios.defaults.headers.Accept = "application/json";
	}

	get = (...props) => axios.get(...props);

	put = (...props) => axios.put(...props);

	post = (...props) => axios.post(...props);

	delete = (...props) => axios.delete(...props);

	attachTokenToHeader = (token) => {
		axios.interceptors.request.use(
			function (config) {
				config.headers.Authorization = `Bearer ${token}`;
				return config;
			},
			function (error) {
				return Promise.reject(error);
			}
		);
	};
}

export default new HTTPMethod();
