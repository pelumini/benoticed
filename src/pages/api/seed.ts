import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Product from 'src/models/Product';
import data from 'src/utils/data';
import db from 'src/utils/db';
// import User from '../../models/User';

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  // return res.send({ message: 'already seeded' });
  await db.connect();
  // await User.deleteMany();
  // await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
});

export default handler;
