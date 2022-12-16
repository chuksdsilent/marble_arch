import React, { useState, useEffect } from 'react'
import { UserServices } from '../../../services/UserService';
import { Row, Col, Table, Skeleton, Divider } from 'antd';
import { columns } from '../../components/dataSource/GuestColumnSource';
import { useLocation } from 'react-router';

const Guests = () => {

    const { query, search } = useLocation();
    const params = new URLSearchParams(search).get('backUrl');
    const [dataSource, setDataSource] = useState([]);
    useEffect(async () => {
        try {
            const response = (params == "today") ? await UserServices.todayUsers() : await UserServices.getGuests();
            console.log(response);
            setDataSource(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    }, []);
    return (
        <>
            <h4>Guest's Details</h4>
            <Divider />
            <Row>

                <Col span={24}>
                    {dataSource ? <Table className="table-striped-rows" columns={columns} dataSource={dataSource} /> : <Skeleton active />}
                </Col>
            </Row>
        </>

    )
}

export default Guests