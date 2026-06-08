import Job from "../model/jobModel.js";

// for user
export const applyJob = async (req, res) => {
    try {
        const { name, email, phone, role } = req.body;
        const jobData = {
            name,
            email,
            phone,
            role,
            status: 'Pending',
            date: Date.now()
        };

        const newJob = new Job(jobData);
        await newJob.save();

        return res.status(201).json({ message: 'Application submitted successfully', success: true });
    } catch (error) {
        console.log("Apply job error:", error);
        res.status(500).json({ message: 'Error submitting application', success: false });
    }
}

// for admin
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({}).sort({ date: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        console.log("Get jobs error:", error);
        res.status(500).json({ message: "Error fetching jobs", success: false });
    }
}

export const updateJobStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        await Job.findByIdAndUpdate(id, { status });
        res.status(200).json({ message: 'Application status updated', success: true });
    } catch (error) {
        console.log("Update job status error:", error);
        res.status(500).json({ message: "Error updating status", success: false });
    }
}
