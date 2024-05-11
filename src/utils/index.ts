class Logger {
  info(message: any): void {
    console.log(`[INFO] ${message}`);
  }

  error(message: any, ...optionalParams: any[]): void {
    console.error(`[ERROR] ${message}`, optionalParams);
  }
}

const logger = new Logger();

export { logger };
