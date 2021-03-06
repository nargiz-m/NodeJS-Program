import winston from 'winston';

export const winstonInstance = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/programLogs.log' })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({format: 'DD.MM.YYYY HH:mm:ss'}),
    winston.format.printf(info => `${info.timestamp}: ${info.level} - ${info.message}`)
  )
});