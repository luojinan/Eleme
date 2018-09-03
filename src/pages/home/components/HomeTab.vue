<template>
	<div class="home-tab">
		<router-link 
	    	to="/"
	    	tag="div"
	    	class="tabheader-item"
	    >商品
		</router-link>
		<router-link 
	    	to="/evaluate"
	    	tag="div"
	    	class="tabheader-item"
	    >评价
		</router-link>
		<router-link 
	    	to="/merchant"
	    	tag="div"
	    	class="tabheader-item"
	    >商家
		</router-link>
	</div>
</template>

<script>
export default {
	name:'HomeTab',
}
</script>

<style>
	.home-tab {
		display: flex;
	    background-color: #fff;
	    box-shadow: inset 0px 1px 1px -1px #A7A7AB;
	}
	.tabheader-item{
		flex: 1;
		float: left;
		height: 40px;
		text-align: center;
		line-height: 40px;
		font-size: 14px;
	}
	.router-link-active{
	        color: #007AFF;
	        border-bottom: 1px solid #007AFF;
	}
</style>