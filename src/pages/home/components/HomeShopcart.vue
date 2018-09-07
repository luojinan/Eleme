<template>
	<div class="home-shopcart">
		<div class="home-shopcart_content">
			<div class="home-shopcart_left">
				<div class="home-shopcart_left--logowrapper" @click="_handleCartlogo">
					<div class="home-shopcart_left--logo" :class="{'home-shopcart_left--logo--heightLight':this.selectFoods.length > 0}">车</div>
					<div class="home-shopcart_left--redpoint" v-show="this.selectFoods.length > 0">{{foodCount}}</div>
				</div>
				<div class="home-shopcart_left--price" :class="{'home-shopcart_left--price--heightLight':this.selectFoods.length > 0}">
					￥{{totalPrice}}
				</div>
				<div class="home-shopcart_left--desc">
					另需配送费￥{{deliveryPrice}}元
				</div>
			</div>
			<div class="home-shopcart_right">
				<div class="home-shopcart_right--pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>
		</div>
		<!--详情页-->
		<div class="home-shopcart_list" v-show="listShow">
			<div class="home-shopcart_header">
				<h1 class="home-shopcart_header--title">购物车</h1>
				<span class="home-shopcart_header--empty">清空</span>
			</div>
			<div class="home-shopcart_detail">
				<ul>
					<li class="home-shopcart_detail--food" v-for="item in selectFoods">
						<span class="home-shopcart_detail--name">{{item.name}}</span>
						<span class="home-shopcart_detail--price">￥{{item.price}}</span>
						<shopcart-control></shopcart-control>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import ShopcartControl from '@/common/ShopcartControl'
export default {
	name:'HomeShopcart',
	data(){
		return {
			//折叠变量，点击只是操作打开，计算属性关闭
			fold: true
		}
	},
	props:{
		//配送费
		deliveryPrice:{
			type:Number
		},
		//起送费
		minPrice:{
			type:Number
		},
		//购买了多少和单价，先使用默认值调试,是对象数组
		selectFoods:{
			type: Array,
			default(){	//默认值是方法，return
				return []
			}
		},
	},
	components:{
		ShopcartControl
	},
	methods:{
		//购物车里有商品
		haveFoods(){
			return this.selectFoods.length > 0
		},
		_handleCartlogo(){
			if(this.selectFoods.length===0){return ;}
			this.fold = !this.fold ;
		}
	},
	//计算属性
	computed:{
		//购物车旁的总价格
		totalPrice(){
			//遍历对象数组
			let total = 0 ;
			this.selectFoods.forEach((item) => {
				total += item.price * item.count ;
			});
			return total 
		},
		//购物车上的红点，商品数量
		foodCount(){
			//遍历对象数组
			let foodCount = 0 ;
			this.selectFoods.forEach((item) => {
				foodCount += item.count ;
			});
			return foodCount 
		},
		//结算按钮文本内容，分3种情况return
		payDesc(){
			//利用计算属性的总价来判断
			if(this.totalPriceo === 0){
				return `￥${minPrice}元起送`		//es6语法，简洁了+，在单花括号数据前要$
			}else if(this.totalPrice < this.minPrice){
				let chajia = this.minPrice - this.totalPrice
				return `还差${chajia}元起送`
			}else{
				return '去结算'
			}
		},
		//结算按钮样式，不是简单判断购物车里有商品,动态class绑计算属性
		payClass(){
			//同理判断大于最低价就return，class名
			if(this.totalPrice < this.minPrice){
				return 'home-shopcart_right--pay--notenough'
			}else{
				return 'home-shopcart_right--pay--enough'
			}
		},
		//购物车详情页
		listShow(){
			if(this.selectFoods.length===0){
				this.fold = true ;
				return false ;
			}
			let show = !this.fold;
			return show;
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
	.home-shopcart_left--logo--heightLight{
		background-color: rgb(0,120,220);
		color: #fff;
	}
	.home-shopcart_left--redpoint{
		position: absolute;
		top: 0;
		right: 0;
		width: 24px;
		height: 16px;
		line-height: 16px;
		text-align: center;
		font-size: 9px;
		font-weight: 700;
		border-radius: 16px;
		color: #fff;
		background-color: rgb(240,20,20);
		box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
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
	.home-shopcart_left--price--heightLight{
		color: #fff;
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
		
	}
	.home-shopcart_right--pay--notenough{
		background-color: #2b333b;
	}
	.home-shopcart_right--pay--enough{
		background-color: #00b43c;
		color: #fff;
	}
/*购物车详情页样式*/
	.home-shopcart_list{
		position: absolute;
		bottom:48px;
		left: 0;
		width: 100%;
		z-index: -1;
	}
	.home-shopcart_header{
		height: 40px;
		line-height: 40px;
		padding: 0 18px;
		background-color: #f3f5f7;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.home-shopcart_header--title{
		float: left;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.home-shopcart_header--empty{
		float: right;
		font-size: 12px;
		color: rgb(0,160,220);
	}

	.home-shopcart_detail{
		padding: 0 18px;
		max-height: 217px;
		overflow: hidden;
		background-color: #fff;
	}
	
	.home-shopcart_detail--food{
		position: relative;
		padding: 12px 0;
		box-sizing: border-box;
		border-bottom: 1px solid rgba(7,17,27,0.1);	
	}
	.home-shopcart_detail--name{
		font-size: 14px;
		line-height: 24px;
		color: rgb(7,17,27);
	}
	.home-shopcart_detail--price{
		position: absolute;
		right: 90px;
		bottom: 12px;
		font-size: 14px;
		line-height: 24px;
		font-weight: 700;
		color: rgb(240,20,20);
	}
</style>