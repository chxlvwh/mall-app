import request from '@/utils/request';

export async function getContentList() {
	return request({
		method: 'GET',
		url: '/home/content',
	});
}

export async function getCategoryList() {
	return request({
		method: 'GET',
		url: '/api/v1/product-category',
	});
}
