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
  const [visibilityHamburgerMenu, setVisibilityHamburgerMenu] = useState(false);
  const [visibilityMenu, setVisibilityMenu] = useState(false);
  const [currentPath, setCurrentPath] = useState();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const screenWidth = useWindowSize().width;

  const isVisibleHamburgerMenu = () => {
    setVisibilityHamburgerMenu(true);
    setVisibilityMenu(false);
  };

  const isVisibleMenu = () => {
    setVisibilityHamburgerMenu(false);
    setVisibilityMenu(true);
  };

  useEffect(() => {
    if (screenWidth > 961) {
      isVisibleMenu();
    } else {
      isVisibleHamburgerMenu();
    }
  }, [screenWidth]);

  useEffect(() => {
    if (isMenuOpen) {
      setMenuOpen(!isMenuOpen);
    }
  }, [router.asPath]);
  // useEffect(() => {
  //   if (router.asPath != currentPath) {
  // setCurrentPath(router.asPath);
  //     setVisibilityHamburgerMenu(true);
  //     setVisibilityMenu(false); //     isVisibleHamburgerMenu();
  //     //     console.log("file: Navbar.js -> line 70 -> newCurrentPath", newCurrentPath);
  //   }

  //   console.log("file: Navbar.js -> line 43 -> currentPath", currentPath);
  //   console.log("file: Navbar.js -> line 43 -> router.asPath", router.asPath);
  //   // console.log("file: Navbar.js -> line 68 -> newCurrentPath", newCurrentPath);
  //   //   if (router.asPath != currentPath) {
  //   //     isVisibleHamburgerMenu();

  //   //     console.log("file: Navbar.js -> line 70 -> newCurrentPath", newCurrentPath);
  //   //     // setCurrentPath(newCurrentPath);
  //   //   }
  // }, [router.asPath]);

  return (
    <nav className={styles.navbar + " sticky-top"}>
      {!isMenuOpen ? (
        <div className={styles.divHamburgerMenu}>
          <div
            className={styles.divHamburgerMenu}
            onClick={(e) => {
              isVisibleMenu();
              setMenuOpen(true);
            }}
          >
            <GiHamburgerMenu size={22} value={{ className: styles.reactIcons }} />
          </div>
        </div>
      ) : (
        <>
          {screenWidth < 961 && isMenuOpen && (
            <div
              className={styles.divCloseMenu}
              onClick={(e) => {
                setVisibilityHamburgerMenu(true);
                setVisibilityMenu(false);
                setMenuOpen(false);
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
