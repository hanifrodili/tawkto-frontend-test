<template>
	<div id="header-wrapper">
		<div id="header-text">
			<h1>Knowledge base doesn't have to be boring</h1>
			<h3>Everything you need to manage your messaging</h3>
		</div>
		<div class="header-search">
			<input type="search" name="search" id="search" class="search-input" placeholder="Search for answers">
			<button class="search-button">
				<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
			</button>
		</div>
	</div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
	@import '../scss/_variables.scss';

	#header-wrapper {
		padding-bottom: 74px;
	}

	#header-text{
		text-align: center;
		font-family: $font-family;
		color: $text-black;
		padding: 20px;
		margin-bottom: 17px;

		h1{
			font-style: normal;
			font-weight: bold;
			font-size: 34px;
			line-height: 41px;
		}

		h3{
			font-style: normal;
			font-weight: normal;
			font-size: 20px;
			line-height: 24px;
		}
	}

	.header-search {
		width: 720px;
		height: 60px;
		border-radius: 4px;
		border: 1px solid #EEE;
		background: #FFF;
		display: flex;
		flex-direction: row;
		overflow: hidden;
		margin: auto;

		.search-button {
			border: none;
			width: 80px;
			height: 60px;
			background-color: #03A84E;
			cursor: pointer;

			svg {
				width: 18px;
				height: 18px;
				fill: #FFF;
			}
		}

		.search-input {
			border: none;
			flex-grow: 1;
			padding: 20px 22px;
			color: #000;
			font-size: 16px;
		}

		.search-input:focus-visible {
			outline: none;
		}

		.search-input::placeholder {
			color: #9C9AA6;
		}
	}
</style>