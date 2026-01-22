import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  // Check process.env
  const envVars = {
    MAILERSEND_API_KEY_EXISTS: !!process.env.MAILERSEND_API_KEY,
    MAILERSEND_API_KEY_LENGTH: process.env.MAILERSEND_API_KEY?.length || 0,
    MAILERSEND_FROM_EMAIL: process.env.MAILERSEND_FROM_EMAIL || 'not set',
    NODE_ENV: process.env.NODE_ENV,
    ALL_MAILER_VARS: Object.keys(process.env).filter(k => k.includes('MAILER')),
  };

  // Also check if .env.local file exists and is readable
  const fileCheck: { exists: boolean; readable: boolean; varCount: number } = { exists: false, readable: false, varCount: 0 };
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    fileCheck.exists = fs.existsSync(envPath);
    if (fileCheck.exists) {
      const content = fs.readFileSync(envPath, 'utf-8');
      fileCheck.readable = true;
      fileCheck.varCount = (content.match(/^[A-Z_]+=.+$/gm) || []).length;
    }
  } catch {
    fileCheck.readable = false;
  }

  return NextResponse.json({ 
    processEnv: envVars, 
    fileCheck,
    cwd: process.cwd(),
  });
}
