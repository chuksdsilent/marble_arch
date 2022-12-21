import { Col, Collapse, Row } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Pusher from "pusher-js";
import { NotificationStyles } from '../styles/NotificationStyles';
import { useDispatch } from 'react-redux';
import { slideSideBar } from "../../noautharea/redux/UserSlice";



const ManagerHeader = ({ setShowSideBar }) => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user)
    const [notification, setNotification] = useState({})
    const [notificationCount, setNotificationCount] = useState(0)

    const openSideBar = () => {
        dispatch(slideSideBar({ isSideBarOpen: true }));

    }
    // Pusher.logToConsole = true;

    // var pusher = new Pusher("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", {
    //     cluster: "eu",
    // });

    // var channel = pusher.subscribe("my-channel");

    // channel.bind("store-keeper", function (data) {
    //     if (currentUser.data.role == "store-keeper") {
    //         setNotification(data)
    //         let count = notificationCount + 1;
    //         alert(notificationCount)
    //         alert(count)
    //         setNotificationCount(notificationCount + 1)
    //     }

    // });

    return (

        <Row justify="space-between" style={{ fontSize: "18px", fontWeight: "bold", paddingLeft: "1rem" }}>
            <Col>
                MARBLE ARCH
            </Col>
            <Col>
                <Row>
                    {/* <NotificationStyles>
                        <div>
                            <i class="bi bi-bell"></i>
                            <span className='notification-count'>{notificationCount}</span>
                        </div>
                    </NotificationStyles> */}
                    <div className='name-placer'>
                        <span style={{ marginRight: "1rem" }}>{currentUser.data.surname} {currentUser.data.firstName}</span>
                        <i className="bi-person-circle"></i>
                    </div>
                    <i className="bi-list" onClick={openSideBar}></i>
                </Row>
            </Col>
        </Row>
    )
}

export default ManagerHeader