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

export async function deleteReceiver(userId, receiverId) {
	return request({
		method: 'DELETE',
		url: `/api/v1/public/user/${userId}/receivers/${receiverId}`,
	});
}

// 获取优惠券列表
export async function getCoupons() {
	return request({
		method: 'GET',
		url: `/api/v1/coupon`,
	});
}

// 获取有效优惠券列表
export async function getValidCoupons(productId) {
	return request({
		method: 'GET',
		url: `/api/v1/coupon/product/${productId}/valid`,
	});
}

// 领取优惠券
export async function receiveCoupon(couponId) {
	return request({
		method: 'POST',
		url: `/api/v1/coupon/${couponId}/receive`,
	});
}
