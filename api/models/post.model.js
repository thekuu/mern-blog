import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 255
    },
    desc: {
        type: String,
        required: true,
        maxlength: 1000
    },
    img: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cat: {
        type: String,
        maxlength: 45,
        default: null
    }
}, { timestamps: true });

export default mongoose.model('Post', PostSchema);