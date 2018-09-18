<template>
	<div class="home">
		<home-header :seller="seller"></home-header>
		<home-tab></home-tab>
		<keep-alive>
			<router-view :seller="seller" :goods="goods"/>
		</keep-alive>
	</div>
</template>

<script>
//引入axios插件
import axios from 'axios'
import HomeHeader from './components/HomeHeader'
import HomeTab from './components/HomeTab'
import {urlParse} from '@/common/js/url'

export default{
	name:'Home',
	data:function(){
		return {
			seller:{
				//id对象，回调函数
				id:(()=>{
					//获取hash的外部js模块方法
					let queryParam = urlParse()
					console.log('解析后的url'+queryParam.id)
					return queryParam.id
					//手动输入测试，获取到的是?id=12354&a=b，进行拆解使用
					//不懂这种前端输入请求干嘛，不是应该重获段获取到hash，直接是相应页面吗
				})()
			},
			goods:[]

		}
	},
	components:{
		HomeHeader,
		HomeTab,
	},
	methods:{
		//axios获取json数据方法
		getHomeInfo(){
			axios.get('/api/data.json').then(this.getHomeInfoSucc)
		},
		//成功获取json数据的回调函数
		getHomeInfoSucc(res){
			//测试一下
			//console.log(res.data.seller)
			const data = res.data	//减少json数据书写的层级
			//判断数据存在的情况下执行操作数据赋值
			if(res.data){
				this.seller = data.seller	//获取到的数据赋值给组件内数据data，或传入子组件
				this.goods = data.goods
			}
		},
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