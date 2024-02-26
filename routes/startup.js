const express= require('express')

const startup = express.Router()
startup.get('/',(req, res) => {
    res.send(`It's Working!!`)
})

startup.get('/alive', (req, res)=> {
    res.send('HTTPS-Web-Service is Alive')
})

// commonJS format

module.exports = startup

