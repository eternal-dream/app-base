<template>
	<view >
		<button type="default" @click="switchT">测试1</button>
		<button type="default" v-has="'test'" @click="test">测试2</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			switchT(){
				uni.switchTab({
					url:'/pages/tabBar/user/center'
				})
			},
			test(){
				
			}
		}
	}
</script>

<style lang="scss">

</style>
