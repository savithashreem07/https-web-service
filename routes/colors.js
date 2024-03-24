import express from 'express'
import data from '../database/colors.json' assert { type: "json" };

const colors = express.Router()

// Get the list of colors
colors.get('/colors', (req, res) => {
    res.json(data)
})

export default colors

