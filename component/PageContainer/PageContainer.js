import React from 'react'

export default function PageContainer({ children }) {
  return (
    <section className='container d-flex flex-column'>
      <div className='card p-5'>
        {children}
      </div>
    </section>

  )
}
