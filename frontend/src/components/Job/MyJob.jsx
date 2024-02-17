import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaCheck } from 'react-icons/fa6'
import { RxCross2 } from 'react-icons/rx'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/auth'

export const MyJob = () => {
  const navigate = useNavigate()
  const [auth, setAuth] = useAuth()
  const [editingMode, setEditingMode] = useState(null)

  const [myJob, setMyJob] = useState([])

  useEffect(() => {
    if (!auth?.token) {
      navigate('/login')
    } else if (!auth?.user?.role == 'Employer') {
      navigate('/')
    }
    const fetchedJob = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:8080/api/v1/job/getmyjob',
        )

        if (data?.success) {
          setMyJob(data.job)
        } else {
          toast.error(data?.message)
        }
      } catch (error) {
        toast.error('Error In Fetching Jobs')
      }
    }
    fetchedJob()
  }, [auth?.token])

  // handle enable editing mode
  const EnableEditingMode = (joid) => {
    setEditingMode(joid)
  }

  // disbale editing mode
  const desableEditingMode = () => {
    setEditingMode(null)
  }

  // handle delete job
  const handleDeleteJob = async (jid) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/job/delete-job/${jid}`,
      )
      if (data?.success) {
        toast.success(data?.message)
      }
      setMyJob((prevJobs) => prevJobs.filter((job) => job._id !== jid))
    } catch (error) {
      toast.error('Error in Deleting Job')
    }
  }
  // handle input chnage
  const handleinputChange = (jid, field, value) => {
    setMyJob((prevjob) =>
      prevjob.map((job) =>
        job._id === jid ? { ...job, [field]: value } : job,
      ),
    )
    console.log(myJob)
  }
  // handle update
  const handleUpdateJob = async (jid) => {
    try {
      const updatejob = myJob.filter((job) => job._id === jid)
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/job/update-job/${jid}`,
        updatejob,
      )
      if (data?.success) {
        toast.success(data?.message)
        // setMyJob([...myJob, data?.job])
        setEditingMode(null);
      } else {
        toast.error(data?.message)
      }
    } catch (error) {
      toast.error('Error In Updating Job')
    }
  }
  return (
    <>
      <div className="myJobs page">
        <div className="container">
          <h1>Your Posted Jobs</h1>
          {myJob && myJob.length > 0 ? (
            <>
              <div className="banner">
                {myJob.map((element) => (
                  <div className="card" key={element._id}>
                    <div className="content">
                      <div className="short_fields">
                        <div>
                          <span>Title:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.title}
                            onChange={(e) =>
                              handleinputChange(
                                element._id,
                                'title',
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div>
                          {' '}
                          <span>Country:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.country}
                            onChange={(e) =>
                              handleinputChange(
                                element._id,
                                'country',
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>City:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.city}
                            onChange={(e) =>
                              handleinputChange(
                                element._id,
                                'city',
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>Category:</span>
                          <select
                            value={element.category}
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleinputChange(
                                element._id,
                                'category',
                                e.target.value,
                              )
                            }
                          >
                            <option value="Graphics & Design">
                              Graphics & Design
                            </option>
                            <option value="Mobile App Development">
                              Mobile App Development
                            </option>
                            <option value="Frontend Web Development">
                              Frontend Web Development
                            </option>
                            <option value="MERN Stack Development">
                              MERN STACK Development
                            </option>
                            <option value="Account & Finance">
                              Account & Finance
                            </option>
                            <option value="Artificial Intelligence">
                              Artificial Intelligence
                            </option>
                            <option value="Video Animation">
                              Video Animation
                            </option>
                            <option value="MEAN Stack Development">
                              MEAN STACK Development
                            </option>
                            <option value="MEVN Stack Development">
                              MEVN STACK Development
                            </option>
                            <option value="Data Entry Operator">
                              Data Entry Operator
                            </option>
                          </select>
                        </div>
                        <div>
                          <span>
                            Salary:{' '}
                            {element.fixedSalary ? (
                              <input
                                type="number"
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                                value={element.fixedSalary}
                                onChange={(e) =>
                                  handleinputChange(
                                    element._id,
                                    'fixedSalary',
                                    e.target.value,
                                  )
                                }
                              />
                            ) : (
                              <div>
                                <input
                                  type="number"
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
                                  value={element.salaryFrom}
                                  onChange={(e) => {
                                    handleinputChange(
                                      element._id,
                                      'salaryFrom',
                                      e.target.value,
                                    )
                                  }}
                                />
                                <input
                                  type="number"
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
                                  value={element.salaryTo}
                                  onChange={(e) =>
                                    handleinputChange(
                                      element._id,
                                      'salaryTo',
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>
                            )}
                          </span>
                        </div>
                        <div>
                          {' '}
                          <span>Expired:</span>
                          <select
                            value={element.expired}
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleinputChange(
                                element._id,
                                'expired',
                                e.target.value,
                              )
                            }
                          >
                            <option value={true}>TRUE</option>
                            <option value={false}>FALSE</option>
                          </select>
                        </div>
                      </div>
                      <div className="long_field">
                        <div>
                          <span>Description:</span>{' '}
                          <textarea
                            rows={5}
                            value={element.description}
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleinputChange(
                                element._id,
                                'description',
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>Location: </span>
                          <textarea
                            value={element.location}
                            rows={5}
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleinputChange(
                                element._id,
                                'location',
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* Out Of Content Class */}
                    <div className="button_wrapper">
                      <div className="edit_btn_wrapper">
                        {editingMode === element._id ? (
                          <>
                            <button
                              onClick={() => handleUpdateJob(element._id)}
                              className="check_btn"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => desableEditingMode()}
                              className="cross_btn"
                            >
                              <RxCross2 />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => EnableEditingMode(element._id)}
                            className="edit_btn"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteJob(element._id)}
                        className="delete_btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>
              You've not posted any job or may be you deleted all of your jobs!
            </p>
          )}
        </div>
      </div>
    </>
  )
}
