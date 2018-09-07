<template>
	<div class="home">
		<home-header :seller="seller"></home-header>
		<home-tab></home-tab>
		<home-goods :seller="seller" :goods="goods"></home-goods>
		<home-shopcart :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></home-shopcart>
	</div>
</template>

<script>
//引入axios插件
import axios from 'axios'
import HomeHeader from './components/HomeHeader'
import HomeTab from './components/HomeTab'
import HomeGoods from './components/HomeGoods'
import HomeShopcart from './components/HomeShopcart'

export default{
	name:'Home',
	data:function(){
		return {
			seller:{},
			goods:[],
		}
	},
	computed:{
		//计算属性传值给子组件
		selectFoods(){
			let foods = [] ;
			this.goods.forEach((good) => {
				good.foods.forEach((food) => {
					if(food.count){
						foods.push(food)
					}
				})
			}) ;
			return foods ;
		}
	},
	components:{
		HomeHeader,
		HomeTab,
		HomeGoods,
		HomeShopcart
	},
	//组件方法对象
	methods:{
		//axios获取json数据方法
		getHomeInfo(){
			axios.get('/api/data.json').then(this.getHomeInfoSucc)
		},
		//成功获取json数据的回调函数
		getHomeInfoSucc(res){
			//测试一下
			//console.log(res.data.goods)
			const data = res.data	//减少json数据书写的层级
			//判断数据存在的情况下执行操作数据赋值
			if(res.data){
				this.seller = data.seller	//获取到的数据赋值给组件内数据data，或传入子组件
				this.goods = data.goods
			}
		}
	},
	//生命周期钩子，执行ajax方法
	created(){
			this.getHomeInfo()
		//console.log('获取数据的异步下面执行')
		//console.log(this.goods)
	}
	//传值给子组件时，数据有没有获取到？页面有内容啊！！！再哪一步传值给子组件的，如果传到了，生命周期里
}
</script>
<style>
	.home{
		
	}
</style>