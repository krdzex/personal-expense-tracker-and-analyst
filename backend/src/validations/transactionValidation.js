import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateTransaction(data) {

    let errors = {}
    data.title = !isEmpty(data.title) ? data.title : "";
    data.amount = !isEmpty(data.amount) ? data.amount : "";

    if (Validator.isEmpty(data.title)) {
        errors.title = "Title is required";
    }
    if (!Validator.matches(data.title, /^[a-zA-Z0-9]*$/)) {
        errors.title = "No special characters allowed";
    }
    if (Validator.isEmpty(data.amount)) {
        errors.amount = "Amount is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}