import jobModel from '../model/jobModel.js'

export const GetAllJobController = async (req, res) => {
  try {
    const job = await jobModel.find({ expired: false })
    res.status(200).send({
      success: true,
      message: 'Successfully Fetched',
      job,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Error in Getting Job',
    })
  }
}

// post job
export const PostJobController = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
    } = req.body

    switch (true) {
      case !title:
        return res.json({ success: false, message: 'Title is Required' })
      case !description:
        return res.json({ success: false, message: 'Description is required' })
      case !category:
        return res.json({ success: false, message: 'category is Required' })
      case !country:
        return res.json({ success: false, message: 'Country name is required' })
      case !city:
        return res.json({ success: false, message: 'city name is required' })
      case !location:
        return res.json({ success: false, message: 'Location is required' })
    }
    if ((!salaryFrom || !salaryTo) && !fixedSalary) {
      return res.json({
        success: false,
        message: 'Provide Fixed salery or Ranged Salary',
      })
    }
    if (salaryFrom && salaryTo && fixedSalary) {
      return res.json({
        success: false,
        message: "Can't Provide Fixed salery or Ranged Salary together",
      })
    }
    const job = await new jobModel({
      ...req.body,
      postedBy: req.user._id,
    }).save()

    if (!job) {
      res.json({
        success: false,
        message: 'Try Again!',
      })
    }
    return res.json({
      success: true,
      message: 'Job Is Posted Successfully',
      job,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error In Job Post',
    })
  }
}

// get job list for specific Employer
export const GetMyJobCOntroller = async (req, res) => {
  try {
    const job = await jobModel.find({ postedBy: req.user._id })
    res.json({
      success: true,
      message: 'All Job Feched',
      job,
    })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: 'Error in getting job list',
    })
  }
}

// update job
export const UpdateJobController = async (req, res) => {
  try {
    const { jid } = req.params
    const jobdata = req.body
    let job = await jobModel.findById({ _id: jid })
    if (!job) {
      return res.json({
        success: false,
        message: 'This Job Is Not Available',
      })
    }

    job = await jobModel.findByIdAndUpdate(jid, { ...jobdata }, { new: true })

    if (job) {
      return res.json({
        success: true,
        message: 'Updated Successfully',
        job,
      })
    } else {
      return res.json({
        success: false,
        message: 'Error In Updating',
      })
    }
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: 'Error In Updating Job',
    })
  }
}

// delete job
export const DeleteJobController = async (req, res) => {
  try {
    const { jid } = req.params
    const job = await jobModel.findById({ _id: jid })
    if (!job) {
      return res.json({
        success: false,
        message: 'This Job Is Not Available',
      })
    }
    await jobModel.findByIdAndDelete({ _id: jid })
    return res.json({
      success: true,
      message: 'Job Deleted Successfully',
    })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: 'Error in Deleting Job',
    })
  }
}

// simgle job
export const GetSingleJob = async (req, res) => {
  try {
    const { id } = req.params

    const job = await jobModel.findOne({ _id: id })
    if (!job) {
      return res.json({
        success: false,
        message: 'Job Not Found',
      })
    }

    res.json({
      success: true,
      message: 'Job Fethced',
      job,
    })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: 'Error in Getting Job Details',
    })
  }
}
