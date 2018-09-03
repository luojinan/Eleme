<template>
	<div class="home-goods">
		<div class="home-goods_menu">
			<div class="home-goods_menuitem" v-for="(item,index) in goods">
				{{item.name}}
			</div>
		</div>
		<div class="home-goods_foods">
			<ul>
				<li v-for="item in goods">
					<div class="home-goods_foods--title">{{item.name}}</div>
					<ul>
						<li v-for="foods in item.foods">
							<div class="home-goods_foods--icon">
								<img :src="foods.icon">
							</div>
							<div class="home-goods_foods--content">
								<h2>{{foods.name}}</h2>
								<p class="home-goods_foods--contentdesc">{{foods.description}}</p>
								<div class="home-goods_foods--contentextra">
									<span>月售{{foods.sellCount}}份</span>
									<span>好评率{{foods.rating}}%</span>
								</div>
								<div class="home-goods_foods--contentprice">
									<span>￥{{foods.price}}</span>
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
export default {
	name:'HomeGoods',
	props:{
		goods:{
			type:Array
		},
		seller:{
			type:Object
		}
	}
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

	}
	.home-goods_foods{
		flex: 1;
	}
/*菜单栏样式*/
	.home-goods_menuitem{
		/*怎么垂直居中啊*/
		height: 54px;
		width: 56px;
		line-height: 14px;
		font-size: 12px;
		
		padding: 0 12px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
</style>