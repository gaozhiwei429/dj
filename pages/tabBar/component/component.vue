<template>
	<view class="uni-padding-wrap uni-common-pb">
		<view style="width: 660upx;text-align: center;color: #918984;">清除launchFlag值进行测试，H5端刷新浏览器，APP端会重启APP。</view>
		<view class="out-btn" @tap="outBtn()">清除launchFlag值</view>
		<view class="uni-header-logo">
			<image src="../../../static/componentIndex.png"></image>
		</view>
		<view class="uni-hello-text uni-common-pb">
			以下将展示uni-app官方组件能力，组件样式仅供参考，开发者可根据自身需求自定义组件样式，具体属性参数详见uni-app开发文档。
		</view>
		<view class="uni-card" v-for="(list,index) in lists" :key="index">
			<view class="uni-list">
				<view class="uni-list-cell uni-collapse">
					<view class="uni-list-cell-navigate uni-navigate-bottom" hover-class="uni-list-cell-hover" :class="list.open ? 'uni-active' : ''"
					 @click="triggerCollapse(index)">
						{{list.name}}
					</view>
					<view class="uni-list uni-collapse" :class="list.open ? 'uni-active' : ''">
						<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,key) in list.pages" :key="key" @click="goDetailPage(item)">
							<view class="uni-list-cell-navigate uni-navigate-right"> {{item.name ? item.name : item}} </view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onShareAppMessage() {
			return {
				title: '欢迎体验uni-app',
				path: '/pages/tabBar/component/component'
			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '/pages/about/about'
			});
		},
		methods: {
			triggerCollapse(e) {
				if (!this.lists[e].pages) {
					this.goDetailPage(this.lists[e].url);
					return;
				}
				for (var i = 0; i < this.lists.length; ++i) {
					if (e === i) {
						this.lists[i].open = !this.lists[e].open;
					} else {
						this.lists[i].open = false;
					}
				}
			},
			goDetailPage(e) {
				if (typeof e === 'string') {
					uni.navigateTo({
						url: '/pages/component/' + e + '/' + e
					})
				} else {
					uni.navigateTo({
						url: e.url
					})
				}
			},
			outBtn: function(){
				uni.showModal({
					title: '清除launchFlag值',
					content: '确定要清除launchFlag值，进行重启测试？',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							// 清除缓存
							uni.clearStorage();
							// 两秒后重启
							// #ifdef APP-PLUS
							uni.showToast({
								icon: 'none',
								duration:3000,
								title: '清除成功2秒后重启'
							});
							setTimeout(function() {
								uni.hideToast();
								plus.runtime.restart();
							}, 2000);
							// #endif
							// 两秒后跳转
							// #ifdef H5 || MP-WEIXIN
							uni.showToast({
								icon: 'none',
								duration:3000,
								title: '清除成功2秒后刷新'
							});
							setTimeout(function() {
								uni.navigateTo({
									url: '/pages/index/index'
								});
							}, 2000);
							
							// #endif
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style>
	page {
		height: auto;
		min-height: 100%;
	}

	.uni-card {
		box-shadow: none;
	}

	.uni-list:after {
		height: 0;
	}

	.uni-list:before {
		height: 0;
	}
	.out-btn{
		width: 660upx;
		height: 80upx;
		margin: 0 auto;
		text-align: center;
		line-height: 80upx;
		background: #918984;
		color: #FFFFFF;
		border-radius: 40upx;
	}
</style>
