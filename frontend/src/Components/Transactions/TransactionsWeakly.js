import { Icon } from '@iconify/react';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { Chart, Doughnut } from "react-chartjs-2"
import { deleteTransaction, getAllTransactions, getWeeklyAllTransactions, getWeeklyExpenseTransactions, getWeeklyIncomeTransactions } from '../../apiService/transactionsApi';
import authHelper from '../../auth/authHelper';
import AddTransaction from './AddTransaction';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useDispatch, useSelector } from 'react-redux';
import { addTotalBalance, openEdit } from '../../Actions';

const TransactionsWeakly = () => {
    const currency = useSelector(state => state.currencyReducer)
    const totalBalance = useSelector(state => state.balanceReducer)
    const dispatch = useDispatch()
    const succes = useSelector(state => state.transactionsReducer)
    Chart.register(ChartDataLabels);
    const [timeDiff, setTimeDiff] = useState({
        income: [],
        expense: [],
        all: []
    })

    const [expenseIncomeRatio, setExpenseIncomeRatio] = useState(0)
    const [loading, setLoading] = useState(false)
    const data = {
        labels: ['Expense/Income ratio'],
        datasets: [
            {
                data: [expenseIncomeRatio, 1 - expenseIncomeRatio],

                backgroundColor: [
                    'rgb(255, 0, 0)',
                    'rgb(17, 140, 79)'

                ],
                hoverOffset: 4
            }
        ]
    }

    const [weeklyExpenseTransactions, setWeeklyExpenseTransactions] = useState([])
    const [weeklyIncomeTransactions, setWeeklyIncomeTransactions] = useState([])
    const [weeklyAllTransactions, setWeeklyAllTransactions] = useState([])

    const options = {
        plugins: {
            datalabels: {
                display: function (context) {
                    return context.dataset.backgroundColor[context.dataIndex] === "rgb(255, 0, 0)";
                },
                formatter: function (value, context) {
                    return Math.round(value * 100) + '%';
                },
                font: { weight: "bold", size: 20 },
                color: '#fff',
            }
        },
        events: [],
        responsive: true,
    }

    const getData = useCallback(async () => {
        await getAllTransactions(authHelper.isAuthentcated().user._id).then(response => {
            response = changeCurrency(response)
            let allExpense = 0;
            let allIncome = 0;
            response.forEach(response => {

                if (response.type === "expense") {
                    allExpense += response.amount;
                } else {
                    allIncome += response.amount
                }
            })
            dispatch(addTotalBalance(allIncome - allExpense))
        })
        await getWeeklyExpenseTransactions(authHelper.isAuthentcated().user._id).then(response => {
            response = changeCurrency(response)
            setWeeklyExpenseTransactions(response)
            findDiffInTimes(response, "expense")
        }).catch(reason => console.log(reason))
        await getWeeklyIncomeTransactions(authHelper.isAuthentcated().user._id).then(response => {
            response = changeCurrency(response)
            setWeeklyIncomeTransactions(response)
            findDiffInTimes(response, "income")
        }).catch(reason => console.log(reason))
        await getWeeklyAllTransactions(authHelper.isAuthentcated().user._id).then(response => {
            response = changeCurrency(response)
            setWeeklyAllTransactions(response)
            findDiffInTimes(response, "all")
            let allExpense = 0;
            let allIncome = 0;
            response.forEach(response => {
                if (response.type === "expense") {
                    allExpense += response.amount;
                } else {
                    allIncome += response.amount
                }
            })
            setExpenseIncomeRatio(allExpense / allIncome);
            setLoading(true)
        }).catch(reason => console.log(reason))
    }, [dispatch, currency])

    useEffect(() => {
        setLoading(false)
        setTimeDiff({
            income: [],
            expense: [],
            all: []
        })
        getData()
    }, [getData, succes, currency])


    const findDiffInTimes = (response, type) => {
        for (let i in response) {
            let createdTime = moment(response[i].created)
            let timeNow = moment(Date.now())
            let timeDifferenceMiliSacconds = timeNow.diff(createdTime, "milliseconds")
            let timeDifferenceSacconds = timeNow.diff(createdTime, "seconds")
            let timeDifferenceMinutes = timeNow.diff(createdTime, "minutes")
            let timeDifferenceHours = timeNow.diff(createdTime, "hours")
            let timeDifferenceDays = timeNow.diff(createdTime, "days")
            if (timeDifferenceMiliSacconds < 1000) {
                setTimeDiff(prevState => ({ ...prevState, [type]: [...prevState[type], { time: 1, type: "seconds" }] }))
                continue
            }
            if (timeDifferenceSacconds < 60) {
                setTimeDiff(prevState => ({ ...prevState, [type]: [...prevState[type], { time: timeDifferenceSacconds, type: "seconds" }] }))
                continue
            }
            if (timeDifferenceMinutes < 60) {
                setTimeDiff(prevState => ({ ...prevState, [type]: [...prevState[type], { time: timeDifferenceMinutes, type: "minutes" }] }))
                continue
            }
            if (timeDifferenceHours < 24) {
                setTimeDiff(prevState => ({ ...prevState, [type]: [...prevState[type], { time: timeDifferenceHours, type: "hours" }] }))
                continue
            }
            if (timeDifferenceDays < 7) {
                setTimeDiff(prevState => ({ ...prevState, [type]: [...prevState[type], { time: timeDifferenceDays, type: "days" }] }))
                continue
            }
        }
    }

    const changeCurrency = (data) => {
        for (let i in data) {
            if (data[i].currency === "dollar" && currency === "euro") {

                data[i].amount = Math.round(data[i].amount * 0.86)
            }
            if (data[i].currency === "dollar" && currency === "bam") {

                data[i].amount = Math.round(data[i].amount / 0.59)
            }
            if (data[i].currency === "bam" && currency === "euro") {

                data[i].amount = Math.round(data[i].amount / 1.95)
            }
            if (data[i].currency === "bam" && currency === "dollar") {

                data[i].amount = Math.round(data[i].amount * 0.59)
            }
            if (data[i].currency === "euro" && currency === "bam") {

                data[i].amount = Math.round(data[i].amount * 1.95)
            }
            if (data[i].currency === "euro" && currency === "dollar") {
                data[i].amount = Math.round(data[i].amount / 0.86)
            }
        }
        return data
    }


    const onDeleteClick = async (id) => {
        const allTransactionsCopy = weeklyAllTransactions.filter((transaction) => transaction._id !== id)
        let allExpense = 0;
        let allIncome = 0;
        allTransactionsCopy.forEach(transaction => {
            if (transaction.type === "expense") {
                allExpense += transaction.amount;
            } else {
                allIncome += transaction.amount
            }
        })
        setExpenseIncomeRatio(allExpense / allIncome);
        await deleteTransaction(id).then(response => console.log(response)).catch(reason => console.log(reason))
        await getData()
    }



    return (
        <div className="transactionsWeeklyWrapper">
            <div className="allTransactions">
                <div className="topLeft">All</div>
                <div className="leftSide">
                    <div className="chart">
                        {loading && (<div><Doughnut data={data} options={options} className="circle" />
                            <div className="middle">
                                <p>Total balance:</p>
                                <span style={{ display: "flex", justifyContent: "center", alignItems: "baseline" }}>{totalBalance}{currency === "dollar" ? <div style={{ fontSize: "40px" }}>$</div> : currency === "euro" ? <div style={{ fontSize: "40px" }}>€</div> : <div style={{ fontSize: "12px" }}>bam</div>}</span>
                            </div></div>)}
                    </div>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <td>Reason</td>
                                    <td>Date</td>
                                    <td>Amount</td>
                                    <td>Options</td>
                                </tr>
                            </thead>
                            {loading && (<tbody>
                                {weeklyAllTransactions.map((all, id) => (
                                    <tr key={id}>
                                        <td>{all.title}</td>
                                        <td>{timeDiff.all[id].time + " " + timeDiff.all[id].type} ago</td>
                                        <td>{all.type === "expense" ? "-" : "+"}{all.amount}{currency === "dollar" ? "$" : currency === "euro" ? "€" : "bam"}</td>
                                        <td><div><Icon icon="ci:edit" id="edit"onClick={() => dispatch(openEdit(all._id))} /><Icon icon="fluent:delete-48-filled" id="delete" onClick={() => onDeleteClick(all._id)} /></div></td>
                                    </tr>
                                ))}
                            </tbody>)}
                        </table>
                    </div>
                </div>
                <AddTransaction />
            </div>
            <div className="incomeAndExpense">
                <div className="topLeft">Expense</div>
                <div className="allTransactionsExpense">
                    <div className="chart">
                        {loading && (<div><Doughnut data={data} options={options} className="circle" />
                            <div className="middle">
                                <p>Total balance:</p>
                                <span style={{ display: "flex", justifyContent: "center", alignItems: "baseline" }}>{totalBalance}{currency === "dollar" ? <div style={{ fontSize: "40px" }}>$</div> : currency === "euro" ? <div style={{ fontSize: "40px" }}>€</div> : <div style={{ fontSize: "12px" }}>bam</div>}</span>
                            </div></div>)}
                    </div>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <td>Reason</td>
                                    <td>Date</td>
                                    <td>Amount</td>
                                    <td>Options</td>
                                </tr>
                            </thead>
                            {loading && (<tbody>
                                {weeklyExpenseTransactions.map((expense, id) => (
                                    <tr key={id}>
                                        <td>{expense.title}</td>
                                        <td>{timeDiff.expense[id].time + " " + timeDiff.expense[id].type} ago</td>
                                        <td>-{expense.amount}{currency === "dollar" ? "$" : currency === "euro" ? "€" : "bam"}</td>
                                        <td><div><Icon icon="ci:edit" id="edit"onClick={() => dispatch(openEdit(expense._id))} /><Icon icon="fluent:delete-48-filled" id="delete" onClick={() => onDeleteClick(expense._id)} /></div></td>
                                    </tr>
                                ))}
                            </tbody>)}
                        </table>
                    </div>
                </div>
                <div className="allTransactionsIncome">
                    <div className="topLeft">Income</div>
                    <div className="chart">
                        {loading && (<div><Doughnut data={data} options={options} className="circle" />
                            <div className="middle">
                                <p>Total balance:</p>
                                <span style={{ display: "flex", justifyContent: "center", alignItems: "baseline" }}>{totalBalance}{currency === "dollar" ? <div style={{ fontSize: "40px" }}>$</div> : currency === "euro" ? <div style={{ fontSize: "40px" }}>€</div> : <div style={{ fontSize: "12px" }}>bam</div>}</span>
                            </div></div>)}
                    </div>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <td>Reason</td>
                                    <td>Date</td>
                                    <td>Amount</td>
                                    <td>Options</td>
                                </tr>
                            </thead>
                            {loading && (<tbody>
                                {weeklyIncomeTransactions.map((income, id) => (
                                    <tr key={id}>
                                        <td>{income.title}</td>
                                        <td>{timeDiff.income[id].time + " " + timeDiff.income[id].type} ago</td>
                                        <td>+{income.amount}{currency === "dollar" ? "$" : currency === "euro" ? "€" : "bam"}</td>
                                        <td><div><Icon icon="ci:edit" id="edit" onClick={() => dispatch(openEdit(income._id))}/><Icon icon="fluent:delete-48-filled" id="delete" onClick={() => onDeleteClick(income._id)} /></div></td>
                                    </tr>
                                ))}
                            </tbody>)}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionsWeakly;