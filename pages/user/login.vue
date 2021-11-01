<template>
		<u-form :model="user" ref="userForm" label-width=150 :border-bottom="true">
			<u-form-item prop="phone" label="手机号">
				<u-input type="text" v-model="user.phone" />
			</u-form-item>
			<u-form-item prop="password" label="密码">
				<u-input type="text" v-model="user.password" placeholder="请输入密码" />
			</u-form-item>
			<u-form-item >
				<u-button type="primary" @click="login">登录</u-button>
			</u-form-item>
		</u-form>
</template>

<script>
	import {login,getLoginUser} from '@/api/user.js'
	export default {
		name:'login',
		data() {
			return {
				user:{
					phone:'',
					password:''
				},
				rules:{
					phone:[
						{
							required: true,
							message: '请输入手机号码!',
							trigger: ['change','blur']
						},
						{
							validator:(rule,value,callback) => {
								console.log('validate')
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							trigger:['blur']
						}
					],
					password:[
						{
							required: true,
							message: '请输入密码!',
							trigger:['blur']
						}
					],
					
				}
			};
		},
		onReady() {
			// 需要在onReady中设置规则
			this.$refs.userForm.setRules(this.rules)
		},
		methods:{
			test(){
				
			},
			
			login(){
				this.$refs.userForm.validate(async(valid) => {
					if (!valid) {
						return;
					}
					let param={
						username:'springboot',
						password:'123456'
					}
					//登录
					let user1 =await login(param)
					console.log('user1',user1)
					let user2 =await getLoginUser();
					console.log('user2',user2)
					
					console.log('log',uni.getStorageSync("loginUser"))
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
