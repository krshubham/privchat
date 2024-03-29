import * as jwt from 'jsonwebtoken';
import assert from 'assert';
const secret = 'ThisisSecret';
import db from '../db';
import striptags from 'striptags';
import xss from 'xss';
const messageSecret = 'CoolSecret';
import crypto from 'crypto';


/**
* @const {algroithm} 
* We are using AES 256 in Global Counter Mode
* with the secret key as given below
*/
const algorithm = 'aes-256-ctr', password = 'd6F3Efeq';

/**
* @global {Array} online
* This array contains the list of all the online clients currently
*/
let online = [];

/**
* Helper methods
* @param {JSON} token - 
* This method takes the token and then tells us some vital information about it
* @return {JSON} user 
* Returns a user object having two paramaters:
* @param {name}
* @param {token} - The data of the token
* @async 
*/

function getUser(token){
	return new Promise((resolve,reject) => {
		try{
			assert.notEqual(token,null);
			const decoded = jwt.verify(token,secret);
			resolve(decoded);
		}
		catch(err){
			reject(err);
		}
	});
}

/**
* 
* @param {String} text 
* @method {encrypt}
* This method allows us to encrypt text messages before saving into db
* the algrotihm used is a @const {algorithm} and a global constant
*/

function encrypt(text){
	return new Promise((resolve, reject) => {
		try{
			const cipher = crypto.createCipher(algorithm,password);
			let crypted = cipher.update(text,'utf8','hex');
			crypted += cipher.final('hex');
			resolve(crypted);
		}
		catch(err){
			reject(err);
		}
	});
}

/**
* @method {decrypt}
* @param {String} text 
* This method takes encrypted text from the db and then 
* return the decrypted message
*/
function decrypt(text){
	try{
		const decipher = crypto.createDecipher(algorithm,password);
		let dec = decipher.update(text,'hex','utf8');
		dec += decipher.final('utf8');
		return dec;
	}
	catch(err){
		throw err;
	}
}

/**
* 
* @param {String} username 
* This helper method collects all the messages from the messages collection in the database
* 
*/

function getAllChats(username){
	return new Promise((resolve, reject) => {
		const messages = db.get().collection('messages');
		messages.find({}).toArray((err, docs) => {
			if(err){
				reject(err);
				throw err;
			}
			docs.forEach((element) => {
				element.message = decrypt(element.message);
			});
			console.log(docs);
			resolve(docs);
		});
	});
}

function getMessage(data){
	return new Promise((resolve,reject) => {
		try{
			for(let i in data){
				assert.notEqual(data[i],null);
			}
			const token = data.token;
			encrypt(striptags(xss(data.message))).then((message) => {
				console.log(message);
				const decoded = jwt.verify(token,secret);
				const username = decoded.data.username;
				const toResolve = {
					username,
					message
				};
				resolve(toResolve);
			})
			.catch((err) => {
				console.log(err);
			})
		}
		catch(err){
			reject(err);
		}
	});
}

/**
* This is the code for the main-app
* From here onwards we are actually handling all the user data
* and doing all the stuff
* @param {*} io 
*/

function mainApp(io){
	const app = io.of('/chat');
	app.on('connection', (socket) => {
		socket.on('getOnlineClients', (token) => {
			getUser(token).then((user) => {
				const username = user.data.username;
				let flag = false;
				for(var c of online){
					if(c.id === socket.id){
						flag = true;
					}
				}
				if(!flag){
					online.push({
						username,
						id : socket.id
					});
				}
				/**
				* Logging the array to check the clients
				*/
				app.emit('getOnlineClients',online);
				
			})
			.catch((err) => {
				console.log(err);
			});
		});
		
		/**
		* @event {getAllChats} 
		* This method is fired in frontend when the chatContent component is created
		* @return an array containing all the messages in this form
		* {
			* 	sender: 'Kumar Shubham',
			* 	message: 'A long string containing message'
			* }
			*/
			socket.on('getAllChats', (auth) => {
				getUser(auth)
				.then(getAllChats)
				.then((docs) => {
					console.log(`Docs from the messages collection have been collected`);
					console.log(docs);
					socket.emit('getAllChats',docs);
				})
				.catch((err) => {
					console.log(err);
				});
			});
			
			
			/**
			* @event {newMessage}
			* this method is responsiblw for inserting the data into the db for every chat message
			* The steps to be followed:
			* get the message
			* remove any unsuspected characters and also striptags
			* insert into the database
			* The format of the message is:
			* {
				message,
				token
			}
			*/
			socket.on('newMessage',(data) => {
				const messages = db.get().collection('messages');
				getMessage(data)
				.then((result) => {
					messages.insertOne(result)
					.then(() => {
						console.log(`Inserted the new message into the db`);
						result.message = decrypt(result.message);
						app.emit('newMessage',result);
					})
					.catch((err) => {
						console.log(err);
					});
				})
				.catch((err) => {
					console.log(err);
				});
			});
			
			/**
			* The method is called when someone disconnects from the site
			*/
			socket.on('disconnect', () => {
				for (let i = 0; i < online.length; i++) {
					if (online[i].id === socket.id) {
						online.splice(i, 1);
					}
				}
				socket.broadcast.emit('disconnectedClient', online);
				console.log(`Online cients after being disconnected`);
				console.log(online);
			});
		});
	}
	
	
	export default mainApp;
	
	
	
	
	