<template>
<div>
	<div class="home-goods">
		<div class="home-goods_menu" ref="meunWrapper">
			<ul>
				<li 
					class="home-goods_menuitem" 
					:class="{'current':currentIndex===index}" 
					@click="_handleClickMenu(index)"
					v-for="(item,index) in goods"
				>
					<span>{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="home-goods_foods" ref="foodsWrapper">
			<ul>
				<li v-for="item in goods" ref="foodsListHook">
					<div class="home-goods_foods--title">{{item.name}}</div>
					<ul >
						<li
							@click="_handleDetail(foods)"
							class="home-goods_foods--item" 
							v-for="(foods,index) in item.foods"
						>
							<div class="home-goods_foods--icon">
								<img weight="57" height="57" :src="foods.icon">
							</div>
							<div class="home-goods_foods--content">
								<h2 class="home-goods_foods--contentname">{{foods.name}}</h2>
								<p class="home-goods_foods--contentdesc">{{foods.description}}</p>
								<div class="home-goods_foods--contentextra">
									<span>月售{{foods.sellCount}}份</span>
									<span>好评率{{foods.rating}}%</span>
								</div>
								<div class="home-goods_foods--contentprice">
									<span class="home-goods_foods--newprice">￥{{foods.price}}</span>
									<span class="home-goods_foods--oldprice" v-show="foods.oldPrice">￥{{foods.oldPrice}}</span>
								</div>
								
							</div>
							<!--添加商品数量，小球组件-->
							<div class="home-goods_foods--cartcontrol">
								<shopcart-control :foods="foods"></shopcart-control>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
	<home-shopcart 
			:selectFoods="selectFoods" 
			:deliveryPrice="seller.deliveryPrice" 
			:minPrice="seller.minPrice"
		></home-shopcart>
	<right-open>
			<goods-detail v-if="showDetail" @closeDetail="closeDetail" :selectFood="selectFood"></goods-detail>
	</right-open>
</div>
</template>

<script>
//引入滚动插件
import BScroll from 'better-scroll'
import HomeShopcart from './HomeShopcart'
import GoodsDetail from '@/pages/goods/GoodsDetail'
import RightOpen from '@/common/fade/RightOpen'
import ShopcartControl from '@/common/ShopcartControl'

export default {
	name:'HomeGoods',
	components:{
		ShopcartControl,
		HomeShopcart,
		GoodsDetail,
		RightOpen
	},
	props:{
		seller:{
			type:Object
		},
		goods:{
			type:Array
		}
	},
	data(){
		return{
			heightList:[],
			scrollY:0,
			selectFood:{},
			showDetail:false
		} 
	},
	created(){
		this.$nextTick(() => {
				//挂载滚动插件

				this.meunScroll = new BScroll(this.$refs.meunWrapper)
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{probeType:3})

				//测试获取的DOM是不是有数据的DOM
				//console.log('测试获取的DOM是不是有数据的DOM'+this.$refs.meunWrapper.innerHTML)
				//利用better-scroll的方法获取滚动值
				this.foodsScroll.on('scroll',(pos) => {
					this.scrollY = Math.abs(Math.round(pos.y))	//pso.y获取滚动值，取整取正
					//console.log(this.scrollY)	//测试一下
					//console.log(this.currentIndex)
				})			
		}) 
	},
	methods:{
	
		_calculateHight(){
			let that = this
			this.$nextTick(()=>{
				//获取一个类的li高度
				//获取DOM元素className
				let foodWrapper = that.$refs.foodsWrapper
				let foodlist = that.$refs.foodsListHook
				//console.log('挂载完成后执行计算方法')
				//把高度push进从0开始的数组
				let height = 0;
				that.heightList.push(height);
				//console.log('输出默认数组的第一项'+this.heightList.length)
				///console.log('能获取到DOM右侧整个的内容'+foodlist)
				//获取到DOM，div里面有ul没有li，即数据没有？
				//console.log(this.goods.length)
				for(let i=0; i < that.goods.length; i++){
					//DOM的方法clientHeight获取高度
					height += foodlist[i].clientHeight;
					that.heightList.push(height);
				}
				//测试一下
				//console.log(that.heightList);
			})
				
		},
		//点击联动方法
		_handleClickMenu(index){
			//获取到点击dom的li序列
			console.log('输出点击dom的序列为：'+index)
			//获取右侧的大类的dom
			let el = this.$refs.foodsListHook[index]
			//使用better-scroll方法滚动到dom
			this.foodsScroll.scrollToElement(el,300)
		},
		//点击商品详情页，给父组件传序号
		_handleDetail(food){
			this.selectFood = food
			this.showDetail = true
		},
		closeDetail(){
			this.showDetail = false
		},

		

	},
	computed:{
		//计算属性传值给子组件
		selectFoods(){
			let foods = [] ;
			this.goods.forEach((good) => {
				good.foods.forEach((food) => {
					if(food.count){
						foods.push(food)
					}
				})
			}) ;
			return foods ;
		},
		//判断滚动值是在那一个序列中，用在:class的li上
  		currentIndex(){
  			//使用循环来逐一判断
  			//并不是计算属性监听不了数据，而是没有this.heightList
  			//解决方法，是确保heightList全部push进去
  			//console.log('执行计算属性'+this.heightList.length)
  			if(this.heightList.length>1){
	  			for(let i=0 ; i<this.heightList.length ; i++){
	  				let height1 = this.heightList[i]
	  				let height2 = this.heightList[i+1]
	  				//console.log(this.heightList.length)
	  				if(!height2 || this.scrollY < height2 && this.scrollY >= height1){
	  					//console.log(i)
	  					return i
	  				}
	  			}
	  			return 0	//默认处于第一个序列
	  		} 	
  		}
  	},
  	watch:{
  		'goods'(){
  			this._calculateHight()
  		},
  	}

/********************数据还没获取到，失败的操作dom******************************/
	/*methods:{
		//获取DOM高度并赋值给变量
		_calculateHight(){
			//获取一个类的li高度
			//获取DOM元素className
			let foodWrapper = this.$refs.foodsWrapper
			let foodlist = this.$refs.foodsWrapper.getElementsByClassName('foods-list-hook');
			//console.log('挂载完成后执行计算方法')
			//把高度push进从0开始的数组
			let height = 0;
			this.heightList.push(height);
			//console.log('输出默认数组的第一项'+this.heightList.length)
			console.log('能获取到DOM右侧整个的内容'+foodWrapper.innerHTML)
			//获取到DOM，div里面有ul没有li，即数据没有？
			console.log(this.goods)
			console.log('右侧DOM有'+foodlist.length+'个')
			for(let i=0; i < foodlist.length; i++){
				//DOM的方法clientHeight获取高度
				height += foodlist[i].clientHeight;
				this.heightList.push(height);
				console.log(height)
			}
			//测试一下
			console.log(this.heightList);
		}
	},
	created(){

		this.$nextTick(() => {

			this.meunScroll = new BScroll(this.$refs.meunWrapper)
			this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{probeType:3})
			//测试获取的DOM是不是有数据的DOM
			console.log('测试获取的DOM是不是有数据的DOM'+this.$refs.meunWrapper.innerHTML)
			//利用better-scroll的方法获取滚动值
			this.foodsScroll.on('scroll',(pos) => {
				this.scrollY = Math.abs(Math.round(pos.y))	//pso.y获取滚动值，取整取正
				//console.log(this.scrollY)	//测试一下
				//console.log(this.currentIndex)
			})

			//挂载好数据之后执行获取DOM高度方法
			//首次进入没有效果，异步？？？
			console.log('创建完成钩子')
			console.log(this.goods)
			this._calculateHight()	//没有数据进来？？？
		}) 
  	},
  	mounted(){
  		console.log('挂载完成钩子')
  		console.log(this.goods)
  	},
  	computed:{
  		//判断滚动值是在那一个序列中，用在:class的li上
  		currentIndex(){
  			//使用循环来逐一判断
  			for(let i=0 ; i<this.heightList.length ; i++){
  				let height1 = this.heightList[i]
  				let height2 = this.heightList[i+1]
  				if(!height2 || this.scrollY < height2 && this.scrollY >= height1){
  					return i
  				}
  			}
  			return 0	//默认处于第一个序列
  		}
  	}*/
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
		overflow: hidden;
	}
	.home-goods_foods{
		flex: 1;
		overflow: hidden;
	}
