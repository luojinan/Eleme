<template>
<div class="home-gallary_wrapper" ref="wrapper">
	<div class="home-gallary" >
		<div class="home-gallary_name">{{seller.name}}</div>
		<div class="home-gallary_score">{{seller.score}}</div>
		<div class="home-gallary_title">
			<div class="home-gallary_title--line"></div>
			<div class="home-gallary_title--text">优惠信息</div>
			<div class="home-gallary_title--line"></div>
		</div>
		<ul class="home-gallary_supports">
			<li class="home-gallary_supports--item" v-if="seller.supports" v-for="(item,index) in seller.supports">
				{{item.description}}
			</li>
		</ul>

		<div class="home-gallary_title">
			<div class="home-gallary_title--line"></div>
			<div class="home-gallary_title--text">优惠信息</div>
			<div class="home-gallary_title--line"></div>
		</div>
		<ul class="home-gallary_supports">
			<li class="home-gallary_supports--item" v-if="seller.supports" v-for="(item,index) in seller.supports">
				{{item.description}}
			</li>
		</ul><div class="home-gallary_title">
			<div class="home-gallary_title--line"></div>
			<div class="home-gallary_title--text">优惠信息</div>
			<div class="home-gallary_title--line"></div>
		</div>
		<ul class="home-gallary_supports">
			<li class="home-gallary_supports--item" v-if="seller.supports" v-for="(item,index) in seller.supports">
				{{item.description}}
			</li>
		</ul><div class="home-gallary_title">
			<div class="home-gallary_title--line"></div>
			<div class="home-gallary_title--text">优惠信息</div>
			<div class="home-gallary_title--line"></div>
		</div>
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
			<div calss="home-gallary_bulletin--text">{{seller.bulletin}}</div>
		</div>
		<span class="home-gallary_close" @click="handleGallaryClose">X</span>
	</div>
</div>
</template>

<script>
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
	methods:{
		handleGallaryClose(){
			this.$emit('close') //点击创建自定义事件，用于组件传值
		}
	},
	//挂载实例类插件，写生命周期中
	mounted(){
		this.scroll = new BScroll(this.$refs.wrapper)
	},
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
		text-align: center;
	}
/*标题样式*/
	.home-gallary_title{
		display: flex;
		width: 90%;
		margin:28px auto 24px auto;
	}
	.home-gallary_title--line{
		flex: 1;
		position: relative;
		top:-6px;
		border-bottom: 1px solid rgba(255,255,255,0.2);
	}
	.home-gallary_title--line{
		font-size: 14px;
		margin: 0 12px;
		font-weight: 700;
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
		bottom: 10px;
		left: 45%;	/*无法居中，也无法计算 50%-16px */
		width: 32px;
		height: 32px;
		font-size: 32px;
		color: rgba(255,255,255,0.5);
	}
</style>