// Interface to speak to Typeform
// https://developer.typeform.com/

const https = require('https')
const request = require('request');

const TYPEFORM_API_BASE_URL = "api.typeform.com"
const ACCESS_TOKEN = "5RZ4iZoAyrcRZyxdQzxDTDRnxM48iZw4RabZ2i2joJbv"
// "Cc66yqKdvMEBQgBX9uYKjQuMeKeRLzA68bckyNcoNUcH"
// "2Ybxuf6NPCQbHh9Zsptb7qPFCMaJ5UX3cA2tGHWGCM8P"
//

const bearer = {
    'auth': {
        'bearer': ACCESS_TOKEN
    }
}
class Typeform {
    
    private static jsonCallback(error, response, body){
        res.json(body);
    }

    static getForm(form: string, res: Response) {
        const url = `https://${TYPEFORM_API_BASE_URL}/forms/${form}`;
        request.get(url, bearer, this.jsonCallback);
    }

    static getResponses(form: string, res: Response) {
        const url = `https://${TYPEFORM_API_BASE_URL}/forms/${form}/responses`;
        request.get(url, bearer, this.jsonCallback);
    }
}

export default Typeform;
