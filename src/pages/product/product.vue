<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular="true" duration="400">
				<swiper-item class="swiper-item" v-for="(item, index) in imgList" :key="index">
					<view class="image-wrapper">
						<image :src="item" class="loaded" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="introduce-section">
			<text class="title">{{ detail.name }}</text>
			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price" v-if="getSelectedSku()">{{ getSelectedSku().price / 100 }}</text>
				<text class="price" v-else>{{ detail.salePrice / 100 }}</text>
				<text class="m-price">¥{{ detail.originPrice / 100 }}</text>
				<text class="coupon-tip" v-if="getSelectedSku()"
					>{{ ((getSelectedSku().price / detail.originPrice) * 10).toFixed(1) }}折</text
				>
				<text class="coupon-tip" v-else>{{ ((detail.salePrice / detail.originPrice) * 10).toFixed(1) }}折</text>
			</view>
			<view class="bot-row">
				<text>销量: {{ detail.sales || 0 }}</text>
				<text>库存: {{ detail.stock }}</text>
				<!--				<text>浏览量: 768</text>-->
			</view>
		</view>

		<!--  分享 -->
		<view class="share-section" @click="share">
			<view class="share-icon">
				<text class="yticon icon-xingxing"></text>
				返
			</view>
			<text class="tit">该商品分享可领49减10红包</text>
			<text class="yticon icon-bangzhu1"></text>
			<view class="share-btn">
				立即分享
				<text class="yticon icon-you"></text>
			</view>
		</view>

		<view class="c-list">
			<view class="c-row b-b" @click="toggleSpec">
				<text class="tit">购买类型</text>
				<view class="con">
					<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
						{{ sItem.value }}
					</text>
					<text>数量：</text><text>{{ count }}{{ detail.unit }}</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
			<view class="c-row b-b" @click="toggleCoupon('show')">
				<text class="tit">优惠券</text>
				<text class="con t-r red">领取优惠券</text>
				<text class="yticon icon-you"></text>
			</view>
			<view class="c-row b-b">
				<text class="tit">促销活动</text>
				<view class="con-list">
					<text>新人首单送20元无门槛代金券</text>
					<text>订单满50减10</text>
					<text>订单满100减30</text>
					<text>单笔购买满两件免邮费</text>
				</view>
			</view>
			<view class="c-row b-b">
				<text class="tit">服务</text>
				<view class="bz-list con">
					<text>7天无理由退换货 ·</text>
					<text>假一赔十 ·</text>
				</view>
			</view>
		</view>

		<!-- 评价 -->
		<view class="eva-section">
			<view class="e-header">
				<text class="tit">评价</text>
				<text>(86)</text>
				<text class="tip">好评率 100%</text>
				<text class="yticon icon-you"></text>
			</view>
			<view class="eva-box">
				<image
					class="portrait"
					src="http://img3.imgtn.bdimg.com/it/u=1150341365,1327279810&fm=26&gp=0.jpg"
					mode="aspectFill"
				></image>
				<view class="right">
					<text class="name">Leo yo</text>
					<text class="con"
						>商品收到了，79元两件，质量不错，试了一下有点瘦，但是加个外罩很漂亮，我很喜欢</text
					>
					<view class="bot">
						<text class="attr">购买类型：XL 红色</text>
						<text class="time">2019-04-01 19:21</text>
					</view>
				</view>
			</view>
		</view>

		<view class="detail-desc">
			<view class="d-header">
				<text>图文详情</text>
			</view>
			<rich-text :nodes="detail.content"></rich-text>
		</view>

		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-xiatubiao--copy"></text>
				<text>首页</text>
			</navigator>
			<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-gouwuche"></text>
				<text>购物车</text>
			</navigator>
			<view class="p-b-btn" :class="{ active: favorite }" @click="toFavorite">
				<text class="yticon icon-shoucang"></text>
				<text>收藏</text>
			</view>

			<view class="action-btn-group">
				<button type="primary" class="action-btn no-border buy-now-btn" @click="buy">立即购买</button>
				<button type="primary" class="action-btn no-border add-cart-btn" @click="addToCart">加入购物车</button>
			</view>
		</view>

		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<image
						src="https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg"
					></image>
					<view class="right" v-if="getSelectedSku()">
						<text class="price">¥{{ (getSelectedSku().price / 100).toFixed(2) }}</text>
						<text class="stock">库存：{{ getSelectedSku().stock }}{{ detail.unit }}</text>
						<view class="selected">
							已选：
							<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
								{{ sItem.value }}
							</text>
						</view>
					</view>
					<view class="right" v-else>
						<text class="price">¥{{ (detail.salePrice / 100).toFixed(2) }}</text>
						<text class="stock">库存：{{ detail.stock }}{{ detail.unit }}</text>
						<view class="selected">
							已选：
							<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
								{{ sItem.value }}
							</text>
						</view>
					</view>
				</view>
				<view v-for="(item, index) in specList" :key="index" class="attr-list">
					<text>{{ item.name }}</text>
					<view class="item-list">
						<text
							v-for="(childItem, childIndex) in item.values"
							:key="childIndex"
							class="tit"
							:class="{ selected: childItem.selected }"
							@click="selectSpec(childIndex, item.values)"
						>
							{{ childItem.value }}
						</text>
					</view>
				</view>

				<view class="attr-list">
					<view>数量</view>
					<view class="num">
						<text class="jj minus" @click.stop="count <= 1 ? 1 : count--">-</text>
						<input
							class="num-input"
							v-model="count"
							:max="detail.stock"
							data-key="count"
							type="number"
							@blur="blurNum"
						/>
						<text class="jj plus" @click.stop="count++">+</text>
					</view>
				</view>
				<button class="btn" @click="toggleSpec">完成</button>
			</view>
		</view>

		<!-- 优惠券面板 -->
		<view class="mask" :class="couponState === 0 ? 'none' : couponState === 1 ? 'show' : ''" @click="toggleCoupon">
			<view class="mask-content" @click.stop.prevent="stopPrevent">
				<!-- 优惠券页面，仿mt -->
				<view class="coupon-item" v-for="(item, index) in couponList" :key="index" @click="receiveCoupon(item)">
					<view class="con">
						<view class="left">
							<text class="title"
								>{{ item.name }}
								<span class="coupon-status" :class="`coupon-status__${item.status}`">{{
									couponStatusMapping[item.status]
								}}</span>
							</text>
							<text class="time"
								>开始时间 {{ format(new Date(item.startDate), 'yyyy-MM-dd HH:mm:ss') }}</text
							>
							<text class="time"
								>结束时间 {{ format(new Date(item.endDate), 'yyyy-MM-dd HH:mm:ss') }}</text
							>
						</view>
						<view class="right">
							<text class="price">{{ item.value / 100 }}</text>
							<text>满{{ item.threshold / 100 }}可用</text>
						</view>

						<view class="circle l"></view>
						<view class="circle r"></view>
					</view>
					<text class="tips">{{ item.scope | scope }}</text>
				</view>
			</view>
		</view>
		<!-- 分享 -->
		<share ref="share" :contentHeight="580" :shareList="shareList"></share>
	</view>
