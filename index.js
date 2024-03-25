import express from 'express'
import https from 'https'
import fs from 'fs'
import cors from 'cors'

import { privateKeyPassphrase } from './settings.js'
import { getLoggerInstance } from './logger.js'
import startup from './routes/startup.js'
import location from './routes/location.js'
import studentInfoUpstream from './routes/studentInfoUpstream.js'

const logger = getLoggerInstance()

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
app.use('/https-web-service/v1', location)
app.use('/https-web-service/v1', studentInfoUpstream)

server.listen(8080, ()=> {
    logger.info('Server is up')
})

