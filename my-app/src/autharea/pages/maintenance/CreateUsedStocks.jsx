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
import { MaintenanceServices } from '../../../services/MaintenanceService';
import { ToastContainer, toast } from "react-toastify";
import { success, info } from '../../../utils/Notifications'
import { useSelector } from 'react-redux';
import { FormStyles } from '../../styles/FormStyle';


const CreateUsedStocks = () => {
    let values;
    const [submitting, setSubmitting] = useState(false)
    const [form] = Form.useForm();
    const { currentUser } = useSelector(state => state.user)
    const [dataSource, setDataSource] = useState([]);
    const [submitBtn, setSubmitBtn] = useState(false);
    let response;
    useEffect(async () => {
        try {
            response = await MaintenanceServices.items(`department=${currentUser.data.role}`)
            setDataSource(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error.data);
        }
    }, []);
    const onFinish = async (values) => {
        setSubmitting(true)
        console.log("values ", values)
        try {

            const stockResponse = await MaintenanceServices.create(values);
            form.resetFields();
            success("Stock Uploaded Successfully...", "top-right", 5000);
            setSubmitting(false)
            // window.location.reload();
        } catch (error) {
            setSubmitting(false)
            console.log(error)
            info(error.response.data.msg, "top-right", 5000);

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
                    <h4>Upload Used Stock items</h4>
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

                        <Form.List name="items">
                            {(fields, { add, remove }) => (
                                <>

                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">

                                            <Form.Item
                                                style={{ width: "20rem" }}
                                                {...restField}
                                                name={[name, "stockId"]}
                                                rules={[{ required: true, message: "Menu Item is required" }]}>
                                                <Select placeholder="Select Menu">
                                                    {dataSource && dataSource.map(data => (
                                                        <Select.Option key={data._id} value={data.stockId._id}>{data.stockId.name}</Select.Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'quantity']}
                                                rules={[{ required: true, message: 'Quantity is required' }]}
                                            >
                                                <Input placeholder="Quantity" />
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

export default CreateUsedStocks