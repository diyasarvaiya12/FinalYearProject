import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: [String],
    isAvailable: { type: Boolean, default: true },
    workingHours: {
        start: String,
        end: String
    }
});

const Worker = mongoose.models.worker || mongoose.model('worker', workerSchema);
export default Worker;