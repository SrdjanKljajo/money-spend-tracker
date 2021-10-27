import mongoose from 'mongoose'

interface IExpense {
  title: string
  amount: number
}

interface expenseModelInterface extends mongoose.Model<ExpenseDoc> {
  build(attr: IExpense): ExpenseDoc
}

interface ExpenseDoc extends mongoose.Document {
  title: string
  amount: string
}

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, 'Please add a name'],
      minlength: [2, 'Too short'],
      maxlength: [32, 'Too long'],
    },
    amount: {
      required: [true, 'Please add a amount'],
      type: Number,
    },
    date: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
)

expenseSchema.statics.build = (attr: IExpense) => {
  return new Expense(attr)
}

const Expense = mongoose.model<ExpenseDoc, expenseModelInterface>(
  'Expense',
  expenseSchema
)

export default Expense
