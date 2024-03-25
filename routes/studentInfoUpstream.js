import express from 'express'
import { getStudentInfo } from '../controller/studentInfo.js'
import { getLoggerInstance } from '../logger.js'

const studentInfo = express.Router()

const logger = getLoggerInstance()
// To include the userIp and userDevice information for all the API calls
studentInfo.use((req, res, next) => {
    req.userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    req.userDevice = req.get('User-Agent')
    next()
})


// Retrieve your information based on 'student-id'
studentInfo.post('/student-info', async(req, res) => {

    logger.info('Entering student-info POST API')
    const userIp = req.userIp;
    const userDevice = req.userDevice;
    const {studentId} = req.body;
    
    if(!studentId) {
        return res.status(400).json({message: "StudentId not provided!"})
    }

    const studentData = await getStudentInfo()

    const studentDetails = studentData.find(student => student.student_id === studentId)
    
    res.json({userIp, deviceType: userDevice, studentDetails})
    logger.info('Exiting studnet-info POST API')
})

// Retrieve student's info who has taken CS548
studentInfo.post('/student-info/CS548', (req, res) => {
    const userIp = req.userIp;
    const userDevice = req.userDevice;
    const courseId = 'CS548'

    const studentDetails = data.filter(student => student.courses.some(course => course.course_id === courseId))
    const studentIds = studentDetails.map(student => student.student_id)
    logger.info(studentIds)
    
    res.json({userIp, deviceType: userDevice, studentIds})
})


export default studentInfo;