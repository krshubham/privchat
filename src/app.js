import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import socket from 'socket.io';
import auth from './routes/auth';
import path from 'path';

const app = express();
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'../frontend/dist/')));
app.use(express.static(path.join(__dirname,'../frontend/bower_components')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/auth',auth);
app.use('*', (req,res) => {
    res.sendFile(path.join(__dirname,'../frontend/dist/index.html'));
});

app.listen(Number(8000), () => {
    console.log('Server running on port 8000');
    console.log('Hello');
});