import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables
const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        console.warn('MONGO_URI not set. Skipping MongoDB connection.');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    }
};

export default connectDB;
