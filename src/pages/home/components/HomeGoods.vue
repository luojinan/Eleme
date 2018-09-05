<template>
	<div class="home-goods">
		<div class="home-goods_menu" ref="meunWrapper">
			<ul>
				<li class="home-goods_menuitem" :class="{'current':currentIndex===index}" v-for="(item,index) in goods">
					{{item.name}}
				</li>
			</ul>
		</div>
		<div class="home-goods_foods" ref="foodsWrapper">
			<ul>
				<li v-for="item in goods" ref="foodsListHook">
					<div class="home-goods_foods--title">{{item.name}}</div>
					<ul >
						<li class="home-goods_foods--item" v-for="foods in item.foods">
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
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
//引入滚动插件
import BScroll from 'better-scroll'

export default {
	name:'HomeGoods',
	props:{
		goods:{
			type:Array
		},
		seller:{
			type:Object
		}
	},
	data(){
		return{
			heightList:[],
			scrollY:0
		} 
	},
	watch:{
		//监听到传值进来后，挂载滚动插件，操作DOM，获取高度等
		goods:'_calculateHight'
	},
	methods:{
		_calculateHight(){
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

		this.$nextTick(() => {
			//获取一个类的li高度
			//获取DOM元素className
			let foodWrapper = this.$refs.foodsWrapper
			let foodlist = this.$refs.foodsListHook
			//console.log('挂载完成后执行计算方法')
			//把高度push进从0开始的数组
			let height = 0;
			this.heightList.push(height);
			//console.log('输出默认数组的第一项'+this.heightList.length)
			///console.log('能获取到DOM右侧整个的内容'+foodlist)
			//获取到DOM，div里面有ul没有li，即数据没有？
			//console.log(this.goods)
			//console.log('右侧DOM有'+foodlist+'个')
			for(let i=0; i < this.goods.length; i++){
				//DOM的方法clientHeight获取高度
				height += foodlist[i].clientHeight;
				this.heightList.push(height);
				console.log(height)
			}
			//测试一下
			//console.log(this.heightList);
		})
		}
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
  	}
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
		height: 54px;
		width: 56px;
		line-height: 14px;
		font-size: 12px;
		
		padding: 0 12px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
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
		display: flex;
		margin:18px;
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
/*类型滚动到样式*/
	.current{
		background-color: #fff;
		font-weight: 700;
		color: #007AFF;
	}
</style>