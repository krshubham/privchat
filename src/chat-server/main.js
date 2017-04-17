import * as jwt from 'jsonwebtoken';
import assert from 'assert';
const secret = 'ThisisSecret';


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
		* The method is called when someone disconnects from the site
		*/
		socket.on('disconnect', () =>{
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




