import express from 'express'
import { getZipCode } from '../controller/getZipCode.js'
import { getLoggerInstance } from '../logger.js'

const location = express.Router()

const logger = getLoggerInstance()

location.get('/user-location', async(req, res) => {

    logger.info('Entering location API')
    
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const userInformation = await getZipCode(userIp)
    const userDevice = req.header('User-Agent')

    console.log(userInformation,  'userInformation')
    res.send({userIp: userIp, userDevice: userDevice, userInformation: userInformation})

    logger.info('Exiting location API')
})


export default location
