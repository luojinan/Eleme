<template>
<div class="home-gallary_wrapper" ref="wrapper">
	<div class="home-gallary" >
		<div class="home-gallary_name">{{seller.name}}</div>
		<div class="home-gallary_score">{{seller.score}}</div>
		<gallary-title>优惠信息</gallary-title>
		<ul class="home-gallary_supports">
			<li class="home-gallary_supports--item" v-if="seller.supports" v-for="(item,index) in seller.supports">
				{{item.description}}
			</li>
		</ul>
		
		<!--假数据，测试滚动-->
		<gallary-title>优惠信息</gallary-title>
		<ul class="home-gallary_supports">
			<li class="home-gallary_supports--item" v-if="seller.supports" v-for="(item,index) in seller.supports">
				{{item.description}}
			</li>
		</ul><gallary-title>优惠信息</gallary-title>
		<ul class="home-gallary_supports">
			<li class="home-gallary_supports--item" v-if="seller.supports" v-for="(item,index) in seller.supports">
				{{item.description}}
			</li>
		</ul>


		<div class="home-gallary_title">
			<div class="home-gallary_title--line"></div>
			<div class="home-gallary_title--text">商家公告</div>
			<div class="home-gallary_title--line"></div>
		</div>
		<div class="home-gallary_bulletin">
			<div class="home-gallary_bulletin--text">{{seller.bulletin}}</div>
		</div>
		<span class="home-gallary_close" @click="handleGallaryClose">X</span>
	</div>
</div>
</template>

<script>
//引入标题小组件
import GallaryTitle from '@/common/GallaryTitle'

//引入滚动插件
import BScroll from 'better-scroll'


export default{
	name:'HomeGallary',
	data:function(){
		return {
			
		}
	},
	props:{
		seller:{
			type:Object
		}
	},
	components:{
		GallaryTitle
	},
	methods:{
		handleGallaryClose(){
			this.$emit('close') //点击创建自定义事件，用于组件传值
		},
		//解决better-scroll的bug
		_tryScroll(){
			console.log('执行方法')
			if(!this.scroll){
				console.log('创建dom滚动')
				this.$nextTick(()=>{
					this.scroll = new BScroll(this.$refs.wrapper)
				})	
			}else{
				console.log('刷新dom滚动')
				this.scroll.refresh()
			}
		}
	},
	//挂载实例类插件，写生命周期中
	mounted(){
		console.log('生命周期')
		this._tryScroll()	
	},
	watch:{
		'seller'(){
			console.log('2')
			this._tryScroll()
		}
	}
}
</script>
<style>
	.home-gallary_wrapper{		
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		overflow: hidden;
		background-color: rgba(7,17,27,0.8);


		z-index: 99;
	}
	.home-gallary{
		position: relative;	
		padding-top:48px;
		padding-bottom:120px;
	}

	.home-gallary_name{
		/*margin-top: 64px;*/
		font-size: 16px;
		line-height: 16px;
		font-weight: 700;
		text-align: center;
	}
	.home-gallary_score{
		margin-top: 16px;
		line-height: 24px;
		font-size: 24px;
		font-weight: 700;
		text-align: center;
		color: rgb(255,153,0);
	}
/*公告列表样式*/
	.home-gallary_supports{
		width: 80%;
		margin:0 auto;
	}
	.home-gallary_supports--item{
		margin-bottom: 12px;
		font-size: 10px;
		line-height: 12px;
	}
/*商家公告样式*/
	.home-gallary_bulletin{
		width: 80%;
		margin:0 auto;
	}
	.home-gallary_bulletin--text{
		font-size: 12px;
		line-height: 24px;
	}
/*关闭公告页面按钮*/
	.home-gallary_close{
		display: block;
		position: absolute;
		bottom: 20px;
		left: 40%;	/*无法居中，也无法计算 50%-16px */
		width: 48px;
		height: 48px;
		line-height: 48px;
		font-size: 32px;
		text-align: center;
		border-radius: 50%;
		background-color: rgba(255,255,255,0.3);
		color: #fff;
	}
</style>