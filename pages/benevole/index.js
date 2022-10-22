import Link from 'next/link';

export default function index() {
  return (
    <div>
      <h2>Bénévole</h2>
      <Link href='/benevole/inscription'>
        <a>Inscription</a>
      </Link>
      <Link href='/benevole/connexion'>
        <a>Connexion</a>
      </Link>
      <Link href='/association'>
        <a>Je suis une Association</a>
      </Link>
    </div>
  );
}
