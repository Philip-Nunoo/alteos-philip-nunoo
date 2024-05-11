import { logger } from '@utils/index';
import { config } from 'dotenv';

config();
logger(process?.env?.MESSAGE ?? 'undefined');