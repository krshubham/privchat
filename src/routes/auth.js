import express from 'express';
import * as jwt from 'jsonwebtoken';
import xss from 'xss';
import db from '../db';
import bcrypt from 'bcrypt';

const saltRounds = 12;
const secret = 'ThisisSecret';
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
	users.findOne({username: user.username}).then((person) => {
		if(person){
			return res.json({
				success: false,
				message: 'The username already exists in the database'
			});
		}
		bcrypt.hash(user.password, saltRounds).then((hash) => {
			user.password = hash;
			users.insertOne(user).then(() => {
			console.log('User inserted successfully');
			res.json({
				success: true,
				message: 'User inserted successfully'
			});
		})
		.catch((err) => {
			console.log(err);
		});
		})
		.catch((err) => {
			console.log(err);
		});
	})
	.catch((err) => {
		console.log(err);
	});
}


/**
 * @param {req} any - The standard express request object
 * @param {res} any - The standard express response object
 * In the below function, we get the username and password
 * from the user and then check in the following manner
 * 1) Check if the user exists in the database
 * 2) If the user doesn't exist return response
 * @return {json} res - {
 * 		success: false,
 * 		message: 'Username doesn't exist
 * }
 * 3) If the user exists then we go and check the password 
 * 4) using bcrypt.compare function we check for the password
 * 5) If the password matches then we allow the user
 * to login by 
 * @return {json} res - {
 * 		success : true,
 * 		message: 'Logged in succesfully'
 * }
 */
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
			bcrypt.compare(user.password,person.password).then((response) => {
				if(response){
					/**
					* The user entered the correct password
					*/
					delete user.password;
					const token = jwt.sign({
						// expire in 1 hour
						exp: Math.floor(Date.now() / 1000) + (60 * 60),
						data: user
					},secret);
					res.json({
						success: true,
						token,
						message: "Logged in successfully"
					});
				}
				else{
					res.json({
						success: false,
						message: "Wrong password"
					});
				}
			})
		}
		else{
			/**
			 * No person is found, this means that the username doesn't exist in the database
			 * Now return a success false along with appropriate message
			 */
			res.json({
				success: false,
				message: 'The user doesn\'t exist in the database'
			});
		}
	})
	.catch((err) => {
		console.log(err);
	});
}

router.post('/signup',signup);
router.post('/login',login);

export default router;