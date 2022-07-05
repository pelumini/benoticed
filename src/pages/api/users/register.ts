import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import User from 'src/models/User';
import { signToken } from 'src/utils/auth';
import db from 'src/utils/db';

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
  });
  const user = await newUser.save();
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
