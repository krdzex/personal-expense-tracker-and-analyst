const MenuReducer = (state = false, action) => {
    switch (action.type) {
        case "OPEN_MENU":
            return !state
        case "CLOSE_MENU":
            return !state
        default:
            return state
    }
}
export default MenuReducer;