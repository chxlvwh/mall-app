import request from '@/utils/request';

export async function getContentList() {
	return request({
		method: 'GET',
		url: '/home/content',
	});
}
