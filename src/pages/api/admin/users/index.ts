import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import User from 'src/models/User';
import { isAdmin, isAuth } from 'src/utils/auth';
import db from 'src/utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const users = await User.find({});
  await db.disconnect();
  res.send(users);
});

export default handler;
