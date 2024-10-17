import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


console.log('MONGO_URI:', process.env.MONGO_URI);

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    });
};

export default connectDB;
