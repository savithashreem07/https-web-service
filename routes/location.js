// const express= require('express')
import express from 'express'
import { getZipCode } from '../controller/getZipCode.js'

const location = express.Router()

const API_KEY = '4E64AC259B2A701D96F149DC3AEBB317'

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

