// const express= require('express')
import express from 'express'
// import data from '../database/class-schedule.json'
// const data = require('../database/class-schedule.json')
import data from '../database/class-schedule.json' assert {type: 'json'}
// const fs = require('fs')
import fs from 'fs'

const classSchedule = express.Router()

classSchedule.get('/courses', (req, res) => {
    res.json(data)
})

classSchedule.get('/courses/:course', (req, res) => {
    const {course} = req.params

    const foundCourse = data.find(courses => courses["Course"] === course)
    
    if(foundCourse) {
        res.json(foundCourse)
    } else {
        res.status(404).json({message: "Course not found! Please confirm the course id."})
    }
})

classSchedule.get('/online-courses', (req, res) => {

    const onlineCourses = data.filter(courses => courses.Classroom.includes("Online"))
    
    if(onlineCourses) {
        res.json(onlineCourses)
    } else {
        res.status(404).json({message: "There are no online courses at the moment!"})
    }
})

classSchedule.post('/classroom', (req, res) => {

    const {course} = req.body

    if(!course) {
        return res.status(400).json({message: "Course not provided!"})
    }

    const courseObject = data.find(courses => courses.Course === course)
    
    res.json({classroom: courseObject.Classroom})
})

classSchedule.put('/update/:course', (req, res) => {
    const {course} = req.params
    const {newInstructor, token} = req.body

    // token == admin
    if(token === 'admin') {
        const index = data.findIndex(c => c.Course === course)
        data[index].Instructor = newInstructor

        const filePath = path.join(__dirname, 'updated-class-schedule.json', 'class-schedule.json')
        fs.writeFileSync(filePath, JSON.stringify)

        res.json({message: "Instructor Updated!"})
    }
})

export default classSchedule
// module.exports = classSchedule

