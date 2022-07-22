import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { isAuth } from 'src/utils/auth';

const handler = nc();

handler.use(isAuth);

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    res.send(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  } else {
    res.status(405).send('Method not allowed');
  }
});

export default handler;
