'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
      router.push('/home');
    } else {
      // Gérer les erreurs
      alert('Échec de la connexion');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
  <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6">
    <h1 className="text-2xl font-bold mb-6 text-center">Connexion</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="email" className="text-gray-700 font-semibold mb-1">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="text-gray-700 font-semibold mb-1">Mot de passe</label>
        <input
          id="password"
          type="password"
          placeholder="Mot de passe"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Se connecter
      </button>
    </form>
    <div className="flex items-center justify-center space-x-4">
      <a href="/signup" className="text-blue-500 hover:underline">Créer un compte</a>
      <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
        <i className="fab fa-google text-red-500 text-xl"></i>
        <span>Se connecter avec Google</span>
      </a>
    </div>
  </div>
</div>

  );
}
