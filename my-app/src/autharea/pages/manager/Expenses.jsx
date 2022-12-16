import React, { useState, useEffect } from 'react'
import { ExpensesServices } from '../../../services/ExpensesService';
import { Row, Col, Table, Button, Divider, Skeleton, Form, DatePicker } from 'antd';
import { TotalCardStyles } from '../../styles/TotalCardStyles';
import moment from 'moment';
import { columns } from '../../components/dataSource/ExpensesColumnSource';
import { formatCurrency } from "../../../utils/FormatCurrency";
const Expenses = () => {
    let amount = 0;
    const [dataSource, setDataSource] = useState([]);
    useEffect(async () => {
        try {
            const response = await ExpensesServices.all();
            setDataSource(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    }, []);
    const onFinish = async (values) => {
        const data = {
            startDate: moment(values.startDate).format("YYYY-MM-DD"),
            endDate: moment(values.endDate).format("YYYY-MM-DD"),
        }
        try {
            const response = await ExpensesServices.searchExpenses(data);
            setDataSource(response.data)
        } catch (error) {
            console.log(error);
        }

    };
    return (
        <>
            <h3>Expenses</h3>
            <Divider />
            <Row justify="start">
                <Col span={20} >
                    {/* <Form
                        name="basic"
                        onFinish={onFinish}
                    >
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    label="Start Date"
                                    name="startDate"
                                    rules={[{ required: true, message: "Start Date is required" }]}>
                                    <DatePicker format='YYYY-MM-DD' />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="End Date"
                                    name="endDate"
                                    rules={[{ required: true, message: "End Date is required" }]}>
                                    <DatePicker format='YYYY-MM-DD' />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item >
                                    <Button type="primary" htmlType="submit">
                                        Search
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form> */}
                </Col>
                <Col span={4}>
                    <TotalCardStyles>
                        <div>
                            Total:
                        </div>
                        <div className='total-badge'>
                            &#8358;
                            {
                                dataSource && dataSource.map((data) => {
                                    amount += Number(data.amount)
                                })
                            }

                            {formatCurrency(amount)}
                        </div>
                    </TotalCardStyles>
                </Col>
            </Row>


            <Row>
                <Col span={24}>
                    {dataSource ? <Table className="table-striped-rows" columns={columns} dataSource={dataSource} /> : <Skeleton active />}
                </Col>
            </Row>
        </>
    )
}

export default Expenses