import Transaction from "../models/transaction.model"
import moment from "moment"
import validateTransactionte from "../validations/transactionValidation"
import errorHandler from "../helpers/dbErrorHandler"
import _ from "lodash"

const createTransaction = (req, res) => {
    const transaction = new Transaction(req.body);
    const { errors, isValid } = validateTransactionte(req.body);

    if (!isValid) {
        return res.status(400).json(errors)
    }

    transaction.save((err, result) => {

        if (err) {
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        res.status(200).json({
            message: "Successfully created transaction!"
        })
    })
}
const updateTransaction = (req, res) => {
    var id = req.params.id;
    Transaction.findById(id).exec((err, transaction) => {
        if (err || !transaction)
            return res.status("400").json({
                error: "Transaction not found"
            })

        const { errors, isValid } = validateTransactionte(req.body);
        if (!isValid) {
            return res.status(400).json(errors)
        }
        transaction = _.extend(transaction, req.body)
        transaction.updated = Date.now();
        transaction.save((err) => {
            if (err) {
                return res.status(400).json(
                    errorHandler.getErrorMessage(err)
                )
            }
            res.json(transaction)
        })
    })
}
const getTransactionInfo = (req, res) => {
    var id = req.params.id;
    console.log(id)
    Transaction.findById(id).exec((err, result) => {
        if (err) {
            return res.status("400").json({
                error: "User not found"
            })
        }
        res.status(200).json(result)
    })
}
const listTransactions = (req, res) => {
    var id = req.params.id;
    Transaction.find({ creator: id }, (err, result) => {

        if (err) {
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        res.status(200).json(result)
    })
}

const listExpenseTransactionsDialy = (req, res) => {
    var id = req.params.id;
    Transaction.find({ type: "expense", creator: id }, (err, result) => {
        let completeArray = []
        let currentDate = moment(Date.now()).format("MM/DD/YYYY")

        for (let i = 0; i < result.length; i++) {
            if (currentDate === moment(result[i].created).format("MM/DD/YYYY")) {
                completeArray.push(result[i])
            }
        }
        if (err) {
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        res.status(200).json(completeArray)
    }).select("_id title amount created creator currency")
}


const listIncomeTransactionsDialy = (req, res) => {
    var id = req.params.id;
    Transaction.find({ type: "income", creator: id }, (err, result) => {
        let completeArray = []
        let currentDate = moment(Date.now()).format("MM/DD/YYYY")

        for (let i = 0; i < result.length; i++) {
            if (currentDate === moment(result[i].created).format("MM/DD/YYYY")) {
                completeArray.push(result[i])
            }
        }
        if (err) {
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        res.status(200).json(completeArray)
    }).select("_id title amount created creator currency")
}

const listAllTransactionsDialy = (req, res) => {
    var id = req.params.id;
    Transaction.find({ creator: id }, (err, result) => {
        let completeArray = []
        let currentDate = moment(Date.now()).format("MM/DD/YYYY")

        for (let i = 0; i < result.length; i++) {
            if (currentDate === moment(result[i].created).format("MM/DD/YYYY")) {
                completeArray.push(result[i])
            }
        }
        if (err) {
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        res.status(200).json(completeArray)
    }).select("_id title amount type created creator currency")
}

const listExpenseTransactionsWeekly = (req, res) => {
    var id = req.params.id;
    Transaction.find({ type: "expense", creator: id }, (err, result) => {
        let completeArray = []
        let currentWeek = moment(Date.now()).isoWeek()
        let currentYear = moment(Date.now()).year()
        for (let i = 0; i < result.length; i++) {
            let transactionWeek = moment(result[i].created).isoWeek()
            let transactionYear = moment(result[i].created).year()
            if (currentWeek === transactionWeek && currentYear === transactionYear) {
                completeArray.push(result[i])
            }
        }
        if (err) {
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        res.status(200).json(completeArray)
    }).select("_id title amount created creator currency")
}


const listIncomeTransactionsWeekly = (req, res) => {
    var id = req.params.id;
    Transaction.find({ type: "income", creator: id }, (err, result) => {
        let completeArray = []
        let currentWeek = moment(Date.now()).isoWeek()
        let currentYear = moment(Date.now()).year()
        for (let i = 0; i < result.length; i++) {
            let transactionWeek = moment(result[i].created).isoWeek()
            let transactionYear = moment(result[i].created).year()
            if (currentWeek === transactionWeek && transactionYear === currentYear) {
                completeArray.push(result[i])
            }
        }
        if (err) {
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        res.status(200).json(completeArray)
    }).select("_id title amount created creator currency")
}

const listAllTransactionsWeekly = (req, res) => {
    var id = req.params.id;
    Transaction.find({ creator: id }, (err, result) => {
        let completeArray = []
        let currentWeek = moment(Date.now()).isoWeek()
        let currentYear = moment(Date.now()).year()
        for (let i = 0; i < result.length; i++) {
            let transactionWeek = moment(result[i].created).isoWeek()
            let transactionYear = moment(result[i].created).year()
            if (currentWeek === transactionWeek && transactionYear === currentYear) {
                completeArray.push(result[i])
            }
        }
        if (err) {
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        res.status(200).json(completeArray)
    }).select("_id title amount type created creator currency")
}

const listExpenseTransactionsMonthly = (req, res) => {
    var id = req.params.id;
    Transaction.find({ type: "expense", creator: id }, (err, result) => {
        let completeArray = []
        let currentMonth = moment(Date.now()).month()
        let currentYear = moment(Date.now()).year()
        for (let i = 0; i < result.length; i++) {
            let transactionMonth = moment(result[i].created).month()
            let transactionYear = moment(result[i].created).year()
            if (transactionMonth === currentMonth && currentYear === transactionYear) {
                completeArray.push(result[i])
            }
        }
        if (err) {
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        res.status(200).json(completeArray)
    }).select("_id title amount created creator currency")
}


const listIncomeTransactionsMonthly = (req, res) => {
    var id = req.params.id;
    Transaction.find({ type: "income", creator: id }, (err, result) => {
        let completeArray = []
        let currentMonth = moment(Date.now()).month()
        let currentYear = moment(Date.now()).year()
        for (let i = 0; i < result.length; i++) {
            let transactionMonth = moment(result[i].created).month()
            let transactionYear = moment(result[i].created).year()
            if (transactionMonth === currentMonth && transactionYear === currentYear) {
                completeArray.push(result[i])
            }
        }
        if (err) {
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        res.status(200).json(completeArray)
    }).select("_id title amount created creator currency")
}

const listAllTransactionsMonthly = (req, res) => {
    var id = req.params.id;
    Transaction.find({ creator: id }, (err, result) => {
        let completeArray = []
        let currentMonth = moment(Date.now()).month()
        let currentYear = moment(Date.now()).year()
        for (let i = 0; i < result.length; i++) {
            let transactionMonth = moment(result[i].created).month()
            let transactionYear = moment(result[i].created).year()
            if (currentMonth === transactionMonth && transactionYear === currentYear) {
                completeArray.push(result[i])
            }
        }
        if (err) {
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        res.status(200).json(completeArray)
    }).select("_id title amount type created creator currency")
}


const listExpenseTransactionsYearly = (req, res) => {
    var id = req.params.id;
    Transaction.find({ type: "expense", creator: id }, (err, result) => {
        let completeArray = []
        let currentYear = moment(Date.now()).year()
        for (let i = 0; i < result.length; i++) {
            let transactionYear = moment(result[i].created).year()
            if (currentYear === transactionYear) {
                completeArray.push(result[i])
            }
        }
        if (err) {
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        res.status(200).json(completeArray)
    }).select("_id title amount created creator currency")
}


const listIncomeTransactionsYearly = (req, res) => {
    var id = req.params.id;

    Transaction.find({ type: "income", creator: id }, (err, result) => {
        let completeArray = []
        let currentYear = moment(Date.now()).year()
        for (let i = 0; i < result.length; i++) {
            let transactionYear = moment(result[i].created).year()
            if (transactionYear === currentYear) {
                completeArray.push(result[i])
            }
        }
        if (err) {
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        res.status(200).json(completeArray)
    }).select("_id title amount created creator currency")
}

const listAllTransactionsYearly = (req, res) => {
    var id = req.params.id;
    Transaction.find({ creator: id }, (err, result) => {
        let completeArray = []
        let currentYear = moment(Date.now()).year()
        for (let i = 0; i < result.length; i++) {
            let transactionYear = moment(result[i].created).year()
            if (transactionYear === currentYear) {
                completeArray.push(result[i])
            }
        }
        if (err) {
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        res.status(200).json(completeArray)
    }).select("_id title amount type created creator currency")
}
const deleteTransaction = (req, res) => {
    var id = req.params.id;
    Transaction.deleteOne({ _id: id }, (err, result) => {
        if (err) {
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        res.status(200).json(result)
    })
}





export default { updateTransaction, getTransactionInfo, createTransaction, listTransactions, listExpenseTransactionsDialy, listIncomeTransactionsDialy, listAllTransactionsDialy, listExpenseTransactionsWeekly, listIncomeTransactionsWeekly, listAllTransactionsWeekly, listExpenseTransactionsMonthly, listIncomeTransactionsMonthly, listAllTransactionsMonthly, listExpenseTransactionsYearly, listIncomeTransactionsYearly, listAllTransactionsYearly, deleteTransaction }