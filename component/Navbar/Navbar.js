import styles from "./Navbar.module.scss";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { BiHomeSmile } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function useWindowSize() {
  const isClient = typeof window === "object";

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default function NavbarCustom() {
  const router = useRouter();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const screenWidth = useWindowSize().width;
  useEffect(() => {
    if (isMenuOpen) {
      setMenuOpen(!isMenuOpen);
    }
  }, [router.asPath]);

  return (
    <nav className={styles.navbar + " sticky-top"}>
      <div className={!isMenuOpen ? styles.divHamburgerMenu : styles.divHamburgerMenuHidden}>
        <div
          onClick={(e) => {
            setMenuOpen(true);
          }}
        >
          <GiHamburgerMenu size={22} value={{ className: styles.reactIcons }} />
        </div>
      </div>
      <div
        className={isMenuOpen ? styles.divCloseMenuOpen : styles.divCloseMenu}
        onClick={(e) => {
          setMenuOpen(false);
        }}
      >
        <AiOutlineClose size={18} value={{ className: styles.reactIcons }} />
      </div>

      <div className={isMenuOpen ? styles.divMenuOpen : styles.divMenu}>
        <div>
          <Link href="/">
            <a>
              <BiHomeSmile size={18} value={{ className: styles.reactIcons }} />
            </a>
          </Link>
        </div>
        <div>
          <Link href="/annonces">
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
          <Link href="">
            <a>
              <CgProfile size={18} value={{ className: styles.reactIcons }} />
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
