import Request from 'luch-request/src/lib/luch-request';

const http = new Request();

http.setConfig((config) => {
	/* 设置全局配置 */
	config.baseURL = 'http://localhost:3000';
	config.header = {
		...config.header,
	};
	return config;
});

http.interceptors.request.use((config) => {
	/* 请求之前拦截器。可以使用async await 做异步操作 */
	const token = uni.getStorageSync('token');
	if (!token) {
		// 如果token不存在，return Promise.reject(config) 会取消本次请求
		config.header = {
			Authorization: `Bearer ${token}`,
			...config.header,
		};
	} else {
		config.header = {
			...config.header,
		};
	}
	/*
    if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
        return Promise.reject(config)
    }
     */
	return config;
});

http.interceptors.response.use(
	(response) => {
		/* 请求之后拦截器。可以使用async await 做异步操作  */
		const res = response.data;
		if (res.code !== 200) {
			// 服务端返回的状态码不等于200，则reject()
			uni.showToast({ title: res.message, duration: 1500 });
			// 401未登录处理
			if (res.code === 401) {
				uni.showModal({
					title: '提示',
					content: '你已被登出，可以取消继续留在该页面，或者重新登录',
					confirmText: '重新登录',
					cancelText: '取消',
					success(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/public/login',
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					},
				});
			}
			return Promise.reject(response);
		}
		return response.data;
	},
	(response) => {
		// 请求错误做点什么。可以使用async await 做异步操作
		// 提示错误信息
		console.log('response error', response);
		uni.showToast({
			title: response.errMsg,
			duration: 1500,
		});
		return Promise.reject(response);
	},
);

export function request(options = {}) {
	return http.request(options);
}

export default request;
