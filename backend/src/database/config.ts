import mongoose from 'mongoose';

const dbConnection = async () =>
  mongoose.connect(process.env.DATABASE_URL || '');
  
export default dbConnection;
