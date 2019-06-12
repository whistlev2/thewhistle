var Router = require('express').Router;
var router = Router();
import { Request, Response, NextFunction } from 'express';

import { getSurveys, getReports } from '../queries';

/* GET home page. */
router.get('/test', function(
    _req: Request,
    res: Response,
    next: NextFunction
): void {
    res.send('Hello Typescript API');
});

router.get('/db', function(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    getSurveys(req, res);
}); //TODO: Simplify syntax

router.get('/reports', getReports);

router.post('/response', function(
    req: Request,
    res: Response,
    next: NextFunction
): void {
  console.log(req.body.form_response);
  res.send([]);
});


export default router;
