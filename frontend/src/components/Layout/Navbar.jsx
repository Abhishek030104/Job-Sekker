import React, { useState } from 'react'
import { useAuth } from '../../Context/auth'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'

export const Navbar = () => {
  const [show, setShow] = useState(false)
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    try {
      toast.success('Logout Successfully')
      setAuth({
        ...auth,
        user: null,
        token: '',
      })
      localStorage.removeItem('auth')
      navigate('/login')
    } catch (error) {
      toast.error('Try Again To Logout')
    }
  }
  return (
    <nav className={auth?.token ? 'navbarShow' : 'navbarHide'}>
      <div className="container">
        <div className="logo">
          <img src="/JobZee-logos__white.png" alt="logo" />
        </div>
        <ul className={!show ? 'menu' : 'show-menu menu'}>
          <li>
            <Link to={'/'} onClick={() => setShow(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to={'/job/getall'} onClick={() => setShow(false)}>
              ALL JOBS
            </Link>
          </li>
          <li>
            <Link
              to={'/application/myapplication'}
              onClick={() => setShow(false)}
            >
              {auth?.user?.role === 'Employer'
                ? "APPLICANT'S APPLICATIONS"
                : 'MY APPLICATIONS'}
            </Link>
          </li>
          {auth?.user?.role === 'Employer' ? (
            <>
              <li>
                <Link to={'/job/post'}>POST NEW JOB</Link>
              </li>
              <li>
                <Link to={'/job/me'}>VIEW YOUR JOB</Link>
              </li>
            </>
          ) : (
            <></>
          )}
          <button onClick={handleLogout}>Logout</button>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  )
}
