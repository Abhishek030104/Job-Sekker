import { comparePassword, hashPassword } from '../helper/authHelper.js'
import userModel from '../model/userModel.js'
import JWT from 'jsonwebtoken'

// register
export const RegisterController = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body

    switch (true) {
      case !name:
        return res.json({ success: false, message: 'Name is Required' })
      case !email:
        return res.json({ success: false, message: 'Email is Required' })
      case !phone:
        return res.json({ success: false, message: 'Phone No is Required' })
      case !password:
        return res.json({ success: false, message: 'Password is Required' })
      case !role:
        return res.json({ success: false, message: 'Role is Required' })
    }

    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      return res.status(205).json({
        success: false,
        message: 'User Already Registered',
      })
    }

    const hashedPassword = await hashPassword(password)
    const user = await new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    }).save()
    // await user.save()
    res.status(200).json({
      success: true,
      message: 'user Registerd Succesfully',
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Error In Registration',
    })
  }
}

// login
export const LoginController = async (req, res) => {
  try {
    const { email, password, role } = req.body
    if (!email) {
      return res.json({ success: false, message: 'Email is Required' })
    }
    if (!password) {
      return res.json({ success: false, message: 'Password is Required' })
    }
    if (!role) {
      return res.json({ success: false, message: 'Role is Required' })
    }
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.json({
        success: false,
        message: 'User Not Registered',
      })
    }
    if (user.role !== role) {
      return res.json({
        success: false,
        message: 'Role Not Matched',
      })
    }

    const matched = await comparePassword(password, user.password)

    if (!matched) {
      return res.json({
        success: false,
        message: 'Password Or Email Not Matched',
      })
    }
    const token = await JWT.sign(
      { _id: user._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '7d',
      },
    )

    // set token in cookies
    // res.cookie('token', token, {
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    //   httpOnly: true,
    // })
    res.status(200).json({
      success: true,
      message: 'Login Succesfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Error In Login',
      error: error.message,
    })
  }
}

// logout controller
export const LogoutController = (req, res) => {
  try {
    res.clearCookie('token')
    res.status(200).json({
      success: true,
      message: 'Logout Successfully',
    })
  } catch (error) {
    console.log(error)
  }
}

// get user constroller
export const getUserController = (req, res) => {
  try {
    const user = req.user
    res.json({
      success: true,
      user,
    })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: 'Error in Geting USer',
    })
  }
}
