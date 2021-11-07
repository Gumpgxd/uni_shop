const install = (Vue, vm) => {

	const isLogin = () => {
		const token = vm.vuex_token
		if (!token) {
			const currentPage = getCurrentPages().pop()
			//获取页面路径和请求参数
			const { route, options} = currentPage
			const optionsKeys = Object.keys(options)
			let params = ''
			if(optionsKeys.length !== 0) {
				params = optionsKeys.reduce((pre,current) => {
					return `${pre}${current}=${options[current]}&`
				},'?').slice(0,-1)
			}
			uni.setStorageSync('back_url',route + params)
			vm.$u.toast('请登录')
			setTimeout(() => {
				vm.$u.route({
					type: 'redirect',
					url: 'pages/auth/login'
				})
			}, 1500)
			return false
		}
		return true
	}

	vm.$u.utils = {
		isLogin
	}
}

export default {
	install
}
