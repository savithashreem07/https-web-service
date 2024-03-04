const express= require('express')
const data = require('../database/student-info.json')

const studentInfo = express.Router()

// To include the userIp and userDevice information for all the API calls
studentInfo.use((req, res, next) => {
    req.userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    req.userDevice = req.get('User-Agent')
    next()
})

// Retrieve all the student-info
studentInfo.get('/student-info', (req, res) => {
    const userIp = req.userIp;
    const userDevice = req.userDevice;
    console.log(userIp, userDevice)
    res.json({userIp, userDevice, data})
})

// Retrieve your information based on 'student-id'
studentInfo.post('/student-info', (req, res) => {
    const userIp = req.userIp;
    const userDevice = req.userDevice;
    const {studentId} = req.body
    
    if(!studentId) {
        return res.status(400).json({message: "StudentId not provided!"})
    }

    const studentDetails = data.find(student => student.student_id === studentId)
    
    res.json({userIp, deviceType: userDevice, studentDetails})
})

// Retrieve student's info who has taken CS548
studentInfo.post('/student-info/CS548', (req, res) => {
    const userIp = req.userIp;
    const userDevice = req.userDevice;
    const courseId = 'CS548'

    const studentDetails = data.filter(student => student.courses.some(course => course.course_id === courseId))
    const studentIds = studentDetails.map(student => student.student_id)
    console.log(studentIds)
    
    res.json({userIp, deviceType: userDevice, studentIds})
})

// Retrieve who has taken the courses you have taken except CS548 based on given studentId
studentInfo.post('/same-course-student-info/', (req, res) => {
    const userIp = req.userIp;
    const userDevice = req.userDevice;
    const {studentId} = req.body

    if(!studentId) {
        return res.status(400).json({message: "StudentId not provided!"})
    }

    const studentDetails = data.find(student => student.student_id === studentId)

    if(!studentDetails) {
        return res.status(400).json({message: "Cannot find student with the given studentId!"})
    }

    const similarCourseStudents = []

    studentDetails.courses.forEach(course => {
        if(course.course_id !== 'CS548') {
            const similarStudentsPerCourse = data.filter(student => student.courses.some(c => c.course_id === course.course_id))
            const similarStudentIds = similarStudentsPerCourse.map(student => student.student_id)

            similarCourseStudents.push({
                course_id: course.course_id,
                course_name: course.course_name,
                studentIds : similarStudentIds
            })
        }
    })
    console.log(similarCourseStudents)
    
    res.json({userIp, deviceType: userDevice, similarCourseStudents})
})


module.exports = studentInfo

