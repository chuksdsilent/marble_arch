import React, { useEffect, useState } from 'react'
import {
    Card,
    Col,
    Divider,
    Row,
    Form,
    Input,
    Button,
    Select,
    Radio,
    DatePicker
} from 'antd';
import { BookingServices } from '../../../services/BookingServices';
import { ToastContainer, toast } from "react-toastify";
import { success, info } from '../../../utils/Notifications'
import { FormStyles } from "../../styles/FormStyle"
import { useSelector } from 'react-redux';
import moment from 'moment';
const NewBooking = () => {
    let showInfo;
    const defaultInfo = (<div>
        <Form.Item
            label="Surname"
            name="surname"
            rules={[{ required: true, message: "Surname is required" }]}>
            <Input placeholder="Surname" />
        </Form.Item>
        <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "First Name is required" }]}>
            <Input placeholder="First Name" />
        </Form.Item>

        <Form.Item
            label="Occupation"
            name="occupation"
            rules={[{ required: true, message: "Occupation is required" }]}>
            <Input placeholder="Occupation" />
        </Form.Item>
        <Form.Item label="Gender" name="gender" rules={[{ required: true, message: "Gender is required" }]}>
            <Radio.Group>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
            </Radio.Group>
        </Form.Item>
    </div>)
    const [submitting, setSubmitting] = useState(false)
    const [info, setInfo] = useState(defaultInfo)
    const [categoryTypes, setCategoryTypes] = useState("")
    const { TextArea } = Input;
    const [form] = Form.useForm();
    const { currentUser } = useSelector(state => state.user)
    const [dataSource, setDataSource] = useState([]);
    const [reservation, setReservation] = useState([]);
    useEffect(async () => {
        try {
            const response = await BookingServices.rooms();
            setDataSource(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    }, [reservation]);
    const onFinish = async (values) => {
        const formData = { ...values, setCategoryType: categoryTypes }
        setSubmitting(true)
        console.log("data is ", formData)
        values["arrivalDate"] = moment(values.arrivalDate).format("MM/DD/YYYY")
        values["departureDate"] = moment(values.departureDate).format("MM/DD/YYYY")
        values = { ...values, guestId: currentUser.data._id }
        try {
            const response = await BookingServices.create(formData);
            form.resetFields();
            setReservation(response.data)
            success("Reservation Made Successfully.", "top-right", 5000);
            setSubmitting(false)
        } catch (error) {
            setSubmitting(false)
            if (error.response.data.length > 0) {
                error.response.data.map((item) => {
                    info(item.msg, "top-right", 5000);
                })
            } else {
                info(error.response.data.msg, "top-right", 5000);

            }
        }
    };

    const handleChange = (value) => {
        if (value === "personal") {
            setCategoryTypes("P")
            setInfo(
                defaultInfo
            )
        } else if (value === "governmental") {
            setCategoryTypes("G")
            setInfo(<Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Name is required" }]}>
                <Input placeholder="Name" />
            </Form.Item>)
        } else if (value === "non_governmental") {
            setCategoryTypes("N")
            setInfo(<Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Name is required" }]}>
                <Input placeholder="Name" />
            </Form.Item>)
        } else if (value === "company") {
            setCategoryTypes("C")
            setInfo(<Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Name is required" }]}>
                <Input placeholder="Name" />
            </Form.Item>)
        }
    }

    return (
        <FormStyles>
            <div>
                <ToastContainer />
                <Card
                    className='form-card'
                    type="inner"
                >
                    <h4>New Reservation</h4>
                    <Divider />
                    <Form
                        form={form}
                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Select Category"
                            rules={[{ required: true, message: "Category is required" }]}>
                            <Select onChange={handleChange}>
                                <Select.Option value="personal">Personal</Select.Option>
                                <Select.Option value="governmental">Governmental</Select.Option>
                                <Select.Option value="non_governmental">Non Governmental</Select.Option>
                                <Select.Option value="company">Company</Select.Option>
                            </Select>
                        </Form.Item>
                        {info}
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: "Phone is required" }]}>
                            <Input placeholder="Phone" />
                        </Form.Item>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    label="Arrival Date"
                                    name="arrivalDate"
                                    rules={[{ required: true, message: "Arrival Date is required" }]}>
                                    <DatePicker />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Departure Date"
                                    name="departureDate"
                                    rules={[{ required: true, message: "Departure Date is required" }]}>
                                    <DatePicker />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            label="Select Room"
                            name="room"
                            rules={[{ required: true, message: "Room is required" }]}>
                            <Select>
                                {dataSource && dataSource.map((data) => {
                                    return (
                                        <Select.Option value={data._id}>{data.roomNumber}</Select.Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Select Payment Method"
                            name="paymentMethod"
                            rules={[{ required: true, message: "Payment Method is required" }]}>
                            <Select>
                                <Select.Option value="cash">Cash</Select.Option>
                                <Select.Option value="pos">POS</Select.Option>
                                <Select.Option value="transfer">Transfer</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: "Address is required" }]}>
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {submitting ? "Processing..." : "Submit"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div >
        </FormStyles>
    )
}

export default NewBooking