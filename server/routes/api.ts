var Router = require('express').Router;
var router = Router();
import { Request, Response, NextFunction } from 'express';

/* GET home page. */
router.get('/test', function(req: Request, res: Response, next: NextFunction): void {
    res.send('Hello Typescript API');
});

export default router;
