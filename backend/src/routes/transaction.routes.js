import express from "express";
import transactionCtrl from "../controller/transactions.controller"

const router = express.Router();

router.route("/api/transactions").post(transactionCtrl.createTransaction)

router.route("/api/transactions/edit/:id").get(transactionCtrl.getTransactionInfo).put(transactionCtrl.updateTransaction)


router.route("/api/transactions/:id").get(transactionCtrl.listTransactions).delete(transactionCtrl.deleteTransaction)

router.route("/api/transactions/daily/expense/:id").get(transactionCtrl.listExpenseTransactionsDialy)
router.route("/api/transactions/daily/income/:id").get(transactionCtrl.listIncomeTransactionsDialy)
router.route("/api/transactions/daily/allDaily/:id").get(transactionCtrl.listAllTransactionsDialy)

router.route("/api/transactions/weekly/expense/:id").get(transactionCtrl.listExpenseTransactionsWeekly)
router.route("/api/transactions/weekly/income/:id").get(transactionCtrl.listIncomeTransactionsWeekly)
router.route("/api/transactions/weekly/allWeekly/:id").get(transactionCtrl.listAllTransactionsWeekly)

router.route("/api/transactions/monthly/expense/:id").get(transactionCtrl.listExpenseTransactionsMonthly)
router.route("/api/transactions/monthly/income/:id").get(transactionCtrl.listIncomeTransactionsMonthly)
router.route("/api/transactions/monthly/allMonthly/:id").get(transactionCtrl.listAllTransactionsMonthly)

router.route("/api/transactions/yearly/expense/:id").get(transactionCtrl.listExpenseTransactionsYearly)
router.route("/api/transactions/yearly/income/:id").get(transactionCtrl.listIncomeTransactionsYearly)
router.route("/api/transactions/yearly/allYearly/:id").get(transactionCtrl.listAllTransactionsYearly)

export default router;