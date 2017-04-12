<template>
	<div>
		<nav-bar></nav-bar>
		<div class="row">
			<div class="col s3 m3">
				<side-bar></side-bar>
			</div>
			<div class="col s9 m9">
				<chat-content></chat-content>
			</div>
		</div>
		<input-area></input-area>
	</div>
</template>

<script>
import sideBar from './SideBar.vue';
import chatContent from './ChatContent.vue';
import inputArea from './InputArea.vue';
import navBar from './NavBar.vue';
import router from '../router';

export default {
	name: 'Home',
	components: {
		sideBar,
		chatContent,
		inputArea,
		navBar
	}
}
</script>
<style>
	nav{
		background-color: cyan;
	}
</style>