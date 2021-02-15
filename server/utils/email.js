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

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            //TODO: Handle errors properly
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}