<template>
	<div class="home-gallary_title">
			<div class="home-gallary_title--line"></div>
			<div class="home-gallary_title--text"><slot></slot></div>
			<div class="home-gallary_title--line"></div>
		</div>
</template>

<script>
export default {
	name:'GallaryTitle',
}
</script>

<style>
/*标题样式*/
	.home-gallary_title{
		display: flex;
		width: 90%;
		margin:28px auto 24px auto;
	}
	.home-gallary_title--line{
		flex: 1;
		position: relative;
		top:-6px;
		border-bottom: 1px solid rgba(255,255,255,0.2);
	}
	.home-gallary_title--line{
		font-size: 14px;
		margin: 0 12px;
		font-weight: 700;
	}
</style>