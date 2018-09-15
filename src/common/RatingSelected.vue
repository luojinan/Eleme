<template>
	<div class="rating-selected">
		<div class="rating-selected_item">
			<span 
				class="rating-selected_item--block rating-selected_positive"
				:class="{'positive-active':selectType===2}" 
				@click="select(2)"
			>
				{{desc.all}}
				<span>{{ratings.length}}</span>
			</span>
			<span 
				class="rating-selected_item--block rating-selected_positive"
				:class="{'positive-active':selectType===0}" 
				@click="select(0)"
			>
				{{desc.positive}}
				<span>{{positive.length}}</span>
			</span>
			<span 
				class="rating-selected_item--block rating-selected_negative"
				:class="{'negative-active':selectType===1}"
				@click="select(1)"
			>
				{{desc.negative}}
				<span>{{negative.length}}</span>
			</span>
		</div>
		<div class="rating-selected_switch">
			<span 
				class="rating-selected_switch--icon"
				:class="{'switch-active':onlyContent===true}"
				@click="toggleContent"
			>√</span>
			<span class="rating-selected_switch--text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>

const POSITIVE = 0 ;
const NEGATIVE = 1;
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
	},
	methods:{
		//点击选项卡修改状态码
		select(type){			
			this.$emit('changeType',type);
		},
		//点击筛选按钮修改状态码
		toggleContent(){			
			this.$emit('changeSwitch',this.onlyContent);
		}
	},
	computed:{
		//用计算属性，筛选ratings中哪些好评
		positive(){
			return this.ratings.filter((rating) => {
				return rating.rateType === POSITIVE;
			});
		},
		negative(){
			return this.ratings.filter((rating) => {
				return rating.rateType === NEGATIVE;
			});
		},
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
/*选项卡默认样式*/
	.rating-selected_positive{
		background-color: rgba(0,160,220,0.2);
	}
	.rating-selected_negative{
		background-color: rgba(77,85,93,0.2);
	}
/*选项卡选中样式*/
	/*由父组件传入选中的状态码，动态显示样式*/
	.positive-active{
		background-color: rgba(0,160,220);
		color:#fff;
	}
	.negative-active{
		background-color: rgba(77,85,93);
		color:#fff;
	}
/*筛选功能样式*/
	.rating-selected_switch{
		padding: 12px 18px;
		line-height: 24px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		color: rgb(147,153,159);
		font-size: 0;
	}
	.rating-selected_switch--icon{
		display: inline-block;
		vertical-align: top;
		margin-right: 4px;
		font-size: 14px;
		width: 22px;
		height: 22px;
		line-height: 26px;
		text-align: center;
		border-radius: 50%;
		background-color: rgb(147,153,159);
		color: #fff;
	}
	.rating-selected_switch--text{
		font-size: 12px;
		display: inline-block;
		vertical-align: top;
	}
	/*筛选功能打开时样式，父组件传入状态码*/
	.switch-active{
		background-color: #00c850;
	}
</style>