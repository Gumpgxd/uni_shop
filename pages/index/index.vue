<template>
	<view class="u-skeleton">
		<u-swiper :list="slides" height="350" name="img_url" class="u-skeleton-fillet"></u-swiper>
		<view class="u-text-center u-m-t-20 u-skeleton-rect">
			<u-tabs :list="sortList" bar-width="100" item-width="160" @change="changeSort" :current="currentSort">
			</u-tabs>
		</view>

		<u-row gutter="16">
			<u-col span="6" v-for="goods in goodsList.length !== 0?goodsList : [{},{},{},{}]">
				<goods-card :goods="goods"></goods-card>
			</u-col>
		</u-row>
		<!--引用组件-->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sortList: [{
						name: '默认'
					},
					{
						name: '销量'
					},
					{
						name: '推荐'
					},
					{
						name: '最新'
					}
				],
				currentSort: 0,
				slides: [],
				goodsList: [],
				page: 1,
				loading:false
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			async getData() {
				this.loading = true
				const params = {
					page: this.page
				}
				if (this.currentSort == 1) params.sales = 1
				if (this.currentSort == 2) params.recommend = 1
				if (this.currentSort == 3) params.new = 1
				const res = await this.$u.api.index(params)
				this.loading = false
				this.slides = res.slides
				this.goodsList = [...this.goodsList, ...res.goods.data]
			},
			changeSort(index) {
				this.currentSort = index
				//判断筛选条件
				this.goodsList = []
				this.page = 1
				this.getData()
			},
			onReachBottom() {
				this.page = this.page + 1
				this.getData()
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
