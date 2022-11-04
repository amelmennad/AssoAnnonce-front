import styles from './Navbar.module.scss';
import Link from 'next/link';
import { BiHomeSmile } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';

export default function NavbarCustom() {
  return (
    <nav className={styles.navbar + " sticky-top"}>
      <div>
        <Link href="/">
          <a>
            <BiHomeSmile />
          </a>
        </Link>
      </div>
      <div>
        <Link href="">
          <a>Annonces</a>
        </Link>
      </div>
      <div>
        <Link href="/identification">
          <a>S&apos;inscrire | Se connecter</a>
        </Link>
        <Link href="/association/ajouter-mission">
          <a>Ajouter une annonce</a>
        </Link>
      </div>
    </nav>
  );
}
