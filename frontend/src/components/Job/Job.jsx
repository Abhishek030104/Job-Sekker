import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/auth'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

export const Job = () => {
  const [auth, setAuth] = useAuth()

  const [jobs, setJobs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!auth?.token) {
          navigate('/')
        } else {
          const { data } = await axios.get(
            'http://localhost:8080/api/v1/job/getall',
          )
          if (data?.success) {
            setJobs(data.job)
          }
        }
      } catch (error) {
        toast.error('Error in Fetching Jobs')
      }
    }

    fetchData()

    // Clean-up function can be added here if needed
  }, [auth?.token])
  return (
    <>
      <section className="jobs page">
        <div className="container">
          <h1>ALL AVAILABLE JOBS</h1>
          <div className="banner">
            {jobs.map((job) => (
              <div className="card" key={job._id}>
                <p>{job.title}</p>
                <p>{job.category}</p>
                <p>{job.country}</p>
                <Link to={`/job/${job._id}`}>Job Details</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
