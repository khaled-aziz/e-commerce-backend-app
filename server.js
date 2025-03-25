import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { dbConnection } from './database/db connection.js';
import { appRouts } from './src/index.routes.js';
import cookieParser from 'cookie-parser';


const app = express();

dotenv.config();
dbConnection();

app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(express.static('uploads'))

appRouts(app);

app.listen(process.env.PORT || 3000, () => {
    console.log('server is running ✌️');
})
process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection', err);
})