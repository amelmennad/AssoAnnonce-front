import Link from 'next/link';

export default function index() {
  return (
    <div>
      <h2>Association</h2>
      <Link href='/association/inscription'>
        <a>Inscription</a>
      </Link>
      <Link href='/association/connexion'>
        <a>Connexion</a>
      </Link>
      <Link href='/benevole'>
        <a>Je suis un Bénévole</a>
      </Link>
    </div>
  );
}
