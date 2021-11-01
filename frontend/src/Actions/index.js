export const openMenu = () => {
    return {
        type: "OPEN_MENU",
    }
}

export const closeMenu = () => {
    return {
        type: "CLOSE_MENU",
    }
}


export const openSignIn = () => {
    return {
        type: "OPEN_SIGN_IN",
    }
}


export const closePopUpEdit = () => {
    return {
        type: "CLOSE_POP_UP_EDIT",
    }
}



export const openSignUp = () => {
    return {
        type: "OPEN_SIGN_UP",
    }
}


export const openPopUp = () => {
    return {
        type: "OPEN_POP_UP_DELETE",
    }
}


export const closePopUp = () => {
    return {
        type: "CLOSE_POP_UP_DELETE",
    }
}

export const openEdit = (id) => {
    return {
        type: "OPEN_POP_UP_EDIT",
        payload: id
    }
}



export const addTotalBalance = (totalBalance) => {
    return {
        type: "ADD_TOTAL_BALANCE",
        payload: totalBalance
    }
}


export const change = () => {
    return {
        type: "CHANGE"
    }
}


export const changeCurrency = (currency) => {
    return {
        type: "CHANGE_CURRENCY",
        payload: currency
    }
}

export const isLogged = () => {
    return {
        type: "LOGGED_IN"
    }
}


export const logOut = () => {
    return {
        type: "LOGGED_OUT"
    }
}

export const getUser = (user) => {
    return {
        type: "GET_USER",
        payload: user
    }
}

export const deleteUser = () => {
    return {
        type: "DELETE_USER"
    }
}