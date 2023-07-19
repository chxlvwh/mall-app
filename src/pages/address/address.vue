<template>
	<view class="content b-t">
		<view class="list b-b" v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)">
			<view class="wrapper">
				<view class="address-box">
					<text v-if="item.isDefault" class="tag">默认</text>
					<text class="address">{{ item.addressName }} {{ item.address }}</text>
				</view>
				<view class="u-box">
					<text class="name">{{ item.name }}</text>
					<text class="mobile">{{ item.phone }}</text>
				</view>
			</view>
			<text class="yticon icon-bianji" style="margin-right: 20upx" @click.stop="addAddress('edit', item)"></text>
			<text class="yticon icon-iconfontshanchu1" @click.stop="handleDeleteAddress(item.id)"></text>
		</view>

		<view v-if="!addressList.length" class="text-center">请添加收货地址</view>

		<button class="add-btn" @click="addAddress('add')">新增地址</button>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import { deleteReceiver, getReceivers } from '@/apis/user';

export default {
	data() {
		return {
			source: 0,
			addressList: [],
		};
	},
	onLoad(option) {
		this.source = option.source;
		console.log('[option:] ', option);
		this.refreshList();
	},
	computed: {
		...mapState(['userInfo']),
	},
	methods: {
		async loadData() {
			const { data: res } = await getReceivers(this.userInfo.id);
			this.addressList = res;
		},
		//选择地址
		checkAddress(item) {
			if (this.source == 1) {
				//this.$api.prePage()获取上一页实例，在App.vue定义
				this.$api.prePage().addressData = item;
				uni.navigateBack();
			}
		},
		addAddress(type, item) {
			uni.navigateTo({
				url: `/pages/address/addressManage?type=${type}&data=${JSON.stringify(item)}`,
			});
		},
		//添加或修改成功之后回调
		async refreshList() {
			//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
			await this.loadData();
		},
		//删除地址
		async handleDeleteAddress(id) {
			uni.showModal({
				title: '提示',
				content: '确定删除该地址吗？',
				success: async (res) => {
					if (res.confirm) {
						//删除地址
						await deleteReceiver(this.userInfo.id, id);
						uni.showToast({
							title: '删除成功',
							icon: 'success',
						});
						await this.loadData();
					}
				},
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.text-center {
	padding: 20upx 0;
	text-align: center;
	color: #c0c4cc;
}
page {
	padding-bottom: 120upx;
}
.content {
	position: relative;
}
.list {
	display: flex;
	align-items: center;
	padding: 20upx 30upx;
	background: #fff;
	position: relative;
}
.wrapper {
	display: flex;
	flex-direction: column;
	flex: 1;
}
.address-box {
	display: flex;
	align-items: center;
	.tag {
		font-size: 24upx;
		color: $base-color;
		margin-right: 10upx;
		background: #fffafb;
		border: 1px solid #ffb4c7;
		border-radius: 4upx;
		padding: 4upx 10upx;
		line-height: 1;
	}
	.address {
		font-size: 30upx;
		color: $font-color-dark;
	}
}
.u-box {
	font-size: 28upx;
	color: $font-color-light;
	margin-top: 16upx;
	.name {
		margin-right: 30upx;
	}
}
.icon-bianji {
	display: flex;
	align-items: center;
	height: 80upx;
	font-size: 40upx;
	color: $font-color-light;
	padding-left: 30upx;
}

.add-btn {
	position: fixed;
	left: 30upx;
	right: 30upx;
	bottom: 16upx;
	z-index: 95;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 690upx;
	height: 80upx;
	font-size: 32upx;
	color: #fff;
	background-color: $base-color;
	border-radius: 10upx;
	box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
}
</style>
