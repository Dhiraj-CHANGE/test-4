import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 5001;

execSync(`npx next start --port ${port}`, { stdio: 'inherit' });
