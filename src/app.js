import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import socket from 'socket.io';


const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/auth',)

app.listen(Number(8000), () => {
    console.log('Server running on port 8000');
});