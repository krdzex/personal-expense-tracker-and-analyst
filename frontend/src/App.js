import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import DeleteProfile from './Components/Profile/DeleteProfile';
import TransactionEdit from './Components/Transactions/TransactionEdit';
import SubRouter from './SubRouter';

function App() {
  const popUp = useSelector(state => state.popUpReducer)
  return (
    <div className="App">
      <BrowserRouter>
        <SubRouter />
      </BrowserRouter>
      {popUp.deleteProfile && (<DeleteProfile />)}
      {popUp.editTransaction.open && (<TransactionEdit />)}
    </div>
  );
}

export default App;
