import React, { useState, useEffect } from 'react'
import { BookingServices } from '../../../services/BookingServices';
import { Row, Col, Table, Button, Divider, Skeleton, Form, DatePicker } from 'antd';
import moment from 'moment';
import { columns } from '../../components/dataSource/FreeRoomSource';
import { formatCurrency } from "../../../utils/FormatCurrency";

const FreeRooms = () => {
    let total = 0;
    const [dataSource, setDataSource] = useState([]);
    useEffect(async () => {
        try {
            const response = await BookingServices.freeRooms();
            setDataSource(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <>
            <h3>Free Rooms</h3>
            <Divider />
            <Row>
                <Col span={24}>
                    {dataSource ? <Table className="table-striped-rows" columns={columns} dataSource={dataSource} /> : <Skeleton active />}
                </Col>
            </Row>
        </>
    )
}

export default FreeRooms