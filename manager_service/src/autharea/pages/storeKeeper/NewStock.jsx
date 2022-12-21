import React, { useState } from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Card,
    Divider,
    Form,
    Input,
    Button,
    Space
} from 'antd';
import { ToastContainer } from "react-toastify";
import { success, info } from '../../../utils/Notifications'
import { FormStyles } from "../../styles/FormStyle"
import { useSelector } from 'react-redux';
import { StoreKeeperServices } from '../../../services/StoreKeeperService';

const NewStock = () => {

    const [submitting, setSubmitting] = useState(false)
    const [form] = Form.useForm();
    const [reservation, setReservation] = useState([]);


    const onFinish = async (values) => {
        setSubmitting(true)
        console.log("values ", values)
        try {
            if (values.stocks) {
                if (values.stocks.length > 0) {
                    console.log("reaching here...")
                    const response = await StoreKeeperServices.create(values);
                    form.resetFields();
                    setReservation(response.data)
                    success("Stock Uploaded Successfully...", "top-right", 5000);
                    setSubmitting(false)
                } else {
                    setSubmitting(false)
                    info("Please field should be empty", "top-right", 5000);
                }

            } else {
                setSubmitting(false)
                info("Please field should be empty", "top-right", 5000);
            }
        } catch (error) {
            setSubmitting(false)
            console.log(error)

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
                    <h4>New Stock</h4>
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
                                                rules={[{ required: true, message: 'Name is required' }]}
                                            >
                                                <Input placeholder="Name of Stock" />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'quantity']}
                                                rules={[{ required: true, message: 'Quantity is required' }]}
                                            >
                                                <Input placeholder="Quantity" />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'price']}
                                                rules={[{ required: true, message: 'Price is required' }]}
                                            >
                                                <Input placeholder="Price" />
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

export default NewStock