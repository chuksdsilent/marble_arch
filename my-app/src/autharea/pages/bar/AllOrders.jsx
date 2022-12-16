import React, { useState, useEffect } from 'react'
import { Row, Col, Table, Button, Divider, Skeleton, Form, DatePicker, Modal } from 'antd';
import { TotalCardStyles } from '../../styles/TotalCardStyles';
import { formatCurrency } from '../../../utils/FormatCurrency';
import moment from 'moment';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import Moment from "react-moment";
import { Link } from 'react-router-dom';
import { BarServices } from '../../../services/BarService';

const AllOrders = () => {
    const { query, search } = useLocation();
    const params = new URLSearchParams(search).get('backUrl');
    let total = 0;
    let response;
    const { currentUser } = useSelector(state => state.user)
    const [dataSource, setDataSource] = useState([]);
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const menuColumns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "stockId",
            render: (_, { stockId }) => (
                <>
                    {stockId.name}
                </>
            ),
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (_, { price }) => (
                <>
                    &#8358;{formatCurrency(price)}
                </>
            ),
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Total",
            dataIndex: "total",
            key: "total",
            render: (_, { total }) => (
                <>
                    &#8358;{formatCurrency(total)}
                </>
            ),
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

    ];

    const showModal = (record) => {
        console.log(record)
        setOpen(true);
        setModalData(record)

    };
    const handleOk = async () => {

        setConfirmLoading(true);

        try {
            response = await BarServices.orderDelivered(modalData._id);
            setOpen(false);
            setConfirmLoading(false);
            setDataSource(response.data)
            console.log(response.data)
        } catch (error) {
            setConfirmLoading(false);
            console.log(error);
        }
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    useEffect(async () => {
        try {
            if (currentUser.data.role == "bar") {
                response = await BarServices.todayBar();
                console.log("response", response)
            } else {
                response = (params === "today") ? await BarServices.todayBar() : await BarServices.allBar()
            }
            setDataSource(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error.response);
        }
    }, []);
    const onFinish = async (values) => {
        const data = {
            startDate: moment(values.startDate).format("YYYY-MM-DD"),
            endDate: moment(values.endDate).format("YYYY-MM-DD"),
        }
        try {
            const response = await BarServices.searchBar(data);
            setDataSource(response.data)
        } catch (error) {
            console.log(error);
        }

    };
    return (
        <>
            <Modal
                title="Message"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>Do you want to mark this delivered.</p>
            </Modal>
            <h3>All Bar Orders</h3>
            <Divider />
            <Row justify="start">
                <Col span={20} >

                </Col>
                <Col span={4}>
                    <TotalCardStyles>
                        <div>
                            Total:
                        </div>
                        <div className='total-badge'>
                            &#8358;
                            {
                                dataSource && dataSource.map((data) => {
                                    total += data.total
                                })
                            }

                            {formatCurrency(total)}
                        </div>
                    </TotalCardStyles>
                </Col>
            </Row>


            <Row>
                <Col span={24}>
                    {dataSource ? <Table className="table-striped-rows" columns={menuColumns} dataSource={dataSource} /> : <Skeleton active />}
                </Col>
            </Row>
        </>
    )
}

export default AllOrders