class Logger {
  info(message: any, ...optionalParams: any[]): void {
    console.log(`[INFO] ${message}`, optionalParams);
  }

  error(message: any, ...optionalParams: any[]): void {
    console.error(`[ERROR] ${message}`, optionalParams);
  }
}

const logger = new Logger();

export { logger };
