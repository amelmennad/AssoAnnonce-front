import styles from "./Navbar.module.scss";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { BiHomeSmile } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrAddCircle } from "react-icons/gr";
import { useState, useEffect } from "react";

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
  const [visibilityHamburgerMenu, setVisibilityHamburgerMenu] = useState(false);
  const [visibilityMenu, setVisibilityMenu] = useState(false);

  const screenWidth = useWindowSize().width;

  useEffect(() => {
    if (screenWidth > 961) {
      setVisibilityHamburgerMenu(false);
      setVisibilityMenu(true);
    } else {
      setVisibilityHamburgerMenu(true);
      setVisibilityMenu(false);
    }
  }, [screenWidth]);

  return (
    <nav className={styles.navbar + " sticky-top"}>
      {visibilityHamburgerMenu ? (
        <div className={styles.divHamburgerMenu}>
          <div
            className={styles.divHamburgerMenu}
            onClick={(e) => {
              setVisibilityHamburgerMenu(false);
              setVisibilityMenu(true);
            }}
          >
            <GiHamburgerMenu size={22} value={{ className: styles.reactIcons }} />
          </div>
        </div>
      ) : (
        <>
          {screenWidth < 961 && visibilityMenu && (
            <div
              className={styles.divCloseMenu}
              onClick={(e) => {
                setVisibilityHamburgerMenu(true);
                setVisibilityMenu(false);
              }}
            >
              <AiOutlineClose size={18} value={{ className: styles.reactIcons }} />
            </div>
          )}
          <div className={styles.divMenu}>
            <div>
              <Link href="/">
                <a>
                  <BiHomeSmile size={18} value={{ className: styles.reactIcons }} />
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
              <Link href="">
                <a>
                  <CgProfile size={18} value={{ className: styles.reactIcons }} />
                </a>
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
