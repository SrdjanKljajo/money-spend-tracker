import mongoose from 'mongoose'

const connectDB = async (): Promise<any> => {
  await mongoose.connect('mongodb://127.0.0.1:27017/expense-tracker')
  console.log(`MongoDB is connect`)
}

export default connectDB
