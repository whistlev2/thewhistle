// Interface to speak to Typeform
// https://developer.typeform.com/

const https = require('https')
const request = require('request');

const TYPEFORM_API_BASE_URL = "api.typeform.com"
const ACCESS_TOKEN = "AzFKEWni1yAe1VG1HUJaGNLs4KFX3u7fmrB2jZZSKu4q"

const bearer = {
'auth': {
  'bearer': ACCESS_TOKEN
}
}

export function getForm(form: string, res: Response) {
  const url = `https://${TYPEFORM_API_BASE_URL}/forms/${form}`
  request.get(url, bearer, function (error, response, body){
    res.json(body);
  })
}


export function getResponses(form: string, res: Response) {
  const url = `https://${TYPEFORM_API_BASE_URL}/forms/${form}/responses`

  request.get(url, bearer, function (error, response, body){
    res.json(body);
  })
}
