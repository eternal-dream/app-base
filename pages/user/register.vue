<template>
		<u-form :model="user" ref="userForm" label-width=150 :border-bottom="true">
			<u-form-item prop="phone" label="手机号">
				<u-input type="text" v-model="user.phone" />
			</u-form-item>
			<u-form-item prop="password" label="密码">
				<u-input type="password" v-model="user.password" placeholder="请输入密码(包含大小写字母以及数字)" />
			</u-form-item>
			<u-form-item prop="checkPwd" label="确认密码">
				<u-input type="password" v-model="user.checkPwd"  />
			</u-form-item>
			<u-form-item  prop="verifyCode" label="验证码">
				<u-input type="text" v-model="user.verifyCode" />
				<u-button slot="right" @click="sendCode" :disabled="wait > 0">{{wait > 0 ? wait + "秒后重试" : "发送验证码" }}</u-button>
			</u-form-item>
			<u-form-item >
					<u-button type="primary" @click="submit">提交</u-button>
			</u-form-item>
		</u-form>
</template>

<script>
	export default {
		name:'login',
		data() {
			return {
				wait:0,
				user:{
					phone:'',
					password:'',
					checkPwd:'',
					email:'',
					verifyCode:''
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
						},
						{
							min:6,
							message:'密码长度过短!',
							trigger:['blur']
						},
						{
							pattern:/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{8,}$/,
							message:'请输入包含大小写字母以及数字的密码',
							trigger:['blur']
						},
						// {
						// 	validator:(rule,value,callback) => {
						// 		this.$refs.userForm.validateField('cha')
						// 		if(this.user.checkPwd && value != this.user.checkPwd){
						// 			return false;
						// 		}
						// 		return true;
						// 	},
						// 	message:'两次输入的密码不一致!',
						// 	trigger:['blur']
						// }
					],
					checkPwd:[
						{
							required: true,
							message: '请输入确认密码!',
							trigger:['blur']
						},
						{
							validator:(rule,value,data,callback) => {
								if(value!=this.user.password){
									return false;
								}
								return true;
							},
							trigger:['blur'],
							message:'两次输入的密码不一致!'
						}
					],
					verifyCode:[
						{
							required: true,
							message: '请输入手机验证码!',
							trigger:['blur']
						},
					]
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
			sendCode(){
				if(!this.$u.test.mobile(this.user.phone)){
					uni.showToast({
						title:"请输入正确的手机号码!",
						icon:"none",
						duration: 2000
					})
					return;
				}
				this.wait = 60;
				let interval = setInterval(() => {
					this.wait--;
					if (this.wait <= 0) {
					  clearInterval(interval);
					}
				  }, 1000);
				//调用java发送手机验证码
				
			},
			submit(){
				this.$refs.userForm.validate(valid => {
					if (!valid) {
						return;
					}
					//注册
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
