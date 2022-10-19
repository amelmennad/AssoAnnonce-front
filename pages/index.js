import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Bienvenue sur AssoAnnonce</h1>
      {/* <h2>{props.data}</h2> */}
    </div>
  );
}
