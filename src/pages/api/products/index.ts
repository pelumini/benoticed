import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Product from 'src/models/Product';
import db from 'src/utils/db';

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
});

export default handler;
