// Interface to speak to Typeform
// https://developer.typeform.com/

const https = require('https')
const request = require('request');

const TYPEFORM_API_BASE_URL = "api.typeform.com"
const ACCESS_TOKEN = "5o33hz2vjVsNbKCu8T4Zb2cYnNM6kWknvqnsfe5mX4Dn"

// "5RZ4iZoAyrcRZyxdQzxDTDRnxM48iZw4RabZ2i2joJbv"
// "Cc66yqKdvMEBQgBX9uYKjQuMeKeRLzA68bckyNcoNUcH"
// "2Ybxuf6NPCQbHh9Zsptb7qPFCMaJ5UX3cA2tGHWGCM8P"
//

const headers = {
  'Authorization': 'Bearer ' + ACCESS_TOKEN,
  'Accept': 'application/json'
}

const bearer = {
    'auth': {
        'bearer': ACCESS_TOKEN
    }
}


// private static jsonCallback(error, response, body){
//     res.json(body);
// }
//
// static getForm(form: string, res: Response) {
//     const url = `https://${TYPEFORM_API_BASE_URL}/forms/${form}`;
//     request.get(url, bearer, this.jsonCallback);
// }
//
// static getResponses(form: string, res: Response) {
//     const url = `https://${TYPEFORM_API_BASE_URL}/forms/${form}/responses`;
//     request.get(url, bearer, this.jsonCallback);
// }

function jsonCallback(error, res, body) {
  res.json(body);
}

exports.getForm = function (form, res) {
  const url = `https://${TYPEFORM_API_BASE_URL}/forms/${form}`;
  request.get(url, bearer, jsonCallback);
}

exports.updateForm = function (formID, form) {
  const url = `https://${TYPEFORM_API_BASE_URL}/forms/${formID}`;

  request.put({
    url: url,
    headers: headers,
    body: form
  }, function (error, response) {
    console.log(error);
    console.log(response);
  })

  // const reqOptions = {
  //   uri: url,
  //   body: form,
  //   method: 'PUT',
  //   headers: bearer
  // }
  //
  // request(reqOptions, function(error, response) {
  //   console.log(error);
  //   console.log(response);
  // })
}