<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view
				v-for="item in flist"
				:key="item.id"
				class="f-item b-b"
				:class="{ active: item.id === currentId }"
				@click="tabtap(item)"
			>
				{{ item.name }}
			</view>
		</scroll-view>
		<scroll-view
			scroll-with-animation
			scroll-y
			class="right-aside"
			@scroll="asideScroll"
			:scroll-top="tabScrollTop"
		>
			<view class="s-list" v-if="slist.length">
				<view @click="navToList(item.id)" class="s-item" v-for="item in slist" :key="item.id">
					<image :src="item.picture || require('../../static/temp/cate1.jpg')"></image>
					<text>{{ item.name }}</text>
				</view>
			</view>
			<view class="s-list" v-else>
				<view class="no-data">No Data</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { getCategoryList } from '@/apis/home';

export default {
	data() {
		return {
			sizeCalcState: false,
			tabScrollTop: 0,
			currentId: 1,
			flist: [],
			slist: [],
			tlist: [],
		};
	},
	onLoad() {
		this.loadData();
	},
	methods: {
		async loadData() {
			const {
				data: { elements: categoryList },
			} = await getCategoryList();
			this.flist = categoryList;
			if (categoryList && categoryList.length) {
				this.currentId = categoryList[0].id;
				this.slist = categoryList[0].children;
			}
		},
		//一级分类点击
		tabtap(item) {
			this.currentId = item.id;
			this.slist = item.children;
			// let index = this.slist.findIndex((sitem) => sitem.pid === item.id);
			// this.tabScrollTop = this.slist[index].top;
		},
		//右侧栏滚动
		asideScroll(e) {
			if (!this.sizeCalcState) {
				this.calcSize();
			}
			let scrollTop = e.detail.scrollTop;
			let tabs = this.slist.filter((item) => item.top <= scrollTop).reverse();
			if (tabs.length > 0) {
				this.currentId = tabs[0].pid;
			}
		},
		//计算右侧栏每个tab的高度等信息
		calcSize() {
			let h = 0;
			this.slist.forEach((item) => {
				let view = uni.createSelectorQuery().select('#main-' + item.id);
				view.fields(
					{
						size: true,
					},
					(data) => {
						item.top = h;
						h += data.height;
						item.bottom = h;
					},
				).exec();
			});
			this.sizeCalcState = true;
		},
		navToList(sid, tid) {
			uni.navigateTo({
				url: `/pages/product/list?fid=${this.currentId}&sid=${sid}&tid=${tid}`,
			});
		},
	},
};
</script>

<style lang="scss">
page,
.content {
	height: 100%;
	background-color: #f8f8f8;
}

.content {
	display: flex;
}

.left-aside {
	flex-shrink: 0;
	width: 200upx;
	height: 100%;
	background-color: #fff;
}

.f-item {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100upx;
	font-size: 28upx;
	color: $font-color-base;
	position: relative;

	&.active {
		color: $base-color;
		background: #f8f8f8;

		&:before {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			height: 36upx;
			width: 8upx;
			background-color: $base-color;
			border-radius: 0 4px 4px 0;
			opacity: 0.8;
		}
	}
}

.right-aside {
	flex: 1;
	overflow: hidden;
	padding-left: 20upx;
}

.s-list {
	position: relative;
	top: 20upx;
	//margin-top: 20upx;
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	background: #fff;
	padding-top: 12upx;

	&:after {
		content: '';
		flex: 99;
		height: 0;
	}
}

.s-item {
	flex-shrink: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 176upx;
	font-size: 26upx;
	color: #666;
	padding-bottom: 20upx;

	image {
		width: 140upx;
		height: 140upx;
	}
}
.no-data {
	width: 100%;
	text-align: center;
	color: #ccc;
	font-size: 14px;
}
</style>
