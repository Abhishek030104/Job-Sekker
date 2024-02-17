import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../Context/auth'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import RotateRightIcon from '@mui/icons-material/RotateRight'

const cloud_name = import.meta.env.VITE_REACT_APP_CLOUD_NAME
const upload_preset = import.meta.env.VITE_REACT_APP_UPLOAD_PRESET
// console.log(upload_preset)

export const Application = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [coverLetter, setCoverLetter] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [resume, setResume] = useState(null)
  const [resumeurl, setResumeUrl] = useState('')
  const [isMounted, setIsMounted] = useState(true) // Track mounted state
  const [isSubmitting, setIsSubmitting] = useState(false)

  // auth context
  const [auth, setAuth] = useAuth()
  // navigate
  const navigateTo = useNavigate()

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const resume = event.target.files[0]

    setResume(resume)
  }
  // save resume
  let resumeUrl
  const savePhoto = async () => {
    try {
      if (
        resume !== null &&
        (resume.type === 'image/jpg' ||
          resume.type === 'image/jpeg' ||
          resume.type === 'image/png')
      ) {
        const resumes = new FormData()
        resumes.append('file', resume)
        resumes.append('cloud_name', cloud_name)
        resumes.append('upload_preset', upload_preset)

        // save image in cloudanary
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dmswaohgr/image/upload',
          { method: 'post', body: resumes },
        )
        const imageData = await response.json()
        // console.log(imageData.url)
        resumeUrl = imageData.url.toString()
        // console.log(resumeUrl)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const { id } = useParams()
  const handleApplication = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await savePhoto()
      setResumeUrl(resumeUrl)
      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      formData.append('phone', phone)
      formData.append('address', address)
      formData.append('coverLetter', coverLetter)
      formData.append('resume', resumeurl)
      formData.append('jobId', id)
      const { data } = await axios.post(
        'http://localhost:8080/api/v1/application/apply-job',
        formData,
      )

      if (data && data.success) {
        toast.success(data.message)
        if (isMounted) {
          // Check if component is still mounted
          setName('')
          setEmail('')
          setCoverLetter('')
          setPhone('')
          setAddress('')
          setResume('')
        }
        setIsSubmitting(false)
        navigateTo('/job/getall')
      } else {
        setIsSubmitting(false)
        throw new Error(
          data && data.message ? data.message : 'Unknown error occurred',
        )
      }
    } catch (error) {
      setIsSubmitting(false)
      console.error(error)
      toast.error('Error in applying: ' + error.message)
    }
  }

  useEffect(() => {
    return () => {
      // Set mounted state to false when component unmounts
      setIsMounted(false)
    }
  }, [])

  return (
    <section className="application">
      <div className="container">
        {isSubmitting == true ? (
          <div className="loading-container">
            <div className="loading">
              Loading..... <RotateRightIcon fontSize="130px" />
              {/* <AiOutlineLoading3Quarters size={40} /> */}
            </div>
          </div>
        ) : (
          <>
            <h3>Application Form</h3>
            <form onSubmit={handleApplication}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="number"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="text"
                placeholder="Your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <textarea
                placeholder="CoverLetter..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
              <div>
                <label
                  style={{
                    textAlign: 'start',
                    display: 'block',
                    fontSize: '20px',
                  }}
                >
                  Select Resume
                </label>
                <input
                  type="file"
                  accept=".webp, .jpg, .png"
                  onChange={handleFileChange}
                  style={{ width: '100%' }}
                />
              </div>
              <button type="submit">Send Application</button>
            </form>
          </>
        )}
      </div>
    </section>
  )
}