</template>

<script>
import share from '@/components/share';
import { getProductById } from '@/apis/product';
import { mapState } from 'vuex';
import { getValidCoupons, receiveCoupon } from '@/apis/user';
import { format } from 'date-fns';
import detail from '@/pages/detail/detail.vue';

export default {
	components: {
		share,
	},
	data() {
		return {
			detail: {},
			specClass: 'none',
			specSelected: [],

			favorite: true,
			shareList: [],
			// 主图
			imgList: [],
			/**
			 * 属性分类：
			 * @example [{
			 * 	name: string,
			 * 	values: [{value: string, selected: boolean}]
			 * }]
			 */
			specList: [],
			couponList: [],
			couponState: 0,
			count: 1,
			couponStatusMapping: {
				NOT_STARTED: '未开始',
				ONGOING: '进行中',
			},
			salePrice: 0,
		};
	},
	computed: {
		...mapState(['hasLogin']),
	},
	filters: {
		scope(scope) {
			switch (scope) {
				case 'ALL':
					return '全场通用';
				case 'CATEGORY':
					return '指定分类商品可用';
				case 'PRODUCT':
					return '指定商品可用';
				default:
					return '';
			}
		},
	},
	async onLoad(options) {
		//接收传值,id里面放的是标题，因为测试数据并没写id
		let id = options.id;
		if (id) {
			const { data: detail } = await getProductById(id);
			console.log('[detail:] ', detail);
			this.detail = detail;
			if (detail) {
				this.imgList = detail.coverUrls;
				this.desc = detail.desc;
				// 设置商品规格
				if (detail.skus) {
					this.specList =
						detail.skus[0]?.props.map((it) => ({
							id: it.name,
							name: it.displayName || it.name,
						})) || [];
					if (!this.specList.length) {
						return;
					}
					this.specList.forEach((prop) => {
						detail.skus.forEach((sku) => {
							if (!prop.values) {
								prop.values = [];
							}
							const propValue = sku.props.find((it) => it.name === prop.id).value;
							if (!prop.values.find((it) => it.value === propValue)) {
								prop.values.push({
									value: propValue,
								});
							}
						});
					});
				}
			}
		}

		//规格 默认选中第一条
		if (this.specList.length) {
			this.selectSpec(0, this.specList[0].values);
			this.selectSpec(0, this.specList[1].values);
		}

		this.shareList = await this.$api.json('shareList');
	},
	methods: {
		format,
		//规格弹窗开关
		toggleSpec() {
			if (this.specClass === 'show') {
				this.specClass = 'hide';
				setTimeout(() => {
					this.specClass = 'none';
				}, 250);
			} else if (this.specClass === 'none') {
				this.specClass = 'show';
			}
		},
		//优惠券弹窗开关
		async toggleCoupon(type) {
			if (type === 'show') {
				const { data: coupons } = await getValidCoupons(this.detail.id);
				this.couponList = coupons;
			}
			if (!this.couponList || !this.couponList.length) {
				await uni.showToast({
					title: '暂无可领优惠券',
					icon: 'none',
				});
				return;
			}
			let timer = type === 'show' ? 10 : 300;
			let state = type === 'show' ? 1 : 0;
			this.couponState = 2;
			setTimeout(() => {
				this.couponState = state;
			}, timer);
		},
		// 领取优惠券
		async receiveCoupon(coupon) {
			await receiveCoupon(coupon.id);
			await uni.showToast({
				title: '领取成功',
				icon: 'none',
			});
		},
		//选择规格
		selectSpec(index, list) {
			list.forEach((item) => {
				this.$set(item, 'selected', false);
			});

			this.$set(list[index], 'selected', true);
			//存储已选择
			/**
			 * 修复选择规格存储错误
			 * 将这几行代码替换即可
			 * 选择的规格存放在specSelected中
			 */
			this.specSelected = [];
			this.specList.forEach((item) => {
				const selected = item.values.find((it) => it.selected);
				if (selected) {
					this.specSelected.push(selected);
				}
			});
		},
		//获取选中的sku
		getSelectedSku() {
			if (!this.detail.skus) return;
			return this.detail.skus.find((sku) => {
				return sku.props.every((prop) => {
					return this.specSelected.some((selected) => {
						return selected.value === prop.value;
					});
				});
			});
		},
		// 数量加减
		blurNum() {
			if (this.count < 1) {
				this.count = 1;
			}
		},
		//分享
		share() {
			this.$refs.share.toggleMask();
		},
		//收藏
		toFavorite() {
			this.favorite = !this.favorite;
		},
		buy() {
			if (!this.checkForLogin()) {
				return;
			}
			let selectedSku;
			if (this.detail.skus) {
				this.detail.skus.forEach((sku) => {
					if (
						sku.props.every((prop) => this.specSelected.some((selected) => selected.value === prop.value))
					) {
						selectedSku = sku;
					}
				});
			}
			if (selectedSku) {
				uni.navigateTo({
					url: `/pages/order/createOrder?products=[{"id":${this.detail.id},"count":${this.count},"skuId":${selectedSku.id}}]`,
				});
			} else {
				uni.navigateTo({
					url: `/pages/order/createOrder?products=[{"id":${this.detail.id},"count":${this.count}}]`,
				});
			}
		},
		stopPrevent() {},
		addToCart() {
			if (!this.checkForLogin()) {
				return;
			}
			uni.showToast({
				title: '模拟加入购物车成功',
				icon: 'none',
			});
		},
		checkForLogin() {
			if (!this.hasLogin) {
				uni.showModal({
					title: '提示',
					content: '您还未登录，是否前往登录？',
					confirmText: '前往登录',
					cancelText: '暂不登录',
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/public/login',
							});
						}
					},
				});
				return false;
			} else {
				return true;
			}
		},
	},
};
</script>

