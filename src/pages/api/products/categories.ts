import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Product from 'src/models/Product';
import db from 'src/utils/db';

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const categories = await Product.find().distinct('category');

  await db.disconnect();
  res.send(categories);
});

export default handler;
