import Expense from '../models/expenseModel'
import catchAsync from '../middlewares/catchAsync'
import AppError from '../utils/appError'
import { Request, Response, NextFunction } from 'express'

const getAllExpenses = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const expenses = await Expense.find().sort('-createdAt')
    res.json(expenses)
  }
)

const createExpense = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const newExpense = Expense.build(req.body)
    await newExpense.save()

    res.status(201).json({
      status: 'success',
      data: {
        expense: newExpense,
      },
    })
  }
)

const updateExpense = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id
    const expense = await Expense.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!expense) {
      return next(new AppError(`Expense '${id}' not found`, 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        expense,
      },
    })
  }
)

const deleteExpense = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id
    const expense = await Expense.findByIdAndDelete(id)

    if (!expense) {
      return next(new AppError(`Expense '${id}' not found`, 404))
    }

    res.status(204).json({
      status: 'success',
      data: null,
    })
  }
)

export { getAllExpenses, createExpense, updateExpense, deleteExpense }
