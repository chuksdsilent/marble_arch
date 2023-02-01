import React, { useEffect, useState } from 'react'
import {
    Card,
    Divider,
    Form,
    Input,
    Button,
} from 'antd';
import { BookingServices } from '../../../services/BookingServices';
import { ToastContainer, toast } from "react-toastify";
import { success, info } from '../../../utils/Notifications'
import { FormStyles } from "../../styles/FormStyle"
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router';
import { StockServices } from '../../../services/StockServices';
const UpdateStockDispatched = () => {
    let showInfo;
    const [submitting, setSubmitting] = useState(false)
    const [dataSource, setDataSource] = useState("")
    const { TextArea } = Input;
    const [form] = Form.useForm();
    const { currentUser } = useSelector(state => state.user)
    const [reservation, setReservation] = useState([]);
    const { id } = useParams()
    const navigate = useNavigate();
    console.log("params from ", id)
    useEffect(async () => {
        try {
            const response = await StockServices.getStockDispatched(id);
            setDataSource(response.data)
            console.log(response.data)
            form.setFieldsValue({
                name: response.data.stockId.name,
                quantity: response.data.quantity,
                price: response.data.price,
            })
        } catch (error) {
            console.log(error);
        }
    }, []);
    const onFinish = async (values) => {
        console.log("values ", values)
        setSubmitting(true)
        try {
            const response = await StockServices.updateStockDispatched(id, values);
            form.resetFields();
            setReservation(response.data)
            success("Dispatched Stock Successfully.", "top-right", 5000);
            setSubmitting(false)
            navigate("/manager/dispatched-stocks")

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
                    <h4>Update Stock</h4>
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
                            <Input placeholder="Name" />
                        </Form.Item>

                        <Form.Item
                            label="Quantity"
                            name="quantity"
                            rules={[{ required: true, message: "Quantity is required" }]}>
                            <Input placeholder="Quantity" />
                        </Form.Item>

                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: "Price is required" }]}>
                            <Input placeholder="Price" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {submitting ? "Processing..." : "Update"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div >
        </FormStyles>
    )
}

export default UpdateStockDispatched