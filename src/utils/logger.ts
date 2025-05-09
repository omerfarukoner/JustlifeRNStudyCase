import loggerConfig from '../config/loggerConfig';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const logLevels: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const Logger = {
  log: (level: LogLevel, message: string, data?: unknown) => {
    if (loggerConfig.enabled && logLevels[level] >= logLevels[loggerConfig.level]) {
      const logMessage = `[${level.toUpperCase()}] ${message}`;

      switch (level) {
        case 'error':
          console.error(logMessage, data || '');
          break;
        case 'warn':
          console.warn(logMessage, data || '');
          break;
        case 'info':
          console.info(logMessage, data || '');
          break;
        default:
          console.log(logMessage, data || '');
      }
    }
  },

  debug: (message: string, data?: unknown) => Logger.log('debug', message, data),
  info: (message: string, data?: unknown) => Logger.log('info', message, data),
  warn: (message: string, data?: unknown) => Logger.log('warn', message, data),
  error: (message: string, data?: unknown) => Logger.log('error', message, data),

  configure: (options: Partial<typeof loggerConfig>) => {
    Object.assign(loggerConfig, options);
  },
};

export default Logger;
