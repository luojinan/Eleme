<template>
	<div class="comment" ref="commentScroll">
		<div class="commet-content">
		<!--评论区头部-->
			<div class="commet-content_overview">
				<div class="commet-content_overview--left">
					<h1>{{seller.score}}</h1>
					<h2>综合评分</h2>
					<p>高于周边商家{{seller.rankRate}}%</p>
				</div>
				<div class="commet-content_overview--right">
					<h1>服务态度：<span>{{seller.serviceScore}}</span></h1>
					<h1>商品评分：<span>{{seller.foodScore}}</span></h1>
					<h1>送达时间：<span>{{seller.deliveryTime}}分钟</span></h1>
				</div>
			</div>
			<split></split>
		<!--评论区选项卡-->
			<rating-selected
					:selectType="selectType"
					:onlyContent="onlyContent"
					:desc="desc"
					:ratings="ratings"
					@changeType="changeType"
					@changeSwitch="changeSwitch"
			>						
			</rating-selected>
		<!--评论区内容-->
			<div class="commet-content_ratings">
				<ul>
					<li v-for="item of ratings" v-show="needShow(item.rateType,item.text)">
						<div class="commet-content_ratings--avatar"><img width="28" height="28" :src="item.avatar"></div>
						<div class="commet-content_ratings--text">
							<h1>{{item.username}}</h1>
							<span class="commet-content_ratings--score">{{item.score}}分</span>
							<span class="commet-content_ratings--deliverytime" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
							<p>{{item.text}}</p>
							<div class="commet-content_ratings--recommend" v-show="item.recommend && item.recommend.length">
								<i class="commet-content_ratings--bad" :class="{'commet-content_ratings--good':item.rateType===0}">♥</i>
								<span v-for="item of item.recommend">{{item}}</span>
							</div>
							<div class="commet-content_ratings--time">
								{{item.rateTime | formatDate}}
							</div>
						</div>						
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import BScroll from "better-scroll"
import axios from 'axios'
import RatingSelected from "@/common/RatingSelected"
import split from "@/common/split"
import {formatDates} from "@/common/js/date"

//设置状态码
//const POSITIVE = 0 ;
//const NEGATIVE = 1;
const ALL = 2;

export default {
	name:'Comment',
	props:{
		seller:{
			type:Object
		}
	},
	data(){
		return {
			//设置传入选项卡的内容，且这些内容对控制数据也有用
			ratings:[],
			selectType: ALL,	//当前选择哪一项
			onlyContent:false,	//筛选功能是否只显示有美容 的评价
			desc:{				//选项卡的内容
				all:'全部',
				positive:'推荐',
				negative:'吐槽'
			}
		}
	},
	components:{
		split,
		RatingSelected
	},
	methods:{
		//axios获取json数据方法
		getCommentInfo(){
			axios.get('/static/mock/data.json').then(this.getCommentInfoSucc)
		},
		//成功获取json数据的回调函数
		getCommentInfoSucc(res){
			//测试一下
			//console.log(res.data.ratings)
			const data = res.data	//减少json数据书写的层级
			//判断数据存在的情况下执行操作数据赋值
			if(res.data){
				this.ratings = data.ratings
			}
		},

		//选项卡组件
		//子组件点击，修改状态码
		changeSwitch(switchType){
			this.onlyContent = !switchType;
			//当dom刷新的时候better-scroll需要刷新
			this.$nextTick(()=> {
				this.scroll.refresh()
			})
		},
		changeType(type){
			this.selectType = type ;
			//当dom刷新的时候better-scroll需要刷新
			this.$nextTick(()=> {
				this.scroll.refresh()
			})
		},

		//根据状态码显示相应内容
		needShow(type,text){
			//传入评论数据的状态码（与点击产生的匹配），是否有内容的评论
			if(!text && this.onlyContent){
				//当前评论没有内容 点击了只显示有内容按钮时
				return false
			}
			if(this.selectType === ALL){
				//当前现实所有
				return true
			}else{
				//否则以选择和当前评论状态匹配 true fasle
				return this.selectType === type;
			}
		}
	},
	filters:{
		formatDate(item){
			let date = new Date(item);	//把时间代码编译成正确时间
			//console.log(date);	//测试一下格式化后的时间是什么样子的
			//引入js模块，可与过滤器同名，过滤器不是方法不冲突
			//这个模块传入格式化后的数据和需要的格式，使用正则表达式替换输出
			return formatDates(date,'yyyy-MM-dd hh:mm')
		}
	},
	//生命周期钩子，执行ajax方法
	created(){
		this.getCommentInfo()
		//console.log('获取数据的异步下面执行')
		//console.log(this.goods)
		this.$nextTick(()=> {
				if(!this.scroll){
					this.scroll = new BScroll(this.$refs.commentScroll)
				}
			})
	}

}
</script>

