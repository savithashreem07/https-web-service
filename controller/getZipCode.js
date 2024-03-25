import axios from 'axios'
import { IP2LOCATION_API_KEY } from '../settings.js'
import { getLoggerInstance } from '../logger.js'

const logger = getLoggerInstance()

export const getZipCode = (userIp) => {
    const ip2locationUrl = `https://api.ip2location.io/?key=${IP2LOCATION_API_KEY}&ip=${userIp}`

    const zipCodeData = axios.get(ip2locationUrl)
    .then(response => response.data)
    .catch(error => {logger.error(error)})

    return zipCodeData
}

