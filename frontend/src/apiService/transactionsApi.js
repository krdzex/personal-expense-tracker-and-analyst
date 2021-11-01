import url from "../config/config";
const headers = { "Accept": "application/json", "Content-Type": "application/json" };

const getAllTransactions = (id) => {
    return fetch(`${url}/api/transactions/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const getTransactionInfo = (id) => {
    return fetch(`${url}/api/transactions/edit/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const getDailyExpenseTransactions = (id) => {
    return fetch(`${url}/api/transactions/daily/expense/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const updateTransaction = (id, data) => {
    console.log(data)
    return fetch(`${url}/api/transactions/edit/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data)
    }).then(response => response.json()).catch(err => console.log(err))
}

const getDailyIncomeTransactions = (id) => {
    return fetch(`${url}/api/transactions/daily/income/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const getDailyAllTransactions = (id) => {
    return fetch(`${url}/api/transactions/daily/allDaily/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const getWeeklyExpenseTransactions = (id) => {
    return fetch(`${url}/api/transactions/weekly/expense/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const getWeeklyIncomeTransactions = (id) => {
    return fetch(`${url}/api/transactions/weekly/income/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const getWeeklyAllTransactions = (id) => {
    return fetch(`${url}/api/transactions/weekly/allWeekly/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const getMonthlyExpenseTransactions = (id) => {
    return fetch(`${url}/api/transactions/monthly/expense/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const getMonthlyIncomeTransactions = (id) => {
    return fetch(`${url}/api/transactions/monthly/income/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const getMonthlyAllTransactions = (id) => {
    return fetch(`${url}/api/transactions/monthly/allMonthly/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const getYearlyExpenseTransactions = (id) => {
    return fetch(`${url}/api/transactions/yearly/expense/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const getYearlyIncomeTransactions = (id) => {
    return fetch(`${url}/api/transactions/yearly/income/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const getYearlyAllTransactions = (id) => {
    return fetch(`${url}/api/transactions/yearly/allYearly/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const addNewTransaction = (transaction) => {
    return fetch(`${url}/api/transactions`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(transaction)
    }).then(response => response.json()).catch(err => console.log(err))
}
const deleteTransaction = (id) => {
    return fetch(`${url}/api/transactions/${id}`, {
        method: "DELETE",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

export { updateTransaction,getTransactionInfo,getAllTransactions, getDailyExpenseTransactions, getDailyIncomeTransactions, getDailyAllTransactions, getWeeklyExpenseTransactions, getWeeklyIncomeTransactions, getWeeklyAllTransactions, getMonthlyExpenseTransactions, getMonthlyIncomeTransactions, getMonthlyAllTransactions, getYearlyExpenseTransactions, getYearlyIncomeTransactions, getYearlyAllTransactions, addNewTransaction, deleteTransaction }