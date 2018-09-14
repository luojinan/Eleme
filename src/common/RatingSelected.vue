<template>
	<div class="rating-selected">
		<div class="rating-selected_item">
			<span class="rating-selected_item--block rating-selected_positive" >{{desc.all}}</span>
			<span class="rating-selected_item--block rating-selected_positive">{{desc.positive}}</span>
			<span class="rating-selected_item--block rating-selected_negative">{{desc.negative}}</span>
		</div>
		<div class="rating-selected_switch">
			<span class="rating-selected_switch--icon">√</span>
			<span class="rating-selected_switch--text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>

//const POSITIVE = 0 ;
//const NEGATIVE = 1;
const ALL = 2; 

export default {
	name:'RatingSelected',
	/*制作要传入多个值的公共组件的思路是，先设置要要传入的props，在围绕编写*/
	props:{
		//不知道这个数组是干嘛的
		ratings:{
			type:Array,
			default(){
				return [];
			}
		},
		//选项卡当前选到了哪一个，用数字代替状态码
		selectType:{
			type:Number,
			default(){
				return ALL	//默认选择的是all的选项即第一项
			}
		},
		//选项卡的一个小功能是否筛选
		onlyContent:{
			type:Boolean,
			default: false
		},
		//选项卡的选项
		desc:{
			type:Object,
			default(){	//默认值
				return {
					all:'全部',
					positive:'满意',
					negative:'不满意'
				}
			}
		}
	}
}
</script>

<style>
	.rating-selected_item{
		padding: 18px 0;
		margin:0 18px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		font-size: 0;
	}
	.rating-selected_item--block{
		display: inline-block;
		padding: 8px 12px;
		margin-right: 8px;
		border-radius: 1px;
		font-size: 12px;
		color: rgb(77,85,93);
	}
	.rating-selected_positive{
		background-color: rgba(0,160,220,0.2);
	}
	.rating-selected_negative{
		background-color: rgba(77,85,93,0.2);
	}
</style>