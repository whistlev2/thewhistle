var Router = require('express').Router;
var router = Router();
import { Request, Response, NextFunction } from 'express';

import {getSurveys} from '../queries'

/* GET home page. */
router.get('/test', function(req: Request, res: Response, next: NextFunction): void {
    res.send('Hello Typescript API');
});

router.get('/db', function(req: Request, res: Response, next: NextFunction): void {
    getSurveys(req, res)
});

export default router;
