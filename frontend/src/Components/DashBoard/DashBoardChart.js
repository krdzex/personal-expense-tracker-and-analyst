import React, { useCallback, useEffect, useState } from 'react';
import { Chart, Doughnut } from "react-chartjs-2"
import { getAllTransactions } from '../../apiService/transactionsApi';
import authHelper from '../../auth/authHelper';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { addTotalBalance } from '../../Actions';
import { useDispatch, useSelector } from 'react-redux';
const DashBoardChart = () => {

    const dispatch = useDispatch()
    Chart.register(ChartDataLabels);
    const [data, setData] = useState({})
    const totalBalance = useSelector(state => state.balanceReducer)
    const succes = useSelector(state => state.transactionsReducer)
    const currency = useSelector(state => state.currencyReducer)
    const getData = useCallback(async () => {
        getAllTransactions(authHelper.isAuthentcated().user._id).then(response => {
            for (let i in response) {

                if (response[i].currency === "dollar" && currency === "euro") {

                    response[i].amount = Math.round(response[i].amount * 0.86)
                }
                if (response[i].currency === "dollar" && currency === "bam") {

                    response[i].amount = Math.round(response[i].amount / 0.59)
                }
                if (response[i].currency === "bam" && currency === "euro") {

                    response[i].amount = Math.round(response[i].amount / 1.95)
                }
                if (response[i].currency === "bam" && currency === "dollar") {

                    response[i].amount = Math.round(response[i].amount * 0.59)
                }
                if (response[i].currency === "euro" && currency === "bam") {

                    response[i].amount = Math.round(response[i].amount * 1.95)
                }
                if (response[i].currency === "euro" && currency === "dollar") {

                    response[i].amount = Math.round(response[i].amount / 0.86)
                }
            }
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
            setData({
                labels: ['Income', 'Expense'],
                datasets: [
                    {
                        data: [allIncome, allExpense],

                        backgroundColor: [
                            'rgb(17, 140, 79)',
                            'rgb(255, 0, 0)'
                        ],
                        hoverOffset: 4
                    }
                ]
            })
        }
        ).catch(reason => console.log(reason))
    }, [dispatch, currency])


    useEffect(() => {
        getData();
    }, [getData, succes, currency])


    const options = {
        plugins: {
            datalabels: {
                font: { weight: "bold", size: 20 },
                color: '#fff',
            }
        },
        responsive: true,
    }




    return (
        <div className="dashBoardChart">
            <div className="cart">
                <Doughnut data={data} options={options} className="circle" />
                <div className="middle">
                    <p>Total balance:</p>
                    <span style={{ display: "flex", justifyContent: "center", alignItems: "baseline" }}>{totalBalance}{currency === "dollar" ? <div style={{ fontSize: "40px" }}>$</div> : currency === "euro" ? <div style={{ fontSize: "40px" }}>€</div> : <div style={{ fontSize: "12px" }}>bam</div>}</span>
                </div>
            </div>
        </div>
    );
};

export default DashBoardChart;