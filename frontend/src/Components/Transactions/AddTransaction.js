import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { change } from '../../Actions';
import { addNewTransaction } from '../../apiService/transactionsApi';
import authHelper from '../../auth/authHelper';

const AddTransaction = () => {
    const dispatch = useDispatch()
    const [firstTime, setFirstTime] = useState(true)
    const [activeForm, setActiveForm] = useState("expense");
    const [succes, setSucces] = useState(false)
    const onClickHeader = (name) => {

        setActiveForm(name)
    }
    const [currency, setCurrency] = useState("dollar")
    const onCurrencyClick = (currency) => {
        setCurrency(currency)
    }

    const [errors, setErrors] = useState({})
    const onSubmit = (e) => {
        e.preventDefault();
        let transaction = {
            title: values.title || undefined,
            amount: values.amount || undefined,
            currency: currency,
            type: activeForm,
            creator: authHelper.isAuthentcated().user._id
        }
        addNewTransaction(transaction).then(response => {
            if (!response.message) {
                setErrors(response)
            } else {
                setSucces(true)
                dispatch(change())
            }
            if (firstTime) {
                document.getElementById("form").className += " afterFirst"
                setFirstTime(false)
            }
        }).catch(reason => console.log(reason))
    }


    const [values, setValues] = useState({
        title: "",
        amount: ""
    })

    const onChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const onOkClick = () => {
        setSucces(false);
        setValues({
            title: "",
            amount: ""
        })
        setErrors({})
    }
    return (
        <div className={activeForm === "expense" ? "righSide expense" : "righSide income"}>
            {!succes && (<div className="incomeExpenseButtons">
                <div className="expense" onClick={() => onClickHeader("expense")}>
                    <p>Expense </p>
                </div>
                <div className="income" onClick={() => onClickHeader("income")}>
                    <p>Income</p>
                </div>
            </div>)}
            <div className={!succes ? "formWrapper" : "formWrapper succes"}>
                {
                    !succes ?
                        <div className="form" id="form">
                            <form onSubmit={onSubmit}>
                                {activeForm === "expense" ? <h3>Adding expense transaction</h3> : <h3>Adding income transaction</h3>}
                                <input type="text" placeholder="title" className={errors.title ? "error" : "success"} value={values.title} onChange={onChange("title")} />
                                {errors.title && (<span>{errors.title}</span>)}
                                <input type="number" min={1} className={errors.amount ? "error" : "success"} placeholder="Amount" value={values.amount} onChange={onChange("amount")} />
                                {errors.amount && (<span>{errors.amount}</span>)}
                                <div className="currencyWrapper">
                                    <div className={currency === "dollar" ? "dollar active" : "dollar"} onClick={() => onCurrencyClick("dollar")}><Icon icon="bx:bx-dollar" /></div>
                                    <div className={currency === "bam" ? "bam active" : "bam"} onClick={() => onCurrencyClick("bam")}>BAM</div>
                                    <div className={currency === "euro" ? "euro active" : "euro"} onClick={() => onCurrencyClick("euro")}><Icon icon="ic:twotone-euro-symbol" /></div>
                                </div>
                                <input type="submit" />
                            </form>
                        </div> :
                        <div className="successTransaction">
                            <div className="icon">
                                <Icon icon="el:ok-circle" className="realIcon" />
                            </div>
                            <p>Transaction successfully added</p>
                            <div className="middle">
                                <div className="button" onClick={() => onOkClick()}>Go back</div>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default AddTransaction;