<template>
	<transition>
		<slot></slot>
	</transition>
</template>

<script>
export default {
	name:'Move',
}
</script>

<style>
	/*自动会有class，不用在template中设置*/
	.v-enter , .v-leave-to{
		opacity:0;
		transform: translate3d(24px,0,0);
	}
	.v-enter-active, .v-leave-active{
		
	}
</style>