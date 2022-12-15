import React, { useState, useEffect } from 'react'
import { KitchenServices } from '../../../services/KitchenServices';
import { Row, Button, Col, Table, Divider, Skeleton, Form, DatePicker, Modal } from 'antd';
import { TotalCardStyles } from '../../styles/TotalCardStyles';
import { formatCurrency } from '../../../utils/FormatCurrency';
import moment from 'moment';
import { useLocation } from 'react-router';

import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { columns } from "../../components/dataSource/columnSource"
import Moment from 'react-moment';


const AllStockRequest = () => {

    const { query, search } = useLocation();
    const params = new URLSearchParams(search).get('backUrl');
    const { currentUser } = useSelector(state => state.user)
    let total = 0;
    let response;
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [dataSource, setDataSource] = useState([]);



    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },


        {
            title: "Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (_, { createdAt }) => (
                <>
                    <Moment format="D MMM, YY">{createdAt}</Moment>
                </>
            ),
        },

    ]

    useEffect(async () => {
        try {

            const response = await KitchenServices.allStockRequest(`department=${currentUser.data.role}`)

            setDataSource(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    }, []);
    const onFinish = async (values) => {
        const data = {
            startDate: moment(values.startDate).format("YYYY-MM-DD"),
            endDate: moment(values.endDate).format("YYYY-MM-DD"),
        }
        try {
            const response = await KitchenServices.searchBooking(data);
            setDataSource(response.data)
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <>
            <ToastContainer />
            <h3> All Stock Request</h3>
            <Divider />
            <Row>
                <Col span={24}>
                    {dataSource ? <Table className="table-striped-rows" columns={columns} dataSource={dataSource} /> : <Skeleton active />}
                </Col>
            </Row>
        </>
    )

}

export default AllStockRequest