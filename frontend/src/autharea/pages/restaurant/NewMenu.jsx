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

const NewMenu = () => {
    let values;
    const [submitting, setSubmitting] = useState(false)
    const { TextArea } = Input;
    const [form] = Form.useForm();
    const { currentUser } = useSelector(state => state.user)
    const [dataSource, setDataSource] = useState([]);
    const [reservation, setReservation] = useState([]);

    const onFinish = async (values) => {
        try {
            console.log("data is ", values)
            const response = await BookingServices.createMenu(values);
            form.resetFields();
            setReservation(response.data)
            success("Room Created Successfully.", "top-right", 5000);
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

    return (
        <FormStyles>
            <div>
                <ToastContainer />
                <Card
                    className='form-card'
                    type="inner"
                >
                    <h4>New Menu</h4>
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
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: "Name is required" }]}>
                            <Input placeholder="Room Type" />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: "Price is required" }]}>
                            <Input placeholder="price" />
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

export default NewMenu