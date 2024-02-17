import applicationModel from '../model/applicationModel.js'
import cloudinary from 'cloudinary'
import jobModel from '../model/jobModel.js'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
})

// create  Application
export const PostApplicationController = async (req, res) => {
  try {
    // if (!req.files || Object.keys(req.files).length === 0) {
    //   return res.json({
    //     success: false,
    //     message: 'Resume Required',
    //   })
    // }
    // const { resume } = req.files
    // const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/webp']

    // if (!allowedMimeTypes.includes(resume.mimetype)) {
    //   return res.json({
    //     success: false,
    //     message: 'Resume must be in PNG, JPEG, or WEBP format',
    //   })
    // }
    // const cloudinaryResponse = await cloudinary.uploader.upload(
    //   resume.tempFilePath,
    // )
    // if (!cloudinaryResponse || cloudinaryResponse.error) {
    //   console.log('cloudnary error')
    //   return res.json({
    //     success: false,
    //     message: 'Error in Cloudnary',
    //   })
    // }
    const { name, email, coverLetter, phone, address, jobId, resume } = req.body
    console.log(resume)

    switch (true) {
      case !name:
        return res.json({ success: false, message: 'Name is Required' })
      case !email:
        return res.json({ success: false, message: 'Email is Required' })
      case !phone:
        return res.json({ success: false, message: 'Phone No is Required' })
      case !coverLetter:
        return res.json({ success: false, message: 'coverLetter is Required' })
      case !address:
        return res.json({ success: false, message: 'address is Required' })
      case !jobId:
        return res.json({ success: false, message: 'Job Not Found' })
      case !resume:
        return res.json({ success: false, message: 'Resume is Required' })
    }

    const job = await jobModel.findOne({ _id: jobId })
    if (!job || job.expired == true) {
      return res.json({
        success: false,
        message: 'This Job is Not Avillable ',
      })
    }
    const applicantID = {
      user: req.user._id,
      role: 'Job Seeker',
    }
    const employerID = {
      user: job.postedBy,
      role: 'Employer',
    }
    const application = await new applicationModel({
      name,
      email,
      coverLetter,
      phone,
      address,
      applicantID,
      employerID,
      resume,

      // resume: {
      //   public_id: cloudinaryResponse.public_id,
      //   url: cloudinaryResponse.secure_url,
      // },
    }).save()

    if (!application) {
      res.json({
        success: false,
        message: 'Error Application Apply',
      })
    }
    res.json({
      success: true,
      message: 'Application Applied Successfully',
      application,
    })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: 'Error in Application Posting',
    })
  }
}

// employeer get all appliaction on there job
export const getAllApllicationOfEmployeerController = async (req, res) => {
  try {
    const applications = await applicationModel.find({
      'employerID.user': req.user._id,
    })
    if (!applications) {
      return res.json({
        success: false,
        message: 'Error in geting Application',
      })
    }
    return res.json({
      success: true,
      message: 'All Application Fetched Successfully',
      applications,
    })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: 'Error in getting all Application',
    })
  }
}

// gob seeker see their application that kis kis ko bheja h
export const GetAllApplicationofjobSeekerController = async (req, res) => {
  try {
    const applications = await applicationModel.find({
      'applicantID.user': req.user._id,
    })
    if (!applications) {
      return res.json({
        success: false,
        message: 'Application Not Found',
      })
    }
    // console.log(applications)
    return res.json({
      success: true,
      message: 'Succesffuly Fetched All Application',
      applications,
    })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: 'Error In Getting All Job Application',
    })
  }
}

// delete application by job seeker their own appliaction
export const DeleteApplicationController = async (req, res) => {
  try {
    const { aid } = req.params
    const application = await applicationModel.findOne({
      _id: aid,
      'applicantID.user': req.user._id,
    })
    if (!application) {
      return res.json({
        success: false,
        message: 'Application Not Found!',
      })
    }
    await application.deleteOne()
    return res.json({
      success: true,
      message: 'Application Deleted SuccessFully',
    })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: 'Error In Deleteing Application',
    })
  }
}
