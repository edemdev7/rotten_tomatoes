// app/api/auth/register/route.js
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import connectMongo from '../../../../lib/mongodb';
import User from '../../../../models/User';
import crypto from 'crypto';
import { sendVerificationEmail } from '@/lib/mail';

export async function POST(req) {
  const { username, email, password } = await req.json();

  await connectMongo();

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'Email déjà utilisé' }, { status: 400 });
  }

  // Hacher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Générer un token de vérification
  const emailToken = crypto.randomBytes(64).toString('hex');

  // Créer un nouvel utilisateur
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    emailToken,
  });

  try {
    await newUser.save();
    console.log('user create s')
    await sendVerificationEmail(email, emailToken);
    console.log('s')
    return NextResponse.json({ message: 'Utilisateur créé avec succès' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création de l’utilisateur' }, { status: 500 });
  }
}
