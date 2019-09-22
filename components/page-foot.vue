<template name="page-foot">
	<view class="page-share-title">
	</view>
</template>

<script>
	export default {
		name: "page-foot",
		props: {
			name: {
				type: String,
				default: ""
			}
		}
	}
</script>
<style>
	.page-share-title {
		text-align: center;
		font-size: 30upx;
		color: #BEBEBE;
		padding: 20upx 0;
	}

	.submit {
		border-bottom: 1upx solid #BEBEBE;
	}
</style>
