<template>
<div class="container">
	<h1>Login to Continue</h1>
	<div class="container">
		<form class="col s12">
			<div class="row">
				<div class="input-field col s12">
					<input placeholder="Username" v-model="username" type="text" class="validate">
				</div>
			</div>
			<div class="row">
				<div class="input-field col s12">
					<input placeholder="Password" v-model="password" type="password" class="validate">
				</div>
			</div>
			<div class="row">
				<div align="center">
					<button type="submit" v-on:click="login" class="btn btn-waves">Submit</button>
				</div>
			</div>
		</form>
	</div>
</div>
</template>

<script>
import router from '../router';

export default {
	name: 'Login',
	data () {
		return {
			username: '',
			password: ''
		}
	},
	methods: {
		login(event) {
			event.preventDefault();
			let user = {};
			user.username = this.username,
			user.password = this.password;
			// console.log(user);
			axios.post('/auth/login',user).then((response) => {
				const data = response.body;
				console.log(router);
				if(!data.success){
					console.log(this);
				}
			})
			.catch((err) => {
				console.log('Goibng');
				router.push('/home');
			});
			return false;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label{
	text-align: center !important;
}
</style>
