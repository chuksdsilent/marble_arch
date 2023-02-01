import React, { useState } from 'react'
import {
    Card,
    Col,
    Divider,
    Row,
    Form,
    Input,
    Button,
    Select,
    Radio
} from 'antd';
import { UserServices } from '../../../services/UserService';
import { ToastContainer, toast } from "react-toastify";
import { success, info } from '../../../utils/Notifications'
import { FormStyles } from "../../styles/FormStyle"

const NewStaff = () => {
    const [submitting, setSubmitting] = useState(false)
    const { TextArea } = Input;
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        setSubmitting(true)

        try {
            const response = await UserServices.create(values);
            form.resetFields();
            setSubmitting(false)
            success(response.data.msg, "top-right", 5000);
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
                    <h4>New Staff</h4>
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
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: "Username is required" }]}>
                            <Input placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: "Phone is required" }]}>
                            <Input placeholder="Phone" />
                        </Form.Item>

                        <Form.Item label="Gender" name="gender" rules={[{ required: true, message: "Gender is required" }]}>
                            <Radio.Group>
                                <Radio value="male">Male</Radio>
                                <Radio value="female">Female</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="Select"
                            name="role"
                            rules={[{ required: true, message: "Role is required" }]}>
                            <Select>
                                <Select.Option value="receptionist">Receptionist</Select.Option>
                                <Select.Option value="bar">Bar</Select.Option>
                                <Select.Option value="laundry">Laundry</Select.Option>
                                <Select.Option value="maintenance">Maintenance</Select.Option>
                                <Select.Option value="store-keeper">Store keeper</Select.Option>
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

export default NewStaff