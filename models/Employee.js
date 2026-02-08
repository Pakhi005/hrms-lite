import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: [true, 'Please provide an employee ID'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    department: {
        type: String,
        required: [true, 'Please provide a department'],
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    },
    toObject: { virtuals: true }
});

export default mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);
