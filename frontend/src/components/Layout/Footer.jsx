import React from 'react'
import { FaFacebookF, FaYoutube, FaLinkedin } from 'react-icons/fa'
import { RiInstagramFill } from 'react-icons/ri'
import { useAuth } from '../../Context/auth'
import { Link } from 'react-router-dom'

export const Footer = () => {
  const [auth, setAuth] = useAuth()
  return (
    <footer className={auth?.token ? 'footerShow' : 'footerHide'}>
      <div>&copy; All Rights Reserved By Abhi Arya</div>
      <div>
        <Link to={'/'} target="_blank">
          <FaFacebookF />
        </Link>
        <Link to={'/'} target="_blank">
          <FaYoutube />
        </Link>
        <Link to={'/'} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={'/'} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  )
}
