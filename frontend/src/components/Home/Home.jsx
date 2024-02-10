import React, { useEffect } from 'react'
import { useAuth } from '../../Context/auth'
import { Link, useNavigate } from 'react-router-dom'
import { PopularCategory } from './PopularCategory'
import { HowitsWork } from './HowitsWork'
import { HeroSection } from './HeroSection'
import { PopularCompines } from './PopularCompines'

export const Home = () => {
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth?.token) {
      navigate('/login')
    }
  }, [auth?.token, navigate])
  return (
    <>
      {auth?.token && (
        <>
          <section className="homePage page">
            <HeroSection />
            <HowitsWork />
            <PopularCategory />
            <PopularCompines />
          </section>
        </>
      )}
    </>
  )
}
