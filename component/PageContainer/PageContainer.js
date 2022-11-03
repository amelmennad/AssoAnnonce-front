import React from 'react'
import styles from './PageContainer.module.scss';

export default function PageContainer({ children }) {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        {children}
      </div>
    </section>
  )
}
