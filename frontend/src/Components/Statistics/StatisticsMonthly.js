import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Bar, Doughnut, Line } from "react-chartjs-2"
import { useSelector } from 'react-redux';
import { getYearlyExpenseTransactions, getYearlyIncomeTransactions } from '../../apiService/transactionsApi';
import authHelper from '../../auth/authHelper';

const StatisticsMonthly = () => {



    const currency = useSelector(state => state.currencyReducer)

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


    const [loading, setLoading] = useState(true)
    const [weeksIncome, setWeeksIncome] = useState({
        1: [0],
        2: [0],
        3: [0],
        4: [0],
        5: [0]
    })
    const [weeksExpense, setWeeksExpense] = useState({
        1: [0],
        2: [0],
        3: [0],
        4: [0],
        5: [0]
    })
    const [monthlyExpenseTransactions, setMonthlyExpenseTransactions] = useState({
        Jan: [0],
        Feb: [0],
        Mar: [0],
        Apr: [0],
        May: [0],
        Jun: [0],
        Jul: [0],
        Aug: [0],
        Sep: [0],
        Oct: [0],
        Nov: [0],
        Dec: [0]
    })

    const [monthlyIncomeTransactions, setMonthlyIncomeTransactions] = useState({
        Jan: [0],
        Feb: [0],
        Mar: [0],
        Apr: [0],
        May: [0],
        Jun: [0],
        Jul: [0],
        Aug: [0],
        Sep: [0],
        Oct: [0],
        Nov: [0],
        Dec: [0]
    })
    useEffect(() => {
        setMonthlyIncomeTransactions({
            Jan: [0],
            Feb: [0],
            Mar: [0],
            Apr: [0],
            May: [0],
            Jun: [0],
            Jul: [0],
            Aug: [0],
            Sep: [0],
            Oct: [0],
            Nov: [0],
            Dec: [0]
        })
        setMonthlyExpenseTransactions({
            Jan: [0],
            Feb: [0],
            Mar: [0],
            Apr: [0],
            May: [0],
            Jun: [0],
            Jul: [0],
            Aug: [0],
            Sep: [0],
            Oct: [0],
            Nov: [0],
            Dec: [0]
        })
        setWeeksExpense({
            1: [0],
            2: [0],
            3: [0],
            4: [0],
            5: [0]
        })
        setWeeksIncome({
            1: [0],
            2: [0],
            3: [0],
            4: [0],
            5: [0]
        })
        getData()
    }, [currency])

    const getData = async () => {
        let values = []
        let valuesTwo = []
        let incomes = []
        let expense = []
        await getYearlyExpenseTransactions(authHelper.isAuthentcated().user._id).then(response => {
            response = changeCurrency(response)
            expense = response;
            response.forEach(transaction => {
                let month = moment(transaction.created).format("MMM");
                if (values[0] !== month) {
                    values.push(month)
                }
                setMonthlyExpenseTransactions(prevState => ({ ...prevState, [month]: [...prevState[month], transaction.amount] }))
            });
        }).catch(reason => console.log(reason))
        await getYearlyIncomeTransactions(authHelper.isAuthentcated().user._id).then(response => {
            response = changeCurrency(response)
            incomes = response;
            response.forEach(transaction => {
                let month = moment(transaction.created).format("MMM");
                if (valuesTwo[0] !== month) {
                    valuesTwo.push(month)
                }
                setMonthlyIncomeTransactions(prevState => ({ ...prevState, [month]: [...prevState[month], transaction.amount] }))
            });
        }).catch(reason => console.log(reason))
        if (((values.length === 1 && valuesTwo.length === 0) || (values.length === 0 && valuesTwo.length === 1)) || ((values.length === 1 && valuesTwo.length === 1) && values[0] === valuesTwo[0])) {
            expense.forEach(transaction => {
                let week = moment(transaction.created).isoWeek() - moment(transaction.created).startOf('month').isoWeek() + 1;
                setWeeksExpense(prevState => ({ ...prevState, [week]: [...prevState[week], transaction.amount] }))
            });
            incomes.forEach(transaction => {
                let week = moment(transaction.created).isoWeek() - moment(transaction.created).startOf('month').isoWeek() + 1;
                setWeeksIncome(prevState => ({ ...prevState, [week]: [...prevState[week], transaction.amount] }))
            });
            setSingleMonth(true)
        } else {
            setSingleMonth(false)
        }
        setLoading(false)
    }
    const [singleMonth, setSingleMonth] = useState(false)
    var incomeData = singleMonth ?
        {
            label: 'Income',
            data: [
                weeksIncome[1].reduce((a, b) => a + b), weeksIncome[2].reduce((a, b) => a + b),
                weeksIncome[3].reduce((a, b) => a + b), weeksIncome[4].reduce((a, b) => a + b),
                weeksIncome[5].reduce((a, b) => a + b)
            ],
            backgroundColor: 'green',
            borderColor: "green",
            tension: 0.1
        }
        :
        {
            label: 'Income',
            data: [
                monthlyIncomeTransactions.Jan.reduce((a, b) => a + b), monthlyIncomeTransactions.Feb.reduce((a, b) => a + b),
                monthlyIncomeTransactions.Mar.reduce((a, b) => a + b), monthlyIncomeTransactions.Apr.reduce((a, b) => a + b),
                monthlyIncomeTransactions.May.reduce((a, b) => a + b), monthlyIncomeTransactions.Jun.reduce((a, b) => a + b),
                monthlyIncomeTransactions.Jul.reduce((a, b) => a + b), monthlyIncomeTransactions.Aug.reduce((a, b) => a + b),
                monthlyIncomeTransactions.Sep.reduce((a, b) => a + b), monthlyIncomeTransactions.Oct.reduce((a, b) => a + b),
                monthlyIncomeTransactions.Nov.reduce((a, b) => a + b), monthlyIncomeTransactions.Dec.reduce((a, b) => a + b),
            ],
            backgroundColor: 'green',
            borderColor: "green",
            tension: 0.1
        };
    var expenseData = singleMonth ?

        {
            label: 'Expense',
            data: [
                weeksExpense[1].reduce((a, b) => a + b), weeksExpense[2].reduce((a, b) => a + b),
                weeksExpense[3].reduce((a, b) => a + b), weeksExpense[4].reduce((a, b) => a + b),
                weeksExpense[5].reduce((a, b) => a + b)
            ],
            backgroundColor: 'red',
            borderColor: "red",
            tension: 0.1

        } : {
            label: 'Expense',
            data:
                [
                    monthlyExpenseTransactions.Jan.reduce((a, b) => a + b), monthlyExpenseTransactions.Feb.reduce((a, b) => a + b),
                    monthlyExpenseTransactions.Mar.reduce((a, b) => a + b), monthlyExpenseTransactions.Apr.reduce((a, b) => a + b),
                    monthlyExpenseTransactions.May.reduce((a, b) => a + b), monthlyExpenseTransactions.Jun.reduce((a, b) => a + b),
                    monthlyExpenseTransactions.Jul.reduce((a, b) => a + b), monthlyExpenseTransactions.Aug.reduce((a, b) => a + b),
                    monthlyExpenseTransactions.Sep.reduce((a, b) => a + b), monthlyExpenseTransactions.Oct.reduce((a, b) => a + b),
                    monthlyExpenseTransactions.Nov.reduce((a, b) => a + b), monthlyExpenseTransactions.Dec.reduce((a, b) => a + b),
                ],
            backgroundColor: 'red',
            borderColor: "red",
            tension: 0.1
        };


    var allData = singleMonth ? {
        labels: ["Week1", "Week2", "Week3", "Week4", "Week5"],
        datasets: [incomeData, expenseData]
    } : {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [incomeData, expenseData]
    };

    const data2 = singleMonth ?
        {
            datasets: [
                {
                    label: "Week1",
                    data: [weeksIncome[1].reduce((a, b) => a + b), weeksExpense[1].reduce((a, b) => a + b)],
                    labels: ["Income", "Expense"],
                    backgroundColor: [
                        "green",
                        "red",
                    ]
                },
                {
                    label: "Week2",
                    data: [weeksIncome[2].reduce((a, b) => a + b), weeksExpense[2].reduce((a, b) => a + b)],
                    labels: ["Income", "Expense"],
                    backgroundColor: [
                        "green",
                        "red",
                    ]
                },
                {
                    label: "Week3",
                    data: [weeksIncome[3].reduce((a, b) => a + b), weeksExpense[3].reduce((a, b) => a + b)],
                    labels: ["Income", "Expense"],
                    backgroundColor: [
                        "green",
                        "red",
                    ]
                },
                {
                    label: "Week4",
                    data: [weeksIncome[4].reduce((a, b) => a + b), weeksExpense[4].reduce((a, b) => a + b)],
                    labels: ["Income", "Expense"],
                    backgroundColor: [
                        "green",
                        "red",
                    ]
                },
                {
                    label: "Week5",
                    data: [weeksIncome[5].reduce((a, b) => a + b), weeksExpense[5].reduce((a, b) => a + b)],
                    labels: ["Income", "Expense"],
                    backgroundColor: [
                        "green",
                        "red",
                    ]
                },
            ],
        }
        :

        {
            datasets: [
                {
                    label: "January",
                    data: [monthlyIncomeTransactions.Jan.reduce((a, b) => a + b), monthlyExpenseTransactions.Jan.reduce((a, b) => a + b),],
                    labels: ["Income", "Expense"],
                    backgroundColor: [
                        "green",
                        "red",
                    ]
                },
                {
                    label: "February",
                    data: [monthlyIncomeTransactions.Feb.reduce((a, b) => a + b), monthlyExpenseTransactions.Feb.reduce((a, b) => a + b),],
                    labels: ["Income", "Expense"],
                    backgroundColor: [
                        "green",
                        "red"
                    ]
                },
                {
                    label: "March",
                    data: [monthlyIncomeTransactions.Mar.reduce((a, b) => a + b), monthlyExpenseTransactions.Mar.reduce((a, b) => a + b),],
                    labels: ["Income", "Expense"],
                    backgroundColor: [
                        "green",
                        "red"
                    ]
                },
                {
                    label: "April",
                    data: [monthlyIncomeTransactions.Apr.reduce((a, b) => a + b), monthlyExpenseTransactions.Apr.reduce((a, b) => a + b),],
                    labels: ["Income", "Expense"],
                    backgroundColor: [
                        "green",
                        "red"
                    ]
                },
                {
                    label: "May",
                    data: [monthlyIncomeTransactions.May.reduce((a, b) => a + b), monthlyExpenseTransactions.May.reduce((a, b) => a + b),],
                    labels: ["Income", "Expense"],
                    backgroundColor: [
                        "green",
                        "red"
                    ]
                },
                {
                    label: "Jun",
                    data: [monthlyIncomeTransactions.Jun.reduce((a, b) => a + b), monthlyExpenseTransactions.Jun.reduce((a, b) => a + b),],
                    labels: ["Income", "Expense"],
                    backgroundColor: [
                        "green",
                        "red"
                    ]
                },
                {
                    label: "July",
                    data: [monthlyIncomeTransactions.Jul.reduce((a, b) => a + b), monthlyExpenseTransactions.Jul.reduce((a, b) => a + b),],
                    labels: ["Income", "Expense"],
                    backgroundColor: [
                        "green",
                        "red"
                    ]
                },
                {
                    label: "August",
                    data: [monthlyIncomeTransactions.Aug.reduce((a, b) => a + b), monthlyExpenseTransactions.Aug.reduce((a, b) => a + b),],
                    labels: ["Income", "Expense"],
                    backgroundColor: [
                        "green",
                        "red"
                    ]
                },
                {
                    label: "September",
                    data: [monthlyIncomeTransactions.Sep.reduce((a, b) => a + b), monthlyExpenseTransactions.Sep.reduce((a, b) => a + b),],
                    labels: ["Income", "Expense"],
                    backgroundColor: [
                        "green",
                        "red"
                    ]
                },
                {
                    label: "October",
                    data: [monthlyIncomeTransactions.Oct.reduce((a, b) => a + b), monthlyExpenseTransactions.Oct.reduce((a, b) => a + b),],
                    labels: ["Income", "Expense"],
                    backgroundColor: [
                        "green",
                        "red"
                    ]
                },
                {
                    label: "November",
                    data: [monthlyIncomeTransactions.Nov.reduce((a, b) => a + b), monthlyExpenseTransactions.Nov.reduce((a, b) => a + b),],
                    labels: ["Income", "Expense"],
                    backgroundColor: [
                        "green",
                        "red"
                    ]
                },
                {
                    label: "December",
                    data: [monthlyIncomeTransactions.Dec.reduce((a, b) => a + b), monthlyExpenseTransactions.Dec.reduce((a, b) => a + b),],
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
                        console.log(item)
                        return item.dataset.label + ": " + item.dataset.labels[item.dataIndex] + ": " + item.parsed
                    }
                }
            }
        },
    }


    return (
        <div className="statisticsDialyWrapper">
            {!loading && (<div className="topSide">
                <div className="chart">
                    {!loading && (<Bar data={allData} options={{}} />)}
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
                        {singleMonth ?
                            <tbody>
                                <tr>
                                    <td>Week1</td>
                                    <td>{weeksIncome[1].reduce((a, b) => a + b)}</td>
                                    <td>{weeksExpense[1].reduce((a, b) => a + b)}</td>
                                </tr>
                                <tr>
                                    <td>Week2</td>
                                    <td>{weeksIncome[2].reduce((a, b) => a + b)}</td>
                                    <td>{weeksExpense[2].reduce((a, b) => a + b)}</td>
                                </tr>
                                <tr>
                                    <td>Week3</td>
                                    <td>{weeksIncome[3].reduce((a, b) => a + b)}</td>
                                    <td>{weeksExpense[3].reduce((a, b) => a + b)}</td>
                                </tr>
                                <tr>
                                    <td>Week4</td>
                                    <td>{weeksIncome[4].reduce((a, b) => a + b)}</td>
                                    <td>{weeksExpense[4].reduce((a, b) => a + b)}</td>
                                </tr>
                                <tr>
                                    <td>Week5</td>
                                    <td>{weeksIncome[5].reduce((a, b) => a + b)}</td>
                                    <td>{weeksExpense[5].reduce((a, b) => a + b)}</td>
                                </tr>
                            </tbody>
                            : <tbody>
                                <tr>
                                    <td>January</td>
                                    <td>{monthlyIncomeTransactions.Jan.reduce((a, b) => a + b)}</td>
                                    <td>{monthlyExpenseTransactions.Jan.reduce((a, b) => a + b)}</td>
                                </tr>
                                <tr>
                                    <td>February</td>
                                    <td>{monthlyIncomeTransactions.Feb.reduce((a, b) => a + b)}</td>
                                    <td>{monthlyExpenseTransactions.Feb.reduce((a, b) => a + b)}</td>
                                </tr>
                                <tr>
                                    <td>March</td>
                                    <td>{monthlyIncomeTransactions.Mar.reduce((a, b) => a + b)}</td>
                                    <td>{monthlyExpenseTransactions.Mar.reduce((a, b) => a + b)}</td>
                                </tr>
                                <tr>
                                    <td>April</td>
                                    <td>{monthlyIncomeTransactions.Mar.reduce((a, b) => a + b)}</td>
                                    <td>{monthlyExpenseTransactions.Mar.reduce((a, b) => a + b)}</td>
                                </tr>
                                <tr>
                                    <td>May</td>
                                    <td>{monthlyIncomeTransactions.Mar.reduce((a, b) => a + b)}</td>
                                    <td>{monthlyExpenseTransactions.Mar.reduce((a, b) => a + b)}</td>
                                </tr>
                                <tr>
                                    <td>June</td>
                                    <td>{monthlyIncomeTransactions.Mar.reduce((a, b) => a + b)}</td>
                                    <td>{monthlyExpenseTransactions.Mar.reduce((a, b) => a + b)}</td>
                                </tr>
                                <tr>
                                    <td>July</td>
                                    <td>{monthlyIncomeTransactions.Mar.reduce((a, b) => a + b)}</td>
                                    <td>{monthlyExpenseTransactions.Mar.reduce((a, b) => a + b)}</td>
                                </tr>
                                <tr>
                                    <td>August</td>
                                    <td>{monthlyIncomeTransactions.Mar.reduce((a, b) => a + b)}</td>
                                    <td>{monthlyExpenseTransactions.Mar.reduce((a, b) => a + b)}</td>
                                </tr>
                                <tr>
                                    <td>September</td>
                                    <td>{monthlyIncomeTransactions.Mar.reduce((a, b) => a + b)}</td>
                                    <td>{monthlyExpenseTransactions.Mar.reduce((a, b) => a + b)}</td>
                                </tr>
                                <tr>
                                    <td>October</td>
                                    <td>{monthlyIncomeTransactions.Mar.reduce((a, b) => a + b)}</td>
                                    <td>{monthlyExpenseTransactions.Mar.reduce((a, b) => a + b)}</td>
                                </tr>
                                <tr>
                                    <td>November</td>
                                    <td>{monthlyIncomeTransactions.Mar.reduce((a, b) => a + b)}</td>
                                    <td>{monthlyExpenseTransactions.Mar.reduce((a, b) => a + b)}</td>
                                </tr>
                                <tr>
                                    <td>December</td>
                                    <td>{monthlyIncomeTransactions.Mar.reduce((a, b) => a + b)}</td>
                                    <td>{monthlyExpenseTransactions.Mar.reduce((a, b) => a + b)}</td>
                                </tr>
                            </tbody>}
                    </table>
                </div>
            </div>)}
            {!loading && (<div className="bottomSide">
                <div className="leftSide">
                    <Line data={allData} options={{}} />
                </div>
                <div className="rightSide">
                    <Doughnut data={data2} options={options2} />
                </div>
            </div>)}
        </div>
    );
};

export default StatisticsMonthly;