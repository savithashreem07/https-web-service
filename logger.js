import { DateTime } from 'luxon'
import winston, { format, transports } from 'winston'


const logFormt = format.printf(({level, message}) => {

    const dateFormat = DateTime.now().toUTC()
    return `Time: ${dateFormat} \nLevel: ${level} \nMessage: ${message}`
})

export const getLoggerInstance = () => {
    const logger = winston.createLogger({
        level: 'info',
        format: format.json(),
        transports: [
            new transports.Console({format: format.combine(format.colorize(), logFormt)})
        ]
    })
    return logger
}