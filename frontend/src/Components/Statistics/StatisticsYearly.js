import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Bar, Doughnut, Line } from "react-chartjs-2"
import { useSelector } from 'react-redux';
import { getYearlyExpenseTransactions, getYearlyIncomeTransactions } from '../../apiService/transactionsApi';
import authHelper from '../../auth/authHelper';

const StatisticsYearly = () => {





    const currency = useSelector(state => state.currencyReducer)
    const [yearlyExpenseTransactions, setYearlyExpenseTransactions] = useState({
        2021: [0],
        2022: [0],
        2023: [0],
        2024: [0],
        2025: [0],
        2026: [0],
        2027: [0],
        2028: [0],
        2029: [0],
        2030: [0]
    })
    const [yearlyIncomeTransactions, setYearlyIncomeTransactions] = useState({
        2021: [0],
        2022: [0],
        2023: [0],
        2024: [0],
        2025: [0],
        2026: [0],
        2027: [0],
        2028: [0],
        2029: [0],
        2030: [0]
    })

    useEffect(() => {
        setYearlyExpenseTransactions({
            2021: [0],
            2022: [0],
            2023: [0],
            2024: [0],
            2025: [0],
            2026: [0],
            2027: [0],
            2028: [0],
            2029: [0],
            2030: [0]
        })
        setYearlyIncomeTransactions({
            2021: [0],
            2022: [0],
            2023: [0],
            2024: [0],
            2025: [0],
            2026: [0],
            2027: [0],
            2028: [0],
            2029: [0],
            2030: [0]
        })
        getData()
    }, [currency])


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


    const getData = async () => {
        await getYearlyExpenseTransactions(authHelper.isAuthentcated().user._id).then(response => {
            response = changeCurrency(response)
            response.forEach(transaction => {
                let year = moment(transaction.created).year();
                setYearlyExpenseTransactions(prevState => ({ ...prevState, [year]: [...prevState[year], transaction.amount] }))
            });
        }).catch(reason => console.log(reason))
        await getYearlyIncomeTransactions(authHelper.isAuthentcated().user._id).then(response => {
            response = changeCurrency(response)
            response.forEach(transaction => {
                let year = moment(transaction.created).year();
                setYearlyIncomeTransactions(prevState => ({ ...prevState, [year]: [...prevState[year], transaction.amount] }))
            });
        }).catch(reason => console.log(reason))
    }
    var incomeData = {
        label: 'Income',
        data: [
            yearlyIncomeTransactions[2021].reduce((a, b) => a + b), yearlyIncomeTransactions[2022].reduce((a, b) => a + b), yearlyIncomeTransactions[2023].reduce((a, b) => a + b), yearlyIncomeTransactions[2024].reduce((a, b) => a + b),
            yearlyIncomeTransactions[2025].reduce((a, b) => a + b), yearlyIncomeTransactions[2026].reduce((a, b) => a + b), yearlyIncomeTransactions[2027].reduce((a, b) => a + b),
            yearlyIncomeTransactions[2028].reduce((a, b) => a + b), yearlyIncomeTransactions[2029].reduce((a, b) => a + b), yearlyIncomeTransactions[2029].reduce((a, b) => a + b), yearlyIncomeTransactions[2030].reduce((a, b) => a + b)
        ],
        backgroundColor: 'green',
        borderColor: "green",
        tension: 0.1
    };
    var expenseData = {
        label: 'Expense',
        data: [
            yearlyExpenseTransactions[2021].reduce((a, b) => a + b), yearlyExpenseTransactions[2022].reduce((a, b) => a + b), yearlyExpenseTransactions[2023].reduce((a, b) => a + b), yearlyExpenseTransactions[2024].reduce((a, b) => a + b),
            yearlyExpenseTransactions[2025].reduce((a, b) => a + b), yearlyExpenseTransactions[2026].reduce((a, b) => a + b), yearlyExpenseTransactions[2027].reduce((a, b) => a + b),
            yearlyExpenseTransactions[2028].reduce((a, b) => a + b), yearlyExpenseTransactions[2029].reduce((a, b) => a + b), yearlyExpenseTransactions[2029].reduce((a, b) => a + b), yearlyExpenseTransactions[2030].reduce((a, b) => a + b)
        ],
        backgroundColor: 'red',
        borderColor: "red",
        tension: 0.1
    };


    var allData = {
        labels: [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
        datasets: [incomeData, expenseData]
    };

    const data2 = {
        datasets: [
            {
                label: "2021",
                data: [yearlyIncomeTransactions[2021].reduce((a, b) => a + b), yearlyExpenseTransactions[2021].reduce((a, b) => a + b)],
                labels: ["Income", "Expense"],
                backgroundColor: [
                    "green",
                    "red",
                ]
            },
            {
                label: "2022",
                data: [yearlyIncomeTransactions[2022].reduce((a, b) => a + b), yearlyExpenseTransactions[2022].reduce((a, b) => a + b)],
                labels: ["Income", "Expense"],
                backgroundColor: [
                    "#79CAF2",
                    "#80DEEA"
                ]
            },
            {
                label: "2023",
                data: [yearlyIncomeTransactions[2023].reduce((a, b) => a + b), yearlyExpenseTransactions[2023].reduce((a, b) => a + b)],
                labels: ["Income", "Expense"],
                backgroundColor: [
                    "#79CAF2",
                    "#80DEEA"
                ]
            },
            {
                label: "2024",
                data: [yearlyIncomeTransactions[2024].reduce((a, b) => a + b), yearlyExpenseTransactions[2024].reduce((a, b) => a + b)],
                labels: ["Income", "Expense"],
                backgroundColor: [
                    "#79CAF2",
                    "#80DEEA"
                ]
            },
            {
                label: "2025",
                data: [yearlyIncomeTransactions[2025].reduce((a, b) => a + b), yearlyExpenseTransactions[2025].reduce((a, b) => a + b)],
                labels: ["Income", "Expense"],
                backgroundColor: [
                    "#79CAF2",
                    "#80DEEA"
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
                                <td>2021</td>
                                <td>{yearlyIncomeTransactions[2021].reduce((a, b) => a + b)}</td>
                                <td>{yearlyExpenseTransactions[2021].reduce((a, b) => a + b)}</td>
                            </tr>
                            <tr>
                                <td>2022</td>
                                <td>{yearlyIncomeTransactions[2022].reduce((a, b) => a + b)}</td>
                                <td>{yearlyExpenseTransactions[2022].reduce((a, b) => a + b)}</td>
                            </tr>
                            <tr>
                                <td>2023</td>
                                <td>{yearlyIncomeTransactions[2023].reduce((a, b) => a + b)}</td>
                                <td>{yearlyExpenseTransactions[2023].reduce((a, b) => a + b)}</td>
                            </tr>
                            <tr>
                                <td>2024</td>
                                <td>{yearlyIncomeTransactions[2024].reduce((a, b) => a + b)}</td>
                                <td>{yearlyExpenseTransactions[2024].reduce((a, b) => a + b)}</td>
                            </tr>
                            <tr>
                                <td>2025</td>
                                <td>{yearlyIncomeTransactions[2025].reduce((a, b) => a + b)}</td>
                                <td>{yearlyExpenseTransactions[2025].reduce((a, b) => a + b)}</td>
                            </tr>
                            <tr>
                                <td>2026</td>
                                <td>{yearlyIncomeTransactions[2026].reduce((a, b) => a + b)}</td>
                                <td>{yearlyExpenseTransactions[2026].reduce((a, b) => a + b)}</td>
                            </tr>
                            <tr>
                                <td>2027</td>
                                <td>{yearlyIncomeTransactions[2027].reduce((a, b) => a + b)}</td>
                                <td>{yearlyExpenseTransactions[2027].reduce((a, b) => a + b)}</td>
                            </tr>
                            <tr>
                                <td>2028</td>
                                <td>{yearlyIncomeTransactions[2028].reduce((a, b) => a + b)}</td>
                                <td>{yearlyExpenseTransactions[2028].reduce((a, b) => a + b)}</td>
                            </tr>
                            <tr>
                                <td>2029</td>
                                <td>{yearlyIncomeTransactions[2029].reduce((a, b) => a + b)}</td>
                                <td>{yearlyExpenseTransactions[2029].reduce((a, b) => a + b)}</td>
                            </tr>
                            <tr>
                                <td>2030</td>
                                <td>{yearlyIncomeTransactions[2030].reduce((a, b) => a + b)}</td>
                                <td>{yearlyExpenseTransactions[2030].reduce((a, b) => a + b)}</td>
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
                    asdasd
                    <Doughnut data={data2} options={options2} />
                </div>
            </div>
        </div>
    );
};


export default StatisticsYearly;