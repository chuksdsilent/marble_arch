import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SideBarStyles } from '../styles/SideBarStyles';
import items from './menu.json';
import { receptionistItems, restaurantItems, kitchenItems, storeKeeperItems, barItems, maintenanceItems, laundryItems } from './receptionist/sideBarMenu';
import SidebarItems from './SidebarItems';
import cancel from "../../assets/images/cancel.png"
import { slideSideBar } from "../../noautharea/redux/UserSlice";
import { useDispatch } from 'react-redux';

const Sidebar = () => {
    let menuItem
    const { currentUser } = useSelector(state => state.user)
    if (currentUser.data.role == "manager") {
        menuItem = items
    } else if (currentUser.data.role == "receptionist") {
        menuItem = receptionistItems
    } else if (currentUser.data.role == "restaurant") {
        menuItem = restaurantItems
    } else if (currentUser.data.role == "kitchen") {
        menuItem = kitchenItems
    } else if (currentUser.data.role == "store-keeper") {
        menuItem = storeKeeperItems
    } else if (currentUser.data.role == "bar") {
        menuItem = barItems
    } else if (currentUser.data.role == "maintenance") {
        menuItem = maintenanceItems
    } else if (currentUser.data.role == "laundry") {
        menuItem = laundryItems
    }

    const dispatch = useDispatch();
    const closeSideBar = () => {
        dispatch(slideSideBar({ isSideBarOpen: false }));
    }
    return (
        <SideBarStyles>
            <img src={cancel} alt="" className="cancel" onClick={closeSideBar} />
            {(currentUser.data.role == "manager") ? <Link to="/manager/dashboard" style={{ borderRadius: "7px", fontSize: "18px", padding: ".5rem 1.5rem", display: "block", color: "white", marginLeft: "1rem", marginRight: "1rem", backgroundColor: "#3964ae" }}>Dashboard</Link> : ""}
            <ul>
                <SidebarItems items={menuItem} />
            </ul>
        </SideBarStyles >
    )
}

export default Sidebar