/*
const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const Recaptcha = require("express-recaptcha").RecaptchaV2
const formData = require("form-data")
//https://www.npmjs.com/package/mailgun.js
const Mailgun = require("mailgun.js")
const mailgun = new Mailgun(formData)

const {check, validationResult} = require("express-validator")

const validation = [
    check("name", "A valid name is required.").not().isEmpty().trim().escape(),
    check("email", "Please provide a valid email").isEmail(),
    check("subject").optional().trim().escape(),
    check("message", "A message shorter than 2000 characters is required").trim().escape().isLength({min:1, max:2000})
]

const app = express()
const recaptcha = new Recaptcha(process.env.RECAPTCHA_SITE_KEY, process.env.RECAPTCHA_SECRET_KEY)
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY})

app.use(morgan("dev"))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const indexRoute = express.Router()

const handleGetRequest = (req, res) => {
    return res.json("The express server is live")
}

const handlePostRequest = (req, res) => {
    res.append('Content-Type', 'text/html')

     if (req.recaptcha.error) {
       return response.send(
         `<div class='alert alert-danger' role='alert'><strong>Oh snap!</strong>There was an error with Recaptcha please try again</div>`
       );
     }

    const errors = validationResult(req)

    if(errors.isEmpty() === false) {
        const currentError = errors.array()[0]

        return res.send(`<div class="alert alert-danger" role="alert"><strong>Oh snap!</strong> ${currentError.msg}</div>`)
    }

    const {email, subject, name, message} = req.body

    const mailgunData = {
        to: process.env.MAIL_RECIPIENT,
        from: `${name} <postmaster@${process.env.MAILGUN_DOMAIN}>`,
        subject: `${email}: ${subject}`,
        text: message
    }

    mg.messages.create(process.env.MAILGUN_DOMAIN, mailgunData)
        .then(msg =>
            res.send(
                `<div class='alert alert-success' role='alert'>Email Successfully Sent</div>`
            ))
        .catch(err =>
            res.send(
                `<div class="alert alert-danger" role="alert"><strong>Oh snap!</strong>${err}</div>`
            ))
}

indexRoute.route("/")
    .get(handleGetRequest)
    .post(recaptcha.middleware.verify, validation, handlePostRequest)

app.use("/apis",indexRoute)

app.listen(4200, () => {
    console.log("Express Successfully built")
)
*/

const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const Recaptcha = require("express-recaptcha").RecaptchaV2
const formData = require("form-data")
const Mailgun = require("mailgun.js")
const mailgun = new Mailgun(formData)
// require('dotenv').config()
const {check, validationResult} = require("express-validator")
const {request, response} = require("express");

const validation = [
    check("name", "A valid name is required.").not().isEmpty().trim().escape(),
    check("email", "Please provide a valid email").isEmail(),
    check("subject").optional().trim().escape(),
    check("message", "A message of 2000 characters or less is required").trim().escape().isLength({min:1, max:2000})
]

const app = express()
const recaptcha = new Recaptcha(process.env.RECAPTCHA_SITE_KEY, process.env.RECAPTCHA_SECRET_KEY)
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY})

app.use(morgan("dev"))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const indexRoute = express.Router()

const handleGetRequest = (request, response) => {
    return response.json("The express server is live")
}

const handlePostRequest = (request, response) => {
    response.append('Content-Type', 'text/html')
    response.append("Access-Control-Allow-Origin", "*")

    if (request.recaptcha.error) {
        return response.send(
            `<div class='alert alert-danger' role='alert'><strong>Oh Snap!</strong>There was a recaptcha error. Please try again</div>`
        )
    }

    const errors = validationResult(request)

    if(errors.isEmpty() === false){
        const currentError = errors.array()[0]
        return response.send(`<div class='alert alert-danger' role='alert'><strong>Oh Snap!</strong>${currentError}</div>`)
    }

    const {email, subject, name, message} = request.body

    const mailgunData = {
        to: process.env.MAIL_RECIPIENT,
        from: `${name} <postmaster@${process.env.MAILGUN_DOMAIN}>`,
        subject: `${email}: ${subject}`,
        text: message
    }

    mg.messages.create(process.env.MAILGUN_DOMAIN, mailgunData)
        .then(msg =>
            response.send(
                `<div class='alert alert-success' role='alert' >Email was successfully sent</div>`
            ))
        .catch(err =>
            response.send(
                `<div class='alert alert-danger' role='alert'><strong>Damn Daniel Something went wrong!</strong>${err}</div>`
            ))

}

indexRoute.route("/")
    .get(handleGetRequest)
    .post(recaptcha.middleware.verify, validation, handlePostRequest)

app.use('/apis', indexRoute)

app.listen(4200, () => {
    console.log('Express Successfully Built')
})