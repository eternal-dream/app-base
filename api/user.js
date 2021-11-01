import {uRequest,requestOptions} from '@/utils/request.js'
/**
 * 注意:使用此方法必须要加上await关键字，否则无法获取返回值 例: let user = await login(user);
 */
export const login = async(user) => {
	let loginUser = {}
	await uRequest(requestOptions('front/users/login','POST'),user)
	.then(res=>{
		if(!res.success){
			uni.showToast({
				icon:'none',
				title:res.msg
			})
			return;
		}
		uni.setStorage({
			key:'loginUser',
			data:res.currentUser
		})
		loginUser=res.currentUser
	})
	return loginUser;
}

/**
 * 注意:使用此方法必须要加上await关键字，否则无法获取返回值 例: let user = await getLoginUser();
 */
export async function getLoginUser() {
	return uni.getStorageSync("loginUser");
}