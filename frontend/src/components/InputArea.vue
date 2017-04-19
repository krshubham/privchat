<template>
	<div class="input-area">
		<form class="col s12" id="loginForm" @submit="sendMessage">
			<div class="row">
				<div class="input-field col s12">
					<input placeholder="Message" v-model="message" type="text">
				</div>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	name: 'inputArea',
	data() {
		return {
			message: ''
		};
	},
	methods: {
		sendMessage(event){
			event.preventDefault();
			let message = this.message;
			const token = localStorage.getItem('token');
			const toSend = {
				message,
				token
			}
			socket.emit('newMessage',toSend);
			this.message = '';
			return false;
		}
	}
};
</script>

<style scoped>
	div.input-area{
		position: fixed;
		z-index: 999;
		bottom: 0;
		width: 70%;
	}
	input{
		margin: 0;
	}
</style>