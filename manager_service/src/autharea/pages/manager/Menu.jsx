import React, { useState, useEffect } from 'react'
import { MenuServices } from '../../../services/MenuService';
import { Row, Col, Table, Button, Divider, Skeleton, Form, DatePicker } from 'antd';
import { menuColumns } from '../../components/dataSource/RestaurantDataSource';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';

const Menu = () => {
    const { query, search } = useLocation();
    const params = new URLSearchParams(search).get('backUrl');
    let total = 0;

    const { currentUser } = useSelector(state => state.user)
    const [dataSource, setDataSource] = useState([]);
    useEffect(async () => {
        try {

            const response = await MenuServices.allMenu();
            setDataSource(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <>
            <h3>Menus</h3>
            <Divider />

            <Row>
                <Col span={24}>
                    {dataSource ? <Table className="table-striped-rows" columns={menuColumns} dataSource={dataSource} /> : <Skeleton active />}
                </Col>
            </Row>
        </>
    )
}

export default Menu