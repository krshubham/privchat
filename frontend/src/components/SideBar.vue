<template>
	<div class="side-bar">
		<div class="side-bar-heading amber lighten-3">
			<h3>Contacts</h3>
		</div>
		<ul class="collection" style="margin: 0;">
				<li class="collection-item amber lighten-5" v-for="contact in contacts">
					<span>{{contact.name}}</span>
					<i class="material-icons">android</i>
				</li>
			</ul>
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
			const token = localStorage.getItem('token');
			if(token){
				axios.get('/user/contacts',token).then((response) => {
					const contacts = response.data;
					this.contacts = contacts;
				});		
			}
			else{
				console.log('No token found! Please login again');
			}
		}
	},
	created() {
		this.getContacts();
	}
}
</script>

<style scoped>
	div.side-bar{
		position: relative;
		border: 1px solid #fff8e1;
		max-height: 647px;
		overflow: scroll;
	}
	div.side-bar-heading h3{
		padding: 0.5rem;
		/*padding-top: 0.4em;*/
		margin-top: 0;
		margin-bottom: 0;
	}
	div.side-bar-heading{
		margin-bottom: 0;
	}
	li{
		text-align: left;
		font-size: 1.2em;
		display: flex;
		justify-content: space-between;
	}
</style>