import { getSession } from 'next-auth/react';
import { connectToDatabase } from '../../../lib/db';
import { verifyPassword } from '../../../lib/auth';
import { hashPassword } from '../../../lib/auth';

async function handler(req, res) {
  console.log('req mathod is: ', req.method);
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authentication!' });
    return;
  }

  const userEmail = session.user.email;

  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();
  const userCollection = client.db().collection('users');
  const user = await userCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    client.close();
    return;
  }

  const currentPassword = user.password;
  const passwrordAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwrordAreEqual) {
    res.status(403).json({ message: 'Invalid old password.' });
    client.close();
    return;
  }

  const hasedPassword = await hashPassword(newPassword);
  const updateCommand = await userCollection.updateOne(
    { email: userEmail },
    { $set: { password: hasedPassword } }
  );

  client.close();
  res.status(200).json({ message: 'Password updated successfully!' });
}
export default handler;