<style lang="scss">
page {
	background: $page-color-base;
	padding-bottom: 160upx;
}
.coupon-status {
	display: inline-block;
	padding: 2upx 10upx;
	color: #fff;
	border-radius: 10upx;
	font-size: $font-sm;
	margin-left: 10upx;
}
.coupon-status__NOT_STARTED {
	background: $uni-color-primary;
}
.coupon-status__ONGOING {
	background: $uni-color-success;
}
.icon-you {
	font-size: $font-base + 2upx;
	color: #888;
}
.carousel {
	height: 722upx;
	position: relative;
	swiper {
		height: 100%;
	}
	.image-wrapper {
		width: 100%;
		height: 100%;
	}
	.swiper-item {
		display: flex;
		justify-content: center;
		align-content: center;
		height: 750upx;
		overflow: hidden;
		image {
			width: 100%;
			height: 100%;
		}
	}
}

.num {
	display: flex;
	align-items: center;
	margin-top: 10upx;
	.num-input {
		width: 80upx;
		border: 1px solid #ccc;
		border-radius: 10upx;
		font-size: 12px;
		padding: 5upx;
		box-sizing: content-box;
	}
	.jj {
		width: 40upx;
		text-align: center;
		border: 1px solid #ccc;
		height: 40upx;
		border-radius: 5upx;
		box-sizing: border-box;
		line-height: 30upx;
	}
	.minus {
		margin-right: 30upx;
	}
	.plus {
		margin-left: 30upx;
	}
}

