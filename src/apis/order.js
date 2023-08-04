import request from '@/utils/request';

export async function previewOrder(data) {
	return request({
		method: 'POST',
		url: '/api/v1/public/order/preview',
		data,
	});
}

export async function createOrder(data) {
	return request({
		method: 'POST',
		url: '/api/v1/public/order',
		data,
	});
}

// 获取订单详情
export async function getOrderDetail(orderId) {
	return request({
		method: 'GET',
		url: `/api/v1/public/order/${orderId}`,
	});
}

// 获取订单列表
export async function getOrderList(params) {
	return request({
		method: 'GET',
		url: '/api/v1/public/order',
		params,
	});
}
