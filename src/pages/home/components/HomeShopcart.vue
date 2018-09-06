<template>
	<div class="home-shopcart">
		<div class="home-shopcart_content">
			<div class="home-shopcart_left">
				<div class="home-shopcart_left--logowrapper">
					<div class="home-shopcart_left--logo">车</div>
				</div>
				<div class="home-shopcart_left--price">
					￥0
				</div>
				<div class="home-shopcart_left--desc">
					另需配送费￥{{deliveryPrice}}元
				</div>
			</div>
			<div class="home-shopcart_right">
				<div class="home-shopcart_right--pay">
					￥{{minPrice}}元起送
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name:'HomeShopcart',
	props:{
		deliveryPrice:{
			type:Number
		},
		minPrice:{
			type:Number
		}
	}
}
</script>

<style>
/*外部整体样式*/
	.home-shopcart{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 50;
		width: 100%;
		height: 48px;

	}
	/*这个div不能用在上面总的那里？*/
	.home-shopcart_content{
		display: flex;
		background-color: #171d27;
		color: rgba(255,255,255,0.4);
	}
/*左样式*/
	.home-shopcart_left{
		flex: 1;
	}
	/*logo区样式*/
	.home-shopcart_left--logowrapper{
		display: inline-block;
		position: relative;	/*外部的div定位往外，到负值，并圆角到原圆形*/
		top: -10px;
		width: 56px;
		height: 56px;
		border-radius: 50%;
		margin:0 12px; 
		padding: 6px;
		box-sizing: border-box; /*移动端比较流行，把margin和padding包含在wigth*/
		background-color: #171d27;
	}
	.home-shopcart_left--logo{
		height: 100%;
		width: 100%;
		border-radius: 50%;
		background-color: #2b343c;
		font-size: 24px;
		text-align: center;
		line-height: 44px;
	}
	/*左侧其他区样式*/
	.home-shopcart_left--price{
		display: inline-block;
		vertical-align: top;
		box-sizing: border-box;
		font-size: 16px;
		font-weight: 700;
		line-height: 24px;	/*垂直居中 不是24，设小点加边框线，靠其他垂直居中*/
		margin-top: 12px;
		padding-right: 12px;
		border-right: 1px solid rgba(255,255,255,0.1);	/*因为边框线，所以line-height还要加上margin-top*/
		
	}
	.home-shopcart_left--desc{
		display: inline-block;
		vertical-align: top;
		font-size: 10px;
		line-height: 24px;
		margin:12px 0 0 12px;
	}

/*右样式*/
	.home-shopcart_right{
		flex: 0 0 105px;
		width: 105px;
	}
	.home-shopcart_right--pay{
		height: 48px;
		line-height: 48px;
		font-size: 12px;
		font-weight: 700;
		text-align: center;
		background-color: #2b333b;
	}
</style>