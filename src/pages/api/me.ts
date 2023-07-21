import authMiddleware from '@/api/middlewares/authMiddleware';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  authMiddleware(req, res, async () => {
    try {
      res.status(200).json(req.user);
    } catch (error: unknown) {
      let message = 'An error occured';
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(500).send(message);
    }
  })
}