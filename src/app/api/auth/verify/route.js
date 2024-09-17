// app/api/auth/verify/route.js
import { NextResponse } from 'next/server';
import connectMongo from '../../../../lib/mongodb';
import User from '../../../../models/User';
import { useRouter } from 'next/navigation';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  const router = useRouter();


  await connectMongo();

  const user = await User.findOne({ emailToken: token });

  if (!user) {
    console.log('token invalide')
    return NextResponse.json({ error: 'Token invalide' }, { status: 400 });
  }

  user.emailToken = null;
  user.isVerified = true;
  await user.save();

  console.log('Email vérifié avec succès');
  router.push('/signin');
  return NextResponse.json({ message: 'Email vérifié avec succès' }, { status: 200 });

}
