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
import { MenuServices } from '../../../services/MenuService';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

const EditMenu = () => {

    let values;
    const { currentUser } = useSelector(state => state.user)
    const [dataSource, setDataSource] = useState([]);
    const [submitting, setSubmitting] = useState(false)
    const { TextArea } = Input;
    const [form] = Form.useForm();
    const [reservation, setReservation] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    console.log("id is ", id)
    const onFinish = async (values) => {
        try {
            const response = await MenuServices.updateMenu(values, id);
            success("Menu updated Successfully.", "top-right", 5000);
            navigate("/restaurant/orders")
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

    useEffect(async () => {
        try {

            const response = await MenuServices.getMenu(id);
            setDataSource(response.data)
            form.setFieldsValue({
                name: response.data.name,
                price: response.data.price
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <FormStyles>
            <div>
                <ToastContainer />
                <Card
                    className='form-card'
                    type="inner"
                >
                    <h4>Edit Menu</h4>
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
                            <Input placeholder="Room Type" value={dataSource.name} />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"

                            rules={[{ required: true, message: "Price is required" }]}>
                            <Input placeholder="price" />
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

export default EditMenu