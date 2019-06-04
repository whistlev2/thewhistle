var Router = require('express').Router;
var router = Router();
import { Request, Response, NextFunction } from 'express';

<<<<<<< HEAD
import { getSurveys, getReports, saveTypeformResponse } from '../queries';
=======
import { getResponses, getForm } from '../interfaces/typeform'
>>>>>>> add get form structure call

import { getResponses, getForm } from '../interfaces/typeform'
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
  saveTypeformResponse(req.body.form_response);
  res.send([]);
});

router.get('/responses', function(req: Request, res: Response, next: NextFunction): void {
    getResponses('Bks8di', res)
});

router.get('/form', function(req: Request, res: Response, next: NextFunction): void {
    getForm('Bks8di', res)
});

<<<<<<< HEAD




=======
>>>>>>> add get form structure call
export default router;
