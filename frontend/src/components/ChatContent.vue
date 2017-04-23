<template>
	<div class="chat-content" align="left">
		<div class="chat-bubble" v-for="chat in chats">
			<span class="sender">{{chat.username}} : </span>
			<p>{{chat.message}}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'chatContent',
	data() {
		return {
			chats: [],
			token: localStorage.getItem('token')
		};
	},
	methods: {
		getAllChats() {
			socket.emit('getAllChats',this.token);
			socket.on('getAllChats',(chats) => {
				this.chats = chats;
			});
		},
		listenFornewMessages() {
			socket.on('newMessage',(data) => {
				const messages = document.querySelector('.chat-content');
				console.log('new message received');
				this.chats.push(data);
				setTimeout(() => {
					messages.scrollTop = messages.scrollHeight;
				},200);
			});
		}
	},
	created() {
		this.getAllChats();
		this.listenFornewMessages();
	},
	mounted() {
		const chatContent = document.querySelector('div.chat-content');
		chatContent.style.height = window.innerHeight;
	}
}
</script>

<style scoped>
	div.chat-content{
		position: relative;
		border: 1px solid #f5f5f5;	
		text-align: left;
		overflow: auto;
		max-height: 550px;
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