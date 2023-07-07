import request from '@/utils/request';

export async function getProductList(params) {
	return request({
		method: 'GET',
		url: '/api/v1/product',
		params,
	});
}

export async function getProductById(id) {
	return request({
		method: 'GET',
		url: `/api/v1/product/${id}`,
	});
}
