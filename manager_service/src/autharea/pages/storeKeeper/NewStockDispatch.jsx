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
import { ToastContainer, toast } from "react-toastify";
import { success, info } from '../../../utils/Notifications'
import { FormStyles } from "../../styles/FormStyle"
import { useSelector } from 'react-redux';
import { RestaurantServices } from '../../../services/RestaurantService';
import { StockServices } from '../../../services/StockServices';

const NewStockDispatch = () => {
    let values;
    const [submitting, setSubmitting] = useState(false)
    const [form] = Form.useForm();
    const { currentUser } = useSelector(state => state.user)
    const [dataSource, setDataSource] = useState([]);
    const [submitBtn, setSubmitBtn] = useState(false);
    const [StockDispatch, setStockDispatch] = useState(false);
    useEffect(async () => {
        try {
            const response = await StockServices.stockForDispatch();
            setDataSource(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }, []);
    const onFinish = async (values) => {
        setSubmitting(true)
        try {
            if (values.stocks) {
                if (values.stocks.length > 0) {
                    const response = await StockServices.createDispatch(values);
                    form.resetFields();
                    if (response.data.length > 0) {
                        success("Stock Dispatched Successfully...", "top-right", 5000);
                        setStockDispatch(response.data)
                    } else {
                        info(response.data.msg, "top-right", 5000);
                    }
                } else {
                    info("You need to select a stock", "top-right", 5000);

                }
            } else {
                info("You need to select a stock", "top-right", 5000);

            }
            setSubmitting(false)
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
                    <h4>New Stock Dispatch</h4>
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
                                                style={{ width: "15rem" }}
                                                {...restField}
                                                name={[name, "stockId"]}
                                                rules={[{ required: true, message: "Stock Name is required" }]}>
                                                <Select placeholder="Select Stock">
                                                    {dataSource && dataSource.map(data => (
                                                        <Select.Option key={data._id} value={data._id}>{data.name}</Select.Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                style={{ width: "10rem" }}
                                                {...restField}
                                                name={[name, 'quantity']}
                                                rules={[{ required: true, message: 'Quantity is required' }]}
                                            >
                                                <Input placeholder="Quantity" />
                                            </Form.Item>

                                            <Form.Item
                                                style={{ width: "10rem" }}
                                                {...restField}
                                                name={[name, "department"]}
                                                rules={[{ required: true, message: "Department is required" }]}>
                                                <Select placeholder="Select Department">
                                                    <Select.Option value="laundry">Laundry</Select.Option>
                                                    <Select.Option value="bar">Bar</Select.Option>
                                                    <Select.Option value="kitchen">Kitchen</Select.Option>
                                                    <Select.Option value="maintenance">Maintenance</Select.Option>
                                                </Select>
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
        </FormStyles >
    )
}

export default NewStockDispatch