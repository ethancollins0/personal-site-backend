const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
let nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    tlsL: {
        rejectUnauthorized: false
    }
})

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cors())

app.post('/', (req, res) => {
    const { name, email, message } = req.body
    if (name && email && message){
        let HelperOptions = {
            from: `PORTFOLIO WEBSITE`,
            to: process.env.RECIPIENT,
            subject: `Email from ${name} at ${email}`,
            text: `${message}`
        }

        transporter.sendMail(HelperOptions, (err, info) => {
            err
                ? res.json(null)
                : res.json({status: 'successful'})
        })
    } else {
        res.json(null)
    }
})






app.get('/', (req, res) => {
    console.log('here')
    res.json('success')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('listening...')
})