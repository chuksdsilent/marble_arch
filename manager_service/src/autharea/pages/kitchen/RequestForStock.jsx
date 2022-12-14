import React, { useEffect, useState } from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Card,
    Divider,
    Form,
    Input,
    Button,
    Select,
    Space
} from 'antd';
import { KitchenServices } from '../../../services/KitchenServices';
import { ToastContainer, toast } from "react-toastify";
import { success, info } from '../../../utils/Notifications'
import { FormStyles } from "../../styles/FormStyle"
import { useSelector } from 'react-redux';

const RequestForStock = () => {
    let values;
    const [submitting, setSubmitting] = useState(false)
    const [form] = Form.useForm();
    const { currentUser } = useSelector(state => state.user)
    const [dataSource, setDataSource] = useState([]);
    const [reservation, setReservation] = useState([]);
    const [submitBtn, setSubmitBtn] = useState(false);

    const onFinish = async (values) => {
        setSubmitting(true)

        let value = []
        values.stocks.map(val => {
            console.log(val)
            value.push({ ...val, "department": currentUser.data.role })
        })
        console.log("value is ", value)
        try {
            const response = await KitchenServices.newStockRequest(value);
            form.resetFields();
            setReservation(response.data)
            success("Stock Request Successfully...", "top-right", 5000);
            setSubmitting(false)
        } catch (error) {
            setSubmitting(false)
            console.log(error)
            info(error.response.data.message, "top-right", 5000);
        }
    };

    const showSubmitBtn = () => {
        console.log("button showing ", submitBtn)

    }
    return (
        <FormStyles>
            <div>
                <ToastContainer />
                <Card
                    className='form-card'
                    type="inner"
                >
                    <h4>New Stock Request</h4>
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

                        <Form.List name="stocks">
                            {(fields, { add, remove }) => (
                                <>

                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'name']}
                                                rules={[{ required: true, message: 'Stock Name is required' }]}
                                            >
                                                <Input placeholder="Stock Name" />
                                            </Form.Item>

                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add field
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                        <Button type="primary" htmlType="submit">
                            {submitting ? "Processing..." : "Submit"}
                        </Button>
                    </Form>
                </Card>
            </div >
        </FormStyles>
    )
}

export default RequestForStock