<template>
<div class="container">
	<h1>Login to Continue</h1>
	<div class="container">
		<form class="col s12" id="loginForm">
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
			<div class="row" style="text-align: left; margin-left: 1em;">
				<a href="#" v-on:click="showSignup">Signup?</a>
			</div>
			<div class="row">
				<div align="center">
					<button type="submit" v-on:click="login" class="btn btn-waves">Login</button>
				</div>
			</div>
		</form>
		<form class="col s12" id="signupForm">
			<div class="row">
				<div class="input-field col s12">
					<input placeholder="Username" v-model="signupUsername" type="text" class="validate">
				</div>
			</div>
			<div class="row">
				<div class="input-field col s12">
					<input placeholder="Password" v-model="signupPassword" type="password" class="validate">
				</div>
			</div>
			<div class="row">
				<div class="input-field col s12">
					<input placeholder="Password" v-model="confirmSignupPassword" type="password" class="validate">
				</div>
			</div>
			<span style="color: red;" v-if="confirmPassword">Passwords should match</span>
			<div class="row" style="text-align: left; margin-left: 1em;">
				<a href="#" v-on:click="showLogin">Login?</a>
			</div>
			<div class="row">
				<div align="center">
					<button type="submit" v-on:click="signup" class="btn btn-waves">Signup</button>
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
			password: '',
			signupUsername: '',
			signupPassword: '',
			confirmSignupPassword: ''
		};
	},
	methods: {
		login(event) {
			event.preventDefault();
			let user = {};
			user.username = this.username,
			user.password = this.password;
			axios.post('/auth/login',user).then((response) => {
				const data = response.data;
				if(data.success){
					console.log('Granted the login permission');
					router.push('/home');
				}
				else{
					console.log(`Unable to login because ${data.message}`);
				}
			})
			.catch((err) => {
				console.log('Some error occured while logging in');
				console.log(err);
			});
			return false;
		},
		signup(event) {
			event.preventDefault();
			let user = {};
			user.username = this.signupUsername;
			user.password = this.signupPassword;
			user.confirm = this.confirmSignupPassword;
			if(user.confirm === user.password){
				delete user.confirm; 
				axios.post('/auth/signup',user).then((response) => {
					console.log(response.data);
				})
				.catch((err) => {
					console.log(err);
				});
			}
			else{
				console.log('Passwords don\'t match');
			}
		},
		showSignup(event) {
			event.preventDefault();
			$('#loginForm').slideUp();
			$('#signupForm').slideDown();
			return false;
		},
		showLogin(event) {
			event.preventDefault();
			$('#loginForm').slideDown();
			$('#signupForm').slideUp();
			return false;
		}
	},
	computed: {
		confirmPassword() {
			return this.signupPassword !== this.confirmSignupPassword;
		}
	}
}
</script>

<style scoped>
label{
	text-align: center !important;
}
form#signupForm{
	display: none;
}
</style>
