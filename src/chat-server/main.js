import * as jwt from 'jsonwebtoken';
import assert from 'assert';
const secret = 'ThisisSecret';
import db from '../db';


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
			resolve(docs);
		});
	});
}



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
				console.log(online);
				
				let onlineCopy = [];
				for(let client of onlineCopy){
					if(client.id !== socket.id){
						onlineCopy.push(client);
					}
				}
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
			getUser(token)
			.then(getAllChats)
			.then((docs) => {
				console.log(`Docs from the messages collection have been collected`);
			})
			.catch((err) => {
				console.log(err);
			});
		});
		
		/**
		* The method is called when someone disconnects from the site
		*/
		socket.on('disconnect', () =>{
			for (let i = 0; i < online.length; i++) {
				if (online[i].id === socket.id) {
					online.splice(i, 1);
				}
			}
			socket.broadcast.emit('disconnectedClient', online);
			console.log(`Online cients after be-ing disconnected`);
			console.log(online);
		});
	});
}


export default mainApp;




