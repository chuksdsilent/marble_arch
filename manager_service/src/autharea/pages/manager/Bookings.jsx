import React, { useState, useEffect } from 'react'
import { BookingServices } from '../../../services/BookingServices';
import { Row, Button, Col, Table, Divider, Skeleton, Form, DatePicker, Modal } from 'antd';
import { TotalCardStyles } from '../../styles/TotalCardStyles';
import { formatCurrency } from '../../../utils/FormatCurrency';
import moment from 'moment';
import Moment from "react-moment";

import { useLocation } from 'react-router';
import { success } from '../../../utils/Notifications';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
const Bookings = () => {
    const columns = [
        {
            title: "Surname",
            dataIndex: "guestId",
            key: "guestId",
            render: (_, { guestId }) => <>{guestId.surname}</>,
        },

        {
            title: "First Name",
            dataIndex: "guestId",
            key: "guestId",
            render: (_, { guestId }) => <>{guestId.firstName}</>,
        },
        {
            title: "Room Number",
            dataIndex: "roomNumber",
            key: "roomNumber",
        },
        {
            title: "Arrival Date",
            dataIndex: "arrivalDate",
            key: "arrivalDate",
            render: (_, { arrivalDate }) => (
                <>
                    <Moment format="D MMM, YY">{arrivalDate}</Moment>
                </>
            ),
        },
        {
            title: "Departure Date",
            dataIndex: "departureDate",
            key: "departureDate",
            render: (_, { departureDate }) => (
                <>
                    <Moment format="D MMM, YY">{departureDate}</Moment>
                </>
            ),
        },

        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (_, { price }) => <>&#8358; {formatCurrency(price)}</>,
        },
        {
            title: "Total",
            dataIndex: "total",
            key: "total",
            render: (_, { total }) => <>&#8358; {formatCurrency(total)}</>,
        },

        {
            title: "Phone",
            dataIndex: "guestId",
            key: "guestId",
            render: (_, { guestId }) => (
                <>
                    {guestId.phone}
                </>
            ),
        },
        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: record => (
                <>
                    {record.booked ? <Button type="primary" onClick={() => showModal(record)}>
                        Checkout
                    </Button> : ""}

                </>
            ),
        },
    ];

    console.log(columns)
    const { search } = useLocation();
    const params = new URLSearchParams(search).get('backUrl');
    const { currentUser } = useSelector(state => state.user)
    let total = 0;
    let response;
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    useEffect(async () => {
        try {
            if (currentUser.data.role == "receptionist") {
                response = await BookingServices.todayBooking();
            } else {
                response = (params === "today") ? await BookingServices.todayBooking() : await BookingServices.allBooking()
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
            const response = await BookingServices.searchBooking(data);
            setDataSource(response.data)
        } catch (error) {
            console.log(error);
        }

    };

    const showModal = (data) => {
        setOpen(true);
        setModalData(data)
    };

    const handleOk = async () => {

        try {
            setConfirmLoading(true);
            const response = await BookingServices.checkoutGuest(modalData._id)
            setDataSource(response.data)
            setOpen(false);
            setConfirmLoading(false);
            success("Guest checked out successfully...", "top-right", 5000);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    return (
        <>
            <ToastContainer />
            <Modal
                title="Warning"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>Do you want to checkout this guest?</p>
            </Modal>
            <h3>{(params === "today") ? "Today" : "All"} Reservations</h3>
            <Divider />
            <Row justify="start">
                <Col lg={{ span: 20 }} >
                    <Form
                        name="basic"
                        onFinish={onFinish}
                    >
                        <Row>
                            <Col span={10} lg={{ span: 7 }}>
                                <Form.Item
                                    label="Start Date"
                                    name="startDate"
                                    rules={[{ required: true, message: "Start Date is required" }]}>
                                    <DatePicker format='YYYY-MM-DD' />
                                </Form.Item>
                            </Col>
                            <Col span={10} lg={{ span: 7 }}>
                                <Form.Item
                                    label="End Date"
                                    name="endDate"
                                    rules={[{ required: true, message: "End Date is required" }]}>
                                    <DatePicker format='YYYY-MM-DD' />
                                </Form.Item>
                            </Col>
                            <Col span={10} lg={{ span: 7 }}>
                                <Form.Item >
                                    <Button type="primary" htmlType="submit">
                                        Search
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col lg={{ span: 4 }} xs={{ order: 1 }}>
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
                    {dataSource ? <Table className="table-striped-rows" columns={columns} dataSource={dataSource} /> : <Skeleton active />}
                </Col>
            </Row>
        </>
    )

}

export default Bookings