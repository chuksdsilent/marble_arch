import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Divider } from "antd";
import { LoginStyles } from "../../styles/pages/LoginStyles";
import { useNavigate } from "react-router-dom";
import { UserServices } from "../../../services/UserService";
import { info, success } from "../../../utils/Notifications";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/UserSlice";
import { useSelector } from "react-redux";
import storeKeeper from "../../../assets/images/storekeeper.jpg";

const StoreKeeper = () => {
    const { isLoading } = useSelector(state => state.user);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const onFinish = async values => {
        dispatch(loginStart());
        try {
            const response = await UserServices.authenticate(values);
            localStorage.setItem("token", response.data.token);
            dispatch(loginSuccess(response));
            form.resetFields();
            console.log("role ", response.data)
            if (response.data.role == "store-keeper") navigate("/store-keeper/stock-dispatches");
            else
                info("Unauthorized Access", "top-right", 5000);
        } catch (error) {
            info(error.response.data.msg, "top-right", 5000);
            form.resetFields();
            dispatch(loginFailure());
        }
    };
    const onFinishFailed = errorInfo => {
        console.log("Failed:", errorInfo);
    };
    const initValues = {
        password: "",
    };

    return (
        <LoginStyles>
            <ToastContainer />
            <div className="main-content">
                <div className="left">
                    <img src={storeKeeper} alt="" />
                </div>
                <div className="right">
                    <header>Store Keeper</header>
                    <Divider />
                    <Form
                        form={form}
                        initialValues={initValues}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, message: "Please input your username!" },
                            ]}
                        >
                            <Input placeholder="Username" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: "Please input your password!" },
                            ]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 24 }}>
                            <Button type="primary" htmlType="submit">
                                {isLoading ? "Authenticating..." : "Submit"}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </LoginStyles>
    );
}

export default StoreKeeper