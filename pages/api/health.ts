import type { NextApiRequest, NextApiResponse } from 'next'

type HealthData = {
  status: string
  timestamp: string
  uptime: number
  environment: string
  version: string
  router: string
}

type ErrorData = {
  status: string
  error: string
  timestamp: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthData | ErrorData>
) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({
        status: 'error',
        error: 'Method not allowed',
        timestamp: new Date().toISOString()
      })
    }

    const healthData: HealthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'unknown',
      version: process.env.npm_package_version || 'unknown',
      router: 'pages'
    }

    res.status(200).json(healthData)
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    })
  }
}