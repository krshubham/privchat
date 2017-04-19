<template>
	<div class="chat-content" align="left">
		<div class="chat-bubble">
			<span class="sender">Kumar Shubham : </span>
			<p>lorem ipsum dolor</p>
		</div>
		<div class="chat-bubble">
			<span class="sender">Kumar Shubham : </span>
			<p>lorem ipsum dolor</p>
		</div>
		<div class="chat-bubble">
			<span class="sender">Kumar Shubham : </span>
			<p>lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor
				lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor
			</p>
		</div>
	</div>
</template>

<script>
const token = localStorage.getItem('token')
export default {
	name: 'chatContent',
	data() {
		return {
			chats: []
		};
	},
	methods: {
		getAllChats() {
			socket.emit('getAllChats',token);
			socket.on('getAllChats',(chats) => {
				console.log(chats);
			});
		}
	},
	created() {
		this.getAllChats();
	}
}
</script>

<style scoped>
	div.chat-content{
		position: relative;
		border: 1px solid #f5f5f5;
		text-align: left;
	}
	span.sender{
		font-size: 1.5em;
		font-weight: 600;
	}
	p{
		display: inline;
	}
	div.chat-bubble{
		margin-bottom: 10px;
	}
</style>