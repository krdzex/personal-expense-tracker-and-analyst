import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateNewEdits(data) {

    let errors = {}
    data.firstName = !isEmpty(data.firstName) ? data.firstName : ""
    data.lastName = !isEmpty(data.lastName) ? data.lastName : ""
    data.nickName = !isEmpty(data.nickName) ? data.nickName : ""

    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "First name is required";
    }
    if (!Validator.isLength(data.firstName, { max: 15 })) {
        errors.firstName = "First name is longer then 15 characters";
    }
    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = "Last name is required";
    }
    if (!Validator.isLength(data.lastName, { max: 20 })) {
        errors.lastName = "Last name is longer then 20 characters";
    }
    if (!Validator.isLength(data.nickName, { max: 10 })) {
        errors.nickName = "Nickname is longer then 10 characters";
    }
    if (Validator.isEmpty(data.nickName)) {
        errors.nickName = "Nick name is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}