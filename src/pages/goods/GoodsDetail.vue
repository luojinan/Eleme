<template>
<div>
	<span 
		v-show="showScrollclc" 
		:class="{'goods-detail_scrollclc':scrollY >323}" 
		class="goods-detail_back" 
		@click="handelDetailBack"
		:style="opacityCLC"
	> < </span>
	<div 
		v-show="showScrolllong" 
		class="goods-detail_backlong" 
		:class="{'goods-detail_scrolllong':scrollY >323}"
		:style="opacityLong" 
	>
		
		<h1>{{selectFood.name}}</h1>
	</div>
	<span 
		v-show="showScrolllong" 
		class="goods-detail_backlong--button" 
		@click="handelDetailBack"
	> < </span>
	<div class="goods-detail" ref="detailScroll">
		<div>

			<div class="goods-detail_header">
				<img :src="selectFood.image">				
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
		<!--选项卡-->
			<div class="goods-detail_rating">
				<h1>商品评价</h1>
				<rating-selected
					:selectType="selectType"
					:onlyContent="onlyContent"
					:desc="desc"
					:ratings="selectFood.ratings"
					@changeType="changeType"
					@changeSwitch="changeSwitch"
				>						
				</rating-selected>
				<div class="goods-detail_rating--content">
					<ul v-show="selectFood.ratings && selectFood.ratings.length>0">
						<li 
							v-for="item in selectFood.ratings" 
							class="goods-detail_rating--item"
							v-show="needShow(item.rateType,item.text)"
						>
							<div class="goods-detail_rating--user">
								<p>{{item.username}}</p>
								<img :src="item.avatar" width="12" height="12">
							</div>
							<div class="goods-detail_rating--time">
								{{item.rateTime | formatDate}}
							</div>
							<p>
								<span 
									class="goods-detail_rating--iflike"
									:class="{'goods-detail_rating--like':item.rateType===0}"
								>♥</span>
								{{item.text}}
							</p>
						</li>
					</ul>
					<div v-show="!selectFood.ratings || selectFood.ratings.length===0">
						没有评价
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import BScroll from "better-scroll"
import Vue from 'vue'
import ShopcartControl from "@/common/ShopcartControl"
import RatingSelected from "@/common/RatingSelected"
import split from "@/common/split"
import {formatDates} from "@/common/js/date"

//设置状态码
const POSITIVE = 0 ;
const NEGATIVE = 1;
const ALL = 2;

export default {
	name:'GoodsDatil',
	props:{
		selectFood:{
			type: Object
		}
	},
		data(){
			return {
				//设置传入选项卡的内容，且这些内容对控制数据也有用
				selectType: ALL,	//当前选择哪一项
				onlyContent:false,	//筛选功能是否只显示有美容 的评价
				desc:{				//选项卡的内容
					all:'全部',
					positive:'推荐',
					negative:'吐槽'
				},
				scrollY:0,
				showScrolllong:false,
				showScrollclc:true,
				opacityLong:{
					opacity:0
				},
				opacityCLC:{
					opacity:0.6
				}
			}
		},
	components:{
		ShopcartControl,
		RatingSelected,
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
		},
		_tryScroll(){

			if(!this.scroll){
				this.$nextTick(()=> {
					this.scroll = new BScroll(this.$refs.detailScroll,{probeType:3})
					this.scroll.on('scroll',(pos)=>{
						this.scrollY = Math.abs(Math.round(pos.y))
						console.log(this.scrollY)

						//计算透明度
						if(this.scrollY > 323){
							this.showScrolllong=true
							this.showScrollclc=false
							let opacity = (this.scrollY-323)/100
							if(opacity>1){
								opacity = 1
							}else{opacity = opacity}
							this.opacityLong={
								opacity:opacity
							}
						}else{
							this.showScrolllong=false
							this.showScrollclc=true
						}
					})
					
				})
			}else{
				//console.log('刷新滚动')
				
			}			
			//console.log(this.selectFood.ratings)
		}
	},
	//过滤器，对数据进行格式化用
	filters:{
		formatDate(item){
			let date = new Date(item);	//把时间代码编译成正确时间
			//console.log(date);	//测试一下格式化后的时间是什么样子的
			//引入js模块，可与过滤器同名，过滤器不是方法不冲突
			//这个模块传入格式化后的数据和需要的格式，使用正则表达式替换输出
			return formatDates(date,'yyyy-MM-dd hh:mm')
		}
	},
	created(){
		this._tryScroll()			
	}


}
</script>

<style>
/*页面外部布局*/
	.goods-detail_back{
		z-index: 40;
		position: fixed;
		top: 0;
		left: 0;
		width: 34px;
		margin-left: 10px;
		margin-top: 10px;
		text-align: center;
		border-radius: 50%;
		height: 34px;
		line-height: 34px;
		font-size: 20px;
		color: #fff;
		background-color: rgb(7,17,27);		
	}
	.goods-detail_backlong{
		z-index: 40;
		position: fixed;
		top: 0;
		left: 0;
		height: 34px;
		width: 100%;
		padding-left: 10px;
		font-size: 0;
		text-align: center;
		background-color: #007AFF;
	}
	.goods-detail_backlong--button{
		z-index: 40;
		position: absolute;
		top: 0;
		left: 0;
		display: inline-block;
		width: 34px;
		height: 34px;
		font-size: 20px;
		line-height: 34px;
		text-align: center;
		color: #fff;	
	}
	.goods-detail_backlong h1{
		color: #fff;
		font-size: 14px;
		line-height: 34px;
		margin: 0 auto;
		display: inline-block;
	}
	.goods-detail{
		position: fixed;
		/*不知道为什么定位了top，之后定位不了bottom*/
		/*定位到了，因为dom在首页渲染所以有错，解决v-if不在首页渲染*/
		bottom:48px;
		left: 0;
		top: 0;
		overflow: hidden;
		width: 100%;
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
/*商品评价样式整体和头部样式*/
	.goods-detail_rating{
		padding-top: 18px;
	}
	.goods-detail_rating h1{
		line-height: 14px;
		margin-left: 18px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
/*商品评价内容样式*/
	.goods-detail_rating--content{
		padding: 0 18px;
	}
	.goods-detail_rating--item{
		position: relative;
		padding: 16px 0;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.goods-detail_rating--item:last-child{
		border-bottom: none;
	}
	.goods-detail_rating--user{
		position: absolute;
		right: 0;
		top: 16px;
		line-height: 12px;
		font-size: 0;
	}
	.goods-detail_rating--user p{
		display: inline-block;
		vertical-align: top;
		font-size: 10px;
		margin-right: 6px;
		color: rgb(147,153,159);
	}
	.goods-detail_rating--user img{
		border-radius: 50%;
	}
	.goods-detail_rating--time{
		margin-bottom: 6px;
		font-size: 10px;
		line-height: 12px;
		color: rgb(147,153,159);
	}
	.goods-detail_rating--item p{
		line-height: 16px;
		font-size: 12px;
		color: rgb(7,17,27);
	}
	/*动态样式好评红心，差评灰色*/
	.goods-detail_rating--iflike{
		font-size:20px;
		line-height: 24px;
		margin-right: 2px; 
		color: rgb(147,153,159);
	}
	.goods-detail_rating--like{
		color: red;
	}
</style>