/*菜单栏样式*/
	.home-goods_menuitem{
		/*怎么垂直居中啊？？？*/
		display: table;
		height: 54px;
		width: 56px;
		padding: 0 12px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.home-goods_menuitem span{
		display: table-cell;
		vertical-align: middle;
		line-height: 14px;
		font-size: 12px;
	}
/*商品栏样式*/
	.home-goods_foods--title{
		padding-left: 14px;
		border-left: 2px solid #d9dde1;
		font-size: 12px;
		height: 26px;
		line-height: 26px;		
		color: rgb(147,153,159);
		background-color: #f3f5f7;
	}
	.home-goods_foods--item{
		position: relative;
		display: flex;
		padding:18px;
		box-sizing: border-box;
		border-bottom: 1px solid rgba(7,17,27,0.1)	/*怎么通过伪类选择器使li最后一个不加border啊？？？*/
	}
	.home-goods_foods--icon{
		flex: 0 0 57px;
		margin-right: 10px;
	}
	.home-goods_foods--contentname{
		margin: 2px 0 8px 0;
		height: 14px;
		line-height: 14px;
		font-size: 14px;
		color: rgb(7,17,27);
	}

	.home-goods_foods--contentdesc,.home-goods_foods--contentextra{
		line-height: 12px;
		font-size: 12px;
		font-size: 12px;
		color: rgb(147,153,159);
	}
	.home-goods_foods--contentextra span{
		margin-right: 12px;
	}
	.home-goods_foods--contentprice{
		font-weight: 700;
		line-height: 24px;
	}
	.home-goods_foods--newprice{
		font-size: 14px;
		margin-right: 8px;
		color: rgb(240,20,20);
	}
	.home-goods_foods--oldprice{
		font-size: 10px;
		color: rgb(147,153,159);
		text-decoration: line-through;
	}
	/*添加商品小球组件，定位样式*/
	/*无效？？？*/
	.home-goods_foods--cartcontrol{
		position: absolute;
		right: 12px;
		bottom: 2px;
		
	}
/*类型滚动到样式*/
	.current{
		background-color: #fff;
		font-weight: 700;
		color: #007AFF;
	}
</style>