/* 优惠券面板 */
.mask {
	display: flex;
	align-items: flex-end;
	position: fixed;
	left: 0;
	top: var(--window-top);
	bottom: 0;
	width: 100%;
	background: rgba(0, 0, 0, 0);
	z-index: 100;
	transition: 0.3s;

	.mask-content {
		width: 100%;
		min-height: 30vh;
		max-height: 70vh;
		background: #f3f3f3;
		transform: translateY(100%);
		transition: 0.3s;
		overflow-y: scroll;
	}
	&.none {
		display: none;
	}
	&.show {
		background: rgba(0, 0, 0, 0.4);

		.mask-content {
			transform: translateY(0);
		}
	}
}
/* 优惠券列表 */
.coupon-item {
	display: flex;
	flex-direction: column;
	margin: 20upx 24upx;
	background: #fff;
	.con {
		display: flex;
		align-items: center;
		position: relative;
		height: 140upx;
		padding: 0 30upx;
		&:after {
			position: absolute;
			left: 0;
			bottom: 0;
			content: '';
			width: 100%;
			height: 0;
			border-bottom: 1px dashed #f3f3f3;
			transform: scaleY(50%);
		}
	}
	.left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1;
		overflow: hidden;
		height: 120upx;
	}
	.title {
		font-size: 32upx;
		color: $font-color-dark;
		margin-bottom: 10upx;
	}
	.time {
		font-size: 24upx;
		color: $font-color-light;
	}
	.right {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 26upx;
		color: $font-color-base;
		height: 120upx;
	}
	.price {
		font-size: 44upx;
		color: $base-color;
		&:before {
			content: '￥';
			font-size: 34upx;
		}
	}
	.tips {
		font-size: 24upx;
		color: $font-color-light;
		line-height: 60upx;
		padding-left: 30upx;
	}
	.circle {
		position: absolute;
		left: -6upx;
		bottom: -10upx;
		z-index: 10;
		width: 20upx;
		height: 20upx;
		background: #f3f3f3;
		border-radius: 100px;
		&.r {
			left: auto;
			right: -6upx;
		}
	}
}

