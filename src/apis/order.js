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

/** 取消订单 */
export async function cancelOrder(orderId) {
	return request({
		method: 'PUT',
		url: `/api/v1/public/order/${orderId}/cancel`,
	});
}

/** 删除订单 */
export async function deleteOrder(orderId) {
	return request({
		method: 'DELETE',
		url: `/api/v1/public/order/${orderId}`,
	});
}

/** 支付订单 */
export async function payOrder(orderId, data) {
	return request({
		method: 'PUT',
		url: `/api/v1/public/order/${orderId}/pay`,
		data,
	});
}

/** 确认收货 */
export async function confirmOrder(orderId) {
	return request({
		method: 'PUT',
		url: `/api/v1/public/order/${orderId}/confirm`,
	});
}

/** 评价 */
export async function commentOrder(orderId, data) {
	return request({
		method: 'PUT',
		url: `/api/v1/public/order/${orderId}/comment`,
		data,
	});
}
