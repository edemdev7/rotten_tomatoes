import connectMongo from '../../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  await connectMongo();

  const { token } = req.query;

  const user = await User.findOne({ emailToken: token });

  if (!user) {
    return res.status(400).json({ error: 'Token invalide' });
  }

  user.emailToken = null;
  user.isVerified = true;
  await user.save();

  res.status(200).json({ message: 'Email vérifié avec succès' });
}
