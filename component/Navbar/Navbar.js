import Link from 'next/link';
import { BiHomeSmile } from 'react-icons/bi';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavbarCustom() {
  return (
    <>
      <Navbar bg='light' variant='light' sticky='top'>
        <Container>
          <Nav
            className=' justify-content-center flex-grow-1 pe-3'
            navbarScroll={true}
          >
            <Nav.Link href='/'>
              <span>
                <BiHomeSmile />
              </span>
            </Nav.Link>
            <Nav.Link href='/inscription'>Inscription</Nav.Link>
            <Nav.Link href='/connexion'>Connexion</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
