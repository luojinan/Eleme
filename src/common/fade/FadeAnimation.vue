<template>
	<transition>
		<slot></slot>
	</transition>
</template>

<script>
export default {
	name:'Fafe',
}
</script>

<style>
	/*自动会有class，不用在template中设置*/
	.v-enter , .v-leave-to{
		opacity:0;
	}
	.v-enter-active, .v-leave-active{
		transition: opacity .5s
	}
</style>