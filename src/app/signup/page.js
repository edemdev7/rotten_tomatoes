'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push('/signin');
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center max-h-screen bg-gray-100 p-8">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden flex">
        <div className="w-1/2 p-8">
          <h1 className="text-2xl font-bold mb-6">Inscription</h1>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="username" className="text-gray-700 font-semibold mb-1">Nom utilisateur :</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 font-semibold mb-1">Email :</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-gray-700 font-semibold mb-1">Mot de passe :</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Inscrire
            </button>
          </form>
        </div>
        <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(https://th.bing.com/th/id/OIP.3mjnckLOOviMjqduHGAo8AHaE8?w=258&h=180&c=7&r=0&o=5&pid=1.7)' }}></div>
      </div>
    </div>
    
  );
};

export default SignupPage;
