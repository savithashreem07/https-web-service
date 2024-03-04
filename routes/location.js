const express= require('express')

const location = express.Router()
location.get('/user-location',(req, res) => {
    // console.log(req)
    
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const userDevice = req.header('User-Agent')
    res.send({userIp: userIp, userDevice: userDevice})
})


module.exports = location

