import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closePopUpEdit } from '../../Actions';
import { getTransactionInfo, updateTransaction } from '../../apiService/transactionsApi';



const TransactionEdit = () => {

    const id = useSelector(state => state.popUpReducer.editTransaction.id)
    useEffect(() => {
        getTransactionInfo(id).then(response => setValues({ title: response.title, amount: response.amount, type: response.type, currency: response.currency })).catch(reason => console.log(reason))
    }, [])
    const [values, setValues] = useState({
        title: "",
        amount: "",
        type: "",
        currency: ""
    })
    const dispatch = useDispatch()
    const [firstTime, setFirstTime] = useState(true)
    const [succes, setSucces] = useState(false)

    const onCurrencyClick = (currency) => {
        setValues({ ...values, currency: currency })
    }

    const [errors, setErrors] = useState({})
    const onSubmit = (e) => {
        e.preventDefault();
        let newData = {
            title: values.title || undefined,
            amount: values.amount + "" || undefined,
            currency: values.currency || undefined,
            type: values.type || undefined,
        }
        updateTransaction(id, newData).then(response => {
            if (response._id) {
                setSucces(true)
            } else {
                setErrors(response)
            }
            if (firstTime) {
                document.getElementById("form2").className += " afterFirst"
                setFirstTime(false)
            }
        }).catch(reason => console.log(reason))
    }


    const onChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const onOkClick = () => {
        setSucces(false);
        setValues({
            title: "",
            amount: "",
            currency: "",
            type: ""
        })
        setErrors({})
        dispatch(closePopUpEdit())
        window.location.reload()
    }
    
    const onCancelClick = () => {
        setValues({
            title: "",
            amount: "",
            currency: "",
            type: ""
        })
        setErrors({})
        dispatch(closePopUpEdit())
    }
    return (
        <div className="editWrapper">
            <div className="innerDiv">
                <div className={!succes ? "formWrapper" : "formWrapper succes"}>
                    {
                        !succes ?
                            <div className="form" id="form2">
                                <form>
                                    <h3>Edit transaction</h3>
                                    <input type="text" placeholder="title" className={errors.title ? "error" : "success"} value={values.title} onChange={onChange("title")} />
                                    {errors.title && (<span>{errors.title}</span>)}
                                    <input type="number" min={1} className={errors.amount ? "error" : "success"} placeholder="Amount" value={values.amount} onChange={onChange("amount")} />
                                    {errors.amount && (<span>{errors.amount}</span>)}
                                    <div className="currencyWrapper">
                                        <div className={values.currency === "dollar" ? "dollar active" : "dollar"} onClick={() => onCurrencyClick("dollar")}><Icon icon="bx:bx-dollar" /></div>
                                        <div className={values.currency === "bam" ? "bam active" : "bam"} onClick={() => onCurrencyClick("bam")}>BAM</div>
                                        <div className={values.currency === "euro" ? "euro active" : "euro"} onClick={() => onCurrencyClick("euro")}><Icon icon="ic:twotone-euro-symbol" /></div>
                                    </div>
                                    <div className="buttons">
                                        <button id="cancel" style={{ borderRadius: 0, margin: "0px" }} onClick={() => onCancelClick()}>Cancel</button>
                                        <button id="change" style={{ borderRadius: 0, margin: "0px" }} onClick={(e) => onSubmit(e)}>Change</button>
                                    </div>
                                </form>
                            </div> :
                            <div className="successEdit">
                                <div className="icon">
                                    <Icon icon="el:ok-circle" className="realIcon" />
                                </div>
                                <p>Transaction edited successfully</p>
                                <div className="middle">
                                    <div className="button" onClick={() => onOkClick()}>Exit</div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default TransactionEdit;