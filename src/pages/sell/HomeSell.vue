<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
		<!--商家页面头部-->
			<div class="seller-content_overview">
				<h1>{{seller.name}}</h1>
				<div class="seller-content_overview-desc">
					<span>{{seller.score}}</span>
					<span>（{{seller.ratingCount}}）</span>
					<span>月售{{seller.sellCount}}单</span>
				</div>
				<ul>
					<li>
						<h2>起送价</h2>
						<p><span>{{seller.minPrice}}</span>元</p>
					</li>
					<li>
						<h2>商家配送</h2>
						<p><span>{{seller.deliveryPrice}}</span>元</p>
					</li>
					<li>
						<h2>平均配送时间</h2>
						<p><span>{{seller.deliveryTime}}</span>分钟</p>
					</li>
				</ul>
				<span 
					class="seller-content_overview--icon"
					:class="{'seller-content_overview--favorite':favorite}"
					@click="handleFavorite"
				>♥<p>{{favoriteText}}</p></span>
			</div>
			
			<split></split>

		<!--商家页面公告-->
			<div class="seller-content_bulletin">
				<h1>公告与活动</h1>
				<p>{{seller.bulletin}}</p>
			</div>

		<!--商家页面优惠列表-->
			<ul class="seller-content_supports">
				<li 
					class="seller-content-supports--item" 
					v-for="(item,index) in seller.supports"
				>
					{{item.description}}
				</li>
			</ul>

			<split></split>

		<!--商家页面商家实景-->
			<div class="seller-content_pics">
				<h1>商家实景</h1>
				<div ref="picsroll">
					<ul ref="picsul">
						<li v-for="item of seller.pics">
							<img :src="item" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>

			<split></split>

		<!--商家信息-->
			<div class="seller-content_info">
				<h1>商家信息</h1>
				<ul>
					<li v-for="item of seller.infos">{{item}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import split from "@/common/split"
import BScroll from "better-scroll"

export default {
	name:'seller',
	props:{
		seller:{
			type:Object
		}
	},
	data(){
		return{
			favorite:true
		}		
	},
	components:{
		split
	},
	methods:{
		//创建better-scroll，判断是否有
		_initScroll(){
			if(!this.scroll){
				this.scroll = new BScroll(this.$refs.seller)
			}else{
				this.scroll.refresh();
			}
		},
		//创建better-scroll，判断是否有
		_picsScroll(){
			//因为hidden了ul，所以这里还原它的宽度
			if(this.seller.pics){
				let picWidth = 120;
				let margin = 6;
				let width = (picWidth+margin)*this.seller.pics.length-margin;
				//设置DOM的宽度
				this.$refs.picsul.style.width = width+'px';
				//此时better-scroll内容就被撑起来了
				this.$nextTick(()=>{
					//设置成横向滚动，且滚动不冲突
					this.picsScroll = new BScroll(this.$refs.picsroll,{
						scrollX: true,
						eventPassthrough:'vertical'
					})
				})
			}
		},
		//点击收藏按钮
		handleFavorite(){
			this.favorite=!this.favorite
			console.log(this.favorite)
		}
	},
	computed:{
		favoriteText(){
			return this.favorite?'已收藏':'收藏' ;
		}
	},
	mounted(){
		this._initScroll();
		this._picsScroll()
	},
	watch:{
		'seller'(){
			this._initScroll()
			this._picsScroll()
		}
	}
}
</script>

<style>
/*外部样式*/
	.seller{
		position: absolute;
		top: 175px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
	}
/*顶部样式*/
	.seller-content_overview{
		position: relative;
		padding: 18px;
	}
	.seller-content_overview h1{
		line-height: 14px;
		font-size: 14px;
		color: rgb(7,17,27);
		margin-bottom: 8px;
	}
	.seller-content_overview-desc{
		line-height: 18px;
		font-size: 0;
		padding-bottom: 18px;
		border-bottom: 1px solid rgba(7,17,27,0.1)
	}
	.seller-content_overview-desc span{
		margin-right: 12px;
		display: inline-block;
		vertical-align: top;
		font-size: 12px;
		color: rgb(77,85,93);
	}
	.seller-content_overview ul{
		display: flex;
		padding-top: 18px;
	}
	.seller-content_overview ul li{
		flex: 1;
		text-align: center;
		border-right: 1px solid rgba(7,17,27,0.1);		
	}
	.seller-content_overview ul li:last-child{
		border-right: none;
	}
	.seller-content_overview ul li h2{
		font-size: 10px;
		line-height: 10px;
		color: rgb(147,153,159);
		margin-bottom: 4px;
	}
	.seller-content_overview ul li p{
		font-size: 10px;
		line-height: 24px;
		color: rgb(7,17,27);
	}
	.seller-content_overview ul li p span{
		font-size: 24px;
		line-height: 24px;
	}
	/*收藏图标样式*/
	.seller-content_overview--icon{
		position: absolute;
		top: 12px;
		right: 12px;
		display: block;
		height: 38px;
		width: 38px;
		line-height: 38px;
		text-align: center;
		font-size: 38px;
		color: rgb(77,85,93);
	}
	.seller-content_overview--favorite{
		color: rgb(240,20,20);
	}
	.seller-content_overview--icon p{
		line-height: 10px;
		font-size: 10px;
		color: rgb(77,85,93);
	}
/*公告样式*/
	.seller-content_bulletin{
		padding: 18px 18px 0 18px;
	}
	.seller-content_bulletin h1{
		font-size: 14px;
		line-height: 14px;
		color: rgb(7,17,27);
		margin-bottom: 8px;
	}
	.seller-content_bulletin p{
		display: block;
		padding: 0 12px 16px 12px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		line-height: 24px;
		font-size: 12px;
		color: rgb(240,20,20);
	}
/*优惠列表样式*/
	.seller-content-supports--item{
		border-bottom: 1px solid rgba(7,17,27,0.1);
		padding: 16px 12px 16px 48px;
		font-size: 12px;
		line-height: 12px;
	}
	.seller-content-supports--item:last-child{
		border-bottom: none;
	}
/*商家实景样式*/
	.seller-content_pics{
		padding: 18px;
	}
	.seller-content_pics h1{
		line-height: 14px;
		font-size: 14px;
		color: rgb(7,17,27);
		margin-bottom: 12px;
	}
	.seller-content_pics div{
		overflow: hidden;
		width: 100%;
		white-space: nowrap;	/*？？？*/
	}
	.seller-content_pics div ul{
		font-size: 0;
	}
	.seller-content_pics div ul li{
		display: inline-block;
		margin-right: 6px;
		width: 120px;
		height: 90px;
	}
	.seller-content_pics div ul li:last-child{
		margin-right: 0;
	}
/*商家信息样式*/
	.seller-content_info{
		padding: 18px 18px 0 18px;
		color: rgb(7,17,27);
	}
	.seller-content_info h1{
		font-size: 14px;
		line-height: 14px;
		padding-bottom: 12px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.seller-content_info ul li{
		padding: 16px 12px;
		font-size: 12px;
		line-height: 16px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.seller-content_info ul li:last-child{
		border-bottom: none;
	}
</style>