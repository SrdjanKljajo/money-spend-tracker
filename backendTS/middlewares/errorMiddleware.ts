import AppError from '../utils/appError'
import { Request, Response, NextFunction } from 'express'

export default (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let error = { ...err }

  error.message = err.message

  // Log to console for dev
  console.log(err)

  // Mongoose bad ObjectId
  if (error.kind === 'ObjectId') {
    const message = `Not found`
    error = new AppError(message, 404)
  }

  // Mongoose duplicate key
  if (error.code === 11000) {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
    const message = `Object ${value} already is in database. Please enter some other title`
    error = new AppError(message, 400)
  }

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((val: any) => val.message)
    const message = `Error in data import: ${errors.join('. ')}`
    error = new AppError(message, 400)
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server error',
  })
}
