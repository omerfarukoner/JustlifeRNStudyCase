export interface LoggerConfig {
  enabled: boolean;
  level: 'debug' | 'info' | 'warn' | 'error';
}

const loggerConfig: LoggerConfig = {
  enabled: __DEV__,
  level: 'debug',
};

export default loggerConfig;
