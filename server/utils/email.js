const nodemailer = require('nodemailer');

exports.send = async function(toAddress, title, body) {
    let fromAddress = process.env.EMAIL;
    let password = process.env.EMAIL_PASSWORD;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: fromAddress,
            pass: password
        }
    });
    var mailOptions = {
        from: fromAddress,
        to: toAddress,
        subject: title,
        text: body
    };
    console.log('FROM', fromAddress);
    console.log('PASS', password);
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log('COULD NOT SEND')
            //TODO: Handle errors properly
            console.error(error);
        }
    });
}