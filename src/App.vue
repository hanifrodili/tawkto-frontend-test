<template>
	<div>
		<tawk-header></tawk-header>
		<tawk-category></tawk-category>
	</div>
</template>

<script>
import Header from './components/Header.vue'
import Category from './components/Category.vue'

export default {
	components:{
		'tawk-header': Header,
		'tawk-category': Category
	}
}
</script>

<style lang="scss" scoped>
	@import 'scss/main.scss';
</style>