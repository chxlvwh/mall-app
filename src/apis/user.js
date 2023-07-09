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

export async function getReceivers(userId) {
	return request({
		method: 'GET',
		url: `/api/v1/public/user/${userId}/receivers`,
	});
}

export async function AddReceiver(userId, data) {
	return request({
		method: 'POST',
		url: `/api/v1/public/user/${userId}/receivers`,
		data,
	});
}

export async function UpdateReceiver(userId, receiverId, data) {
	return request({
		method: 'PUT',
		url: `/api/v1/public/user/${userId}/receivers/${receiverId}`,
		data,
	});
}
