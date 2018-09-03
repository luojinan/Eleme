<template>
	<div class="home-header">
		<div class="home-header_content">
			<div class="home-header_content--avatar">
				<img width="64" height="64" :src="seller.avatar">
			</div>
			<div class="home-header_content--text">
				<div class="home-header_content--title">
					<span calss="home-header_content--nameicon"></span>
					<span class="home-header_content--name">
						{{seller.name}}
					</span>
				</div>
				<div class="home-header_content--description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="home-header_content--support">
					<span calss="home-header_content--supporticon"></span>
					<span>{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="home-header_content--count" @click="handleGallaryOpen">
				<span class="home-header_content--num">{{seller.supports.length}}个</span>
				<span calss="home-header_content--numicon"></span>
			</div>
		</div>
		<div class="home-header_bulletin">
			<span class="home-header_bulletin--titleicon"></span>
			<span class="home-header_bulletin--text">
				{{seller.bulletin}}
			</span>
			<span class="home-header_bulletin--righticon"></span>
		</div>
		<div class="home-header_background">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		<fade-animation>
			<home-gallary :seller="seller" v-show="isShow" @close="handelGallaryClose"></home-gallary>
		</fade-animation>
	</div>
</template>

<script>
//引入axios插件
import axios from 'axios'
//引入公共组件公告页
import HomeGallary from '@/common/HomeGallary'
import FadeAnimation from '@/common/fade/FadeAnimation'

export default{
	name:'HomeHeader',
	props:{
		seller:{
			type:Object
		}
	},
	data:function(){
		return {
			isShow:false,
		}
	},
	components:{
		HomeGallary,
		FadeAnimation
	},
	methods:{
		//点击数量悬浮键打开公共组件
		handleGallaryOpen(){
			this.isShow = true
		},
		handelGallaryClose(){
			this.isShow = false
		}
	},
	

}
</script>
<style>
	.home-header{
		position: relative;
		color: #fff;
		background-color: rgba(7,17,27,0.5);
		overflow: hidden;
	}
	.home-header_content{
		position: relative;
		padding: 24px 12px 18px 24px;
		font-size: 0;	/*span之间会有空白字符，导致间隙，要消除*/
	}
/*header内容部分样式-头像、文字*/
	.home-header_content--avatar{
		display: inline-block; /*使div处于一行*/
		vertical-align: top;	/*顶部对齐*/
		font-size: 14px;
	}
	.home-header_content--text{
		display: inline-block;	/*使div处于一行*/
		font-size: 14px;
		margin-left: 16px;
	}
	.home-header_content--title{
		margin:2px 0 8px 0;
	}
	.home-header_content--nameicon{
		display: inline-block;	/*span行内元素，变为块才能设置宽高*/
		width: 30px;
		height: 18px;
	}
	.home-header_content--name{
		margin-left: 6px;
		font-size: 16px;
		line-height: 18px;
		font-weight: bold;
	}
	.home-header_content--description{
		margin-bottom: 10px;
		line-height: 12px;
		font-size: 12px;
	}
	.home-header_content--supporticon{
		display: inline-block;
		width: 12px;
		height: 12px;
		margin-right: 4px;
		vertical-align: top;
	}
	.home-header_content--support{
		line-height: 12px;
		font-size: 10px;
	}
/*优惠数量悬浮键*/
	.home-header_content--count{
		position: absolute;
		right: 12px;
		bottom: 18px;
		padding: 0 8px;
		height: 24px;
		line-height: 24px;
		border-radius: 14px;
		background-color: rgba(0,0,0,0.2);
		text-align: center;
	}
	.home-header_content--num{
		font-size: 10px;
	}
	.home-header_content--numicon{
		
	}
/*公告部分样式*/
	.home-header_bulletin{
		height: 28px;
		line-height: 28px;
		padding: 0 22px 0 12px;
		white-space: nowrap;	/*省略号*/
		overflow: hidden;	/*隐藏内容*/
		text-overflow: ellipsis;	/*省略号*/
		background-color: rgba(7,17,27,0.2);
	}
	.home-header_bulletin--text{
		font-size: 10px;
		margin:0 4px;
	}
/*背景图片，利用绝对定位和置于底层实现*/
	.home-header_background{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;	/*置于底层*/
		filter: blur(10px); /*模糊图片样式*/
	}
</style>