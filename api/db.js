import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);  // No need for options
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
