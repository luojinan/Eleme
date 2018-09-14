<template>
	<div class="goods-datil">
		<div class="goods-detail_content">
			<div class="goods-detail_header">
				<img :src="selectFood.image">
				<span class="goods-detail_back"> < </span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name:'GoodsDatil',
	props:{
		selectFood:{
			type: Object
		}
	}

}
</script>

<style>
/*页面外部布局*/
	.goods-datil{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 48px;
		width: 100%;
		height: 100%;
		background-color: #fff;
		/*动画效果设置*/
		transition: all 0.2s linear;
		transform: translate3d(0,0,0);
	}
/*商品介绍布局*/
	.goods-detail_header{
		position: relative;
		height: 0;
		width: 100%;
		padding-top: 100%;
	}
	.goods-detail_header img{
		position: absolute;
		top:0;
		left: 0;
		width: 100%;
		height: 100%
	}
	.goods-detail_back{
		position: absolute;
		top: 10px;
		left: 10px;
		width: 34px;
		height: 34px;
		line-height: 34px;
		font-size: 20px;
		text-align: center;
		color: #fff;
		background-color: rgba(7,17,27,0.6);
		border-radius: 50%
	}
</style>