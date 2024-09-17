// app/signup/page.js
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
      // Redirige vers la page de connexion après inscription réussie
      router.push('/signin');
    } else {
      setError(data.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Inscription</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label>Nom utilisateur :</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">inscrire</button>
      </form>
    </div>
  );
};

export default SignupPage;
