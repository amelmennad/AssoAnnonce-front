import Link from 'next/link';

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
            <Nav.Link href='/association'>association</Nav.Link>
            <Nav.Link href='/benevole'>benevole</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
