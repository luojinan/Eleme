<template>
	<div class="home">
		<home-header :seller="seller"></home-header>
		<home-tab></home-tab>
		<home-goods :seller="seller" :goods="goods"></home-goods>
	</div>
</template>

<script>
//引入axios插件
import axios from 'axios'
import HomeHeader from './components/HomeHeader'
import HomeTab from './components/HomeTab'
import HomeGoods from './components/HomeGoods'

export default{
	name:'Home',
	data:function(){
		return {
			seller:{},
			goods:[],
		}
	},
	components:{
		HomeHeader,
		HomeTab,
		HomeGoods
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
			console.log(res.data.goods)
			const data = res.data	//减少json数据书写的层级
			//判断数据存在的情况下执行操作数据赋值
			if(res.data){
				this.seller = data.seller	//获取到的数据赋值给组件内数据data，或传入子组件
				this.goods = data.goods
			}
		}
	},
	//生命周期钩子，执行ajax方法
	mounted(){
		this.getHomeInfo()
	},

}
</script>
<style>
	.home{
		
	}
</style>