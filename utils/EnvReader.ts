import * as dotenv from 'dotenv';

dotenv.config();

export const EnvReader = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com/',
  
  standardUser: process.env.STANDARD_USER || 'standard_user',
  lockedOutUser: process.env.LOCKED_OUT_USER || 'locked_out_user',
  problemUser: process.env.PROBLEM_USER || 'problem_user',
  performanceGlitchUser: process.env.PERFORMANCE_GLITCH_USER || 'performance_glitch_user',
  errorUser: process.env.ERROR_USER || 'error_user',
  visualUser: process.env.VISUAL_USER || 'visual_user',
  
  password: process.env.PASSWORD || 'secret_sauce',
};
