import express from 'express';
import * as jwt from 'jsonwebtoken';
import xss from 'xss';
import db from '../db';

const router = express.Router();


function signup(req,res){
	let user = req.body;
	/**
	* First of all check the username and password
	* connect the database and insert the username and password
	* into the users collection
	*/
	for(var i in user){
		user[i] = xss(user[i]);
	}
	/**
	* The user data is free from any thing that may cause some issue later on
	*/
	const users = db.get().collection('users');
	user.findOne({}).then((person) => {
		if(person){
			return res.json({
				success: false,
				message: 'The username already exists in the database'
			});
		}
		users.insertOne(user).then(() => {
			console.log('User inserted successfully');
		})
		.catch((err) => {
			console.log(err);
		});
		res.json({
			success: true,
			message: 'User inserted successfully'
		});
	})
	.catch((err) => {
		console.log(err);
	});
}


function login(req,res){
	
	let user = req.body;
	/**
	 * Removing any unwanted items from the data given by the user
	 */
	for(var i in user){
		user[i] =  xss(user[i]);
	}
	// The data is clean now
	const users = db.get().collection('users');
	users.findOne({username: user.username}).then((person) => {
		if(person){
			/** 
			 * Now the person is found
			 * do some checks on the password and
			 * create a new token and then send it to the client
			 * Vue on the frontend should take care of the token in the localstorage and 
			 * maybe also in the hidden HTML input.
			 * Whenever any interaction happens in future over any of the secured routes, make
			 * sure to make an interceptor for all the requests so that the token is handled appropriately
			 */
		}
		else{
			return res.json({
				success: false,
				message: 'The user doesn\'t exist in the database'
			});
		}
	});
	res.json(user);
}

router.post('/signup',signup);
router.post('/login',login);

export default router;