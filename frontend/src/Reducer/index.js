import { combineReducers } from "redux";
import MenuReducer from "./MenuReducer";
import RegistrationReducer from "./RegistrationReducer";
import PopUpReducer from "./PopUpReducer";
import BalanceReducer from "./BalanceReducer";
import TransactionsReducer from "./TransactionsReducer";
import CurrencyReducer from "./CurrencyReducer";

const allReducers = combineReducers({
    menuReducer: MenuReducer,
    registrationReducer: RegistrationReducer,
    popUpReducer: PopUpReducer,
    balanceReducer: BalanceReducer,
    transactionsReducer: TransactionsReducer,
    currencyReducer: CurrencyReducer
})

export default allReducers;