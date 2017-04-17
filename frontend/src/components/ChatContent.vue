<template>
	<div class="chat-content">
		<div class="chat-bubble">
			<div class="chat-username">
				<span>Kumar Shubham</span>
			</div>
			<div class="chat-content">
				<p>Hello all</p>
			</div>
		</div>
		<div class="chat-bubble">
			<div class="chat-username">
				<span>Kumar Shubham</span>
			</div>
			<div class="chat-content">
				<p>Hello all</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'chatContent',
}
</script>

<style scoped>
	div.chat-content{
		position: relative;
		border: 1px solid #f5f5f5;
	}
</style>