const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "746d74c0a1e9b4",
        pass: "e8ad98395a606a"
    }
});


module.exports = transport