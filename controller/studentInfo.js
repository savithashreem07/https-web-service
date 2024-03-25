import axios from 'axios'
import { PERSONAL_ACCESS_TOKEN } from '../settings.js'
import { getLoggerInstance } from '../logger.js'

const logger = getLoggerInstance()

export const getStudentInfo = () => {
    const allStudentInfo = `https://api.github.com/repos/CS548-2024Spring/SFBU-info/contents/2024-spring-student-info.json`

    const studentData = axios.get(allStudentInfo, {
        headers: {
            'Accept': 'application/vnd.github.raw+json',
            'Authorization': `Bearer ${PERSONAL_ACCESS_TOKEN}`
        }
    })
    .then(response => response.data)
    .catch(error => {logger.error(error)})

    return studentData

    // https://github.com/CS548-2024Spring/SFBU-info/blob/4cfef1b951c80b7d89be81c3ecc7829bae90c766/2024-spring-student-info.json
}

