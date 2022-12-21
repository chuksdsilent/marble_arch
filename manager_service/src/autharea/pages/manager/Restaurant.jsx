import React, { useState, useEffect } from 'react'
import { RestaurantServices } from '../../../services/RestaurantService';
import { Row, Col, Table, Button, Divider, Skeleton, Form, DatePicker, Modal } from 'antd';
import { TotalCardStyles } from '../../styles/TotalCardStyles';
import { formatCurrency } from '../../../utils/FormatCurrency';
import moment from 'moment';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import Moment from "react-moment";
const Restaurant = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search).get('backUrl');
    let total = 0;
    const { currentUser } = useSelector(state => state.user)
    const [dataSource, setDataSource] = useState([]);
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState(false);


    const menuColumns = [
        {
            title: "Name",
            dataIndex: "menuId",
            key: "menuId",
            render: (_, { menuId }) => <>{menuId.name}</>,
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
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
        {
            title: "Action",
            dataIndex: "",
            key: "",
            render: record => (

                <>
                    {!record.kitchen_received ? currentUser.data.role === "kitchen" ?
                        <Button type="primary" onClick={() => showModal(record)}>
                            Delivered
                        </Button> : "" : <i className='bi-check-lg'></i>}
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
            response = await RestaurantServices.orderDelivered(modalData._id);
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

    let response;
    useEffect(async () => {
        try {
            if (currentUser.data.role === "restaurant") {
                response = await RestaurantServices.todayRestaurant();
            } else {
                response = (params === "today") ? await RestaurantServices.todayRestaurant() : await RestaurantServices.allRestaurant()
            }
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
            const response = await RestaurantServices.searchRestaurant(data);
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
            <h3>All Restaurant Orders</h3>
            <Divider />
            <Row justify="start">
                <Col span={20} >
                    <Form
                        name="basic"
                        onFinish={onFinish}
                    >
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    label="Start Date"
                                    name="startDate"
                                    rules={[{ required: true, message: "Start Date is required" }]}>
                                    <DatePicker format='YYYY-MM-DD' />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="End Date"
                                    name="endDate"
                                    rules={[{ required: true, message: "End Date is required" }]}>
                                    <DatePicker format='YYYY-MM-DD' />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item >
                                    <Button type="primary" htmlType="submit">
                                        Search
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
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
                                    if (currentUser.data.role === "kitchen" && data.kitchen_received == true) {
                                        total += data.total
                                    } else if (currentUser.data.role === "restaurant") {
                                        total += data.total
                                    }
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

export default Restaurant