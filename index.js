const express = require('express')
const https = require('https')
const fs =require('fs')
const config = require('./config')
const startup = require('./routes/startup')
const colors = require('./routes/colors')
const classSchedule = require('./routes/classSchedule')
const location = require('./routes/location')
const studentInfo = require('./routes/studentInfo')

const app = express()

const httpsOptions = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem'),
    passphrase: config.privateKeyPassphrase
}

const server = https.createServer(httpsOptions,app)

app.use(express.json())
app.use('/https-web-service/v1', startup)
app.use('/https-web-service/v1', colors)
app.use('/https-web-service/v1', classSchedule)
app.use('/https-web-service/v1', location)
app.use('/https-web-service/v1', studentInfo)

server.listen(8080, ()=> {
    console.log('Server is up')
})

