const express= require('express')
const data = require('../database/colors.json')

const colors = express.Router()

// Get the list of colors
colors.get('/', (req, res) => {
    res.json(data)
})

module.exports = colors

