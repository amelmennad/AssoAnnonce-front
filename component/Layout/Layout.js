import Navbar from 'component/Navbar/Navbar';
import React from 'react';

export default function Layout({ children }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
    </>
  );
}
