import express from 'express'
const router = express.Router()

import {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from '../controllers/expenseController'

router.route('/').get(getAllExpenses).post(createExpense)
router.route('/:id').patch(updateExpense).delete(deleteExpense)

export default router
