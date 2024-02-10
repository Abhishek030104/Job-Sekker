import express from 'express'
import {
  LoginController,
  LogoutController,
  RegisterController,
  getUserController,
} from '../controller/userController.js'
import { requireSignIn } from '../middleware/authMiddleware.js'

const router = express.Router()

// register routes
router.post('/register', RegisterController)

// login routes
router.post('/login', LoginController)

// logout
router.post('/logout', requireSignIn, LogoutController)

// get user
router.get('/get-user', requireSignIn, getUserController)
// router.get('/', (req, res) => res.send('<h1>Hello</h1>'))

export default router
