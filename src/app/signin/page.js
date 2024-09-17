// pages/auth/signin.js
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Signin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res.ok) {
      router.push('/');
    } else {
      // Gérer les erreurs
      alert('Échec de la connexion');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" required
        onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Mot de passe" required
        onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Se connecter</button>
    </form>
  );
}
