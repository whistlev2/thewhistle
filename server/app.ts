import express from 'express';
import subdomain from 'express-subdomain';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

import { Request, Response } from 'express';

const db = require('./db');

var app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public/')));

app.get(/.*/, (req: Request, res: Response): void =>
    res.sendFile(__dirname + '/public/index.html'));


module.exports = app;
