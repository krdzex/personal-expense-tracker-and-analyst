import React from 'react';
import DashBoardChart from './DashBoardChart';
import DashBoardTable from './DashBoardTable';

const Dashboard = () => {
    return (
        <div className="dashBoardWrapper">
            <div className="dashBoardBottom">
                <DashBoardChart />
                <DashBoardTable />
            </div>
        </div>
    );
};

export default Dashboard;