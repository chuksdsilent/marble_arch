import { Col, Collapse, Row } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'

const ManagerHeader = () => {
    const { currentUser } = useSelector(state => state.user)
    console.log("current user is ", currentUser)
    return (

        <Row justify="space-between" style={{ fontSize: "18px", fontWeight: "bold", paddingLeft: "1rem" }}>
            <Col>
                MARBLE ARCH
            </Col>
            <Col>
                <span style={{ marginRight: "1rem" }}>{currentUser.data.surname} {currentUser.data.firstName}</span>
                <i className="bi-person-circle"></i>
            </Col>
        </Row>
    )
}

export default ManagerHeader