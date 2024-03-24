// const express = require('express')
import express from 'express'
import https from 'https'
import fs from 'fs'
import cors from 'cors'
// const https = require('https')
// const fs =require('fs')
// const cors = require('cors')

// const config = require('./config')
import { privateKeyPassphrase } from './config.js'
// const startup = require('./routes/startup')
import startup from './routes/startup.js'
// const colors = require('./routes/colors')
import colors from './routes/colors.js'
// const classSchedule = require('./routes/classSchedule')
import classSchedule from './routes/classSchedule.js'
// const location = require('./routes/location')
import location from './routes/location.js'
// const studentInfo = require('./routes/studentInfo')
import studentInfo from './routes/studentInfo.js'

const app = express()

const httpsOptions = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem'),
    passphrase: privateKeyPassphrase
}

const server = https.createServer(httpsOptions,app)

app.use(cors())
app.use(express.json())
app.use('/https-web-service/v1', startup)
app.use('/https-web-service/v1', colors)
app.use('/https-web-service/v1', classSchedule)
app.use('/https-web-service/v1', location)
app.use('/https-web-service/v1', studentInfo)

server.listen(8080, ()=> {
    console.log('Server is up')
})

