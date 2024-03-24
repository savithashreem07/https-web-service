// const express= require('express')
import express from 'express'
import { getZipCode } from '../controller/getZipCode.js'

const location = express.Router()

location.get('/user-location', async(req, res) => {
    // console.log(req)
    
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const userInformation = await getZipCode(userIp)
    const userDevice = req.header('User-Agent')

    console.log(userInformation,  'userInformation')
    res.send({userIp: userIp, userDevice: userDevice, userInformation: userInformation})
})


export default location
// module.exports = location

