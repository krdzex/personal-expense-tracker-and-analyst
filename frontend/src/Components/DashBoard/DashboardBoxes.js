import { Icon } from '@iconify/react';
import React from 'react';

const DashboardBoxes = () => {
    return (
        <div className="boxesWrapper">
            <div className="box">
                <div>
                    <div className="numbers">1,504</div>
                    <div className="cardName">Daily Views</div>
                </div>
                <div className="boxIcon">
                    <Icon icon="uil:signout" />
                </div>
            </div>
            <div className="box">
                <div>
                    <div className="numbers">1,504</div>
                    <div className="cardName">Daily Views</div>
                </div>
                <div className="boxIcon">
                    <Icon icon="uil:signout" />
                </div>
            </div>
            <div className="box">
                <div>
                    <div className="numbers">1,504</div>
                    <div className="cardName">Daily Views</div>
                </div>
                <div className="boxIcon">
                    <Icon icon="uil:signout" />
                </div>
            </div>
            <div className="box">
                <div>
                    <div className="numbers">1,504</div>
                    <div className="cardName">Daily Views</div>
                </div>
                <div className="boxIcon">
                    <Icon icon="uil:signout" />
                </div>
            </div>
        </div>
    );
};

export default DashboardBoxes;