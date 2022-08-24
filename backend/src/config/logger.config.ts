import winston, { format, transports } from 'winston';

export class LoggerConfig {
  private readonly options: winston.LoggerOptions;

  constructor() {
    this.options = {
      exitOnError: false,
      level: 'info',
      // level: process.env.LOG_LEVEL || 'info',
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.errors({ stack: true }),
        format.json(),
        format.colorize(),
        format.printf(
          ({ level, message, label, timestamp }) =>
            `${timestamp} [${label}] ${level}: ${message}`,
        ),
      ),
      defaultMeta: { service: 'user-service' },
      transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/combined.log' }),
      ],
    };
  }
  public console(): object {
    return this.options;
  }
}

// a class that returns a winston.LoggerOptions
// don't have to duplicate the logger options in every file
