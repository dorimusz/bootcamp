import winston, { format, transports } from 'winston';
export class LoggerConfig {
  private readonly options: winston.LoggerOptions;

  constructor() {
    this.options = {
      exitOnError: false,
      level: process.env.LOG_LEVEL || 'info',
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss', //server timestamp
        }),
        format.errors({ stack: true }),
        format.json(), //especially in production, we want to log in JSON format
        format.colorize(), //do not use this in production!!!
        format.errors({ stack: true }), //logs out the whole error stack
        format.printf(
          ({ level, message, timestamp, stack }) =>
            `${timestamp} [${level}]: ${stack || message}`,
        ),
      ),
      // defaultMeta: { service: 'user-service' }, //not seen in log files, but it's there
      transports: [
        new transports.Console(), //write everything to console
        new transports.File({ filename: 'logs/combined.log' }), //store everything in a file
        new transports.File({ filename: 'logs/error.log', level: 'error' }), //store errors in a separate file
      ],
      // exceptionHandlers: [
      //   new transports.File({ filename: 'logs/exception.log' }),
      // ],
      // rejectionHandlers: [
      //   new transports.File({ filename: 'logs/rejections.log' }),
      // ],
    };
  }
  public console(): object {
    return this.options;
  }
}

// a class that returns a winston.LoggerOptions
// don't have to duplicate the logger options in every file
