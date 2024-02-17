import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import ResumeModal from './ResumeModel'
import { useAuth } from '../../Context/auth'

export const MyApplication = () => {
  const [application, setApplications] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [resumeImageUrl, setResumeImageUrl] = useState('')

  const [auth, setAuth] = useAuth()

  const fetchedData = async () => {
    try {
      if (auth?.user && auth?.user.role === 'Employer') {
        const { data } = axios.get(
          'http://localhost:8080/api/v1/application/getAll',
        )
        if (data?.success) {
          setApplications(data?.applications)
        } else {
          console.log(data?.message)
        }
      } else {
        const { data } = await axios.get(
          'http://localhost:8080/api/v1/application/getAll-application',
        )
        console.log(data)
        if (data?.success) {
          setApplications(data?.applications)
        } else {
          toast.error(data?.message)
        }
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  useEffect(() => {
    if (auth?.token) {
      fetchedData()
    }
  }, [auth?.token, auth?.user])

  const deleteApplication = (aid) => {
    try {
      axios.delete(
        `http://localhost:8080/api/v1/application/delete-application/${aid}`,
      )

      if (data?.sucess) {
        toast.success(data?.message)
        setApplications((prevApplication) =>
          prevApplication.filter((application) => application._id !== id),
        )
        window.location.reload()
        // fetchedData()
      } else {
        toast.error(data?.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl)
    setModalOpen(true)
  }
  return (
    <section className="my_applications page">
      {auth?.user && auth?.user?.role === 'Job Seeker' ? (
        <div className="container">
          <h1>My Applications</h1>
          {application.length <= 0 ? (
            <>
              {' '}
              <h4>No Applications Found</h4>{' '}
            </>
          ) : (
            application.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              )
            })
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Applications From Job Seekers</h1>
          {application.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            application.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              )
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  )
}
const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            // src={element.resume.url}
            src={element.resume}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  )
}

const EmployerCard = ({ element, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
      </div>
    </>
  )
}
