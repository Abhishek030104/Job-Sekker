import JWT from 'jsonwebtoken'
import userModel from '../model/userModel.js'
// import applicationModel from '../model/applicationModel.js'
import dotenv from 'dotenv'
dotenv.config()

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY,
    )
    req.user = decode
    // const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET_KEY)

    next()
  } catch (error) {
    res.json({
      success: false,
      message: 'UnAuthorized Access',
    })
    console.log(error)
  }
}

// auth check
export const isEmployer = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id)
    if (user.role !== 'Employer') {
      return res.json({ success: false, message: 'unAuthorized Access' })
    } else {
      next()
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Error In Validation',
    })
  }
}

export const isJobSeeker = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id)
    if (user.role !== 'Job Seeker') {
      return res.json({
        success: false,
        message: 'This Routes is Only For Job seekers',
      })
    } else {
      next()
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Error In Validation',
    })
  }
}
