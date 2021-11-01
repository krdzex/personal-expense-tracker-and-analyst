const RegistrationReducer = (state = false, action) => {
    switch (action.type) {
        case "OPEN_SIGN_IN":
            return !state
        case "OPEN_SIGN_UP":
            return !state
        default:
            return state
    }
}
export default RegistrationReducer;