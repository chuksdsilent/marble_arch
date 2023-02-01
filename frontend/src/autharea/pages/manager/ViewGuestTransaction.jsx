import React, { useEffect, useState } from 'react'
import {
    Col,
    Row,
    Card,
    Divider,
    Table,
    Skeleton
} from 'antd';
import { UserServices } from '../../../services/UserService';
import { useParams } from 'react-router';
import Moment from 'react-moment';
import { formatCurrency } from '../../../utils/FormatCurrency';
import { TotalCardStyles } from '../../styles/TotalCardStyles';

export const columns = [
    {
        title: "Room Number",
        dataIndex: "roomNumber",
        key: "roomNumber",
    },
    {
        title: "Room Type",
        dataIndex: "roomType",
        key: "roomType",
    },
    {
        title: "Staff",
        dataIndex: "staffId",
        key: "staffId",
        render: (_, { staffId }) => <>{staffId.surname} {staffId.firstName}</>,

    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: (_, { price }) => <>&#8358;{formatCurrency(price)}</>,

    },

    {
        title: "Date",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (_, { createdAt }) => (
            <>
                <Moment format="D MMM, YY">{createdAt}</Moment>
            </>
        ),
    },
]
const ViewGuestTransaction = () => {
    const [dataSource, setDataSource] = useState([]);
    let total = 0;
    const { _id } = useParams();
    useEffect(async () => {
        try {
            const response = await UserServices.getGuest(_id);
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
                        <h4>Guest's Transactions</h4>
                        <Divider />
                        <Row justify="right">
                            <Col md={{ offset: 20, span: 4 }}>
                                <TotalCardStyles>
                                    <div>Total:</div>
                                    <div className="total-badge" style={{ fontSize: "14px", paddingTop: ".2rem" }} >
                                        &#8358;
                                        {dataSource &&
                                            dataSource.map(data => {
                                                total += data.price;
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
                    </Card>
                </Col>
            </Row>
        </div >
    )
}

export default ViewGuestTransaction