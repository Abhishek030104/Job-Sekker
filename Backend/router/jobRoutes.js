import express from 'express'
import {
  DeleteJobController,
  GetAllJobController,
  GetMyJobCOntroller,
  GetSingleJob,
  PostJobController,
  UpdateJobController,
} from '../controller/jobController.js'
import { isEmployer, requireSignIn } from '../middleware/authMiddleware.js'

const router = express.Router()

// get all job controller
router.get('/getall', GetAllJobController)

// post
router.post('/post', requireSignIn, isEmployer, PostJobController)

// get job for specific employer
router.get('/getmyjob', requireSignIn, isEmployer, GetMyJobCOntroller)

// update job
router.put('/update-job/:jid', requireSignIn, isEmployer, UpdateJobController)

// get job details
router.get('/:id', requireSignIn, GetSingleJob)

//delete job
router.delete(
  '/delete-job/:jid',
  requireSignIn,
  isEmployer,
  DeleteJobController,
)

export default router
