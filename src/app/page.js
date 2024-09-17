import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <div>
    <h1>Bienvenue sur My Rotten Tomatoes</h1>
    <p>
      <Link href="/signup">Inscription</Link> | <Link href="/signin">Connexion</Link>
    </p>
  </div>
  );
}
