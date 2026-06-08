import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true },
    status: { type: String, required: true, default: 'Pending' },
    date: { type: Number, required: true }
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

export default Job;
