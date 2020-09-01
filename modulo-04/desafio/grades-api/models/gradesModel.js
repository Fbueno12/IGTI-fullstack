import mongoose from "mongoose";

const gradeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true
    },
    lastModified: {
        type: Date,
        default: Date.now,
    }
});

const GradesModel = mongoose.model("grades", gradeSchema, "grades");

export default GradesModel;
