export function requestOptions(url,method,contentType,responseType){
	 const options = {
		url:url,
		method:method || 'GET',
		header:{
			 'Content-Type': contentType || 'application/x-www-form-urlencoded;charset=UTF-8'
		},
		responseType: responseType || 'json'
	}
	return options;
}

export const uRequest = (requestOptions,data) => {
	return new Promise((resolve,reject) =>{
		uni.request({
			url:requestOptions.url,
			method:requestOptions.method,
			data:data,
			header:requestOptions.header,
			success: (res) => {
				if (requestOptions.responseType != 'json'){
					resolve(res);
			    }else{
					let response = res.data;
					resolve(response);
			    }
			},
			fail: (error) => {
				reject(error)
			}
		})
	})
}

