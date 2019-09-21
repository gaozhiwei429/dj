<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image :src="logoImage"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main margin-top">
				<wInput
					v-model="phoneData"
					type="text"
					maxlength="11"
					placeholder="用户名/电话"
				></wInput>
				<wInput
					v-model="passData"
					type="password"
					maxlength="30"
					placeholder="密码"
				></wInput>
			</view>
			<!--<wButton 
				text="登 录"
				:rotate="isRotate" 
				@click.native="startLogin()"
			></wButton>-->
			
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg" :rotate="isRotate" @click.native="startLogin()">登 录</button>
			</view>
			<!-- 其他登录 -->
			<view class="other_login cuIcon">
				<view class="login_icon">
					<view class="cuIcon-weixin" @tap="login_weixin"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-weibo" @tap="login_weibo"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-github" @tap="login_github"></view>
				</view>
			</view>
			
			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="forget" open-type="navigate">找回密码</navigator>
				<text>|</text>
				<navigator url="register" open-type="navigate">注册账号</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	
	export default {
		data() {
			return {
				//logo图片 base64
				logoImage: 'data:image/png;base64,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',
				phoneData:'', //用户/电话
				passData:'', //密码
				isRotate: false, //是否加载旋转
				userdata:[],
			};
		},
		components:{
			wInput,
			wButton,
		},
		mounted() {
			_this= this;
			//this.isLogin();
		},
		methods: {
			isLogin(){
				//判断缓存中是否登录过，直接登录
				try {
					const value = uni.getStorageSync('setUserData');
					if (value) {
						//有登录信息
						console.log("已登录用户：",value);
						_this.$store.dispatch("setUserData",value); //存入状态
						uni.reLaunch({
							url: '../../pages/index/index',
						});
					}
				} catch (e) {
					// error
				}
			},
		    startLogin(){
				//登录
				if(_this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.length == "") {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '用户名不能为空'
				    });
				    return;
				}
		        if (this.passData.length < 5) {
		            uni.showToast({
		                icon: 'none',
						position: 'bottom',
		                title: '密码不正确'
		            });
		            return;
		        }
				//方式二  then/catch
				this.$request
				.post("/passport/user/login", {
					data: {
						username: this.phoneData,
						password: this.passData,
						source: 1,
						version: 1
					},
					dataType: 'json',
					responseType: 'text'
				})
				.then(res => {
					if(res.data.code == 0) {
						let userdata={
							"token":res.data.data.token,
							"username":res.data.data.username,
							"token":res.data.data.token,
							"user_id":res.data.data.user_id,
						} //保存用户信息和accesstoken
						_this.$store.dispatch("setUserData",userdata); //存入状态
						try {
							uni.setStorageSync('setUserData', userdata); //存入缓存
						} catch (e) {
							// error
						}
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: '登录成功'
						});
						_this.isRotate=true
						setTimeout(function(){
							uni.reLaunch({
								url: '../../pages/index/index',
							});
						},3000)
						return;
					} else if(res.data.code == 5001) {
						uni.showToast({
						    icon: 'none',
							position: 'bottom',
						    title: '登录状态异常'
						});
						_this.isRotate=false;
						return;
					} else {
						uni.showToast({
						    icon: 'none',
							position: 'bottom',
						    title: res.data.data.msg
						});
						_this.isRotate=false;
						return;
					}
				})
				.catch(error => {
					uni.hideLoading();
				})
		    },
			login_weixin() {
				//微信登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_weibo() {
				//微博登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_github() {
				//github登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>
<style >

	body{
		background: #FFFFFF !important;
	}
	
</style>