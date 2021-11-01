const BalanceReducer = (state = 0, action) => {
    switch (action.type) {
        case "ADD_TOTAL_BALANCE":
            return state = action.payload
        default:
            return state;
    }
}
export default BalanceReducer;