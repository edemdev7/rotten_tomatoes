"use client";
import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession({ required: true });
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      if (session.user.isAdmin) {
        router.push('/admin');
      } else {
        router.push('/home'); 
      }
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Chargement...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">Vous êtes pas connecté.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Bienvenue, {session.user.username}!</h1>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-all"
          >
            Se déconnecter
          </button>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-inner mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Détails de votre compte</h2>
          <p className="mt-2 text-gray-600">
            <strong>Email:</strong> {session.user.email}
          </p>
          {session.user.isAdmin && (
            <p className="mt-2 text-green-600 font-semibold">
              Vous êtes administrateur.
            </p>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <h2 className="text-2xl font-semibold text-gray-700">Vos films préférés</h2>
          <p className="mt-2 text-gray-600">
            Ajoutez vos films préférés ici pour les retrouver facilement plus tard.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-lg font-bold text-gray-800">Film 1</h3>
              <p className="text-gray-600">Description du film 1...</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-lg font-bold text-gray-800">Film 2</h3>
              <p className="text-gray-600">Description du film 2...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
