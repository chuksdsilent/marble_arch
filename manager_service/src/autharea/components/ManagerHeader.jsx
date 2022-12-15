import { Col, Collapse, Row } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Pusher from "pusher-js";
import { NotificationStyles } from '../styles/NotificationStyles';



const ManagerHeader = () => {
    const { currentUser } = useSelector(state => state.user)
    const [notification, setNotification] = useState({})
    const [notificationCount, setNotificationCount] = useState(0)

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
                    <div>
                        <span style={{ marginRight: "1rem" }}>{currentUser.data.surname} {currentUser.data.firstName}</span>
                        <i className="bi-person-circle"></i>
                    </div>
                </Row>
            </Col>
        </Row>
    )
}

export default ManagerHeader