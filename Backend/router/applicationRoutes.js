import express from 'express'
import {
  isEmployer,
  isJobSeeker,
  requireSignIn,
} from '../middleware/authMiddleware.js'
import {
  DeleteApplicationController,
  GetAllApplicationofjobSeekerController,
  PostApplicationController,
  getAllApllicationOfEmployeerController,
} from '../controller/applicationController.js'
const router = express.Router()

// create application
router.post('/apply-job', requireSignIn, isJobSeeker, PostApplicationController)

// employeer get all appliaction on there job
router.get(
  '/getAll',
  requireSignIn,
  isEmployer,
  getAllApllicationOfEmployeerController,
)
// job seeker get all their application
router.get(
  '/getAll-application',
  requireSignIn,
  isJobSeeker,
  GetAllApplicationofjobSeekerController,
)
// delete job by job sekker
router.delete(
  '/delete-application/:aid',
  requireSignIn,
  isJobSeeker,
  DeleteApplicationController,
)
export default router
