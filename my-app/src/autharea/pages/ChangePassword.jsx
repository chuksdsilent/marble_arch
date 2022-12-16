import React, { useEffect, useState } from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Card,
    Divider,
    Form,
    Input,
    Button,
    Space
} from 'antd';
import { UserServices } from '../../services/UserService';
import { ToastContainer, toast } from "react-toastify";
import { success, info } from '../../utils/Notifications'
import { FormStyles } from "../styles/FormStyle"
import { useSelector } from 'react-redux';

const ChangePassword = () => {
    let values;
    const [submitting, setSubmitting] = useState(false)
    const [form] = Form.useForm();
    const { currentUser } = useSelector(state => state.user)
    const [dataSource, setDataSource] = useState([]);
    const [reservation, setReservation] = useState([]);
    const [submitBtn, setSubmitBtn] = useState(false);

    const onFinish = async (values) => {
        setSubmitting(true)
        const value = { ...values, username: currentUser.data.username }
        try {
            const response = await UserServices.changePassword(value);
            form.resetFields();
            setReservation(response.data)
            success("Password Changed Successfully...", "top-right", 5000);
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
                    <h4>Change Password</h4>
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
                            name="oldPassword"
                            label="Old Password"
                            rules={[{ required: true, message: 'Old Password is required' }]}
                        >

                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="newPassword"
                            label="New Password"
                            rules={[{ required: true, message: 'New Password is required' }]}
                        >

                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            label="Confirm Password"
                            dependencies={['newPassword']}
                            rules={[{ required: true, message: 'Confirm Password is required' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),]}
                        >

                            <Input.Password />
                        </Form.Item>

                        <Button type="primary" htmlType="submit">
                            {submitting ? "Processing..." : "Submit"}
                        </Button>
                    </Form>
                </Card>
            </div >
        </FormStyles>
    )
}

export default ChangePassword