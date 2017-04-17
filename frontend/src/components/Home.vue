<template>
	<div>
		<nav-bar></nav-bar>
		<div class="row">
			<div class="col s3 m3 no-padding">
				<side-bar></side-bar>
			</div>
			<div class="col s9 m9 no-padding">
				<chat-content></chat-content>
				<input-area></input-area>
			</div>
		</div>
	</div>
</template>
<script>
import sideBar from './SideBar.vue';
import chatContent from './ChatContent.vue';
import inputArea from './InputArea.vue';
import navBar from './NavBar.vue';
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