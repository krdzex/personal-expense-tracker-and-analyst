import React from 'react';
import DashboardBoxes from './DashboardBoxes';
import DashBoardChart from './DashBoardChart';
import DashBoardTable from './DashBoardTable';

const Dashboard = () => {
    return (
        <div>
            <DashboardBoxes />
            <div className="dashBoardBottom">
                <DashBoardChart />
                <DashBoardTable />
            </div>
        </div>
    );
};

export default Dashboard;