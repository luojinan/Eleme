<template>
	<div class="home-goods">
		<div class="home-goods_menu" ref="meunWrapper">
			<div>
				<div class="home-goods_menuitem" v-for="(item,index) in goods">
					{{item.name}}
				</div>
			</div>
		</div>
		<div class="home-goods_foods" ref="foodsWrapper">
			<ul>
				<li v-for="item in goods">
					<div class="home-goods_foods--title">{{item.name}}</div>
					<ul >
						<li class="home-goods_foods--item" v-for="foods in item.foods">
							<div class="home-goods_foods--icon">
								<img weight="57" height="57" :src="foods.icon">
							</div>
							<div class="home-goods_foods--content">
								<h2 class="home-goods_foods--contentname">{{foods.name}}</h2>
								<p class="home-goods_foods--contentdesc">{{foods.description}}</p>
								<div class="home-goods_foods--contentextra">
									<span>月售{{foods.sellCount}}份</span>
									<span>好评率{{foods.rating}}%</span>
								</div>
								<div class="home-goods_foods--contentprice">
									<span class="home-goods_foods--newprice">￥{{foods.price}}</span>
									<span class="home-goods_foods--oldprice" v-show="foods.oldPrice">￥{{foods.oldPrice}}</span>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
//引入滚动插件
import BScroll from 'better-scroll'

export default {
	name:'HomeGoods',
	props:{
		goods:{
			type:Array
		},
		seller:{
			type:Object
		}
	},
	mounted(){
		this.$nextTick(() => {
			this.meunScroll = new BScroll(this.$refs.meunWrapper)
			this.foodsScroll = new BScroll(this.$refs.foodsWrapper)
		}) 
  	},
}
</script>

<style>
/*双栏flew布局*/
	.home-goods{
		display: flex;
		position: absolute;
		top: 175px;
		bottom: 46px;
		width: 100%;
	}
	.home-goods_menu{
		flex: 0 0 80px;
		background-color: #f3f5f7;
		width: 80px;
		overflow: hidden;
	}
	.home-goods_foods{
		flex: 1;
		overflow: hidden;
	}
/*菜单栏样式*/
	.home-goods_menuitem{
		/*怎么垂直居中啊？？？*/
		height: 54px;
		width: 56px;
		line-height: 14px;
		font-size: 12px;
		
		padding: 0 12px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
/*商品栏样式*/
	.home-goods_foods--title{
		padding-left: 14px;
		border-left: 2px solid #d9dde1;
		font-size: 12px;
		height: 26px;
		line-height: 26px;		
		color: rgb(147,153,159);
		background-color: #f3f5f7;
	}
	.home-goods_foods--item{
		display: flex;
		margin:18px;
		border-bottom: 1px solid rgba(7,17,27,0.1)	/*怎么通过伪类选择器使li最后一个不加border啊？？？*/
	}
	.home-goods_foods--icon{
		flex: 0 0 57px;
		margin-right: 10px;
	}
	.home-goods_foods--contentname{
		margin: 2px 0 8px 0;
		height: 14px;
		line-height: 14px;
		font-size: 14px;
		color: rgb(7,17,27);
	}

	.home-goods_foods--contentdesc,.home-goods_foods--contentextra{
		line-height: 12px;
		font-size: 12px;
		font-size: 12px;
		color: rgb(147,153,159);
	}
	.home-goods_foods--contentextra span{
		margin-right: 12px;
	}
	.home-goods_foods--contentprice{
		font-weight: 700;
		line-height: 24px;
	}
	.home-goods_foods--newprice{
		font-size: 14px;
		margin-right: 8px;
		color: rgb(240,20,20);
	}
	.home-goods_foods--oldprice{
		font-size: 10px;
		color: rgb(147,153,159);
		text-decoration: line-through;
	}
</style>