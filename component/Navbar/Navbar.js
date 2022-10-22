import styles from './Navbar.module.scss';
import Link from 'next/link';
import { BiHomeSmile } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';

export default function NavbarCustom() {
  return (
      <nav className={styles.navbar} navbarScroll={true}>
        <div>
          <Link href='/'>
            <a>
              <BiHomeSmile />
            </a>
          </Link>
        </div>
        <div>
          <Link href=''>
            <a>Annonces</a>
          </Link>
        </div>
        <div>
          <Link href='/inscription'>
            <a>Inscription</a>
          </Link>
          <Link href='/connexion'>
            <a>Connexion</a>
          </Link>
          {/* <Link href=''>
            <a>
              <CgProfile />
            </a>
          </Link> */}
        </div>
      </nav>
  );
}
