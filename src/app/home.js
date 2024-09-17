import { useSession, signOut } from 'next-auth/react';

export default function Dashboard() {
  const { data: session, status } = useSession({ required: true });

  if (status === 'loading') {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h1>Bienvenue, {session.user.username}</h1>
      <button onClick={() => signOut()}>Se déconnecter</button>
    </div>
  );
}
