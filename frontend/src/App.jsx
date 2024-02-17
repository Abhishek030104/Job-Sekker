import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './components/Auth/Login'
import { Register } from './components/Auth/Register'
import { Home } from './components/Home/Home'
import { Job } from './components/Job/Job'
import { JobDetails } from './components/Job/JobDetails'
import { PostJob } from './components/Job/PostJob'
import { Application } from './components/Application/Application'
import { MyApplication } from './components/Application/MyApplication'
import { NotFound } from './components/Notfound/NotFound'
import { Navbar } from './components/Layout/Navbar'
import { Footer } from './components/Layout/Footer'

import { Toaster } from 'react-hot-toast'
import { MyJob } from './components/Job/MyJob'

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Job />} />
          <Route path="job/:id" element={<JobDetails />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/me" element={<MyJob />} />
          <Route path="/application/:id" element={<Application />} />
          <Route
            path="/application/myapplication"
            element={<MyApplication />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster position="top-center" reverseOrder={false} />
      </BrowserRouter>
    </>
  )
}
