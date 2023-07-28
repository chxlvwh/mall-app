import request from '@/utils/request';

export async function previewOrder(data) {
	return request({
		method: 'POST',
		url: '/api/v1/order/preview',
		data,
	});
}
