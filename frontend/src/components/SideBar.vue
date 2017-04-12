<template>
	<div class="side-bar">
		<div class="side-bar-heading">
			<h3>Contacts</h3>
			<ul class="collection">         
				<li class="collection-item" v-for="contact in contacts">
					<span>{{contact.name}}</span>
					<i class="material-icons">android</i>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'sideBar',
	data() {
		return {
			contacts: [
				{
					name: 'Kumar Shubham'
				},
				{
					name: 'Aman Saha'
				},
				{
					name: 'Raghav Alagh'
				}
			]
		}
	},
	methods: {
		getContacts(){
			console.log('called');
		}
	}
}
</script>

<style scoped>
	div.side-bar{
		position: relative;
		border: 1px solid #f5f5f5;
		max-height: 647px;
		overflow: scroll;
	}
	div.side-bar-heading{
		background-color: #f1f1f1;
	}
	div.side-bar-heading h3{
		padding: 0;
		padding-top: 0.4em;
		margin-top: 0;
	}
	li{
		text-align: left;
		font-size: 1.2em;
		display: flex;
		justify-content: space-between;
	}
</style>