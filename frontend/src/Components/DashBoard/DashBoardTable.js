import React, { useEffect, useState } from 'react';
import { getAllTransactions } from '../../apiService/transactionsApi';
import moment from 'moment';
import authHelper from '../../auth/authHelper';
import { useSelector } from 'react-redux';

const DashBoardTable = () => {
    const currency = useSelector(state => state.currencyReducer)
    const [allTransactions, setAllTransactions] = useState([])
    const [timeDiff, setTimeDiff] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
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
            setAllTransactions(response)
            for (let i in response) {

                let createdTime = moment(response[i].created)
                let timeNow = moment(Date.now())
                let timeDifferenceSacconds = timeNow.diff(createdTime, "seconds")
                let timeDifferenceMinutes = timeNow.diff(createdTime, "minutes")
                let timeDifferenceHours = timeNow.diff(createdTime, "hours")
                let timeDifferenceDays = timeNow.diff(createdTime, "days")

                if (timeDifferenceSacconds < 60) {
                    setTimeDiff(timeDiff => [...timeDiff, { time: timeDifferenceSacconds, type: "seconds" }])
                    continue
                }
                if (timeDifferenceMinutes < 60) {
                    setTimeDiff(timeDiff => [...timeDiff, { time: timeDifferenceMinutes, type: "minutes" }])
                    continue
                }
                if (timeDifferenceHours < 24) {
                    setTimeDiff(timeDiff => [...timeDiff, { time: timeDifferenceHours, type: "hours" }])
                    continue
                }
                if (timeDifferenceDays < 365) {
                    setTimeDiff(timeDiff => [...timeDiff, { time: timeDifferenceDays, type: "days" }])
                    continue
                }
            }
            setLoading(true)
        }
        )
    }, [currency])
    return (
        <div className="dashBoardTable">
            <table>
                <thead>
                    <tr>
                        <td>Reason</td>
                        <td>Date</td>
                        <td>Amount</td>
                        <td>Type</td>
                    </tr>
                </thead>
                {loading && (<tbody>
                    {allTransactions.map((transaction, id) => (
                        <tr key={id}>
                            <td>{transaction.title}</td>
                            <td>{timeDiff[id].time + " " + timeDiff[id].type} ago</td>
                            <td>{transaction.type === "expense" ? "-" : "+"}{transaction.amount}{currency === "dollar" ? "$" : currency === "euro" ? "€" : "bam"}</td>
                            <td><span className={transaction.type === "expense" ? "expense" : "income"}>{transaction.type}</span></td>
                        </tr>
                    )
                    )}

                </tbody>)}
            </table>
        </div>
    );
};

export default DashBoardTable;