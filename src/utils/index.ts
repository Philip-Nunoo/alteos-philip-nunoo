class Logger {
  info(message: string): void {
    console.log(`[INFO] ${message}`);
  }

  error(message: string, ...optionalParams: any[]): void {
    console.error(`[ERROR] ${message}`, optionalParams);
  }
}

const logger = new Logger();

export { logger };
