var Router = require('express').Router;
var router = Router();
import { Request, Response, NextFunction } from 'express';
import Surveys from '../queries/surveys';
import RawResponse from '../queries/rawresponse';
import Typeform from '../interfaces/typeform'

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
    Surveys.getAll(req, res);
}); //TODO: Simplify syntax

router.get('/reports', RawResponse.get);

router.post('/response', function(
    req: Request,
    res: Response,
    next: NextFunction
): void {
  RawResponse.insertResponse(req.body.form_response);
  res.send([]);
});

router.get('/responses', function(
  req: Request,
  res: Response,
  next: NextFunction
): void {
    Typeform.getResponses('nYkngh', res)
});

router.get('/form', function(
  req: Request,
  res: Response,
  next: NextFunction
): void {
    Typeform.getForm('nYkngh', res)
});

export default router;
