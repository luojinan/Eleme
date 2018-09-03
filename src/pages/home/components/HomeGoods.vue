<template>
	<div class="home-goods">
		<div class="home-goods_menu">{{goods[0].name}}</div>
		<div class="home-goods_foods"></div>
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
</style>