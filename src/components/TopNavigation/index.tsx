import zIndex from "@mui/material/styles/zIndex";
import React, { useState } from "react";

const TopNavigation = (props: React.PropsWithChildren<{}>): JSX.Element => {

    const [isNotificationSelected, onNotificationClick] = useState<boolean>(false);
    const [isLogoutSelected, onLogoutClick] = useState<boolean>(false);
    const [isSettingsSelected, onSettingsClick] = useState<boolean>(false);

    return (
        <nav className="navbar navbar-default px-4 py-3 bg-color-one text-white" style={{zIndex: 2}}>
            <div id="app-title">
                <a href="/" className="text-reset text-decoration-none">
                    <h2 className="text-white mb-0">Market</h2>
                </a>
            </div>
            {props.children}
            <div>
                <button
                    id="notification-button"
                    onClick={() => onNotificationClick(!isNotificationSelected)}
                    className="btn btn-transparent btn-round">
                    <i className="bi bi-bell-fill bi-lg icon text-white"></i>
                </button>
                <button
                    id="logout-button"
                    onClick={() => onLogoutClick(!isLogoutSelected)}
                    className="btn btn-transparent btn-round">
                    <i className="bi bi-box-arrow-right icon text-white"></i>
                </button>
                <button
                    id="settings-button"
                    onClick={() => onSettingsClick(!isSettingsSelected)}
                    className="btn btn-transparent btn-round text-white">
                    <i className="bi bi-gear icon text-white"></i>
                </button>
            </div>
        </nav>
    );
}

export default TopNavigation;