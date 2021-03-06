// /common/http.api.js

// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	vm.$u.api = {}
	
	// 此处没有使用传入的params参数
	vm.$u.api.index = (params = {}) => {
		return vm.$u.get("/api/index", params)
	};
	
	vm.$u.api.authLogin = params => {
		return vm.$u.post('/api/auth/login',params)
	}
	
	vm.$u.api.userInfo = () => {
		return vm.$u.get('/api/user')
	}
	
	vm.$u.api.authRegister = params => {
		return vm.$u.post('/api/auth/register',params)
	}
}

export default {
	install
}