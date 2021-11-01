const baseUrl = 'http://localhost:8080/';

const requireAuthPages=[
	'/pages/tabBar/user/center'
]
//添加请求响应拦截器
uni.addInterceptor('request', {
	invoke(args) {
		args.url = baseUrl+args.url
	},

	success(args) {
		// 请求成功后，修改code值为1
		args.data.code = 1

	},

	fail(err) {
		console.log('interceptor-fail',err)
	}, 
	complete(res) {
		// console.log('interceptor-complete',res)
	}
	  
})

const routerInterceptor = {
	invoke(args){
		if(requireAuthPages.indexOf(args.url) != -1){
			uni.navigateTo({
				url:"/pages/user/login",
				success() {
					uni.showToast({
						title:"请先进行登录!",
						icon:"none"
					})
				}
			})
		}
	}
}

//添加页面跳转拦截器
uni.addInterceptor('switchTab', routerInterceptor)
uni.addInterceptor('navigateTo', routerInterceptor)
uni.addInterceptor('redirectTo', routerInterceptor)
uni.addInterceptor('reLaunch', routerInterceptor)


