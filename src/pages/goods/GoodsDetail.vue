<template>
	<div class="goods-detail" ref="detailScroll">
		<div class="goods-detail_content">
			<div class="goods-detail_header">
				<img :src="selectFood.image">
				<span class="goods-detail_back" @click="handelDetailBack"> < </span>
			</div>
			<div class="goods-detail_food">
				<h1>{{selectFood.name}}</h1>
				<div class="goods-detail_food--text">
					<span class="goods-detail_food--count">月售{{selectFood.sellCount}}份</span>
					<span class="goods-detail_food--rating">好评率{{selectFood.rating}}%</span>
				</div>
				<div class="goods-detail_food--price">
					<span class="goods-detail_food--newprice">￥{{selectFood.price}}</span>
					<span 
						class="goods-detail_food--oldprice"
						v-show="selectFood.oldPrice"
					>￥{{selectFood.oldPrice}}</span>
				</div>
				<div class="goods-detail_buy--wrapper">
					<shopcart-control :foods="selectFood"></shopcart-control>
				</div>
				<div class="goods-detail_buy" 
					v-show="!selectFood.count || selectFood.count===0"
					@click="handleAddFirst(selectFood)"
				>
					加入购物车
				</div>
			</div>
			<split v-show="selectFood.info"></split>
			<div class="goods-detail_info" v-show="selectFood.info">
				<h1>商品信息</h1>
				<p>{{selectFood.info}}</p>
			</div>
			<split></split>

			

		</div>
	</div>
</template>

<script>
import BScroll from "better-scroll"
import Vue from 'vue'
import ShopcartControl from "@/common/ShopcartControl"
import split from "@/common/split"

export default {
	name:'GoodsDatil',
	props:{
		selectFood:{
			type: Object
		}
	},
	components:{
		ShopcartControl,
		split
	},
	methods:{
		handelDetailBack(){
			this.$emit('closeDetail');
		},
		//加入购物车
		handleAddFirst(){
			Vue.set(this.selectFood,'count',1)
		},
		_myScroll(){
			this.$nextTick(()=> {
				if(!this.scroll){
					this.scroll = new BScroll(this.$refs.detailScroll)
				}
			})
		}

	},
	watch:{
		selectFood:'_myScroll'
	},


}
</script>

<style>
/*页面外部布局*/
	.goods-detail{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		overflow: hidden;
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
/*商品内容布局*/
	.goods-detail_food{
		padding: 18px;
		position: relative;
	}	
	.goods-detail_food h1{
		line-height: 14px;
		margin-bottom: 8px;
		font-size: 14px;
		font-weight: 700;
		color: rgb(7,17,27);
	}
	.goods-detail_food--text{
		margin-bottom: 18px;
		line-height: 10px;
		font-size: 0;
	}
	.goods-detail_food--count , .goods-detail_food--rating{
		font-size: 10px;
		color: rgb(147,153,159);
		margin-right: 12px;
	}
	.goods-detail_food--price{
		font-weight: 700;
		line-height: 24px;
	}
	.goods-detail_food--newprice{
		margin-right: 8px;
		font-size: 14px;
		color: rgb(240,20,20);
	}
	.goods-detail_food--oldprice{
		text-decoration: line-through;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	/*按钮样式,动画后期补*/
	.goods-detail_buy--wrapper{
		position: absolute;
		right: 12px;
		bottom: 12px;
	}
	.goods-detail_buy{
		position: absolute;
		right: 18px;
		bottom: 18px;
		height: 24px;
		line-height: 24px;
		border-radius: 12px;
		font-size: 10px;
		color: #fff;
		background-color: rgb(0,160,220);
		padding: 0 12px;
		z-index: 50;
	}
	/*商品介绍样式*/
	.goods-detail_info{
		padding: 18px;
	}
	.goods-detail_info h1{
		line-height: 14px;
		margin-bottom: 6px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.goods-detail_info p{
		line-height: 24px;
		padding: 0 8px;
		font-size: 12px;
		color: rgb(77,85,93);
	}
</style>