<template>
	<transition>
		<slot></slot>
	</transition>
</template>

<script>
export default {
	name:'RightOpen',
}
</script>

<style>
	/*自动会有class，不用在template中设置*/
	.v-enter , .v-leave-to{
		transform: translate3d(100%,0,0);
	}
	.v-enter-active, .v-leave-active{
		
	}
</style>