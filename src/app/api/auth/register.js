// pages/api/auth/register.js
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendVerificationEmail } from '../../../lib/mail';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    await dbConnect();

    const { username, email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email déjà utilisé' });
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
    });

    try {
      await newUser.save();
      await sendVerificationEmail(email, emailToken);
      res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur' });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
