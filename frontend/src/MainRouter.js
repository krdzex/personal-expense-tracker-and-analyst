import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Dashboard from './Components/DashBoard/Dashboard';
import EditProfile from './Components/Profile/EditProfile';
import NewPassword from './Components/Profile/NewPassword';
import StatisticsMonthly from './Components/Statistics/StatisticsMonthly';
import StatisticsWeekly from './Components/Statistics/StatisticsWeekly';
import StatisticsYearly from './Components/Statistics/StatisticsYearly';
import TransactionEdit from './Components/Transactions/TransactionEdit';
import TransactionsDialy from './Components/Transactions/TransactionsDaily';
import TransactionsMonthly from './Components/Transactions/TransactionsMonthly';
import TransactionsWeakly from './Components/Transactions/TransactionsWeakly';
import TransactionsYearly from './Components/Transactions/TransactionsYearly';

class MainRouter extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/transactions/dialy" component={TransactionsDialy} />
                    <Route exact path="/transactions/weekly" component={TransactionsWeakly} />
                    <Route exact path="/transactions/monthly" component={TransactionsMonthly} />
                    <Route exact path="/transactions/yearly" component={TransactionsYearly} />
                    <Route exact path="/transactions/edit" component={TransactionEdit} />
                    <Route exact path="/statistics/weekly" component={StatisticsWeekly} />
                    <Route exact path="/statistics/monthly" component={StatisticsMonthly} />
                    <Route exact path="/statistics/yearly" component={StatisticsYearly} />
                    <Route exact path="/profile/edit" component={EditProfile} />
                    <Route exact path="/profile/newPassword" component={NewPassword} />
                </Switch>
            </div>
        );
    }
};

export default MainRouter;