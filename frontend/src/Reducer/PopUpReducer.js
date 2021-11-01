const PopUpReducer = (state = { deleteProfile: false, editTransaction: { open: false, id: "" } }, action) => {
    switch (action.type) {
        case "OPEN_POP_UP_DELETE":
            return state = { ...state, deleteProfile: true }
        case "CLOSE_POP_UP_DELETE":
            return state = { ...state, deleteProfile: false }
        case "OPEN_POP_UP_EDIT":
            return state = { ...state, editTransaction: { open: true, id: action.payload } }
        case "CLOSE_POP_UP_EDIT":
            return state = { ...state, editTransaction: { open: false, id: "" } }
        default:
            return state
    }
}
export default PopUpReducer;