import request from '@/utils/request';

export async function getProductList(params) {
	return request({
		method: 'GET',
		url: '/api/v1/product',
		params,
	});
}
