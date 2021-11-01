import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Bar, Doughnut, Line } from "react-chartjs-2"
import { useSelector } from 'react-redux';
import { getWeeklyExpenseTransactions, getWeeklyIncomeTransactions } from '../../apiService/transactionsApi';
import authHelper from '../../auth/authHelper';

const StatisticsWeeky = () => {

    const currency = useSelector(state => state.currencyReducer)
    const [weeklyIncomeTransactions, setWeeklyIncomeTransactions] = useState({
        Mon: [0],
        Tue: [0],
        Wed: [0],
        Thu: [0],
        Fri: [0],
        Sat: [0],
        Sun: [0]

    })

    const [weeklyExpenseTransactions, setWeeklyExpenseTransactions] = useState({
        Mon: [0],
        Tue: [0],
        Wed: [0],
        Thu: [0],
        Fri: [0],
        Sat: [0],
        Sun: [0]
    })
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


    useEffect(() => {
        setWeeklyExpenseTransactions({
            Mon: [0],
            Tue: [0],
            Wed: [0],
            Thu: [0],
            Fri: [0],
            Sat: [0],
            Sun: [0]

        })
        setWeeklyIncomeTransactions({
            Mon: [0],
            Tue: [0],
            Wed: [0],
            Thu: [0],
            Fri: [0],
            Sat: [0],
            Sun: [0]

        })
        getData();
    }, [currency])


    const getData = async () => {
        await getWeeklyExpenseTransactions(authHelper.isAuthentcated().user._id).then(response => {
            response = changeCurrency(response)
            response.forEach(transaction => {
                let day = moment(transaction.created).format("ddd")
                setWeeklyExpenseTransactions(prevState => ({ ...prevState, [day]: [...prevState[day], transaction.amount] }))
            });
        }).catch(reason => console.log(reason))
        await getWeeklyIncomeTransactions(authHelper.isAuthentcated().user._id).then(response => {
            response = changeCurrency(response)
            response.forEach(transaction => {
                let day = moment(transaction.created).format("ddd")
                setWeeklyIncomeTransactions(prevState => ({ ...prevState, [day]: [...prevState[day], transaction.amount] }))
            });
        }).catch(reason => console.log(reason))
    }
    var expenseData = {
        label: 'Expense',
        data: [weeklyExpenseTransactions.Mon.reduce((a, b) => a + b), weeklyExpenseTransactions.Tue.reduce((a, b) => a + b), weeklyExpenseTransactions.Wed.reduce((a, b) => a + b), weeklyExpenseTransactions.Thu.reduce((a, b) => a + b), weeklyExpenseTransactions.Fri.reduce((a, b) => a + b), weeklyExpenseTransactions.Sat.reduce((a, b) => a + b), weeklyExpenseTransactions.Sun.reduce((a, b) => a + b)],
        backgroundColor: 'red',
        borderColor: "red",
        tension: 0.1
    };
    var incomeData = {
        label: 'Income',
        data: [weeklyIncomeTransactions.Mon.reduce((a, b) => a + b), weeklyIncomeTransactions.Tue.reduce((a, b) => a + b), weeklyIncomeTransactions.Wed.reduce((a, b) => a + b), weeklyIncomeTransactions.Thu.reduce((a, b) => a + b), weeklyIncomeTransactions.Fri.reduce((a, b) => a + b), weeklyIncomeTransactions.Sat.reduce((a, b) => a + b), weeklyIncomeTransactions.Sun.reduce((a, b) => a + b)],
        backgroundColor: 'green',
        borderColor: "green",
        tension: 0.1
    };


    var allData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [incomeData, expenseData]
    };
    const data2 = {
        datasets: [
            {
                label: "Monday",
                data: [weeklyIncomeTransactions.Mon.reduce((a, b) => a + b), weeklyExpenseTransactions.Mon.reduce((a, b) => a + b)],
                labels: ["Income", "Expense"],
                backgroundColor: [
                    "green",
                    "red",
                ]
            },
            {
                label: "Tuesday",
                data: [weeklyIncomeTransactions.Tue.reduce((a, b) => a + b), weeklyExpenseTransactions.Tue.reduce((a, b) => a + b)],
                labels: ["Income", "Expense"],
                backgroundColor: [
                    "green",
                    "red"
                ]
            },
            {
                label: "Wednesday",
                data: [weeklyIncomeTransactions.Wed.reduce((a, b) => a + b), weeklyExpenseTransactions.Wed.reduce((a, b) => a + b)],
                labels: ["Income", "Expense"],
                backgroundColor: [
                    "green",
                    "red"
                ]
            },
            {
                label: "Thursday",
                data: [weeklyIncomeTransactions.Thu.reduce((a, b) => a + b), weeklyExpenseTransactions.Thu.reduce((a, b) => a + b)],
                labels: ["Income", "Expense"],
                backgroundColor: [
                    "green",
                    "red"
                ]
            },
            {
                label: "Friday",
                data: [weeklyIncomeTransactions.Fri.reduce((a, b) => a + b), weeklyExpenseTransactions.Fri.reduce((a, b) => a + b)],
                labels: ["Income", "Expense"],
                backgroundColor: [
                    "green",
                    "red"
                ]
            },
            {
                label: "Saturday",
                data: [weeklyIncomeTransactions.Sat.reduce((a, b) => a + b), weeklyExpenseTransactions.Sat.reduce((a, b) => a + b)],
                labels: ["Income", "Expense"],
                backgroundColor: [
                    "green",
                    "red"
                ]
            },
            {
                label: "Sunday",
                data: [weeklyIncomeTransactions.Sun.reduce((a, b) => a + b), weeklyExpenseTransactions.Sun.reduce((a, b) => a + b)],
                labels: ["Income", "Expense"],
                backgroundColor: [
                    "green",
                    "red"
                ]
            },
        ]
    }

    const options2 = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (item) {
                        return item.dataset.label + ": " + item.dataset.labels[item.dataIndex] + ": " + item.parsed
                    }
                }
            }
        },
    }



    return (
        <div className="statisticsDialyWrapper">
            <div className="topSide">
                <div className="chart">
                    <Bar data={allData} options={{}} />
                </div>
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <td>Day</td>
                                <td>Income</td>
                                <td>Expense</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Monday</td>
                                <td>{weeklyIncomeTransactions.Mon.reduce((a, b) => a + b)}</td>
                                <td>{weeklyExpenseTransactions.Mon.reduce((a, b) => a + b)}</td>
                            </tr>
                            <tr>
                                <td>Tuesday</td>
                                <td>{weeklyIncomeTransactions.Tue.reduce((a, b) => a + b)}</td>
                                <td>{weeklyExpenseTransactions.Tue.reduce((a, b) => a + b)}</td>
                            </tr>
                            <tr>
                                <td>Wednesday</td>
                                <td>{weeklyIncomeTransactions.Wed.reduce((a, b) => a + b)}</td>
                                <td>{weeklyExpenseTransactions.Wed.reduce((a, b) => a + b)}</td>
                            </tr>
                            <tr>
                                <td>Thursday</td>
                                <td>{weeklyIncomeTransactions.Thu.reduce((a, b) => a + b)}</td>
                                <td>{weeklyExpenseTransactions.Thu.reduce((a, b) => a + b)}</td>
                            </tr>
                            <tr>
                                <td>Friday</td>
                                <td>{weeklyIncomeTransactions.Fri.reduce((a, b) => a + b)}</td>
                                <td>{weeklyExpenseTransactions.Fri.reduce((a, b) => a + b)}</td>
                            </tr>
                            <tr>
                                <td>Saturday</td>
                                <td>{weeklyIncomeTransactions.Sat.reduce((a, b) => a + b)}</td>
                                <td>{weeklyExpenseTransactions.Sat.reduce((a, b) => a + b)}</td>
                            </tr>
                            <tr>
                                <td>Sunday</td>
                                <td>{weeklyIncomeTransactions.Sun.reduce((a, b) => a + b)}</td>
                                <td>{weeklyExpenseTransactions.Sun.reduce((a, b) => a + b)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="bottomSide">
                <div className="leftSide">
                    <Line data={allData} options={{}} />
                </div>
                <div className="rightSide">
                    <Doughnut data={data2} options={options2} />
                </div>
            </div>
        </div>
    );
};

export default StatisticsWeeky;