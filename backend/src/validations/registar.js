import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateSignUp(data) {
    let errors = {}

    data.firstName = !isEmpty(data.firstName) ? data.firstName : ""
    data.lastName = !isEmpty(data.lastName) ? data.lastName : ""
    data.nickName = !isEmpty(data.nickName) ? data.nickName : ""
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : ""

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
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (!Validator.isLength(data.email,{max:15})) {
        errors.email = "Email is invalid";
    }
    if(!Validator.matches(data.firstName,/^[a-zA-Z]*$/)){
        errors.firstName = "Only letters allowed";
    }
    if(!Validator.matches(data.lastName,/^[a-zA-Z]*$/)){
        errors.lastName = "Only letters allowed";
    }
    if(!Validator.matches(data.nickName,/^[a-zA-Z0-9]*$/)){
        errors.nickName = "No special characters allowed";
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    }
    if (!Validator.equals(data.password,data.confirmPassword)) {
        errors.confirmPassword = "Passwords are not same";
    }
    if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "Confirm password is required";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }

}