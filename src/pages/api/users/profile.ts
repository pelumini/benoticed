import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import User from 'src/models/User';
import { signToken, isAuth } from 'src/utils/auth';
import db from 'src/utils/db';

const handler = nc();
handler.use(isAuth);

handler.put(async (req: any, res: NextApiResponse) => {
  await db.connect();
  const user = await User.findById(req.user._id);
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password
    ? bcrypt.hashSync(req.body.password)
    : user.password;
  await user.save();
  await db.disconnect();

  const token = signToken(user);
  res.send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

export default handler;
