var AWS = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config();

var credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey : process.env.AWS_SECRET_KEY
};
AWS.config.update({credentials: credentials, region: 'eu-west-2'});
var s3 = new AWS.S3();

var presignedGETURL = s3.getSignedUrl('getObject', {
    Bucket: process.env.AWS_BUCKET,
    Key: 'db.dump', //filename
    Expires: 1000 //time to expire in seconds
});

console.log(presignedGETURL);
//heroku pg:backups:restore --app staging-thewhistle --confirm "http://whistlev2.s3.eu-west-2.amazonaws.com/db.dump" DATABASE_URL