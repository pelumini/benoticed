import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Order from 'src/models/Order';
import { isAuth } from 'src/utils/auth';
import db from 'src/utils/db';

const handler = nc();

handler.use(isAuth);

handler.get(async (req: any, res: NextApiResponse) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  await db.disconnect();
  res.send(order);
});

export default handler;