/* 标题简介 */
.introduce-section {
	background: #fff;
	padding: 20upx 30upx;

	.title {
		font-size: 32upx;
		color: $font-color-dark;
		height: 50upx;
		line-height: 50upx;
	}
	.price-box {
		display: flex;
		align-items: baseline;
		height: 64upx;
		padding: 10upx 0;
		font-size: 26upx;
		color: $uni-color-primary;
	}
	.price {
		font-size: $font-lg + 2upx;
	}
	.m-price {
		margin: 0 12upx;
		color: $font-color-light;
		text-decoration: line-through;
	}
	.coupon-tip {
		align-items: center;
		padding: 4upx 10upx;
		background: $uni-color-primary;
		font-size: $font-sm;
		color: #fff;
		border-radius: 6upx;
		line-height: 1;
		transform: translateY(-4upx);
	}
	.bot-row {
		display: flex;
		align-items: center;
		height: 50upx;
		font-size: $font-sm;
		color: $font-color-light;
		text {
			flex: 1;
		}
	}
}
/* 分享 */
.share-section {
	display: flex;
	align-items: center;
	color: $font-color-base;
	background: linear-gradient(left, #fdf5f6, #fbebf6);
	padding: 12upx 30upx;
	.share-icon {
		display: flex;
		align-items: center;
		width: 70upx;
		height: 30upx;
		line-height: 1;
		border: 1px solid $uni-color-primary;
		border-radius: 4upx;
		position: relative;
		overflow: hidden;
		font-size: 22upx;
		color: $uni-color-primary;
		&:after {
			content: '';
			width: 50upx;
			height: 50upx;
			border-radius: 50%;
			left: -20upx;
			top: -12upx;
			position: absolute;
			background: $uni-color-primary;
		}
	}
	.icon-xingxing {
		position: relative;
		z-index: 1;
		font-size: 24upx;
		margin-left: 2upx;
		margin-right: 10upx;
		color: #fff;
		line-height: 1;
	}
	.tit {
		font-size: $font-base;
		margin-left: 10upx;
	}
	.icon-bangzhu1 {
		padding: 10upx;
		font-size: 30upx;
		line-height: 1;
	}
	.share-btn {
		flex: 1;
		text-align: right;
		font-size: $font-sm;
		color: $uni-color-primary;
	}
	.icon-you {
		font-size: $font-sm;
		margin-left: 4upx;
		color: $uni-color-primary;
	}
}

.c-list {
	font-size: $font-sm + 2upx;
	color: $font-color-base;
	background: #fff;
	.c-row {
		display: flex;
		align-items: center;
		padding: 20upx 30upx;
		position: relative;
	}
	.tit {
		width: 140upx;
	}
	.con {
		flex: 1;
		color: $font-color-dark;
		.selected-text {
			margin-right: 10upx;
		}
	}
	.bz-list {
		height: 40upx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		text {
			display: inline-block;
			margin-right: 30upx;
		}
	}
	.con-list {
		flex: 1;
		display: flex;
		flex-direction: column;
		color: $font-color-dark;
		line-height: 40upx;
	}
	.red {
		color: $uni-color-primary;
	}
}

/* 评价 */
.eva-section {
	display: flex;
	flex-direction: column;
	padding: 20upx 30upx;
	background: #fff;
	margin-top: 16upx;
	.e-header {
		display: flex;
		align-items: center;
		height: 70upx;
		font-size: $font-sm + 2upx;
		color: $font-color-light;
		.tit {
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right: 4upx;
		}
		.tip {
			flex: 1;
			text-align: right;
		}
		.icon-you {
			margin-left: 10upx;
		}
	}
}
.eva-box {
	display: flex;
	padding: 20upx 0;
	.portrait {
		flex-shrink: 0;
		width: 80upx;
		height: 80upx;
		border-radius: 100px;
	}
	.right {
		flex: 1;
		display: flex;
		flex-direction: column;
		font-size: $font-base;
		color: $font-color-base;
		padding-left: 26upx;
		.con {
			font-size: $font-base;
			color: $font-color-dark;
			padding: 20upx 0;
		}
		.bot {
			display: flex;
			justify-content: space-between;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}
}
/*  详情 */
.detail-desc {
	background: #fff;
	margin-top: 16upx;
	.d-header {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80upx;
		font-size: $font-base + 2upx;
		color: $font-color-dark;
		position: relative;

		text {
			padding: 0 20upx;
			background: #fff;
			position: relative;
			z-index: 1;
		}
		&:after {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translateX(-50%);
			width: 300upx;
			height: 0;
			content: '';
			border-bottom: 1px solid #ccc;
		}
	}
	img {
		width: 100% !important;
		height: auto !important;
		display: block !important;
	}
}

/* 规格选择弹窗 */
.attr-content {
	padding: 10upx 30upx;
	.a-t {
		display: flex;
		image {
			width: 170upx;
			height: 170upx;
			flex-shrink: 0;
			margin-top: -40upx;
			border-radius: 8upx;
		}
		.right {
			display: flex;
			flex-direction: column;
			padding-left: 24upx;
			font-size: $font-sm + 2upx;
			color: $font-color-base;
			line-height: 42upx;
			.price {
				font-size: $font-lg;
				color: $uni-color-primary;
				margin-bottom: 10upx;
			}
			.selected-text {
				margin-right: 10upx;
			}
		}
	}
	.attr-list {
		display: flex;
		flex-direction: column;
		font-size: $font-base + 2upx;
		color: $font-color-base;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.item-list {
		padding: 20upx 0 0;
		display: flex;
		flex-wrap: wrap;
		text {
			display: flex;
			align-items: center;
			justify-content: center;
			background: #eee;
			margin-right: 20upx;
			margin-bottom: 20upx;
			border-radius: 100upx;
			min-width: 60upx;
			height: 60upx;
			padding: 0 20upx;
			font-size: $font-base;
			color: $font-color-dark;
		}
		.selected {
			background: #fbebee;
			color: $uni-color-primary;
		}
	}
}

/*  弹出层 */
.popup {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 99;

	&.show {
		display: block;
		.mask {
			animation: showPopup 0.2s linear both;
		}
		.layer {
			animation: showLayer 0.2s linear both;
		}
	}
	&.hide {
		.mask {
			animation: hidePopup 0.2s linear both;
		}
		.layer {
			animation: hideLayer 0.2s linear both;
		}
	}
	&.none {
		display: none;
	}
	.mask {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		background-color: rgba(0, 0, 0, 0.4);
	}
	.layer {
		position: fixed;
		z-index: 99;
		bottom: 0;
		width: 100%;
		min-height: 40vh;
		border-radius: 10upx 10upx 0 0;
		background-color: #fff;
		.btn {
			height: 66upx;
			line-height: 66upx;
			border-radius: 100upx;
			background: $uni-color-primary;
			font-size: $font-base + 2upx;
			color: #fff;
			margin: 30upx auto 20upx;
		}
	}
	@keyframes showPopup {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes hidePopup {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes showLayer {
		0% {
			transform: translateY(120%);
		}
		100% {
			transform: translateY(0%);
		}
	}
	@keyframes hideLayer {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(120%);
		}
	}
}

/* 底部操作菜单 */
.page-bottom {
	position: fixed;
	left: 30upx;
	bottom: 30upx;
	z-index: 95;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 690upx;
	height: 100upx;
	background: rgba(255, 255, 255, 0.9);
	box-shadow: 0 0 20upx 0 rgba(0, 0, 0, 0.5);
	border-radius: 16upx;

	.p-b-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: $font-sm;
		color: $font-color-base;
		width: 96upx;
		height: 80upx;
		.yticon {
			font-size: 40upx;
			line-height: 48upx;
			color: $font-color-light;
		}
		&.active,
		&.active .yticon {
			color: $uni-color-primary;
		}
		.icon-fenxiang2 {
			font-size: 42upx;
			transform: translateY(-2upx);
		}
		.icon-shoucang {
			font-size: 46upx;
		}
	}
	.action-btn-group {
		display: flex;
		height: 76upx;
		border-radius: 100px;
		overflow: hidden;
		box-shadow: 0 20upx 40upx -16upx #fa436a;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
		background: linear-gradient(to right, #ffac30, #fa436a, #f56c6c);
		margin-left: 20upx;
		position: relative;
		&:after {
			content: '';
			position: absolute;
			top: 50%;
			right: 50%;
			transform: translateY(-50%);
			height: 28upx;
			width: 0;
			border-right: 1px solid rgba(255, 255, 255, 0.5);
		}
		.action-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 180upx;
			height: 100%;
			font-size: $font-base;
			padding: 0;
			border-radius: 0;
			background: transparent;
		}
	}
}
</style>
