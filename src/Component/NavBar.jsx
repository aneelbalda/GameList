import React from 'react';
import { Menu } from 'antd';

class NavBar extends React.Component {
    render() {
        return (
            <Menu
                className="nav-bar"
                mode="horizontal"
                theme="dark"
                defaultSelectedKeys="home-menu"
                style={{ textAlign: "end" }}>
                <Menu.Item key="home-menu">
                    GameList
                </Menu.Item>
            </Menu>
        );
    }
}
export default NavBar;