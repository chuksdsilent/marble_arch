import React, { useEffect, useState } from 'react'
import {
    Col,
    Row,
    Card,
    Divider
} from 'antd';
import { DispatchedStocksServices } from '../../../services/DispatchedStockService';
import { useParams } from 'react-router';
import Moment from 'react-moment';

const ViewStockDispatched = () => {
    const [dataSource, setDataSource] = useState([]);
    const { _id } = useParams();
    useEffect(async () => {
        try {
            const response = await DispatchedStocksServices.getStock(_id);
            setDataSource(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }, []);
    return (
        <div>
            <Row>
                <Col md={{ offset: 6, span: 14 }} xs={{ offset: 0, span: 24 }} sm={{ offset: 0, span: 24 }}>
                    <Card type="inner">
                        <h4>Stock Details</h4>
                        <Divider />
                        {dataSource && dataSource.map((data) => {

                            return (
                                <>
                                    <Row className="card-row">
                                        <Col md={{ offset: 0, span: 12 }} xs={{ offset: 0, span: 24 }} sm={{ offset: 0, span: 24 }}>
                                            <h5>Name</h5>
                                            {data.stockId.name}
                                        </Col>
                                        <Col md={{ offset: 0, span: 12 }} xs={{ offset: 0, span: 24 }} sm={{ offset: 0, span: 24 }}>
                                            <h5>Department</h5>
                                            {data.department}
                                        </Col>
                                    </Row>
                                    <Row className="card-row">
                                        <Col md={{ offset: 0, span: 12 }} xs={{ offset: 0, span: 24 }} sm={{ offset: 0, span: 24 }}>
                                            <h5>Price</h5>
                                            {data.price}
                                        </Col>
                                        <Col md={{ offset: 0, span: 12 }} xs={{ offset: 0, span: 24 }} sm={{ offset: 0, span: 24 }}>
                                            <h5>Quantity</h5>
                                            {data.quantity}
                                        </Col>
                                    </Row>
                                    <Row className="card-row">
                                        <Col md={{ offset: 0, span: 12 }} xs={{ offset: 0, span: 24 }} sm={{ offset: 0, span: 24 }}>
                                            <h5>Total</h5>
                                            {data.total}
                                        </Col>
                                        <Col md={{ offset: 0, span: 12 }} xs={{ offset: 0, span: 24 }} sm={{ offset: 0, span: 24 }}>
                                            <h5>Received</h5>
                                            {data.received === "true" ? "Yes" : "No"}
                                        </Col>
                                    </Row>
                                    <Row className="card-row">
                                        <Col md={{ offset: 0, span: 12 }} xs={{ offset: 0, span: 24 }} sm={{ offset: 0, span: 24 }}>
                                            <h5>Sent By</h5>
                                            {data.staffId.surname}
                                            {" "}
                                            {data.staffId.firstName}
                                        </Col>
                                        <Col md={{ offset: 0, span: 12 }} xs={{ offset: 0, span: 24 }} sm={{ offset: 0, span: 24 }}>
                                            <h5>Received By</h5>
                                            {data.quantity}
                                        </Col>
                                    </Row>
                                    <Row className="card-row">
                                        <Col md={{ offset: 0, span: 24 }} xs={{ offset: 0, span: 24 }} sm={{ offset: 0, span: 24 }}>
                                            <h5>Date</h5>
                                            <Moment format="D MMM, YY">{data.createdAt}</Moment>
                                        </Col>
                                        <Col md={{ offset: 0, span: 12 }} xs={{ offset: 0, span: 24 }} sm={{ offset: 0, span: 24 }}>

                                        </Col>
                                    </Row>
                                </>
                            )

                        })}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ViewStockDispatched