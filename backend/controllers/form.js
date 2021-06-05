const nm = require('nodemailer');
require('dotenv').config()

exports.contactForm = (req, res) => {
   const {toemail, email, usermessage, name} = req.body;
   let transporter = nm.createTransport({
    port: 465,
    service: "gmail",
    auth: {
        user: 'abanerjee763@gmail.com',
        pass: '03432582357',
    },
    secure: false

    })
   var message = {
        from: toemail,
        to: email,
        subject: 'Contact Mail',
        html: `<h1>Send by ${name}</h1><br/><p>${usermessage}</p>`
    };

    transporter.sendMail(message, (err,success) => {
        if(err){
            console.log(err);
            res.status(400).json({
                error: err
            });
            
        }

        res.status(200).json({
            success: true
        })
    })
};

exports.contactBlogAuthorForm = (req, res) => {
    const { authorEmail, email, name, message } = req.body;
    // console.log(req.body);

    let maillist = [authorEmail, process.env.EMAIL_TO];

    const emailData = {
        to: maillist,
        from: email,
        subject: `Someone messaged you from ${process.env.APP_NAME}`,
        text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
        html: `
            <h4>Message received from:</h4>
            <p>name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Message: ${message}</p>
            <hr />
            <p>This email may contain sensetive information</p>
            <p>https://seoblog.com</p>
        `
    };

    sgMail.send(emailData).then(sent => {
        return res.json({
            success: true
        });
    });
};