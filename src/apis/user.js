import request from '@/utils/request';

export async function login(data) {
	return request({
		method: 'POST',
		url: '/api/v1/auth/login',
		data,
	});
}

export async function getUserInfo() {
	return request({
		method: 'GET',
		url: '/api/v1/public/user/info',
	});
}
