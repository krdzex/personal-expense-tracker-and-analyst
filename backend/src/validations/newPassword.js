import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateNewPassword(data) {

    let errors = {}
    data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : "";
    data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : ""
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : ""

    if (!Validator.equals(data.newPassword, data.confirmPassword)) {
        errors.confirmPassword = "Passwords are not same";
    }

    if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "Confirm password is required";
    }

    if (Validator.isEmpty(data.newPassword)) {
        errors.newPassword = "New password is required";
    }

    return {
        errors
    }

}