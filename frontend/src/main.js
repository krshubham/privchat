// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
});

/**
 * @param {transition}
 * The function below takes three arguments
 * @param {to} - The next route
 * @param {from} - The current route
 * @method {next} - The resolving function
 */
router.beforeEach((to, from, next) => {
	const secured = to.meta.secured;
	console.log(to);
	if(secured){
		//TODO: perform a deep expiry check here
		const token = localStorage.getItem('token');
		console.log(token);
		if(token)
			next();
		else{
			router.push('/');
		}
	}
	else{
		//let them go
		next()
	}
});