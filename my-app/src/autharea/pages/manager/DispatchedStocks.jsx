import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Table,
    Button,
    Divider,
    Skeleton,
    Form,
    DatePicker,
} from "antd";
import { TotalCardStyles } from "../../styles/TotalCardStyles";
import { formatCurrency } from "../../../utils/FormatCurrency";
import { columns } from "../../components/dataSource/DispatchedStockColumn";
import moment from "moment";
import { DispatchedStocksServices } from "../../../services/DispatchedStockService";
import { useLocation } from 'react-router';
import { info } from "../../../utils/Notifications";

const DispatchedStocks = () => {
    const { query, search } = useLocation();
    const params = new URLSearchParams(search).get('backUrl');
    let total = 0;
    const [dataSource, setDataSource] = useState([]);
    useEffect(async () => {
        try {
            const response = (params == "today") ? await DispatchedStocksServices.todayDispatchedStocks() : await DispatchedStocksServices.all();
            setDataSource(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }, []);
    const onFinish = async values => {
        const data = {
            startDate: moment(values.startDate).format("YYYY-MM-DD"),
            endDate: moment(values.endDate).format("YYYY-MM-DD"),
        };
        try {
            const response = await DispatchedStocksServices.searchDispatchedStocks(data);
            setDataSource(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
            info(error.data.msg, "top-right", 5000);
        }

    };
    return (
        <>
            <h3>All Dispatched Stocks</h3>
            <Divider />
            <Row justify="start">
                <Col span={20}>
                    <Form name="basic" onFinish={onFinish}>
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    label="Start Date"
                                    name="startDate"
                                    rules={[
                                        { required: true, message: "Start Date is required" },
                                    ]}
                                >
                                    <DatePicker format="YYYY-MM-DD" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="End Date"
                                    name="endDate"
                                    rules={[{ required: true, message: "End Date is required" }]}
                                >
                                    <DatePicker format="YYYY-MM-DD" />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Search
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col span={4}>
                    <TotalCardStyles>
                        <div>Total:</div>
                        <div className="total-badge">
                            &#8358;
                            {dataSource &&
                                dataSource.map(data => {
                                    total += data.total;
                                })}
                            {formatCurrency(total)}
                        </div>
                    </TotalCardStyles>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    {dataSource ? (
                        <Table
                            className="table-striped-rows"
                            columns={columns}
                            dataSource={dataSource}
                        />
                    ) : (
                        <Skeleton active />
                    )}
                </Col>
            </Row>
        </>
    );
}

export default DispatchedStocks