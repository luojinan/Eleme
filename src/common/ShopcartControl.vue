<template>
	<div class="shopcart-control">
		<move-animation>
			<div 
				class="shopcart-control_decrease" 
				v-show="foods.count>0" 
				@click.stop="_handleDecrease"
			>
				<div calss="rotate-animation">-</div>
			</div>
		</move-animation>
		<div class="shopcart-control_count" v-show="foods.count>0">{{foods.count}}</div>	
		<div class="shopcart-control_add" @click.stop="_handleAdd">+</div>
	</div>
</template>

<script>
import Vue from 'vue'
import MoveAnimation from '@/common/fade/MoveAnimation'

export default {
	name:'ShopcartControl',
	props:{
		foods:{
			type:Object,
		}
	},
	components:{
		MoveAnimation,
	},
	methods:{
		_handleAdd(){
			//console.log('点击添加按钮') ;
			//写入数据进foods对象里,不是直接操作数据库中的goods
			if(!this.foods.count){
				Vue.set(this.foods,'count',1) ;
			}else{
				this.foods.count++ ;
			}
		},
		_handleDecrease(){
			//console.log('点击移除按钮')
			this.foods.count--;
		}
	}
}
</script>

<style>
	.shopcart-control_decrease,.shopcart-control_add{
		display: inline-block;
		vertical-align: top;
		font-size: 24px;
		height: 24px;
		width: 24px;
		border-radius: 50%;
		color: #fff;
		background-color: rgb(0,160,220);
		text-align: center;
		line-height: 24px;
		margin: 6px;
	}
	.shopcart-control_count{
		display: inline-block;
		vertical-align: top;
		width: 6px;
		font-size: 10px;
		color: rgb(147,153,159);
		padding-top: 6px;
		line-height: 24px;
		text-align: center;
	}
	/*平移渐隐渐现 动画效果*/
	.shopcart-control_decrease{
		transition: all 0.4 linear ;
		opacity: 1;
	}
	/*怎么加2个动画啊，再加一个旋转动画（与平移冲突）*/
</style>