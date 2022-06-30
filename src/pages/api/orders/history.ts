import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Order from 'models/Order';
import { isAuth } from 'utils/auth';
import db from 'utils/db';
import { onError } from 'utils/error';

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.get(async (req: any, res: NextApiResponse) => {
  await db.connect();
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

export default handler;
