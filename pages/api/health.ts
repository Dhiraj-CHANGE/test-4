// pages/api/health.ts
import { NextApiRequest, NextApiResponse } from 'next';
// types/health.ts
export interface HealthData {
    status: 'healthy';
    timestamp: string;
    uptime: number;
    environment: string | undefined;
    version: string;
  }
  
  export interface ErrorResponse {
    status: 'unhealthy';
    error: string;
    timestamp: string;
  }
  

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthData | ErrorResponse>
) {
  try {
    const healthData: HealthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || 'unknown',
    };

    res.status(200).json(healthData);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    const errorResponse: ErrorResponse = {
      status: 'unhealthy',
      error: errorMessage,
      timestamp: new Date().toISOString(),
    };

    res.status(500).json(errorResponse);
  }
}
