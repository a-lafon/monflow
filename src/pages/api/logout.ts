import config from '@/api/config';
import Cookies from 'cookies';
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const cookies = new Cookies(req, res);
    cookies.set(config.accessTokenKey);
    res.redirect('/')
  } catch (error: unknown) {
    let message = 'An error occured';
      if (error instanceof Error) {
        message = error.message;
      }
      res.redirect('/500');
  }
}