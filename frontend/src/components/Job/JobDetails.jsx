import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/auth'
import toast from 'react-hot-toast'

export const JobDetails = () => {
  const [auth, setAuth] = useAuth()
  const [job, setJobs] = useState({})
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!auth?.token) {
          navigate('/')
        } else {
          const { data } = await axios.get(
            `http://localhost:8080/api/v1/job/${id}`,
          )

          if (data?.success) {
            setJobs(data.job)
          }
        }
      } catch (error) {
        toast.error('Error in Fetching Jobs')
      }
    }
    if (id) {
      fetchData()
    }
  }, [auth?.token, id])

  return (
    <>
      <section className="jobDetail page">
        <div className="container">
          <h3>Job Details</h3>
          <div className="banner">
            <p>
              Title: <span> {job.title}</span>
            </p>
            <p>
              Category: <span>{job.category}</span>
            </p>
            <p>
              Country: <span>{job.country}</span>
            </p>
            <p>
              City: <span>{job.city}</span>
            </p>
            <p>
              Location: <span>{job.location}</span>
            </p>
            <p>
              Description: <span>{job.description}</span>
            </p>
            <p>
              Job Posted On: <span>{job.jobPostedOn}</span>
            </p>
            <p>
              Salary:{' '}
              {job.fixedSalary ? (
                <span>{job.fixedSalary}</span>
              ) : (
                <span>
                  {job.salaryFrom} - {job.salaryTo}
                </span>
              )}
            </p>
            {auth && auth?.user?.role === 'Employer' ? (
              <></>
            ) : (
              <Link to={`/application/${job._id}`}>Apply Now</Link>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
