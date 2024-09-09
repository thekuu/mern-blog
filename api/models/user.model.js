import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 45
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255
    },
    img: {
        type: String,
        default: null
    }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