<style>
/*外部样式*/
	.comment{
		position: absolute;
		top: 175px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
	}
	.commet-content_overview{
		display: flex;
		padding: 18px 0;
	}
/*评分左边样式*/
	.commet-content_overview--left{
		flex: 0 0 137px;
		width: 137px;
		padding: 6px 0;
		border-right: 1px solid rgba(7,17,27,0.1);
		text-align: center;
	}
	.commet-content_overview--left h1{
		line-height: 28px;
		font-size: 24px;
		color: rgb(255,153,0);
		margin-bottom: 6px;
	}
	.commet-content_overview--left h2{
		line-height: 12px;
		font-size: 12px;
		color: rgb(7,17,27);
		margin-bottom: 8px;
	}
	.commet-content_overview--left p{
		line-height: 10px;
		font-size: 10px;
		color: rgb(147,153,159);
	}
/*评分右部样式*/
	.commet-content_overview--right{
		flex: 1;
		padding:6px 0 6px 24px;
	}
	.commet-content_overview--right h1 span{
		display: inline-block;
		font-size: 12px;
		margin-left: 24px;
		color: rgb(255,153,0);
	}
	.commet-content_overview--right h1{		
		margin-bottom: 8px;
		line-height: 18px;
		font-size: 12px;
		font-weight: 700;
		color: rgb(7,17,27);
	}
/*评论区样式*/
	.commet-content_ratings{
		padding: 0 18px;
	}
	.commet-content_ratings ul li{
		display: flex;
		padding: 18px 0;
		border-bottom: 1px solid rgba(7,17,27,0.10);
	}
	.commet-content_ratings--avatar{
		flex: 0 0 28px;
		width: 28px;
		margin-left: 12px;
	}
	.commet-content_ratings--avatar img{
		border-radius: 50%;
	}
	.commet-content_ratings--text{
		position: relative;
		flex: 1;
		margin-left: 8px;
	}
	.commet-content_ratings--text h1{
		line-height: 12px;
		font-size: 10px;
		color: rgb(7,17,27);
		margin-bottom: 4px;
	}
	.commet-content_ratings--score{
		display: inline-block;
		vertical-align: top;
		line-height: 12px;
		font-size: 10px;
		font-weight: 700;
		color: rgb(255,153,0);
		margin-bottom: 4px;
	}
	.commet-content_ratings--deliverytime{
		display: inline-block;
		vertical-align: top;
		line-height: 12px;
		font-size: 10px;
		color: rgb(147,153,159);
		margin-bottom: 4px;
	}
	.commet-content_ratings--text p{
		font-size: 12px;
		line-height: 18px;
		color: rgb(7,17,27);
		margin-bottom: 8px;
	}
	.commet-content_ratings--recommend{
		line-height: 16px;
	}
	.commet-content_ratings--bad{
		font-size: 22px;
		line-height: 22px;
		margin-right: 4px;
		color: rgb(147,153,159);
	}
	/*有生效，但是好像覆盖不了*/
	.commet-content_ratings--good{
		color: rgb(0,160,220) ;
	}
	.commet-content_ratings--recommend span{
		padding: 0 6px;
		border:1px solid rgba(7,17,27,0.1);
		border-radius: 1px;
		color: rgb(147,153,159);
		background: #fff;
		display: inline-block;
		margin-left: 2px;
	}
	.commet-content_ratings--time{
		position: absolute;
		top: 0;
		right: 0;
		line-height: 12px;
		font-size: 10px;
		color: rgb(147,153,159);
	}
</style>