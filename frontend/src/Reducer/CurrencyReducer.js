const CurrencyReducer = (state = "dollar", action) => {
    switch (action.type) {
        case "CHANGE_CURRENCY":
            return state = action.payload
        default:
            return state;
    }
}
export default CurrencyReducer;