import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <section className="page notfound">
      <div className="content">
        <img src="/notfound.png" alt="not found" />
        <Link to={'/'}>RETURN TO HOME</Link>
      </div>
    </section>
  )
}
