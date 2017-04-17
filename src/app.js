import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import socket from 'socket.io';
import assert from 'assert';
import auth from './routes/auth';
import path from 'path';
import db from './db';
import http from 'http';
import mainApp from './chat-server/main';
const app = express();
const connString = 'mongodb://localhost:27017/privchat'

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'../frontend/dist/')));
app.use(express.static(path.join(__dirname,'../frontend/bower_components')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const server = app.server = http.Server(app);
const io = socket(server);

db.connect(connString, (err) => {
	try{
		assert.equal(err,null);
		console.log('connected to the db');
	}
	catch(err){
		console.log('Problem in connecting to the database');
	}
	
});

app.use('/auth',auth);

mainApp(io);

app.use('*', (req,res) => {
	res.sendFile(path.join(__dirname,'../frontend/dist/index.html'));
});

server.listen(Number(8000), () => {
	console.log('Server running on port 8000');
	console.log('Hello');
});