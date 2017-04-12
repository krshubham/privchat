<template>
	<div>
		<side-bar></side-bar>
		<chat-content></chat-content>
		<input-area></input-area>
	</div>
</template>

<script>
import sideBar from './SideBar.vue';
import chatContent from './ChatContent.vue';
import inputArea from './InputArea.vue';

export default {
	name: 'Home',
	beforeCreate() {
		console.log('Logged before being created');
	},
	components: {
		sideBar,
		chatContent,
		inputArea
	}
}
</script>